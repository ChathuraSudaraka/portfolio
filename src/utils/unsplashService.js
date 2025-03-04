/**
 * Service for interfacing with the Unsplash API for image searches
 */

const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY; 

/**
 * Search for images on Unsplash with the given query
 * @param {string} query - The search query
 * @param {number} perPage - Number of results to return (default: 10)
 * @returns {Promise<Array>} - Array of image objects
 */
export const searchImages = async (query, perPage = 10) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodedQuery}&per_page=${perPage}&client_id=${UNSPLASH_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Unsplash search error:", error);
    throw error;
  }
};

/**
 * Get a random image from Unsplash based on a query
 * @param {string} query - The search query
 * @returns {Promise<string>} - URL of a random image matching the query
 */
export const getRandomImage = async (query) => {
  try {
    const images = await searchImages(query, 20);
    
    if (!images || images.length === 0) {
      throw new Error("No images found");
    }
    
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex].urls.regular;
  } catch (error) {
    console.error("Error getting random image:", error);
    throw error;
  }
};
