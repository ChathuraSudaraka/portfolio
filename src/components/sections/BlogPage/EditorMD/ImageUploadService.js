/**
 * Service for handling image uploads from the editor
 */

// Function to handle image uploads via Imgur API
export const uploadToImgur = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID || 'YOUR_IMGUR_CLIENT_ID'}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`Imgur API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data.link;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
};

// Alternative function using local storage for demo purposes
export const mockImageUpload = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Store image in localStorage for demo purposes
      const imageId = `blog-img-${Date.now()}`;
      localStorage.setItem(imageId, reader.result);
      
      // Return a "fake" URL that could be used in your app
      resolve(`data:${file.type};base64,${reader.result.split(',')[1]}`);
    };
    reader.readAsDataURL(file);
  });
};

// Main upload function that will use the appropriate method
export const uploadImage = async (file) => {
  // Check if we have an Imgur client ID
  if (import.meta.env.VITE_IMGUR_CLIENT_ID) {
    return uploadToImgur(file);
  } else {
    // Fallback to mock upload
    return mockImageUpload(file);
  }
};
