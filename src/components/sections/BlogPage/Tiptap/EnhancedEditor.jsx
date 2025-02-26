import React, { useState, useEffect } from 'react';
import Tiptap from './NotePad';
import MarkdownEditor from './MarkdownEditor';
import { toast } from 'react-toastify';
import { BsCode, BsPencilSquare, BsMarkdown } from 'react-icons/bs';
import TurndownService from 'turndown';
import { marked } from 'marked';

// Service to convert HTML to Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

// Add rules for better Markdown conversion
turndownService.addRule('codeBlocks', {
  filter: node => node.nodeName === 'PRE' && node.firstChild && node.firstChild.nodeName === 'CODE',
  replacement: (content, node) => {
    const language = node.firstChild.getAttribute('class') || '';
    const languageMatch = language.match(/language-(\w+)/);
    const lang = languageMatch ? languageMatch[1] : '';
    return `\n\`\`\`${lang}\n${node.firstChild.textContent}\n\`\`\`\n\n`;
  }
});

const EnhancedEditor = ({ initialContent = '', onUpdate, aiAssistMode = false }) => {
  const [editorMode, setEditorMode] = useState('wysiwyg'); // 'wysiwyg' or 'markdown'
  const [htmlContent, setHtmlContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  
  // Initialize content
  useEffect(() => {
    if (initialContent) {
      if (editorMode === 'wysiwyg') {
        setHtmlContent(initialContent);
      } else {
        try {
          const markdown = turndownService.turndown(initialContent);
          setMarkdownContent(markdown);
        } catch (error) {
          console.error("Error converting initial HTML to Markdown:", error);
          setMarkdownContent(initialContent);
        }
      }
    }
  }, [initialContent]);
  
  // Handle content update from either editor
  const handleTiptapUpdate = (content) => {
    setHtmlContent(content);
    
    // Also update parent component
    if (onUpdate) {
      onUpdate(content);
    }
  };
  
  const handleMarkdownUpdate = (content) => {
    setMarkdownContent(content);
    
    try {
      // Convert markdown to HTML and update the parent
      const html = marked(content);
      if (onUpdate) {
        onUpdate(html);
      }
    } catch (error) {
      console.error("Error converting markdown to HTML:", error);
    }
  };
  
  // Handle editor mode toggle
  const toggleEditorMode = async () => {
    setIsConverting(true);
    
    try {
      if (editorMode === 'wysiwyg') {
        // Convert HTML to Markdown
        const markdown = turndownService.turndown(htmlContent);
        setMarkdownContent(markdown);
        setEditorMode('markdown');
      } else {
        // When switching from Markdown to WYSIWYG, convert Markdown to HTML
        const html = marked(markdownContent);
        setHtmlContent(html);
        
        // Also update the parent component
        if (onUpdate) {
          onUpdate(html);
        }
        
        setEditorMode('wysiwyg');
      }
    } catch (error) {
      console.error("Error converting content:", error);
      toast.error("Failed to switch editor modes. Please try again.");
    } finally {
      setIsConverting(false);
    }
  };
  
  return (
    <div className="enhanced-editor">
      {/* Editor Mode Toggle */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-2 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => editorMode !== 'wysiwyg' && toggleEditorMode()}
            disabled={isConverting || editorMode === 'wysiwyg'}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-l-lg ${
              editorMode === 'wysiwyg' 
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BsPencilSquare className="mr-2 h-4 w-4" />
            Visual Editor
          </button>
          <button
            type="button"
            onClick={() => editorMode !== 'markdown' && toggleEditorMode()}
            disabled={isConverting || editorMode === 'markdown'}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-r-lg ${
              editorMode === 'markdown'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BsMarkdown className="mr-2 h-4 w-4" />
            Markdown
          </button>
        </div>
      </div>

      {/* Loading indicator */}
      {isConverting && (
        <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-800 bg-opacity-75 absolute inset-0 z-10">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Converting content...</p>
          </div>
        </div>
      )}
      
      {/* Render the appropriate editor based on mode */}
      {editorMode === 'wysiwyg' ? (
        <Tiptap initialContent={htmlContent} onUpdate={handleTiptapUpdate} aiAssistMode={aiAssistMode} />
      ) : (
        <MarkdownEditor initialValue={markdownContent} onUpdate={handleMarkdownUpdate} />
      )}
    </div>
  );
};

export default EnhancedEditor;
