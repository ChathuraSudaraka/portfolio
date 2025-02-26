import "../Tiptap/styles.css";
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
import FontSize from "tiptap-extension-font-size";

const extensions = [
  Color,
  TextStyle,
  StarterKit,
  Underline,
  BulletList,
  OrderedList,
  CodeBlock,
  Highlight,
  FontSize,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
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
];

const fontData = [
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Courier New", value: "Courier New, monospace" },
];

const fontSizes = [
  { name: "10pt", value: "10pt" },
  { name: "12pt", value: "12pt" },
  { name: "14pt", value: "14pt" },
  { name: "16pt", value: "16pt" },
  { name: "18pt", value: "18pt" },
  { name: "20pt", value: "20pt" },
  { name: "22pt", value: "22pt" },
  { name: "24pt", value: "24pt" },
  { name: "26pt", value: "26pt" },
  { name: "28pt", value: "28pt" },
  { name: "30pt", value: "30pt" },
  { name: "32pt", value: "32pt" },
  { name: "34pt", value: "34pt" },
  { name: "36pt", value: "36pt" },
];

// Update the Tiptap component to accept onUpdate prop
const Tiptap = ({ onUpdate }) => {
  const storedContent = localStorage.getItem("editorContent");
  const initialContent = storedContent ? storedContent : "<p>Write a Blog</p>";

  const [editorContent, setEditorContent] = useState(initialContent);

  const editor = useEditor({
    extensions,
    content: editorContent,
    onUpdate({ editor }) {
      const contentToSave = editor.getHTML();
      localStorage.setItem("editorContent", contentToSave);
      
      // Call the onUpdate prop if provided
      if (onUpdate) {
        onUpdate(contentToSave);
      }
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
    <div className="dark:bg-blog-bg p-4 pb-7">
      <div className="pb-4">
        {/* FontSelect and FontSizeSelect */}
        <FontSelect editor={editor} fonts={fontData} />
        <FontSizeSelect editor={editor} fontSizes={fontSizes} />

        {/* AlignButtons */}
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

        {/* ToggleButtons in a single row */}
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

      <div className="min-h-screen border border-black dark:border-border-color rounded-lg p-4 bg-white dark:bg-gray-400 focus:outline-none flex-grow">
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
    if (selectedValue) {
      editor.chain().focus().setFontSize(selectedValue).run();
    } else {
      // If no size is selected, you might want to handle this case accordingly
      // For example, you can unset the font size.
      editor.chain().focus().unsetFontSize().run();
    }
  };

  return (
    <select
      className="font-select" // Correct class name here
      onChange={(e) => handleChange(e.target.value)}
      value={selectedSize ? selectedSize.fontSize : ""}
    >
      {fontSizes.map((size) => (
        <option key={size.value} value={size.value}>
          {size.name}
        </option>
      ))}
    </select>
  );
};
