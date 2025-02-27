import React, { useState } from 'react';
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { toast } from "react-toastify";

// Helper function to limit message length
const truncateMessage = (message, maxLength = 200) => {
  if (typeof message === 'string' && message.length > maxLength) {
    return message.substring(0, maxLength) + '...';
  }
  return message;
};

const EditorMDAIHelper = ({ editorInstance }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast.warning("Please enter a prompt");
      return;
    }

    if (!editorInstance) {
      toast.error("Editor not ready. Please try again.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Call the AI API
      const response = await fetch(
        "https://api.aimlapi.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIML_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            frequency_penalty: 0,
            max_tokens: 500,
            n: 1,
            temperature: 0.7,
            model: "gpt-4o-mini",
            messages: [
              { 
                role: "system", 
                content: "You are a helpful assistant. Generate creative markdown content." 
              },
              { 
                role: "user", 
                content: truncateMessage(prompt) 
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.choices?.[0]?.message?.content?.trim();

      if (generatedContent && editorInstance.cm) {
        // Get current cursor position
        const cm = editorInstance.cm;
        const doc = cm.getDoc();
        const cursor = doc.getCursor();
        
        // Insert the generated content at cursor position
        doc.replaceRange(`\n\n${generatedContent}\n\n`, cursor);
        
        // Close the modal and reset prompt
        setShowPromptInput(false);
        setPrompt("");
        toast.success("Content generated successfully!");
      } else {
        throw new Error("No content was generated or editor is not available");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError(error.message || "Failed to generate content. Please try again.");
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Add an AI button to the toolbar
  const addAIButton = () => {
    if (editorInstance && editorInstance.toolbar) {
      // Implementation depends on editor.md's API
      console.log("Adding AI button to toolbar");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPromptInput(true)}
        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        title="AI Writing Assistant"
      >
        <BsStars className="text-purple-500" size={16} />
      </button>

      {/* AI Modal */}
      {showPromptInput && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowPromptInput(false)}
          ></div>
          
          <motion.div
            className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <BsStars className="text-purple-500" />
                AI Content Assistant
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowPromptInput(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What content would you like to generate?
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="For example: Write a section about the benefits of markdown editors..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                autoFocus
              />
              
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors text-sm font-medium text-gray-800 dark:text-gray-200"
                  onClick={() => setShowPromptInput(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
                  onClick={handleGenerateContent}
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <BsStars />
                      <span>Generate Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EditorMDAIHelper;
