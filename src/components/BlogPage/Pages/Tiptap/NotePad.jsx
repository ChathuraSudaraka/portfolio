// src/Tiptap.jsx
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import "../Tiptap/styles.css";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const buttonData = [
  { command: "toggleBold", icon: "format_bold" },
  { command: "toggleItalic", icon: "format_italic" },
  { command: "toggleStrike", icon: "strikethrough_s" },
  { command: "toggleCode", icon: "code" },
  // Add more buttons as needed
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

      <div className="border border-black dark:border-border-color rounded-lg pl-4 bg-white dark:bg-gray-400 focus:outline-none flex-grow">
        <div className="prose dark:prose-dark max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
