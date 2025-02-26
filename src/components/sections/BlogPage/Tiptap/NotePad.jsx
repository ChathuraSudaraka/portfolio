import { useState, useEffect, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "tiptap-extension-font-size";
import "./styles.css";
import AIHelper from "./AIHelper";
import { BsStars } from "react-icons/bs";

const extensions = [
  Color.configure(),
  TextStyle,
  StarterKit,
  ListItem,
  Underline,
  BulletList,
  OrderedList,
  CodeBlock,
  Highlight.configure({ multicolor: true }),
  FontSize,
  Link.configure({
    openOnClick: false,
    linkOnPaste: true,
  }),
  Image.configure({
    allowBase64: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  FontFamily.configure({
    types: ["textStyle"],
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const fontFamilies = [
  { name: "Default", value: "Inter" },
  { name: "Arial", value: "Arial, sans-serif" },
  { name: "Times New Roman", value: "Times New Roman, serif" },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Courier New", value: "Courier New, monospace" },
];

const fontSizes = [
  { name: "Default", value: "16px" },
  { name: "Small", value: "14px" },
  { name: "Medium", value: "18px" },
  { name: "Large", value: "22px" },
  { name: "X-Large", value: "26px" },
  { name: "XX-Large", value: "32px" },
];

const colors = [
  { name: "Black", value: "#000000" },
  { name: "Dark Gray", value: "#333333" },
  { name: "Gray", value: "#666666" },
  { name: "Light Gray", value: "#999999" },
  { name: "Primary", value: "#3275F8" },
  { name: "Secondary", value: "#7c3aed" },
  { name: "Red", value: "#e11d48" },
  { name: "Green", value: "#16a34a" },
  { name: "Blue", value: "#2563eb" },
  { name: "Yellow", value: "#eab308" },
  { name: "Purple", value: "#9333ea" },
  { name: "Pink", value: "#db2777" },
];

const Tiptap = ({ onUpdate }) => {
  const storedContent = localStorage.getItem("editorContent");
  const initialContent = storedContent ? storedContent : "<p>Write a Blog</p>";
  const [editorContent, setEditorContent] = useState(initialContent);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions,
    content: initialContent,
    onUpdate({ editor }) {
      const contentToSave = editor.getHTML();
      localStorage.setItem("editorContent", contentToSave);

      if (onUpdate) {
        onUpdate(contentToSave);
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose focus:outline-none max-w-none text-black dark:text-white",
      },
    },
  });

  // Save a reference to the editor
  useEffect(() => {
    if (editor) {
      editorRef.current = editor;
    }
  }, [editor]);

  // Load content from localStorage on mount
  useEffect(() => {
    if (editor && storedContent) {
      editor.commands.setContent(storedContent);
    }
  }, [editor]);

  // Cleanup local storage on component unmount
  useEffect(() => {
    return () => {
      // Only clear when navigating away, not on refresh
      const beforeUnloadListener = (event) => {
        event.preventDefault();
        return "";
      };
      window.addEventListener("beforeunload", beforeUnloadListener);

      return () => {
        window.removeEventListener("beforeunload", beforeUnloadListener);
      };
    };
  }, []);

  if (!editor) {
    return <div className="tiptap-loading">Loading editor...</div>;
  }

  // Extract the current text alignment value for the active element
  const getActiveAlignment = () => {
    const attrs =
      editor.getAttributes("paragraph") || editor.getAttributes("heading");
    return attrs.textAlign || "left";
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageModal(false);
    }
  };

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setShowLinkModal(false);
    }
  };

  // Define the addTable function
  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  // Get current alignment
  const currentAlignment = getActiveAlignment();

  // Add this function to prevent form submission
  const handleButtonClick = (callback) => (e) => {
    // Prevent the event from bubbling up to the form
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <div className="tiptap-container bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="tiptap-toolbar p-2 flex flex-wrap items-center gap-1 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {/* Format dropdown */}
        <div className="tiptap-dropdown">
          <select
            className="tiptap-select"
            value={
              editor.isActive("heading")
                ? `h${
                    editor.isActive("heading", { level: 1 })
                      ? 1
                      : editor.isActive("heading", { level: 2 })
                      ? 2
                      : editor.isActive("heading", { level: 3 })
                      ? 3
                      : 4
                  }`
                : "p"
            }
            onChange={(e) => {
              e.preventDefault();
              const value = e.target.value;
              if (value === "p") {
                editor.chain().focus().setParagraph().run();
              } else {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: parseInt(value.replace("h", "")) })
                  .run();
              }
            }}
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </select>
        </div>

        {/* Font family */}
        <div className="tiptap-dropdown">
          <select
            className="tiptap-select"
            onChange={(e) => {
              editor.chain().focus().setFontFamily(e.target.value).run();
            }}
          >
            {fontFamilies.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font size */}
        <div className="tiptap-dropdown">
          <select
            className="tiptap-select"
            onChange={(e) => {
              editor.chain().focus().setFontSize(e.target.value).run();
            }}
          >
            {fontSizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.name}
              </option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>

        {/* Text color */}
        <div className="relative tiptap-dropdown">
          <select
            className="tiptap-select"
            onChange={(e) => {
              editor.chain().focus().setColor(e.target.value).run();
            }}
            style={{
              paddingLeft: "28px",
            }}
          >
            <option value="" disabled>
              Color
            </option>
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.name}
              </option>
            ))}
          </select>
          <div
            className="tiptap-color-indicator"
            style={{
              backgroundColor:
                editor.getAttributes("textStyle").color || "#000000",
            }}
          ></div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>

        {/* Basic formatting buttons */}
        <div className="flex flex-wrap gap-1">
          <button
            type="button" // Add type="button" to all buttons
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleBold().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("bold") ? "tiptap-btn-active" : ""
            }`}
            title="Bold"
          >
            <span className="material-icons">format_bold</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleItalic().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("italic") ? "tiptap-btn-active" : ""
            }`}
            title="Italic"
          >
            <span className="material-icons">format_italic</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleUnderline().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("underline") ? "tiptap-btn-active" : ""
            }`}
            title="Underline"
          >
            <span className="material-icons">format_underlined</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleStrike().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("strike") ? "tiptap-btn-active" : ""
            }`}
            title="Strikethrough"
          >
            <span className="material-icons">strikethrough_s</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>

        {/* Text alignment */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().setTextAlign("left").run()
            )}
            className={`tiptap-btn ${
              currentAlignment === "left" ? "tiptap-btn-active" : ""
            }`}
            title="Align left"
          >
            <span className="material-icons">format_align_left</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().setTextAlign("center").run()
            )}
            className={`tiptap-btn ${
              currentAlignment === "center" ? "tiptap-btn-active" : ""
            }`}
            title="Align center"
          >
            <span className="material-icons">format_align_center</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().setTextAlign("right").run()
            )}
            className={`tiptap-btn ${
              currentAlignment === "right" ? "tiptap-btn-active" : ""
            }`}
            title="Align right"
          >
            <span className="material-icons">format_align_right</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().setTextAlign("justify").run()
            )}
            className={`tiptap-btn ${
              currentAlignment === "justify" ? "tiptap-btn-active" : ""
            }`}
            title="Justify"
          >
            <span className="material-icons">format_align_justify</span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>

        {/* Lists */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleBulletList().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("bulletList") ? "tiptap-btn-active" : ""
            }`}
            title="Bullet list"
          >
            <span className="material-icons">format_list_bulleted</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleOrderedList().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("orderedList") ? "tiptap-btn-active" : ""
            }`}
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
            onClick={handleButtonClick(() => setShowLinkModal(true))}
            className={`tiptap-btn ${
              editor.isActive("link") ? "tiptap-btn-active" : ""
            }`}
            title="Insert link"
          >
            <span className="material-icons">link</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() => setShowImageModal(true))}
            className="tiptap-btn"
            title="Insert image"
          >
            <span className="material-icons">image</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() => addTable())}
            className={`tiptap-btn ${
              editor.isActive("table") ? "tiptap-btn-active" : ""
            }`}
            title="Insert table"
          >
            <span className="material-icons">grid_on</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleBlockquote().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("blockquote") ? "tiptap-btn-active" : ""
            }`}
            title="Blockquote"
          >
            <span className="material-icons">format_quote</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().toggleCodeBlock().run()
            )}
            className={`tiptap-btn ${
              editor.isActive("codeBlock") ? "tiptap-btn-active" : ""
            }`}
            title="Code block"
          >
            <span className="material-icons">code</span>
          </button>

          {/* Divider before AI Helper */}
          <div className="h-6 w-px mx-1 bg-gray-300 dark:bg-gray-600"></div>
          
          {/* AI Helper button now matches the other toolbar buttons */}
          <AIHelper editor={editor} />
        </div>

        {/* History */}
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().undo().run()
            )}
            disabled={!editor.can().undo()}
            className="tiptap-btn"
            title="Undo"
          >
            <span className="material-icons">undo</span>
          </button>

          <button
            type="button"
            onClick={handleButtonClick(() =>
              editor.chain().focus().redo().run()
            )}
            disabled={!editor.can().redo()}
            className="tiptap-btn"
            title="Redo"
          >
            <span className="material-icons">redo</span>
          </button>
        </div>
      </div>

      {/* Editor Content - Add text color classes */}
      <div className="tiptap-content text-black dark:text-white p-2 sm:p-4">
        <EditorContent editor={editor} className="px-1 sm:px-2" />
      </div>

      {/* Link Modal - Fixed z-index */}
      {showLinkModal && (
        <div className="tiptap-modal fixed inset-0 flex items-center justify-center z-[2000]">
          <div
            className="tiptap-modal-overlay absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowLinkModal(false)}
          ></div>
          <div className="tiptap-modal-content relative z-10">
            <h3>Insert Link</h3>
            <input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="tiptap-input"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setLink();
                }
              }}
            />
            <div className="tiptap-modal-actions">
              <button
                className="tiptap-btn-secondary"
                onClick={() => setShowLinkModal(false)}
              >
                Cancel
              </button>
              <button className="tiptap-btn-primary" onClick={setLink}>
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal - Fixed z-index */}
      {showImageModal && (
        <div className="tiptap-modal fixed inset-0 flex items-center justify-center z-[2000]">
          <div
            className="tiptap-modal-overlay absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowImageModal(false)}
          ></div>
          <div className="tiptap-modal-content relative z-10">
            <h3>Insert Image</h3>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="tiptap-input"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addImage();
                }
              }}
            />
            <div className="tiptap-modal-actions">
              <button
                className="tiptap-btn-secondary"
                onClick={() => setShowImageModal(false)}
              >
                Cancel
              </button>
              <button className="tiptap-btn-primary" onClick={addImage}>
                Insert Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tiptap;
