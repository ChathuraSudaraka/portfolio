// src/Tiptap.jsx
import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import '../Tiptap/styles.css'; // Add your custom styles if needed

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
  { command: 'toggleBold', icon: 'format_bold' },
  { command: 'toggleItalic', icon: 'format_italic' },
  { command: 'toggleStrike', icon: 'strikethrough_s' },
  { command: 'toggleCode', icon: 'code' },
  // Add more buttons as needed
];

const Tiptap = () => {
  const [editorContent, setEditorContent] = useState(() => {
    const storedContent = localStorage.getItem('editorContent');
    return storedContent ? storedContent : content;
  });

  const editor = useEditor({
    extensions,
    content: editorContent,
    onUpdate({ editor }) {
      const contentToSave = editor.getHTML();
      localStorage.setItem('editorContent', contentToSave);
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
    <div className="mx-auto p-4">
      <div className="flex items-center space-x-2 mb-4">
        {buttonData.map((button, index) => (
          <button
            key={index}
            onClick={() => editor.chain().focus()[button.command]().run()}
            disabled={!editor.can().chain().focus()[button.command]().run()}
            className={`editor-button ${editor.isActive(button.command) || editor.isActive(`${button.command}WithMarks`) ? "is-active" : ""}`}
          >
            <i className="material-icons">{button.icon}</i>
          </button>
        ))}
      </div>

      <div className="border p-4 rounded-md bg-white focus:outline-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;
