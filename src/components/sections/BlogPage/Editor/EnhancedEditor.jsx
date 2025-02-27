import React, { useState, useEffect } from "react";
import CDNEditorMD from "../EditorMD/CDNEditorMD";
import "../EditorMD/editor-dark-theme.css"; // Import dark theme CSS

const EnhancedEditor = ({ onUpdate, aiAssistMode = false, initialValue }) => {
  const [theme, setTheme] = useState("auto");
  
  // Detect theme changes in the app
  useEffect(() => {
    const detectTheme = () => {
      // Check if document has a 'dark' class or data-theme="dark" attribute
      const isDarkMode = 
        document.documentElement.classList.contains('dark') || 
        document.documentElement.getAttribute('data-theme') === 'dark';
      
      setTheme(isDarkMode ? 'dark' : 'light');
    };
    
    // Initial detection
    detectTheme();
    
    // Set up mutation observer to detect theme changes
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class', 'data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <CDNEditorMD
      onUpdate={onUpdate}
      aiAssistMode={aiAssistMode}
      initialValue={initialValue}
      theme={theme}
      height={550}
      enableImageUpload={true}
      showWordCount={true}
      placeholder="# Start writing your amazing blog post\n\nUse markdown to format your content."
    />
  );
};

export default EnhancedEditor;
