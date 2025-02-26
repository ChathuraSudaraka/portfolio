import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

const MarkdownEditor = ({ initialValue = "", onUpdate }) => {
  const [markdown, setMarkdown] = useState(initialValue || "# Start writing your blog post\n\nUse Markdown to format your content.");
  const [isPreview, setIsPreview] = useState(false);
  
  useEffect(() => {
    // Save to localStorage when markdown changes
    if (markdown) {
      localStorage.setItem("markdownContent", markdown);
      
      if (onUpdate) {
        onUpdate(markdown);
      }
    }
  }, [markdown, onUpdate]);
  
  // Load from localStorage on initial render
  useEffect(() => {
    const savedContent = localStorage.getItem("markdownContent");
    if (savedContent && !initialValue) {
      setMarkdown(savedContent);
    }
  }, [initialValue]);
  
  return (
    <div className="markdown-editor-container rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={() => {
              const textarea = document.getElementById("markdown-textarea");
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const selection = markdown.substring(start, end);
              const newText = markdown.substring(0, start) + `**${selection}**` + markdown.substring(end);
              setMarkdown(newText);
              textarea.focus();
              textarea.selectionStart = start + 2;
              textarea.selectionEnd = start + 2 + selection.length;
            }}
          >
            Bold
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={() => {
              const textarea = document.getElementById("markdown-textarea");
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const selection = markdown.substring(start, end);
              const newText = markdown.substring(0, start) + `*${selection}*` + markdown.substring(end);
              setMarkdown(newText);
              textarea.focus();
              textarea.selectionStart = start + 1;
              textarea.selectionEnd = start + 1 + selection.length;
            }}
          >
            Italic
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={() => {
              const textarea = document.getElementById("markdown-textarea");
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const selection = markdown.substring(start, end);
              const newText = markdown.substring(0, start) + `[${selection}](url)` + markdown.substring(end);
              setMarkdown(newText);
              textarea.focus();
              textarea.selectionStart = start + selection.length + 3;
              textarea.selectionEnd = start + selection.length + 6;
            }}
          >
            Link
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={() => {
              const textarea = document.getElementById("markdown-textarea");
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const selection = markdown.substring(start, end);
              const newText = markdown.substring(0, start) + `![${selection}](image-url)` + markdown.substring(end);
              setMarkdown(newText);
              textarea.focus();
              textarea.selectionStart = start + selection.length + 5;
              textarea.selectionEnd = start + selection.length + 14;
            }}
          >
            Image
          </button>
          <button
            type="button"
            className="px-3 py-1.5 text-xs font-medium rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            onClick={() => {
              const textarea = document.getElementById("markdown-textarea");
              const start = textarea.selectionStart;
              const selection = markdown.substring(start, start);
              const newText = markdown.substring(0, start) + "```\n// code here\n```" + markdown.substring(start);
              setMarkdown(newText);
              textarea.focus();
              textarea.selectionStart = start + 4;
              textarea.selectionEnd = start + 15;
            }}
          >
            Code
          </button>
        </div>
        <button
          type="button"
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
            isPreview 
              ? "bg-purple-500 text-white" 
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setIsPreview(!isPreview)}
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>
      
      {/* Editor and Preview Panes */}
      <div className="markdown-content-container relative">
        {/* Text Editor */}
        <div 
          className={`transition-opacity duration-300 ${isPreview ? 'opacity-0 absolute inset-0 pointer-events-none' : 'opacity-100'}`}
        >
          <textarea
            id="markdown-textarea"
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
            className="markdown-preview p-6 h-[400px] overflow-auto bg-white dark:bg-gray-900"
          >
            <ReactMarkdown
              className="prose prose-sm sm:prose max-w-none dark:prose-invert"
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;
