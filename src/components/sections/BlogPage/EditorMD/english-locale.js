/**
 * English language pack for Editor.md
 */
(function() {
    var factory = function(exports) {
        var lang = {
            name: "en",
            description: "Open source online Markdown editor.",
            tocTitle: "Table of Contents",
            toolbar: {
                undo: "Undo(Ctrl+Z)",
                redo: "Redo(Ctrl+Y)",
                bold: "Bold",
                del: "Strikethrough",
                italic: "Italic",
                quote: "Block quote",
                ucwords: "Words first letter convert to uppercase",
                uppercase: "Selection text convert to uppercase",
                lowercase: "Selection text convert to lowercase",
                h1: "Heading 1",
                h2: "Heading 2",
                h3: "Heading 3",
                h4: "Heading 4",
                h5: "Heading 5",
                h6: "Heading 6",
                "list-ul": "Unordered list",
                "list-ol": "Ordered list",
                hr: "Horizontal rule",
                link: "Link",
                "reference-link": "Reference link",
                image: "Image",
                code: "Code inline",
                "preformatted-text": "Preformatted text / Code block (Tab indent)",
                "code-block": "Code block (Multi-languages)",
                table: "Tables",
                datetime: "Datetime",
                emoji: "Emoji",
                "html-entities": "HTML Entities",
                pagebreak: "Page break",
                "goto-line": "Go to line",
                watch: "Unwatch",
                unwatch: "Watch",
                preview: "HTML Preview (Press Shift + ESC exit)",
                fullscreen: "Fullscreen (Press ESC exit)",
                clear: "Clear",
                search: "Search",
                help: "Help",
                info: "About",
                "ai-assistant": "AI Assistant"  // Adding AI Assistant translation
            },
            buttons: {
                enter: "Enter",
                cancel: "Cancel",
                close: "Close"
            },
            dialog: {
                // Additional dialog content
            }
        };
        
        exports.defaults.lang = lang;
    };
    
    // Handle different module systems
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module
        define(["editormd"], function(editormd) {
            factory(editormd);
        });
    } else if (typeof module === "object" && module.exports) {
        // Node/CommonJS
        module.exports = factory;
    } else {
        // Browser globals
        factory(window.editormd);
    }
})();