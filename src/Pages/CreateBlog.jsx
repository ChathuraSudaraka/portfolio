import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tiptap from "../components/sections/BlogPage/Tiptap/NotePad";
import { GradientButton } from "../components/ui/gradient-button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";
import { BsUpload, BsStars, BsLightningCharge } from "react-icons/bs";
import LegalLayout from "../components/Layouts/LegalLayout";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import EditorToggle from "../components/sections/BlogPage/Tiptap/EditorToggle";

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
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [isGeneratingCategory, setIsGeneratingCategory] = useState(false);
  const [metadataPrompt, setMetadataPrompt] = useState("");
  const [showMetadataPrompt, setShowMetadataPrompt] = useState(false);
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

  // New function to generate blog metadata with AI
  const generateBlogMetadata = async (type) => {
    // Initialize appropriate loading state
    if (type === 'title') setIsGeneratingTitle(true);
    if (type === 'tags') setIsGeneratingTags(true);
    if (type === 'category') setIsGeneratingCategory(true);
    
    try {
      // Get the editor content to use as context for generating metadata
      const content = editorContent || localStorage.getItem("editorContent") || "";
      
      // Prepare prompt based on the type of metadata we want to generate
      let systemPrompt = "You are an expert blog metadata generator.";
      let userPrompt = "";
      
      if (type === 'title') {
        userPrompt = `Generate a catchy, SEO-friendly blog title (max 10 words) for the following content. Return only the title with no quotes or additional text: ${content.substring(0, 500)}`;
      } else if (type === 'tags') {
        userPrompt = `Generate 3-6 relevant, comma-separated tags for the following blog content. Return only the tags with no quotes or additional text: ${content.substring(0, 500)}`;
      } else if (type === 'category') {
        userPrompt = `Choose the most appropriate category for this blog content from the following options: Web Development, Technology, Programming, Design. Return only the category name with no quotes or additional text: ${content.substring(0, 500)}`;
      }
      
      // Use the AIML API to generate the metadata
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
            max_tokens: 100,
            n: 1,
            temperature: 0.7,
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: userPrompt,
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

      if (!generatedContent) {
        throw new Error("No content was generated");
      }

      // Update the appropriate form field with the generated content
      if (type === 'title') {
        setBlogData(prev => ({ ...prev, title: generatedContent }));
        toast.success("Blog title generated successfully!");
      } else if (type === 'tags') {
        setBlogData(prev => ({ ...prev, tags: generatedContent }));
        toast.success("Tags generated successfully!");
      } else if (type === 'category') {
        // Only update if the generated category is one of our options
        const validCategories = ["Web Development", "Technology", "Programming", "Design"];
        const category = validCategories.find(c => 
          c.toLowerCase() === generatedContent.toLowerCase()
        ) || "Web Development";
        
        setBlogData(prev => ({ ...prev, category }));
        toast.success("Category selected successfully!");
      }
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
      toast.error(`Failed to generate ${type}. Please try again.`);
    } finally {
      // Reset the appropriate loading state
      if (type === 'title') setIsGeneratingTitle(false);
      if (type === 'tags') setIsGeneratingTags(false);
      if (type === 'category') setIsGeneratingCategory(false);
    }
  };

  // Modal for metadata generation with a single prompt
  const handleGenerateAllMetadata = async () => {
    if (!metadataPrompt.trim()) {
      toast.error("Please enter a brief description of your blog");
      return;
    }
    
    setIsGeneratingTitle(true);
    setIsGeneratingTags(true);
    setIsGeneratingCategory(true);
    
    try {
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
            max_tokens: 200,
            n: 1,
            temperature: 0.7,
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are an expert blog metadata generator. Return your response as a JSON object with title, tags, and category fields.",
              },
              {
                role: "user",
                content: `Generate a catchy title, 3-6 relevant comma-separated tags, and select the most appropriate category (from: Web Development, Technology, Programming, Design) for a blog about: ${metadataPrompt}. Return as JSON with title, tags, and category fields.`,
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

      if (!generatedContent) {
        throw new Error("No content was generated");
      }

      // Extract JSON from the response
      const jsonMatch = generatedContent.match(/({[\s\S]*})/);
      let metadata;
      
      if (jsonMatch && jsonMatch[0]) {
        try {
          metadata = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error("Failed to parse JSON:", e);
          // Fall back to regex extraction
          const titleMatch = generatedContent.match(/"title"\s*:\s*"([^"]*)"/);
          const tagsMatch = generatedContent.match(/"tags"\s*:\s*"([^"]*)"/);
          const categoryMatch = generatedContent.match(/"category"\s*:\s*"([^"]*)"/);
          
          metadata = {
            title: titleMatch ? titleMatch[1] : "",
            tags: tagsMatch ? tagsMatch[1] : "",
            category: categoryMatch ? categoryMatch[1] : "Web Development"
          };
        }
      } else {
        throw new Error("Could not extract metadata from response");
      }

      // Update form with generated metadata
      setBlogData(prev => ({ 
        ...prev, 
        title: metadata.title || prev.title,
        tags: metadata.tags || prev.tags,
        category: metadata.category || prev.category
      }));
      
      toast.success("Blog metadata generated successfully!");
      setShowMetadataPrompt(false);
      
    } catch (error) {
      console.error("Error generating metadata:", error);
      toast.error("Failed to generate blog metadata. Please try again.");
    } finally {
      setIsGeneratingTitle(false);
      setIsGeneratingTags(false);
      setIsGeneratingCategory(false);
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
            {/* Quick generate button at the top */}
            <div className="mb-6 flex justify-end">
              <HoverBorderGradient 
                as="button" 
                type="button"
                onClick={() => setShowMetadataPrompt(true)}
                className="text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <BsLightningCharge className="w-4 h-4" />
                  <span>Auto-Generate with AI</span>
                </div>
              </HoverBorderGradient>
            </div>

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
                {/* Blog Title with AI generation button */}
                <div className="group/field">
                  <Label className="mb-2 block">Blog Title</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        name="title"
                        value={blogData.title}
                        onChange={handleChange}
                        placeholder="Enter a catchy title..."
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => generateBlogMetadata('title')}
                      disabled={isGeneratingTitle}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 dark:disabled:bg-purple-900 text-white rounded-md flex items-center gap-1 transition-colors text-sm font-medium w-[140px] justify-center"
                    >
                      {isGeneratingTitle ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <BsStars size={16} />
                          <span>AI Generate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Category with AI generation button */}
                <div className="group/field">
                  <Label className="mb-2 block">Category</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
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
                    <button
                      type="button"
                      onClick={() => generateBlogMetadata('category')}
                      disabled={isGeneratingCategory}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 dark:disabled:bg-purple-900 text-white rounded-md flex items-center gap-1 transition-colors text-sm font-medium w-[140px] justify-center"
                    >
                      {isGeneratingCategory ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <BsStars size={16} />
                          <span>AI Suggest</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Tags with AI generation button */}
                <div className="group/field">
                  <Label className="mb-2 block">Tags (comma-separated)</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        name="tags"
                        value={blogData.tags}
                        onChange={handleChange}
                        placeholder="React, JavaScript, Web..."
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => generateBlogMetadata('tags')}
                      disabled={isGeneratingTags}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 dark:disabled:bg-purple-900 text-white rounded-md flex items-center gap-1 transition-colors text-sm font-medium w-[140px] justify-center"
                    >
                      {isGeneratingTags ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <BsStars size={16} />
                          <span>AI Generate</span>
                        </>
                      )}
                    </button>
                  </div>
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
                    <EditorToggle onUpdate={handleEditorUpdate} />
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
      
      {/* Modal for quick AI generation of all metadata */}
      {showMetadataPrompt && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-5">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowMetadataPrompt(false)}
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
                <BsLightningCharge className="text-purple-500" />
                Auto-Generate Blog Metadata
              </h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setShowMetadataPrompt(false)}
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe your blog post
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="E.g., A detailed guide on React hooks and how to use them effectively in web applications..."
                value={metadataPrompt}
                onChange={(e) => setMetadataPrompt(e.target.value)}
                rows={4}
                autoFocus
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors text-sm font-medium text-gray-800 dark:text-gray-200"
                  onClick={() => setShowMetadataPrompt(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
                  onClick={handleGenerateAllMetadata}
                  disabled={isGeneratingTitle || isGeneratingTags || isGeneratingCategory || !metadataPrompt.trim()}
                >
                  {(isGeneratingTitle || isGeneratingTags || isGeneratingCategory) ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <BsLightningCharge />
                      Generate All Metadata
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </LegalLayout>
  );
};

export default CreateBlog;
