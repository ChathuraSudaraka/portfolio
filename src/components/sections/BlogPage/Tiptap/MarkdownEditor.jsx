import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks"; // Add this import to properly handle line breaks
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs"; // Add this import for the AI icon
import MarkdownAIHelper from "./MarkdownAIHelper"; // Import the new AI helper we'll create

// Import the same icons as Notepad for consistency
const MarkdownEditor = ({ initialValue = "", onUpdate }) => {
  const [markdown, setMarkdown] = useState(initialValue || "# Start writing your blog post\n\nUse Markdown to format your content.");
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
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
        // Add line break before if not at start of document or line
        before = ensureLineBreakBefore(before);
        formattedText = `${before}# ${selection || 'Heading 1'}${after}`;
        cursorOffset = selection ? selection.length + 2 : 10;
        break;
      case 'h2':
        before = ensureLineBreakBefore(before);
        formattedText = `${before}## ${selection || 'Heading 2'}${after}`;
        cursorOffset = selection ? selection.length + 3 : 11;
        break;
      case 'h3':
        before = ensureLineBreakBefore(before);
        formattedText = `${before}### ${selection || 'Heading 3'}${after}`;
        cursorOffset = selection ? selection.length + 4 : 12;
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
        textarea.selectionStart = start + cursorOffset - selection.length;
        textarea.selectionEnd = start + cursorOffset;
      } else {
        textarea.selectionStart = start + cursorOffset;
        textarea.selectionEnd = start + cursorOffset;
      }
    }, 0);
  };

  // Ensure there's a line break before adding headings/block elements
  const ensureLineBreakBefore = (text) => {
    if (text === '') return text;
    if (text.endsWith('\n\n')) return text;
    if (text.endsWith('\n')) return text + '\n';
    return text + '\n\n';
  };

  const insertLiteralHash = () => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = markdown.substring(0, start);
    const selection = markdown.substring(start, end);
    const after = markdown.substring(end);
    
    // Insert the escaped hash character (using backslash)
    const formattedText = `${before}\\#${selection}${after}`;
    
    setMarkdown(formattedText);
    
    // Set cursor position after the inserted hash
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + 2; // +2 for the backslash and hash
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
              e.target.value = "p"; // Reset to default after selection
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

        {/* Add a help button in the toolbar */}
        <div className="ml-2">
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="tiptap-btn"
            title="Markdown Help"
          >
            <span className="material-icons">help_outline</span>
          </button>
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
            spellCheck="true"
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
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold my-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold my-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold my-2" {...props} />,
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
      
      {/* Markdown Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowHelpModal(false)}
          ></div>
          <motion.div
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-3xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 99999, position: "relative" }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Markdown Formatting Guide
              </h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowHelpModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[70vh]">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h3>Headings</h3>
                <p>Use # symbols for headings (must be on their own line):</p>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded whitespace-pre-wrap">
                  # Heading 1<br/>
                  ## Heading 2<br/>
                  ### Heading 3
                </pre>
                
                <h3>Text Formatting</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded whitespace-pre-wrap">
                  **Bold text**<br/>
                  _Italic text_<br/>
                  ~~Strikethrough~~
                </pre>
                
                <h3>Lists</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded whitespace-pre-wrap">
                  - Unordered item<br/>
                  - Another item<br/><br/>
                  1. Ordered item<br/>
                  2. Second item
                </pre>
                
                <h3>Links and Images</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded whitespace-pre-wrap">
                  [Link text](https://example.com)<br/>
                  ![Image alt text](image-url.jpg)
                </pre>
                
                {/* <h3>Code</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded whitespace-pre-wrap">
                  `Inline code`<br/><br/>
                  ```javascript<br/>
                  // Code block with syntax highlighting<br/>
                  function hello() {<br/>
                    console.log("Hello world!");<br/>
                  {'}'}<br/>
                  ```
                </pre> */}
                
                <h3>Troubleshooting Headings</h3>
                <p>If your headings aren't working:</p>
                <ul>
                  <li>Make sure the # symbol is at the beginning of a new line</li>
                  <li>Add a space after the # symbols</li>
                  <li>Try adding an empty line before the heading</li>
                </ul>
                
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    <strong>Tip:</strong> In preview mode, you can see how your markdown will appear in the final blog post.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => setShowHelpModal(false)}
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MarkdownEditor;
