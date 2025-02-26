import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs"; // Add this import for the AI icon
import MarkdownAIHelper from "./MarkdownAIHelper"; // Import the new AI helper we'll create

// Import the same icons as Notepad for consistency
const MarkdownEditor = ({ initialValue = "", onUpdate }) => {
  const [markdown, setMarkdown] = useState(initialValue || "# Start writing your blog post\n\nUse Markdown to format your content.");
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  
  useEffect(() => {
    if (markdown) {
      localStorage.setItem("markdownContent", markdown);
      if (onUpdate) {
        onUpdate(markdown);
      }
    }
  }, [markdown, onUpdate]);
  
  useEffect(() => {
    const savedContent = localStorage.getItem("markdownContent");
    if (savedContent && !initialValue) {
      setMarkdown(savedContent);
    }
  }, [initialValue]);

  // Insert markdown formatting
  const insertFormatting = (type) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = markdown.substring(start, end);
    let before = markdown.substring(0, start);
    let after = markdown.substring(end);
    let formattedText = "";
    let cursorOffset = 0;
    
    switch(type) {
      case 'h1':
        formattedText = `${before}# ${selection}${after}`;
        cursorOffset = 2;
        break;
      case 'h2':
        formattedText = `${before}## ${selection}${after}`;
        cursorOffset = 3;
        break;
      case 'h3':
        formattedText = `${before}### ${selection}${after}`;
        cursorOffset = 4;
        break;
      case 'bold':
        formattedText = `${before}**${selection}**${after}`;
        cursorOffset = 2;
        break;
      case 'italic':
        formattedText = `${before}_${selection}_${after}`;
        cursorOffset = 1;
        break;
      case 'underline':
        // Markdown doesn't directly support underline, but we can use HTML
        formattedText = `${before}<u>${selection}</u>${after}`;
        cursorOffset = 3;
        break;
      case 'strike':
        formattedText = `${before}~~${selection}~~${after}`;
        cursorOffset = 2;
        break;
      case 'link':
        formattedText = `${before}[${selection || 'Link text'}](url)${after}`;
        cursorOffset = selection ? selection.length + 3 : 9;
        break;
      case 'image':
        formattedText = `${before}![${selection || 'Image description'}](image-url)${after}`;
        cursorOffset = selection ? selection.length + 4 : 17;
        break;
      case 'code':
        formattedText = `${before}\`\`\`\n${selection || 'code here'}\n\`\`\`${after}`;
        cursorOffset = selection ? 4 : 9;
        break;
      case 'quote':
        formattedText = `${before}> ${selection}${after}`;
        cursorOffset = 2;
        break;
      case 'bullet':
        formattedText = `${before}- ${selection}${after}`;
        cursorOffset = 2;
        break;
      case 'number':
        formattedText = `${before}1. ${selection}${after}`;
        cursorOffset = 3;
        break;
      case 'table':
        const tableTemplate = `| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Cell 2   | Cell 3   |
| Row 2    | Cell 5   | Cell 6   |`;
        formattedText = `${before}${tableTemplate}${after}`;
        cursorOffset = tableTemplate.length;
        break;
      default:
        return;
    }
    
    setMarkdown(formattedText);
    
    // Set cursor position after update
    setTimeout(() => {
      textarea.focus();
      if (selection.length > 0) {
        textarea.selectionStart = start + cursorOffset;
        textarea.selectionEnd = start + selection.length + cursorOffset;
      } else {
        textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;
      }
    }, 0);
  };
  
  return (
    <div className="tiptap-container">
      {/* Toolbar - Styled to match the Tiptap toolbar */}
      <div className="tiptap-toolbar">
        <div className="tiptap-dropdown">
          <select
            className="tiptap-select"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "p") return;
              insertFormatting(value);
            }}
            value="p"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>
        </div>
        
        {/* Divider */}
        <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>
        
        {/* Basic formatting buttons */}
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => insertFormatting('bold')}
            className="tiptap-btn"
            title="Bold"
          >
            <span className="material-icons">format_bold</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('italic')}
            className="tiptap-btn"
            title="Italic"
          >
            <span className="material-icons">format_italic</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('underline')}
            className="tiptap-btn"
            title="Underline"
          >
            <span className="material-icons">format_underlined</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('strike')}
            className="tiptap-btn"
            title="Strikethrough"
          >
            <span className="material-icons">strikethrough_s</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>

        {/* Lists */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => insertFormatting('bullet')}
            className="tiptap-btn"
            title="Bullet list"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('number')}
            className="tiptap-btn"
            title="Numbered list"
          >
            <span className="material-icons">format_list_numbered</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>

        {/* Insert elements */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => insertFormatting('link')}
            className="tiptap-btn"
            title="Insert link"
          >
            <span className="material-icons">link</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('image')}
            className="tiptap-btn"
            title="Insert image"
          >
            <span className="material-icons">image</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('table')}
            className="tiptap-btn"
            title="Insert table"
          >
            <span className="material-icons">grid_on</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('quote')}
            className="tiptap-btn"
            title="Blockquote"
          >
            <span className="material-icons">format_quote</span>
          </button>

          <button
            type="button"
            onClick={() => insertFormatting('code')}
            className="tiptap-btn"
            title="Code block"
          >
            <span className="material-icons">code</span>
          </button>
          
          {/* Divider before AI Helper */}
          <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* AI Helper button */}
          <MarkdownAIHelper textareaRef={textareaRef} setMarkdown={setMarkdown} />
        </div>

        {/* Preview Toggle */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`tiptap-btn ${isPreview ? "tiptap-btn-active" : ""}`}
            title={isPreview ? "Edit" : "Preview"}
          >
            <span className="material-icons">
              {isPreview ? "edit" : "visibility"}
            </span>
          </button>
        </div>
      </div>
      
      {/* Editor and Preview Panes */}
      <div className="tiptap-content relative">
        {/* Text Editor */}
        <div 
          className={`transition-opacity duration-300 ${isPreview ? 'opacity-0 absolute inset-0 pointer-events-none' : 'opacity-100'}`}
        >
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[400px] p-4 bg-white dark:bg-gray-900 text-black dark:text-white font-mono text-sm resize-none focus:outline-none"
            placeholder="Write your blog post using Markdown..."
          />
        </div>
        
        {/* Preview */}
        {isPreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="tiptap ProseMirror p-4 h-[400px] overflow-auto bg-white dark:bg-gray-900"
            ref={previewRef}
          >
            <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
