/**
 * Utility functions for AI API calls
 */

/**
 * Truncates text to a safe size for API requests
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length in characters
 * @returns {string} - Truncated text
 */
export const truncateForAPI = (text, maxLength = 200) => {
  if (!text) return "";
  
  // If text is already within limits, return as is
  if (text.length <= maxLength) return text;
  
  // Otherwise truncate and add ellipsis
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Extracts key content from markdown or HTML for AI prompts
 * @param {string} content - The content to extract from
 * @param {number} maxLength - Maximum characters to extract
 * @returns {string} - Extracted content suitable for API
 */
export const extractContentForAI = (content, maxLength = 200) => {
  if (!content) return "";
  
  // Remove HTML tags
  let plainText = content.replace(/<[^>]*>/g, ' ');
  
  // Remove markdown formatting
  plainText = plainText
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // images
    .replace(/[*_~`#]/g, '') // formatting chars
    .replace(/\n+/g, ' ') // newlines
    .replace(/\s+/g, ' ') // extra spaces
    .trim();
  
  return truncateForAPI(plainText, maxLength);
};

/**
 * Prepares AI API request with message size constraints
 * @param {Object} options - Request options
 * @returns {Object} - Prepared request with safe message sizes
 */
export const prepareAIRequest = ({
  systemPrompt = "You are a helpful assistant.",
  userPrompt,
  model = "gpt-4o-mini",
  maxTokens = 100,
  temperature = 0.7
}) => {
  // Ensure messages are within size limits
  const safeSystemPrompt = truncateForAPI(systemPrompt, 100);
  const safeUserPrompt = truncateForAPI(userPrompt, 150);
  
  return {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIML_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      frequency_penalty: 0,
      max_tokens: maxTokens,
      n: 1,
      temperature: temperature,
      model: model,
      messages: [
        {
          role: "system",
          content: safeSystemPrompt,
        },
        {
          role: "user",
          content: safeUserPrompt,
        },
      ],
    }),
  };
};
