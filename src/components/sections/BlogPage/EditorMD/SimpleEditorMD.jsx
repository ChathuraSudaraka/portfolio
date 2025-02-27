import React, { useEffect, useRef } from 'react';
// Direct import of CSS from node_modules
import 'editor.md/css/editormd.min.css';

const SimpleEditorMD = ({ initialValue = '', onUpdate = () => {} }) => {
  const editorRef = useRef(null);
  
  useEffect(() => {
    // Check if editor.md and jQuery are available
    const tryInitialize = async () => {
      // Use the globally loaded jQuery from index.html
      if (!window.jQuery) {
        console.error('jQuery not found. Make sure it is loaded in index.html');
        return;
      }
      
      // Try to load editor.md from node_modules first
      try {
        const editorMd = await import('editor.md/editormd.min.js');
        console.log('Successfully loaded editor.md from node_modules');
      } catch (error) {
        // If node_modules fails, try loading from CDN
        console.log('Failed to load editor.md from node_modules, trying CDN...');
        await loadScriptFromCDN('https://cdnjs.cloudflare.com/ajax/libs/editor.md/1.5.0/editormd.min.js');
      }
      
      // Initialize editor if loaded successfully
      if (window.editormd) {
        initializeEditor();
      } else {
        console.error('Failed to load editor.md');
      }
    };
    
    // Helper to load script from CDN
    const loadScriptFromCDN = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };
    
    // Initialize the editor instance
    const initializeEditor = () => {
      // Get saved content from localStorage if available and no initialValue provided
      let content = initialValue;
      const savedContent = localStorage.getItem("editorContent");
      if (savedContent && !initialValue) {
        content = savedContent;
      }
      
      // Initialize editor
      const editor = window.editormd("editormd-container", {
        width: "100%",
        height: 500,
        // Try to use node_modules path first, fall back to CDN
        path: "/node_modules/editor.md/lib/",
        fallbackPath: "https://cdnjs.cloudflare.com/ajax/libs/editor.md/1.5.0/lib/",
        markdown: content || "# Start your blog post here\n\nUse markdown to format your content.",
        codeFold: true,
        saveHTMLToTextarea: true,
        searchReplace: true,
        watch: true,
        htmlDecode: "style,script,iframe",
        emoji: true,
        taskList: true,
        tex: true,
        flowChart: true,
        sequenceDiagram: true,
        
        // Editor.md events
        onload: function() {
          console.log('Editor loaded successfully');
          
          // Add change event
          this.on("change", function() {
            const content = this.getMarkdown();
            localStorage.setItem("editorContent", content);
            onUpdate(content);
          });
        }
      });
      
      return editor;
    };
    
    // Start initialization process
    tryInitialize();
    
    // Cleanup function
    return () => {
      const editorElem = document.getElementById("editormd-container");
      if (editorElem) {
        editorElem.innerHTML = '';
      }
    };
  }, [initialValue, onUpdate]);
  
  return (
    <div id="editormd-container" ref={editorRef}>
      <textarea style={{ display: 'none' }} defaultValue={initialValue}></textarea>
    </div>
  );
};

export default SimpleEditorMD;
