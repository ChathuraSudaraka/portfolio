import "./tiptap.scss";

import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import MenuBar from "./menubar";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

const TipTapEditor = ({ content = "", onUpdate = () => {} }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      CustomTableCell,
    ],
    content: content || `<p>Write your blog content here...</p>`,
    onUpdate: ({ editor }) => {
      // Call the parent's onUpdate function with the HTML content
      onUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none",
      },
    },
  });

  // Update content when prop changes
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <>
      <MenuBar editor={editor} />
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-lg p-2">
        <EditorContent 
          editor={editor}
          className="tiptap ProseMirror prose dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:my-2 prose-p:leading-relaxed
                  prose-a:text-blue-600 dark:prose-a:text-blue-400
                  prose-img:rounded-lg prose-img:my-3
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                  prose-blockquote:my-3 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
                  prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:rounded prose-code:p-0.5
                  prose-pre:bg-gray-900 dark:prose-pre:bg-gray-900 prose-pre:text-white prose-pre:rounded-lg"
        />
      </div>
    </>
  );
};

export default TipTapEditor;
