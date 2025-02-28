/**
 * English language pack for Editor.md
 * This fixes the dialog issues by providing proper translations
 */

export default function(editormd) {
    const factory = function() {
        // English language pack
        const lang = {
            name        : "en",
            description : "Open source online Markdown editor.",
            toolbar     : {
                // Toolbar buttons
                undo             : "Undo (Ctrl+Z)",
                redo             : "Redo (Ctrl+Y)",
                bold             : "Bold",
                del              : "Strikethrough",
                italic           : "Italic",
                quote            : "Block quote",
                h1               : "Heading 1",
                h2               : "Heading 2",
                h3               : "Heading 3",
                h4               : "Heading 4",
                h5               : "Heading 5",
                h6               : "Heading 6",
                "list-ul"        : "Unordered list",
                "list-ol"        : "Ordered list",
                hr               : "Horizontal line",
                link             : "Link",
                "reference-link" : "Reference link",
                image            : "Image",
                code             : "Code inline",
                "preformatted-text" : "Preformatted text / Code block (Tab indent)",
                "code-block"     : "Code block (Multi-language)",
                table            : "Tables",
                datetime         : "Datetime",
                emoji            : "Emoji",
                "html-entities"  : "HTML Entities",
                pagebreak        : "Page break",
                "goto-line"      : "Go to line",
                watch            : "Unwatch",
                unwatch          : "Watch",
                preview          : "HTML Preview (Press Shift + ESC exit)",
                fullscreen       : "Fullscreen (Press ESC exit)",
                clear            : "Clear",
                search           : "Search",
                help             : "Help",
                info             : "About"
            },
            buttons : {
                enter  : "Enter",
                cancel : "Cancel",
                close  : "Close"
            },
            dialog : {
                // Dialog
                link : {
                    title    : "Link",
                    url      : "URL",
                    urlTitle : "Title",
                    urlEmpty : "Error: Please fill in the link URL."
                },
                referenceLink : {
                    title    : "Reference Link",
                    name     : "Name",
                    url      : "URL",
                    urlId    : "ID",
                    urlTitle : "Title",
                    nameEmpty: "Error: Reference name cannot be empty.",
                    idEmpty  : "Error: Please fill in reference link id.",
                    urlEmpty : "Error: Please fill in reference link URL."
                },
                image : {
                    title    : "Image",
                    url      : "URL",
                    link     : "Link",
                    alt      : "Alt",
                    uploadButton     : "Upload",
                    imageURLEmpty    : "Error: The image URL cannot be empty.",
                    uploadFileEmpty  : "Error: The upload file cannot be empty.",
                    formatNotAllowed : "Error: Only image files are allowed to upload. The allowed image file formats are:"
                },
                preformattedText : {
                    title             : "Preformatted text / Code block", 
                    emptyAlert        : "Error: Please fill in the preformatted text or code block content.",
                    placeholder       : "Coding now...."
                },
                codeBlock : {
                    title             : "Code block",
                    selectLabel       : "Languages: ",
                    selectDefaultText : "select a code language...",
                    otherLanguage     : "Other language",
                    unselectedLanguageAlert : "Error: Please select the code language.",
                    codeEmptyAlert    : "Error: Please fill in the code block content.",
                    placeholder       : "Coding now...."
                },
                htmlEntities : {
                    title : "HTML Entities"
                },
                help : {
                    title : "Help"
                }
            }
        };
        
        return (typeof editormd !== "undefined") ? editormd.lang.en = lang : lang;
    };
    
    // Register the language pack
    if (typeof editormd !== "undefined") {
        // Register language when called directly
        editormd.lang.en = factory();
    }
    
    return factory;
}