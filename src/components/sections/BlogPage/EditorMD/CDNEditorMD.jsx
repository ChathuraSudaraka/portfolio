import React, { useEffect, useRef, useState, useCallback } from 'react';
import EditorMDAIHelper from './EditorMDAIHelper';

// Default toolbar options
const DEFAULT_TOOLBAR_ITEMS = [
  "undo", "redo", "|", 
  "bold", "del", "italic", "quote", "|", 
  "h1", "h2", "h3", "h4", "h5", "h6", "|", 
  "list-ul", "list-ol", "hr", "|",
  "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
  "goto-line", "watch", "preview", "fullscreen", "clear", "search", "|",
  "help", "info"
];

const CDNEditorMD = ({ 
  initialValue = '', 
  onUpdate = () => {}, 
  aiAssistMode = false,
  height = 500,
  placeholder = "# Write your blog post\n\nStart typing here...",
  customToolbarItems = null,
  enableImageUpload = true,
  theme = "auto", // "auto", "light", or "dark"
  showWordCount = true
}) => {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wordCount, setWordCount] = useState({ words: 0, characters: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const editorId = useRef(`editormd-${Math.random().toString(36).substring(2, 9)}`).current;
  const hasInitialized = useRef(false); // Track if editor has been initialized
  const contentRef = useRef(initialValue); // Store content in ref to avoid re-renders
  
  // The updateWordCount function should be memoized to avoid recreation on each render
  const updateWordCount = useCallback((text) => {
    if (!showWordCount) return;
    
    // Remove markdown syntax for more accurate counting
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`([^`]+)`/g, '$1')    // Remove inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // Replace images with alt text
      .replace(/(\*|_){1,3}([^*_]+)(\*|_){1,3}/g, '$2') // Remove bold/italic
      .trim();
    
    const words = cleanText.split(/\s+/).filter(Boolean).length;
    const characters = cleanText.replace(/\s+/g, '').length;
    
    setWordCount({ words, characters });
  }, [showWordCount]);
  
  // 1. SEPARATED EFFECT: Dark mode detection
  useEffect(() => {
    // Check for dark mode
    const isDarkMode = 
      theme === "dark" || 
      (theme === "auto" && 
       window.matchMedia && 
       window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDarkMode);
    
    // Listen for system dark mode changes if theme is "auto"
    if (theme === "auto" && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);
  
  // 2. NEW EFFECT: Apply dark mode to editor when darkMode changes
  useEffect(() => {
    // Skip if editor isn't initialized yet
    if (!editorInstanceRef.current || !hasInitialized.current) return;
    
    console.log(`Applying ${darkMode ? 'dark' : 'light'} theme to editor`);
    
    try {
      // Set editor theme
      const cm = editorInstanceRef.current.cm;
      if (cm) {
        // Update CodeMirror theme
        if (darkMode) {
          cm.setOption('theme', 'pastel-on-dark');
        } else {
          cm.setOption('theme', 'default');
        }
      }
      
      // Apply CSS classes for custom styling
      const editorElement = document.getElementById(editorId);
      if (editorElement) {
        if (darkMode) {
          editorElement.classList.add('editor-dark-mode');
          document.querySelectorAll('.editormd-preview').forEach(el => {
            el.classList.add('dark-preview');
          });
        } else {
          editorElement.classList.remove('editor-dark-mode');
          document.querySelectorAll('.editormd-preview').forEach(el => {
            el.classList.remove('dark-preview');
          });
        }
      }
      
      // Force refresh of the editor to apply theme changes
      if (typeof editorInstanceRef.current.recreate === 'function') {
        // If recreate exists, use it (some editor.md versions have this)
        editorInstanceRef.current.recreate();
      } else {
        // Otherwise manually refresh components that have theming
        editorInstanceRef.current.setTheme(darkMode ? 'dark' : 'default');
        editorInstanceRef.current.setEditorTheme(darkMode ? 'pastel-on-dark' : 'default');
        editorInstanceRef.current.setPreviewTheme(darkMode ? 'dark' : 'default');
      }
    } catch (e) {
      console.error('Error updating editor theme:', e);
      // Non-fatal error, don't show to user
    }
  }, [darkMode, editorId]);

  // 3. MAIN EFFECT: Editor initialization (once only)
  useEffect(() => {
    // Skip if already initialized or not in browser
    if (hasInitialized.current || typeof window === 'undefined') {
      return;
    }
    
    console.log('Initializing editor for the first time');
    
    // Set initial loading state
    setLoading(true);
    
    // Helper functions for loading CSS and scripts
    const loadCSS = (href) => { 
      return new Promise((resolve) => {
        // Don't load if already exists
        const existingLink = document.querySelector(`link[href="${href}"]`);
        if (existingLink) {
          resolve();
          return;
        }
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        document.head.appendChild(link);
      });
    };
    
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Don't load if already exists
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = (e) => {
          console.error(`Failed to load script: ${src}`, e);
          reject(new Error(`Failed to load: ${src}`));
        };
        document.body.appendChild(script);
      });
    };
    
    const executeWithRetry = async (fn, retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          return await fn();
        } catch (error) {
          if (i === retries - 1) throw error;
          console.warn(`Retry ${i + 1}/${retries} after error:`, error);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    };
    
    // Main initialization function
    const initialize = async () => {
      try {
        // Load dependencies
        if (!window.jQuery) {
          await loadScript('https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js');
        }
        
        await loadCSS('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');
        await loadCSS('https://cdn.jsdelivr.net/npm/editor.md@1.5.0/css/editormd.min.css');
        await loadScript('https://cdn.jsdelivr.net/npm/editor.md@1.5.0/editormd.min.js');
        
        // After loading editor.md script, load the English locale
        try {
          // First try loading the locale from our files
          const englishLocale = await import('./english-locale.js');
          if (typeof englishLocale.default === 'function') {
            englishLocale.default(window.editormd);
          }
          console.log('Loaded English locale from local file');
        } catch (localeError) {
          console.warn('Could not load local English locale:', localeError);
          // If that fails, use a dynamic import for the CDN version
          try {
            await loadScript('https://cdn.jsdelivr.net/npm/editor.md@1.5.0/languages/en.js');
            console.log('Loaded English locale from CDN');
          } catch (cdnError) {
            console.warn('Could not load English locale from CDN:', cdnError);
            // Not critical, can continue without it
          }
        }
        
        // Make sure the editor is loaded
        if (!window.editormd) {
          throw new Error('Editor.md not available after loading script');
        }
        
        // Ensure container exists
        const container = document.getElementById(editorId);
        if (!container) {
          throw new Error('Editor container element not found in DOM');
        }
        
        // Clear any existing content
        container.innerHTML = '<textarea style="display:none;">' + 
          (initialValue || contentRef.current || '') + 
          '</textarea>';
        
        // Get content from localStorage if needed
        const savedContent = localStorage.getItem("editorContent");
        if (savedContent && !initialValue) {
          contentRef.current = savedContent;
        } else {
          contentRef.current = initialValue;
        }
        
        // Add this to the initialize function before creating the editor

        // Register custom toolbar action for AI Assistant
        if (window.editormd && aiAssistMode) {
          // Define custom toolbar icon
          window.editormd.toolbarIconExtensions = {
            "ai-assistant": {
              name: "ai-assistant",
              action: function() {
                // This will trigger the AI helper
                const aiHelperButton = document.querySelector('.ai-helper-trigger');
                if (aiHelperButton) {
                  aiHelperButton.click();
                } else {
                  // Create a virtual button click if the actual button isn't available yet
                  setTimeout(() => {
                    const laterAiHelperButton = document.querySelector('.ai-helper-trigger');
                    if (laterAiHelperButton) laterAiHelperButton.click();
                  }, 100);
                }
              },
              className: "fa fa-magic",
              title: "AI Assistant"
            }
          };
        }
        
        // Create editor configuration
        const editorConfig = {
          width: "100%",
          height: height,
          path: "https://cdn.jsdelivr.net/npm/editor.md@1.5.0/lib/",
          markdown: contentRef.current || placeholder,
          placeholder: placeholder,
          codeFold: true,
          saveHTMLToTextarea: true,
          searchReplace: true,
          watch: false, // Important: start with watch off
          htmlDecode: "style,script,iframe",
          emoji: true,
          taskList: true,
          tocm: true,
          tex: true,
          flowChart: true,
          sequenceDiagram: true,
          
          // Theme settings
          theme: darkMode ? "dark" : "default",
          previewTheme: darkMode ? "dark" : "default",
          editorTheme: darkMode ? "pastel-on-dark" : "default",
          
          // Image upload settings
          imageUpload: true,
          imageFormats: ["jpg", "jpeg", "gif", "png", "webp"],
          imageUploadURL: null, // Don't use the built-in upload URL feature
          
          // Custom function to handle image uploads
          
          
          // Editor events
          onload: function() {
            console.log('Editor loaded successfully');
            
            // Store editor instance
            editorInstanceRef.current = this;
            
            // Apply theme to CodeMirror
            this.cm.setOption('theme', darkMode ? 'pastel-on-dark' : 'default');
            
            // Apply dark mode class to editor wrapper
            const editorWrapper = document.getElementById(editorId).closest('.editormd');
            if (editorWrapper) {
              if (darkMode) {
                editorWrapper.classList.add('editor-dark-mode');
              } else {
                editorWrapper.classList.remove('editor-dark-mode');
              }
            }
            
            // Update word count initially
            updateWordCount(this.getMarkdown());
            
            // Add change event handler
            this.on("change", function() {
              const content = this.getMarkdown();
              
              // Store in ref to avoid re-renders
              contentRef.current = content;
              
              // Update localStorage
              localStorage.setItem("editorContent", content);
              
              // Update the word count
              updateWordCount(content);
              
              // Notify parent component through callback
              onUpdate(content);
            });
            
            // Mark as initialized to prevent duplicate init
            hasInitialized.current = true;
            
            // Enable watch mode after initialization
            setTimeout(() => {
              if (this && typeof this.watch === 'function') {
                this.watch();
              }
              // Set loading state to false
              setLoading(false);
            }, 100);
          },
          // Add language setting
          lang: {
            name: "en",
            // This will use the loaded locale from above
          },
          toolbarIconsClass: {
            // ...existing toolbar icons...
            "ai-assistant": "fa-magic", // FontAwesome magic icon
            "image": "fa-picture-o" // Ensure the correct icon class is used
          },
        };

        // Add custom handler function for toolbar clicks
        const toolbarHandlers = {
          "ai-assistant": function() {
            // This will be called when the AI Assistant toolbar button is clicked
            const aiHelperButton = document.querySelector('.ai-helper-trigger');
            if (aiHelperButton) {
              aiHelperButton.click();
            }
          }
        };

        // Ensure this is added to the editorConfig
        editorConfig.toolbarHandlers = toolbarHandlers;
        
        // Add toolbar configuration
        editorConfig.toolbarIcons = function() {    
          const toolbarItems = customToolbarItems || [...DEFAULT_TOOLBAR_ITEMS];
          if (aiAssistMode && !toolbarItems.includes("ai-assistant")) {
            toolbarItems.push("ai-assistant");
          }
          return toolbarItems;
        };
        
        editorConfig.toolbarIconsClass = {
          "ai-assistant": "fa-magic" // FontAwesome magic icon
        };
        
        // Initialize editor with config
        try {
          window.editormd(editorId, editorConfig);
        } catch (err) {
          console.error('Error initializing editor instance:', err);
          throw err;
        }
      } catch (err) {
        console.error('Error in initialization process:', err);
        setError(err.message || 'Failed to load the editor');
        setLoading(false);
        hasInitialized.current = false; // Allow retry on error
        throw err;
      }
    };
    
    // Start initialization with a delay
    const initTimer = setTimeout(() => {
      executeWithRetry(initialize, 2)
        .catch(err => {
          setError(`Failed to initialize editor: ${err.message}`);
          setLoading(false);
          hasInitialized.current = false; // Allow retry on error
        });
    }, 300);
    
    // Cleanup function
    return () => {
      clearTimeout(initTimer);
    };
  // CRITICAL: Empty dependency array ensures this only runs once
  }, []); 
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (editorInstanceRef.current) {
        try {
          // Clean up editor instance
          editorInstanceRef.current = null;
          console.log('Editor instance cleaned up');
        } catch (e) {
          console.error('Error cleaning up editor:', e);
        }
      }
    };
  }, []);

  // Add dark mode styles
  useEffect(() => {
    // Create style element for dark mode
    const styleElement = document.createElement('style');
    styleElement.id = 'editor-dynamic-dark-mode';
    styleElement.textContent = `
      /* Editor container and backgrounds */
      .editor-dark-mode .editormd,
      .dark-theme-editor .editormd {
        background-color: #1a1a1a !important;
        border-color: #444 !important;
        color: #e0e0e0 !important;
      }
      
      /* CodeMirror editor - main text area */
      .editor-dark-mode .CodeMirror,
      .dark-theme-editor .CodeMirror,
      .editor-dark-mode .cm-s-default,
      .dark-theme-editor .cm-s-default {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
        border-color: #444 !important;
        font-family: 'Courier New', monospace !important;
      }
      
      /* Editor cursor */
      .editor-dark-mode .CodeMirror-cursor,
      .dark-theme-editor .CodeMirror-cursor {
        border-left-color: #fff !important;
      }
      
      /* Selected text */
      .editor-dark-mode .CodeMirror-selected,
      .dark-theme-editor .CodeMirror-selected {
        background-color: rgba(75, 85, 99, 0.5) !important;
      }
      
      /* Line numbers panel */
      .editor-dark-mode .CodeMirror-gutters,
      .dark-theme-editor .CodeMirror-gutters {
        background-color: #262626 !important;
        border-right-color: #444 !important;
      }
      
      /* Line numbers */
      .editor-dark-mode .CodeMirror-linenumber,
      .dark-theme-editor .CodeMirror-linenumber {
        color: #888 !important;
      }
      
      /* Active line highlight */
      .editor-dark-mode .CodeMirror-activeline-background,
      .dark-theme-editor .CodeMirror-activeline-background {
        background-color: rgba(50, 50, 50, 0.5) !important;
      }
      
      /* Syntax highlighting - improved for dark theme */
      .editor-dark-mode .cm-s-default .cm-header,
      .dark-theme-editor .cm-s-default .cm-header,
      .editor-dark-mode .cm-header,
      .dark-theme-editor .cm-header {
        color: #93c5fd !important; /* Light blue for headers */
        font-weight: bold !important;
      }
      
      .editor-dark-mode .cm-s-default .cm-comment,
      .dark-theme-editor .cm-s-default .cm-comment {
        color: #6b7280 !important; /* Gray for comments */
      }
      
      .editor-dark-mode .cm-s-default .cm-keyword,
      .dark-theme-editor .cm-s-default .cm-keyword {
        color: #c084fc !important; /* Purple for keywords */
      }
      
      .editor-dark-mode .cm-s-default .cm-string,
      .dark-theme-editor .cm-s-default .cm-string {
        color: #a7f3d0 !important; /* Light green for strings */
      }
      
      .editor-dark-mode .cm-s-default .cm-link,
      .dark-theme-editor .cm-s-default .cm-link {
        color: #60a5fa !important; /* Blue for links */
        text-decoration: none !important;
      }
      
      .editor-dark-mode .cm-s-default .cm-url,
      .dark-theme-editor .cm-s-default .cm-url {
        color: #60a5fa !important; /* Blue for URLs */
        text-decoration: underline !important;
      }
      
      .editor-dark-mode .cm-s-default .cm-tag,
      .dark-theme-editor .cm-s-default .cm-tag {
        color: #f87171 !important; /* Light red for tags */
      }
      
      .editor-dark-mode .cm-s-default .cm-variable,
      .dark-theme-editor .cm-s-default .cm-variable {
        color: #fbbf24 !important; /* Yellow for variables */
      }
      
      .editor-dark-mode .cm-s-default .cm-variable-2,
      .dark-theme-editor .cm-s-default .cm-variable-2 {
        color: #93c5fd !important; /* Light blue for other variables */
      }
      
      .editor-dark-mode .cm-s-default .cm-def,
      .dark-theme-editor .cm-s-default .cm-def {
        color: #fbbf24 !important; /* Yellow for definitions */
      }
      
      .editor-dark-mode .cm-s-default .cm-number,
      .dark-theme-editor .cm-s-default .cm-number {
        color: #f97316 !important; /* Orange for numbers */
      }
      
      .editor-dark-mode .cm-s-default .cm-property,
      .dark-theme-editor .cm-s-default .cm-property {
        color: #60a5fa !important; /* Blue for properties */
      }
      
      .editor-dark-mode .cm-s-default .cm-operator,
      .dark-theme-editor .cm-s-default .cm-operator {
        color: #c084fc !important; /* Purple for operators */
      }
      
      .editor-dark-mode .cm-s-default .cm-meta,
      .dark-theme-editor .cm-s-default .cm-meta {
        color: #ec4899 !important; /* Pink for meta */
      }
      
      .editor-dark-mode .cm-s-default .cm-quote,
      .dark-theme-editor .cm-s-default .cm-quote {
        color: #a7f3d0 !important; /* Light green for quotes */
        font-style: italic !important;
      }
      
      .editor-dark-mode .cm-s-default .cm-hr,
      .dark-theme-editor .cm-s-default .cm-hr {
        color: #6b7280 !important; /* Gray for horizontal rules */
      }
      
      /* Preview panel */
      .editor-dark-mode .editormd-preview,
      .dark-theme-editor .editormd-preview,
      .dark-preview {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
      }
      
      .editor-dark-mode .editormd-preview-container pre,
      .dark-theme-editor .editormd-preview-container pre,
      .dark-preview pre {
        background-color: #262626 !important;
        border-color: #444 !important;
        color: #e0e0e0 !important;
      }
      
      .editor-dark-mode .editormd-preview-container code,
      .dark-theme-editor .editormd-preview-container code,
      .dark-preview code {
        background-color: #262626 !important;
        color: #c0c0c0 !important;
      }
      
      .editor-dark-mode .editormd-preview-container blockquote,
      .dark-theme-editor .editormd-preview-container blockquote,
      .dark-preview blockquote {
        border-left-color: #444 !important;
        background-color: #262626 !important;
        color: #c0c0c0 !important;
      }
      
      /* Toolbar */
      .editor-dark-mode .editormd-toolbar,
      .dark-theme-editor .editormd-toolbar {
        background-color: #262626 !important;
        border-color: #444 !important;
      }
      
      .editor-dark-mode .editormd-menu > li > a,
      .dark-theme-editor .editormd-menu > li > a {
        color: #c0c0c0 !important;
        border-color: #444 !important;
      }
      
      .editor-dark-mode .editormd-menu > li > a:hover,
      .dark-theme-editor .editormd-menu > li > a:hover,
      .editor-dark-mode .editormd-menu > li.active > a,
      .dark-theme-editor .editormd-menu > li.active > a {
        background-color: #444 !important;
        color: #ffffff !important;
      }
      
      /* Fullscreen mode - ensure dark theme persists */
      body.editormd-fullscreen .editormd-preview {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
      }
      
      /* Pastel-on-dark theme improvements */
      .cm-s-pastel-on-dark.CodeMirror {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
      }
    `;
    
    document.head.appendChild(styleElement);
    
    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className={`editor-container relative ${darkMode ? 'dark-theme-editor' : 'light-theme-editor'}`}>
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-2"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading editor...</p>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10 p-4">
          <div className="flex flex-col items-center max-w-md text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">Failed to load editor</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{error}</p>
            <button 
              className="px-4 py-2 bg-primary text-white rounded-md"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
          </div>
        </div>
      )}
      
      {/* The editor container */}
      <div id={editorId} ref={editorRef} className="border border-gray-200 dark:border-gray-800 rounded-lg min-h-[500px]">
        <textarea style={{ display: 'none' }} defaultValue={initialValue}></textarea>
      </div>
      
      {/* Add AI Helper (conditionally) */}
      {aiAssistMode && (
        <div className={`${loading ? 'hidden' : 'block'} absolute top-2 right-20 z-50`}>
          <button className="ai-helper-trigger hidden"></button>
          <EditorMDAIHelper editorInstance={editorInstanceRef.current} />
        </div>
      )}
      
      {/* Word count display */}
      {showWordCount && !loading && !error && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
          Words: {wordCount.words} | Characters: {wordCount.characters}
        </div>
      )}
    </div>
  );
};

export default CDNEditorMD;