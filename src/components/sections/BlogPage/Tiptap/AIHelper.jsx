import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";

export const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();

  return (
    <div className="absolute inset-0">
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-primary dark:bg-primary"
        />
      ))}
    </div>
  );
};

const AIHelper = ({ editor }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [includeImage, setIncludeImage] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    "You are an expert content writer assistant. Create well-structured, engaging content for blog posts."
  );

  // API key from environment variables
  const API_KEY = import.meta.env.VITE_AIML_API_KEY;

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;

    // Check if editor is available
    if (!editor) {
      setError("Editor not available. Please try again.");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Prepare user messages
      let userContent = prompt;

      if (includeImage && imageUrl.trim()) {
        userContent = [
          {
            type: "text",
            text: prompt,
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
          content: systemPrompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ];

      // Fixed API request - removed invalid response_format parameter
      const response = await fetch(
        "https://api.aimlapi.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            frequency_penalty: 1,
            logprobs: true,
            top_logprobs: 1,
            max_tokens: 512,
            max_completion_tokens: 1,
            n: 1,
            presence_penalty: 1,
            seed: 1,
            stream: false,
            top_p: 1,
            temperature: 1,
            model: "gpt-4o-mini",
            reasoning_effort: "low",
            stream_options: {
              include_usage: true,
            },
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

      // Insert the content into the editor
      if (generatedContent) {
        // Format it as HTML before inserting
        const formattedContent = `<div>${generatedContent.replace(
          /\n/g,
          "<br>"
        )}</div>`;
        editor.commands.insertContent(formattedContent);

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
    // ...existing UI code...
    <div className="ai-helper-container">
      <button
        type="button"
        onClick={() => setShowPromptInput(true)}
        className="tiptap-btn flex items-center justify-center"
        title="AI Writing Assistant"
      >
        <BsStars className="text-purple-500" size={16} />
      </button>

      {/* Rest of the UI remains the same */}
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
                AI Blog Assistant
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

              {/* Image URL input */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="includeImage"
                    checked={includeImage}
                    onChange={(e) => setIncludeImage(e.target.checked)}
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="includeImage"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Include an image for analysis
                  </label>
                </div>

                {includeImage && (
                  <input
                    type="url"
                    placeholder="Enter image URL..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                )}
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
                  disabled={
                    isGenerating ||
                    !prompt.trim() ||
                    (includeImage && !imageUrl.trim())
                  }
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

export default AIHelper;
