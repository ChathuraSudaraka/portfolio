import { useState } from "react";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";

// Helper function to limit message length
const truncateMessage = (message, maxLength = 200) => {
  if (typeof message === 'string' && message.length > maxLength) {
    return message.substring(0, maxLength) + '...';
  }
  return message;
};

const MarkdownAIHelper = ({ textareaRef, setMarkdown }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an expert content writer assistant. Create well-structured, engaging content formatted in Markdown for blog posts."
  );

  // API key from environment variables
  const API_KEY = import.meta.env.VITE_AIML_API_KEY;

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;

    // Check if textarea reference is available
    if (!textareaRef || !textareaRef.current) {
      setError("Editor not available. Please try again.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Prepare user messages - limit content to stay within API restrictions
      const truncatedPrompt = truncateMessage(prompt);
      const truncatedSystemPrompt = truncateMessage(systemPrompt, 50);
      
      let userContent = truncatedPrompt;
      
      // Handle image content if included
      if (includeImage && imageUrl.trim()) {
        userContent = [
          {
            type: "text",
            text: truncatedPrompt,
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl.trim(),
            },
          },
        ];
      }

      const messages = [
        {
          role: "system",
          content: truncatedSystemPrompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ];

      // API request with limited message size
      const response = await fetch(
        "https://api.aimlapi.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            frequency_penalty: 0,
            max_tokens: 200, // Reduced token count
            n: 1,
            temperature: 0.7,
            model: "gpt-4o-mini",
            messages: messages,
          }),
        }
      );

      // Handle error responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `API request failed with status: ${response.status}`
        );
      }

      const data = await response.json();

      // Extract the generated content
      const generatedContent =
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content;

      // Insert the content into the markdown textarea
      if (generatedContent) {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const textBefore = textarea.value.substring(0, start);
        const textAfter = textarea.value.substring(end);
        
        // Add a new line before the AI content if we're not at the start
        const prefix = start > 0 && !textBefore.endsWith('\n\n') ? '\n\n' : '';
        // Add a new line after the AI content if there's more content
        const suffix = textAfter.length > 0 && !textAfter.startsWith('\n\n') ? '\n\n' : '';
        
        // Update the markdown content
        const newMarkdown = `${textBefore}${prefix}${generatedContent}${suffix}${textAfter}`;
        setMarkdown(newMarkdown);
        
        // Set cursor position after the inserted content
        setTimeout(() => {
          textarea.focus();
          const newPosition = start + prefix.length + generatedContent.length;
          textarea.selectionStart = newPosition;
          textarea.selectionEnd = newPosition;
        }, 0);

        // Reset state after successful insertion
        setPrompt("");
        setImageUrl("");
        setIncludeImage(false);
        setShowPromptInput(false);
      } else {
        setError("No content was generated. Please try a different prompt.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setError(
        error.message ||
          "Failed to connect to AI service. Please check your internet connection."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-helper-container">
      <button
        type="button"
        onClick={() => setShowPromptInput(true)}
        className="tiptap-btn flex items-center justify-center"
        title="AI Writing Assistant"
      >
        <BsStars className="text-purple-500" size={16} />
      </button>

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
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 99999, position: "relative" }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <BsStars className="text-purple-500" />
                AI Markdown Assistant
              </h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowPromptInput(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              {/* Display error message if any */}
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* System prompt input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  System Instructions (Optional)
                </label>
                <textarea
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white mb-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={2}
                  placeholder="Instructions for the AI assistant..."
                />
              </div>

              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What would you like to write about?
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="For example: Write an introduction about artificial intelligence..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                autoFocus
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="text"
                  className="w-full p-2 text-xs border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white mb-1 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="URL of the image to include..."
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={includeImage}
                    onChange={(e) => setIncludeImage(e.target.checked)}
                  />
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Include image in the content
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors text-sm font-medium text-gray-800 dark:text-gray-200"
                  onClick={() => setShowPromptInput(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
                  onClick={handleGenerateContent}
                  disabled={isGenerating || !prompt.trim()}
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <BsStars />
                      Generate Content
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MarkdownAIHelper;
