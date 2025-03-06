import React, { useState } from "react";

import {
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsTypeStrikethrough,
  BsListUl,
  BsListOl,
  BsCodeSlash,
  BsTable,
  BsArrowCounterclockwise,
  BsArrowClockwise,
  BsTextLeft,
  BsTextCenter,
  BsTextRight,
  BsTextParagraph,
  BsCardImage,
  BsLink45Deg,
  BsCheckSquare,
  BsThreeDots,
} from "react-icons/bs";
import { RiHeading, RiDoubleQuotesL } from "react-icons/ri";
import { BiMinus } from "react-icons/bi";
import {
  MdTableRows,
  MdOutlineAddBox,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import {
  TbTablePlus,
  TbRowInsertBottom,
  TbRowInsertTop,
  TbColumnInsertLeft,
  TbColumnInsertRight,
} from "react-icons/tb";

// Modern color palette for cell backgrounds
const CELL_COLORS = [
  { value: "#f8fafc", label: "White", dark: "#1e293b" },
  { value: "#fee2e2", label: "Red", dark: "#7f1d1d" },
  { value: "#fef9c3", label: "Yellow", dark: "#713f12" },
  { value: "#dcfce7", label: "Green", dark: "#14532d" },
  { value: "#dbeafe", label: "Blue", dark: "#1e3a8a" },
  { value: "#f3e8ff", label: "Purple", dark: "#581c87" },
  { value: "#ffedd5", label: "Orange", dark: "#7c2d12" },
  { value: "#f3f4f6", label: "Gray", dark: "#1f2937" },
];

// Table HTML template for "From template" button
const tableHTML = `<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
      <td>Cell 3</td>
    </tr>
    <tr>
      <td>Cell 4</td>
      <td>Cell 5</td>
      <td>Cell 6</td>
    </tr>
  </tbody>
</table>`;

const MenuBar = ({ editor }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMore, setShowMore] = useState(false);

  if (!editor) {
    return null;
  }

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Helper for button classes
  const buttonClass = (isActive = false) => `
    flex items-center justify-center w-9 h-9 rounded-md transition-all duration-200
    ${
      isActive
        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200"
    }
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
  `;

  // Helper for dropdown classes
  const dropdownClass = `
    absolute z-50 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 
    dark:border-gray-700 overflow-hidden transition-all duration-200 w-48
  `;

  const HeadingDropdown = () => (
    <div className={`${dropdownClass} left-0`}>
      <div className="py-1">
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => {
              editor.chain().focus().toggleHeading({ level }).run();
              setActiveDropdown(null);
            }}
            className={`flex w-full items-center px-3 py-2 text-sm ${
              editor.isActive("heading", { level })
                ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <span className="w-5 h-5 mr-2 flex items-center justify-center">
              H{level}
            </span>
            Heading {level}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            editor.chain().focus().setParagraph().run();
            setActiveDropdown(null);
          }}
          className={`flex w-full items-center px-3 py-2 text-sm ${
            editor.isActive("paragraph")
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <span className="w-5 h-5 mr-2 flex items-center justify-center">
            <BsTextParagraph />
          </span>
          Paragraph
        </button>
      </div>
    </div>
  );

  return (
    <div className="editor-menubar bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-lg shadow-sm">
      {/* Main toolbar */}
      <div className="flex flex-wrap items-center p-1.5 gap-0.5">
        {/* History controls */}
        <div className="flex items-center border-r border-gray-200 dark:border-gray-700 pr-1 mr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={`${buttonClass()} ${
              !editor.can().undo() ? "opacity-40 cursor-not-allowed" : ""
            }`}
            title="Undo"
          >
            <BsArrowCounterclockwise size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={`${buttonClass()} ${
              !editor.can().redo() ? "opacity-40 cursor-not-allowed" : ""
            }`}
            title="Redo"
          >
            <BsArrowClockwise size={16} />
          </button>
        </div>

        {/* Text formatting - First section */}
        <div className="flex items-center mr-1 border-r border-gray-200 dark:border-gray-700 pr-1">
          {/* Heading dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("heading")}
              className={buttonClass(
                activeDropdown === "heading" || editor.isActive("heading")
              )}
              title="Heading"
            >
              <RiHeading size={18} />
            </button>
            {activeDropdown === "heading" && <HeadingDropdown />}
          </div>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={buttonClass(editor.isActive("bold"))}
            title="Bold"
          >
            <BsTypeBold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={buttonClass(editor.isActive("italic"))}
            title="Italic"
          >
            <BsTypeItalic size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={buttonClass(editor.isActive("strike"))}
            title="Strikethrough"
          >
            <BsTypeStrikethrough size={16} />
          </button>
        </div>

        {/* Lists and indentation */}
        <div className="flex items-center mr-1 border-r border-gray-200 dark:border-gray-700 pr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={buttonClass(editor.isActive("bulletList"))}
            title="Bullet List"
          >
            <BsListUl size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={buttonClass(editor.isActive("orderedList"))}
            title="Numbered List"
          >
            <BsListOl size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={buttonClass(editor.isActive("taskList"))}
            title="Task List"
          >
            <BsCheckSquare size={16} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center mr-1 border-r border-gray-200 dark:border-gray-700 pr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={buttonClass(editor.isActive({ textAlign: "left" }))}
            title="Align Left"
          >
            <BsTextLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={buttonClass(editor.isActive({ textAlign: "center" }))}
            title="Align Center"
          >
            <BsTextCenter size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={buttonClass(editor.isActive({ textAlign: "right" }))}
            title="Align Right"
          >
            <BsTextRight size={16} />
          </button>
        </div>

        {/* Insert elements */}
        <div className="flex items-center mr-1 border-r border-gray-200 dark:border-gray-700 pr-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={buttonClass(editor.isActive("codeBlock"))}
            title="Code Block"
          >
            <BsCodeSlash size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter image URL");
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            className={buttonClass()}
            title="Insert Image"
          >
            <BsCardImage size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("Enter link URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            className={buttonClass(editor.isActive("link"))}
            title="Insert Link"
          >
            <BsLink45Deg size={18} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={buttonClass(editor.isActive("blockquote"))}
            title="Blockquote"
          >
            <RiDoubleQuotesL size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={buttonClass()}
            title="Horizontal Rule"
          >
            <BiMinus size={18} />
          </button>
        </div>

        {/* Table dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("table")}
            className={buttonClass(
              editor.isActive("table") || activeDropdown === "table"
            )}
            title="Table"
          >
            <BsTable size={16} />
          </button>

          {activeDropdown === "table" && (
            <div className={`${dropdownClass} w-56`}>
              <div className="py-1">
                {/* Table creation section */}
                <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Create
                </div>
                <button
                  type="button"
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run();
                    setActiveDropdown(null);
                  }}
                  className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <TbTablePlus size={18} />
                  </span>
                  New table
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .insertContent(tableHTML, {
                        parseOptions: { preserveWhitespace: false },
                      })
                      .run();
                    setActiveDropdown(null);
                  }}
                  className="flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MdTableRows size={18} />
                  </span>
                  From template
                </button>

                {/* Row operations */}
                <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">
                  Rows
                </div>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().addRowBefore().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().addRowBefore()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().addRowBefore()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-green-600 dark:text-green-400">
                    <TbRowInsertTop size={18} />
                  </span>
                  Add row above
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().addRowAfter().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().addRowAfter()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().addRowAfter()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-green-600 dark:text-green-400">
                    <TbRowInsertBottom size={18} />
                  </span>
                  Add row below
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().deleteRow().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().deleteRow()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().deleteRow()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-red-600 dark:text-red-400">
                    <MdOutlineDeleteOutline size={18} />
                  </span>
                  Delete row
                </button>

                {/* Column operations */}
                <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">
                  Columns
                </div>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().addColumnBefore().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().addColumnBefore()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().addColumnBefore()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-green-600 dark:text-green-400">
                    <TbColumnInsertLeft size={18} />
                  </span>
                  Add column left
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().addColumnAfter().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().addColumnAfter()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().addColumnAfter()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-green-600 dark:text-green-400">
                    <TbColumnInsertRight size={18} />
                  </span>
                  Add column right
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().deleteColumn().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().deleteColumn()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().deleteColumn()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-red-600 dark:text-red-400">
                    <MdOutlineDeleteOutline size={18} />
                  </span>
                  Delete column
                </button>

                {/* Cell operations */}
                <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">
                  Cell actions
                </div>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().mergeCells().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().mergeCells()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().mergeCells()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <MdOutlineAddBox size={18} />
                  </span>
                  Merge cells
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().splitCell().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().splitCell()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().splitCell()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <BsTable size={16} />
                  </span>
                  Split cell
                </button>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().toggleHeaderCell().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().toggleHeaderCell()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    !editor.can().toggleHeaderCell()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <RiHeading size={18} />
                  </span>
                  Toggle header cell
                </button>

                {/* Cell colors */}
                <div className="px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">
                  Cell colors
                </div>
                <div className="p-3 grid grid-cols-4 gap-1">
                  {CELL_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => {
                        const colorValue =
                          document.documentElement.classList.contains("dark")
                            ? color.dark
                            : color.value;
                        editor
                          .chain()
                          .focus()
                          .setCellAttribute("backgroundColor", colorValue)
                          .run();
                        setActiveDropdown(null);
                      }}
                      disabled={
                        !editor
                          .can()
                          .setCellAttribute("backgroundColor", color.value)
                      }
                      className="w-6 h-6 rounded transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor:
                          document.documentElement.classList.contains("dark")
                            ? color.dark
                            : color.value,
                      }}
                      title={color.label}
                    />
                  ))}
                </div>

                {/* Table actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 mt-2"></div>
                <button
                  type="button"
                  onClick={() => {
                    editor.chain().focus().deleteTable().run();
                    setActiveDropdown(null);
                  }}
                  disabled={!editor.can().deleteTable()}
                  className={`flex w-full items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 ${
                    !editor.can().deleteTable()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <span className="w-5 h-5 mr-2 flex items-center justify-center">
                    <MdOutlineDeleteOutline size={18} />
                  </span>
                  Delete table
                </button>
              </div>
            </div>
          )}
        </div>

        {/* More options button */}
        <button
          type="button"
          onClick={() => setShowMore(!showMore)}
          className={buttonClass(showMore)}
          title="More options"
        >
          <BsThreeDots size={16} />
        </button>
      </div>

      {/* Secondary toolbar for more options - visible when showMore is true */}
      {showMore && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-1.5 flex flex-wrap gap-0.5 items-center bg-gray-50 dark:bg-gray-900/30">
          {/* Additional formatting options can be placed here */}
          <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
            Additional options
          </div>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={buttonClass(editor.isActive("superscript"))}
              title="Superscript"
            >
              x<sup>2</sup>
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={buttonClass(editor.isActive("subscript"))}
              title="Subscript"
            >
              x<sub>2</sub>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
