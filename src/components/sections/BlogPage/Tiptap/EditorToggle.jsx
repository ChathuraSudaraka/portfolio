import React, { useState, useEffect } from 'react';
import Tiptap from './NotePad';
import MarkdownEditor from './MarkdownEditor';
import { toast } from 'react-toastify';
import { BsMarkdown, BsPencilSquare } from 'react-icons/bs';
import TurndownService from 'turndown';
// Import marked at the top of the file instead of using dynamic import
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

const EditorToggle = ({ initialContent = '', onUpdate }) => {
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
    
    // We don't update the parent here since we want to keep HTML as primary format
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
        // Using the marked library that we imported at the top of the file
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
    <div className="editor-toggle-container">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={toggleEditorMode}
          disabled={isConverting}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
        >
          {isConverting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Converting...
            </>
          ) : editorMode === 'wysiwyg' ? (
            <>
              <BsMarkdown />
              Switch to Markdown
            </>
          ) : (
            <>
              <BsPencilSquare />
              Switch to Visual Editor
            </>
          )}
        </button>
      </div>
      
      {/* Render the appropriate editor based on mode */}
      {editorMode === 'wysiwyg' ? (
        <Tiptap initialContent={htmlContent} onUpdate={handleTiptapUpdate} />
      ) : (
        <MarkdownEditor initialValue={markdownContent} onUpdate={handleMarkdownUpdate} />
      )}
    </div>
  );
};

export default EditorToggle;
