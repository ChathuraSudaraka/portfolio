import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Typography from '@tiptap/extension-typography';
import CharacterCount from '@tiptap/extension-character-count';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Dropcursor from '@tiptap/extension-dropcursor';
import FontFamily from '@tiptap/extension-font-family';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';

// Import the SCSS stylesheet
import './tiptap.scss';

// Simplified MenuBar component with the most essential formatting tools
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 mb-4 border-b dark:border-gray-700">
      {/* Text formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Bold"
        type="button"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Italic"
        type="button"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Underline"
        type="button"
      >
        <u>U</u>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('subscript') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Subscript"
        type="button"
      >
        <span>X<sub>2</sub></span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('superscript') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Superscript"
        type="button"
      >
        <span>X<sup>2</sup></span>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('highlight') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Highlight"
        type="button"
      >
        <span className="bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 px-0.5">H</span>
      </button>
      
      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Heading 1"
        type="button"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Heading 2"
        type="button"
      >
        H2
      </button>
      
      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Bullet List"
        type="button"
      >
        •
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('orderedList') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Numbered List"
        type="button"
      >
        1.
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('taskList') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Task List"
        type="button"
      >
        ✓
      </button>
      
      {/* Other formatting options */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Code Block"
        type="button"
      >
        {'</>'}
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Horizontal Rule"
        type="button"
      >
        ―
      </button>
      <button
        onClick={addImage}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        title="Add Image"
        type="button"
      >
        🖼️
      </button>
      <button
        onClick={addLink}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Add Link"
        type="button"
      >
        🔗
      </button>
      <button
        onClick={addTable}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive('table') ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Add Table"
        type="button"
      >
        📋
      </button>
      
      {/* Text alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Align Left"
        type="button"
      >
        ⬅️
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Align Center"
        type="button"
      >
        ⬆️
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
          editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        title="Align Right"
        type="button"
      >
        ➡️
      </button>
      
      {/* Font Family */}
      <select
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
        className="p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm"
        title="Font Family"
      >
        <option value="">Font</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Inter">Inter</option>
        <option value="monospace">Monospace</option>
        <option value="serif">Serif</option>
      </select>
    </div>
  );
};

const TipTapEditor = ({ onUpdate, content = '' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        document: false, // We're including Document separately
        paragraph: false, // We're including Paragraph separately
        heading: false, // We're including Heading separately
        codeBlock: false, // We're including CodeBlock separately
        horizontalRule: false, // We're including HorizontalRule separately
        bulletList: false, // We're including BulletList separately
        orderedList: false, // We're including OrderedList separately
      }),
      // Core extensions
      Document,
      Paragraph,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      BulletList.configure({
        keepMarks: true,
        keepAttributes: true,
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      // Adding all extensions
      CodeBlock,
      Dropcursor,
      HorizontalRule,
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Color,
      Typography,
      Underline,
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: true,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
      Placeholder.configure({
        placeholder: 'Write something amazing...',
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate?.(html);
      localStorage.setItem('editorContent', html);
    },
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  // Safe access to character count
  const characterCount = editor.storage.characterCount?.characters?.() || 0;
  const characterLimit = editor.storage.characterCount?.options?.limit || 10000;

  return (
    <div className="tiptap-editor w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <MenuBar editor={editor} />
      <div className="p-4 min-h-[300px] prose dark:prose-invert max-w-none">
        <EditorContent editor={editor} />
      </div>
      <div className="p-2 text-sm text-gray-500 border-t dark:border-gray-700 flex justify-between">
        <span>{editor.getHTML().length} characters</span>
        <span>{characterCount}/{characterLimit} characters</span>
      </div>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-1 p-1 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            type="button"
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            type="button"
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('highlight') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            type="button"
          >
            Highlight
          </button>
          <button
            onClick={() => editor.chain().focus().toggleLink().run()}
            className={`p-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
              editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-700' : ''
            }`}
            type="button"
          >
            Link
          </button>
        </div>
      </BubbleMenu>
    </div>
  );
};

export default TipTapEditor;