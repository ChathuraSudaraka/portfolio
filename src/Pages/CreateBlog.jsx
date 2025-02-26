import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tiptap from "../components/sections/BlogPage/Tiptap/NotePad";
import { GradientButton } from "../components/ui/gradient-button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";
import { BsUpload, BsStars } from "react-icons/bs";
import LegalLayout from "../components/Layouts/LegalLayout";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    category: "Web Development",
    tags: "",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000",
  });

  const [editorContent, setEditorContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const navigate = useNavigate();

  // Listen for editor content changes
  useEffect(() => {
    const storedContent = localStorage.getItem("editorContent");
    if (storedContent) {
      setEditorContent(storedContent);
    }

    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem("editorContent");
      if (updatedContent) {
        setEditorContent(updatedContent);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get content from state or localStorage
    const content = editorContent || localStorage.getItem("editorContent");

    // Validate form data
    if (!blogData.title) {
      toast.error("Please add a title for your blog");
      setIsSubmitting(false);
      return;
    }

    if (
      !content ||
      content === "<p>Write a Blog</p>" ||
      content === "<p></p>"
    ) {
      toast.error("Please add some content to your blog");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create blog post logic here...
      
      // Important: Only remove editor content from localStorage AFTER successful save
      const blogId = `user-${Date.now().toString()}`;
      
      // Create new blog post with proper data structure
      const newBlog = {
        id: blogId,
        title: blogData.title,
        category: blogData.category,
        tags: blogData.tags
          ? blogData.tags.split(",").map((tag) => tag.trim())
          : [],
        image: blogData.image,
        description: content,
        createdAt: new Date().toISOString(),
        author: {
          name: "User",
          avatar: "/assets/icon.png",
        },
      };
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Get existing blogs or initialize empty array
      const existingBlogsStr = localStorage.getItem("userBlogs");
      const existingBlogs = existingBlogsStr
        ? JSON.parse(existingBlogsStr)
        : [];

      // Add new blog
      existingBlogs.unshift(newBlog); // Add to beginning

      // Save back to localStorage
      localStorage.setItem("userBlogs", JSON.stringify(existingBlogs));

      // Clear the editor content after successful save
      localStorage.removeItem("editorContent");

      // Show success message
      toast.success("Blog published successfully!");

      // Redirect to the blog page
      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to publish blog. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Handle direct editor content update
  const handleEditorUpdate = (content) => {
    setEditorContent(content);
  };

  // Add this function to prevent accidental form submissions
  const preventAccidentalSubmit = (e) => {
    // Only allow form submission from the actual submit button
    const target = e.target;
    if (target.type !== "submit" || target.tagName.toLowerCase() !== "button") {
      e.preventDefault();
    }
  };

  // Function to generate AI cover image
  const generateCoverImage = async () => {
    if (!imagePrompt.trim()) {
      toast.error("Please enter a prompt for the AI image generation");
      return;
    }

    setIsGeneratingImage(true);
    
    try {
      // For demonstration, use Unsplash API to get a relevant image
      // In a real implementation, you'd use an image generation API like DALL-E, Midjourney, etc.
      const query = encodeURIComponent(imagePrompt);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_API_KEY || "YOUR_UNSPLASH_API_KEY"}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // Get a random image from the results
        const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 5));
        const imageUrl = data.results[randomIndex].urls.regular;
        
        setBlogData(prev => ({
          ...prev,
          image: imageUrl
        }));
        
        toast.success("Cover image generated successfully!");
      } else {
        toast.warning("No suitable images found. Try a different prompt.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <LegalLayout>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-secondary/10 dark:bg-secondary/20 px-3 py-2 rounded-full mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
              </span>
              <p className="text-sm font-medium text-secondary">
                Create Content
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Create New <span className="text-secondary">Blog</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Share your thoughts and ideas with the world
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <form 
              onSubmit={handleSubmit} 
              onKeyDown={(e) => {
                // Prevent Enter key from submitting the form
                if (e.key === 'Enter' && e.target.tagName.toLowerCase() !== 'textarea') {
                  e.preventDefault();
                }
              }}
            >
              <div className="space-y-6">
                {/* Blog Title */}
                <div className="group/field">
                  <Label className="mb-2 block">Blog Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={blogData.title}
                    onChange={handleChange}
                    placeholder="Enter a catchy title..."
                    required
                  />
                </div>

                {/* Category */}
                <div className="group/field">
                  <Label className="mb-2 block">Category</Label>
                  <Select
                    name="category"
                    value={blogData.category}
                    onChange={handleChange}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Technology">Technology</option>
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                  </Select>
                </div>

                {/* Tags */}
                <div className="group/field">
                  <Label className="mb-2 block">Tags (comma-separated)</Label>
                  <Input
                    type="text"
                    name="tags"
                    value={blogData.tags}
                    onChange={handleChange}
                    placeholder="React, JavaScript, Web..."
                  />
                </div>

                {/* Cover Image with AI generation */}
                <div className="group/field space-y-2">
                  <Label className="mb-2 block">Cover Image</Label>
                  
                  {/* AI Image Generation */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder="Describe the image you want to generate..."
                        className="w-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={generateCoverImage}
                      disabled={isGeneratingImage || !imagePrompt.trim()}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
                    >
                      {isGeneratingImage ? (
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
                          <BsStars className="text-white" size={16} />
                          Generate with AI
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* URL Input */}
                  <Label className="mb-2 block text-sm text-gray-500 dark:text-gray-400">Or enter URL directly</Label>
                  <Input
                    type="url"
                    name="image"
                    value={blogData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  
                  {/* Image Preview */}
                  {blogData.image && (
                    <div className="mt-3 relative rounded-lg overflow-hidden group/preview">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="p-3 text-white text-sm">Cover preview</p>
                      </div>
                      <img
                        src={blogData.image}
                        alt="Cover preview"
                        className="h-52 w-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Blog Content - Wrap in div with onSubmit prevention */}
                <div 
                  className="group/field space-y-2"
                  onClick={preventAccidentalSubmit}
                >
                  <Label className="mb-2 block">Blog Content</Label>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <Tiptap onUpdate={handleEditorUpdate} />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <GradientButton
                    type="submit"
                    className="px-8 py-3 font-medium text-base flex items-center gap-2"
                    isLoading={isSubmitting}
                  >
                    {!isSubmitting && <BsUpload className="w-4 h-4 mr-2" />}
                    {isSubmitting ? "Publishing..." : "Publish Blog"}
                  </GradientButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default CreateBlog;
