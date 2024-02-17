// src/Tiptap.jsx
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import "../Tiptap/styles.css";

const extensions = [
  Color,
  TextStyle,
  StarterKit,
  Underline,
  BulletList,
  OrderedList,
  CodeBlock,
  Highlight,
  TextAlign.configure({ types: ["heading", "paragraph"] }), // Specify the allowed node types
].map((extension) => (extension.name ? extension.configure() : extension));

const buttonData = [
  { command: "toggleBold", icon: "format_bold" },
  { command: "toggleItalic", icon: "format_italic" },
  { command: "toggleStrike", icon: "strikethrough_s" },
  { command: "toggleCode", icon: "code" },
  { command: "toggleUnderline", icon: "format_underlined" },
  { command: "toggleBulletList", icon: "format_list_bulleted" },
  { command: "toggleOrderedList", icon: "format_list_numbered" },
  { command: "toggleCodeBlock", icon: "integration_instructions" },
  { command: "toggleHighlight", icon: "highlight" },
  { command: "undo", icon: "undo" },
  { command: "redo", icon: "redo" },
  { command: "toggleBlockquote", icon: "format_quote" },
  // Add more buttons as needed
];

const fontData = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Courier New", value: "Courier New, monospace" },
  // Add more fonts as needed
];

const fontSizes = [
  { name: "Small", value: "small" },
  { name: "Medium", value: "medium" },
  { name: "Large", value: "large" },
  // Add more fonts as needed
];

const Tiptap = () => {
  const [editorContent, setEditorContent] = useState(() => {
    const storedContent = localStorage.getItem("editorContent");
    return storedContent ? storedContent : content;
  });

  const editor = useEditor({
    extensions,
    content: editorContent,
    onUpdate({ editor }) {
      const contentToSave = editor.getHTML();
      localStorage.setItem("editorContent", contentToSave);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(editorContent);
    }
  }, [editorContent, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen dark:bg-blog-bg p-4 pb-7 flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        {/* FontSelect */}
        <FontSelect editor={editor} fonts={fontData} />
        {/* Font Size Select */}
        <FontSizeSelect editor={editor} fontSizes={fontSizes} />
        {/* AlignButton Start */}
        <AlignButton
          editor={editor}
          alignment="left"
          icon="format_align_left"
        />
        <AlignButton
          editor={editor}
          alignment="center"
          icon="format_align_center"
        />
        <AlignButton
          editor={editor}
          alignment="right"
          icon="format_align_right"
        />
        <AlignButton
          editor={editor}
          alignment="justify"
          icon="format_align_justify"
        />
        {/* AlignButton End */}
        {buttonData.map((button, index) => (
          <button
            key={index}
            onClick={() => editor.chain().focus()[button.command]().run()}
            disabled={!editor.can().chain().focus()[button.command]().run()}
            className={`editor-button ${
              editor.isActive(button.command) ||
              editor.isActive(`${button.command}WithMarks`)
                ? "is-active"
                : ""
            }`}
          >
            <i className="material-icons">{button.icon}</i>
          </button>
        ))}
      </div>

      <div className="border border-black dark:border-border-color rounded-lg pl-4  pr-4 bg-white dark:bg-gray-400 focus:outline-none flex-grow">
        <div className="prose dark:prose-dark max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Tiptap;

// Align Button Component
export const AlignButton = ({ editor, alignment, icon }) => {
  if (!editor || !editor.can || !editor.chain) {
    return null;
  }

  return (
    <button
      onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
      disabled={!editor.can().chain().focus().setTextAlign(alignment).run()}
      className={`editor-button ${
        editor.isActive({ textAlign: alignment }) ? "is-active" : ""
      }`}
    >
      <i className="material-icons">{icon}</i>
    </button>
  );
};

// Font Select Component
export const FontSelect = ({ editor, fonts }) => {
  if (!editor || !editor.can || !editor.chain) {
    return null;
  }

  const handleChange = (selectedFont) => {
    editor.chain().focus().setFontFamily(selectedFont).run();
  };

  return (
    <div className="font-select-container">
      <select
        className="font-select"
        onChange={(e) => handleChange(e.target.value)}
        value={editor.isActive({ fontFamily: fonts.map((font) => font.value) })}
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Font Size Select Component
export const FontSizeSelect = ({ editor, fontSizes }) => {
  if (!editor || !editor.can || !editor.chain) {
    return null;
  }

  const selectedSize = editor.isActive({
    fontSize: fontSizes.map((size) => size.value),
  });

  const handleChange = (selectedValue) => {
    editor.chain().focus().setFontSize(selectedValue).run();
  };

  return (
    <div className="font-size-select-container">
      <select
        className="font-select"
        onChange={(e) => handleChange(e.target.value)}
        value={selectedSize ? selectedSize.fontSize : ""}
      >
        {fontSizes.map((size) => (
          <option key={size.value} value={size.value}>
            {size.name}
          </option>
        ))}
      </select>
    </div>
  );
};
