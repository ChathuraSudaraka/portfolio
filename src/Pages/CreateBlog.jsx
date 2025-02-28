import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GradientButton } from "../components/ui/gradient-button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";
import { BsUpload, BsStars, BsLightningCharge, BsMagic } from "react-icons/bs";
import LegalLayout from "../components/Layouts/LegalLayout";
import EnhancedEditor from "../components/sections/BlogPage/Editor/EnhancedEditor";
import { prepareAIRequest, extractContentForAI } from "../utils/aiHelpers";

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
  const [activeTab, setActiveTab] = useState("editor"); // "editor" or "ai"
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
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

      // Fix tags handling to check type before using split()
      let formattedTags = [];

      if (blogData.tags) {
        if (Array.isArray(blogData.tags)) {
          // If it's already an array, use it directly
          formattedTags = blogData.tags;
        } else if (typeof blogData.tags === "string") {
          // If it's a string, split it by comma
          formattedTags = blogData.tags.split(",").map((tag) => tag.trim());
        }
      }

      // Create new blog post with proper data structure
      const newBlog = {
        id: blogId,
        title: blogData.title,
        category: blogData.category,
        tags: formattedTags, // Use the safely formatted tags
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
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${
          import.meta.env.VITE_UNSPLASH_API_KEY || "YOUR_UNSPLASH_API_KEY"
        }`
      );

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Get a random image from the results
        const randomIndex = Math.floor(
          Math.random() * Math.min(data.results.length, 5)
        );
        const imageUrl = data.results[randomIndex].urls.regular;

        setBlogData((prev) => ({
          ...prev,
          image: imageUrl,
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
    if (type === "title") setIsGeneratingTitle(true);
    if (type === "tags") setIsGeneratingTags(true);
    if (type === "category") setIsGeneratingCategory(true);

    try {
      // Get the editor content to use as context for generating metadata
      const content =
        editorContent || localStorage.getItem("editorContent") || "";

      // Extract key content safely
      const extractedContent = extractContentForAI(content, 150);

      // Prepare prompt based on the type of metadata we want to generate
      let systemPrompt = "You are a blog metadata generator.";
      let userPrompt = "";

      if (type === "title") {
        userPrompt = `Generate a catchy blog title for: ${extractedContent}`;
      } else if (type === "tags") {
        userPrompt = `Generate 3-6 comma-separated tags for: ${extractedContent}`;
      } else if (type === "category") {
        userPrompt = `Choose category (Web Development, Technology, Programming, or Design) for: ${extractedContent}`;
      }

      // Prepare the API request with size constraints
      const requestOptions = prepareAIRequest({
        systemPrompt,
        userPrompt,
        maxTokens: 50,
      });

      // Use the AIML API to generate the metadata
      const response = await fetch(
        "https://api.aimlapi.com/v1/chat/completions",
        requestOptions
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
      if (type === "title") {
        setBlogData((prev) => ({ ...prev, title: generatedContent }));
        toast.success("Blog title generated successfully!");
      } else if (type === "tags") {
        setBlogData((prev) => ({ ...prev, tags: generatedContent }));
        toast.success("Tags generated successfully!");
      } else if (type === "category") {
        // Only update if the generated category is one of our options
        const validCategories = [
          "Web Development",
          "Technology",
          "Programming",
          "Design",
        ];
        const category =
          validCategories.find(
            (c) => c.toLowerCase() === generatedContent.toLowerCase()
          ) || "Web Development";

        setBlogData((prev) => ({ ...prev, category }));
        toast.success("Category selected successfully!");
      }
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
      toast.error(`Failed to generate ${type}. Please try again.`);
    } finally {
      // Reset the appropriate loading state
      if (type === "title") setIsGeneratingTitle(false);
      if (type === "tags") setIsGeneratingTags(false);
      if (type === "category") setIsGeneratingCategory(false);
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
      // Prepare the API request with size constraints
      const requestOptions = prepareAIRequest({
        systemPrompt: "Generate blog metadata as JSON.",
        userPrompt: `Create title, tags, category (Web Development, Technology, Programming, Design) for: ${metadataPrompt.substring(
          0,
          150
        )}`,
        maxTokens: 150,
      });

      // Use the AIML API to generate the metadata
      const response = await fetch(
        "https://api.aimlapi.com/v1/chat/completions",
        requestOptions
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
          const categoryMatch = generatedContent.match(
            /"category"\s*:\s*"([^"]*)"/
          );

          metadata = {
            title: titleMatch ? titleMatch[1] : "",
            tags: tagsMatch ? tagsMatch[1] : "",
            category: categoryMatch ? categoryMatch[1] : "Web Development",
          };
        }
      } else {
        throw new Error("Could not extract metadata from response");
      }

      // Update form with generated metadata
      setBlogData((prev) => ({
        ...prev,
        title: metadata.title || prev.title,
        tags: metadata.tags || prev.tags,
        category: metadata.category || prev.category,
      }));

      toast.success("Blog metadata generated successfully!");

      // Close modal after a slight delay to show the toast
      setTimeout(() => {
        setShowMetadataPrompt(false);
      }, 500);
    } catch (error) {
      console.error("Error generating metadata:", error);

      // More descriptive error messages
      if (
        error.message.includes("limit") ||
        error.message.includes("Free-tier")
      ) {
        toast.error("API limit reached. Try with shorter prompts.");
      } else if (error.message.includes("Could not extract")) {
        toast.error("Could not extract metadata from AI response. Try again.");
      } else {
        toast.error("Failed to generate blog metadata. Please try again.");
      }
    } finally {
      setIsGeneratingTitle(false);
      setIsGeneratingTags(false);
      setIsGeneratingCategory(false);
    }
  };

  return (
    <LegalLayout>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-12 sm:py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
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
            {/* Blog creation form with tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap -mb-px">
                <button
                  className={`inline-flex items-center px-4 py-2 font-medium text-sm border-b-2 ${
                    activeTab === "editor"
                      ? "border-primary text-primary dark:text-primary-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  } transition-colors`}
                  onClick={() => setActiveTab("editor")}
                >
                  ✏️ Editor
                </button>
                <button
                  className={`inline-flex items-center px-4 py-2 font-medium text-sm border-b-2 ${
                    activeTab === "ai"
                      ? "border-primary text-primary dark:text-primary-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  } transition-colors`}
                  onClick={() => setActiveTab("ai")}
                >
                  <BsMagic className="mr-2" /> AI Assistant
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  e.target.tagName.toLowerCase() !== "textarea"
                ) {
                  e.preventDefault();
                }
              }}
            >
              <div className="space-y-6">
                {/* Basic blog details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Blog Title */}
                  <div className="space-y-2">
                    <Label>Blog Title</Label>
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
                  <div className="space-y-2">
                    <Label>Category</Label>
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
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags (comma-separated)</Label>
                  <Input
                    type="text"
                    name="tags"
                    value={blogData.tags}
                    onChange={handleChange}
                    placeholder="React, JavaScript, Web..."
                  />
                </div>

                {/* Cover Image */}
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  {activeTab === "editor" ? (
                    <Input
                      type="url"
                      name="image"
                      value={blogData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2">
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
                        className="px-4 py-2 bg-gradient-to-r from-primary to-secondary disabled:from-gray-400 disabled:to-gray-300 dark:disabled:from-gray-700 dark:disabled:to-gray-600 text-white rounded-md flex items-center justify-center gap-2 transition-colors text-sm font-medium whitespace-nowrap"
                      >
                        {isGeneratingImage ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                            >
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
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <BsStars size={16} />
                            <span>Generate</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Image Preview */}
                  {blogData.image && (
                    <div className="mt-3 relative rounded-lg overflow-hidden">
                      <img
                        src={blogData.image}
                        alt="Cover preview"
                        className="h-40 w-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Blog Content */}
                <div className="space-y-2">
                  <Label>Blog Content</Label>
                  <div className=" overflow-hidden">
                    <EnhancedEditor
                      onUpdate={handleEditorUpdate}
                      aiAssistMode={activeTab === "ai"}
                    />
                  </div>
                </div>

                {/* AI Assistant Panel - Only shown when AI tab is active */}
                {activeTab === "ai" && (
                  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                        <BsMagic className="text-primary" />
                        AI Writing Assistant
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Let AI help you generate content for your blog post.
                        Choose from the options below.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => generateBlogMetadata("title")}
                        disabled={isGeneratingTitle}
                        className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition flex flex-col items-center gap-2 text-center"
                      >
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                          {isGeneratingTitle ? (
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                            >
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
                          ) : (
                            <span className="text-lg">T</span>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          Generate Title
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => generateBlogMetadata("tags")}
                        disabled={isGeneratingTags}
                        className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition flex flex-col items-center gap-2 text-center"
                      >
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                          {isGeneratingTags ? (
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                            >
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
                          ) : (
                            <span className="text-lg">#</span>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          Generate Tags
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => generateBlogMetadata("category")}
                        disabled={isGeneratingCategory}
                        className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition flex flex-col items-center gap-2 text-center"
                      >
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                          {isGeneratingCategory ? (
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                            >
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
                          ) : (
                            <span className="text-lg">C</span>
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          Select Category
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowMetadataPrompt(true)}
                        className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg transition flex flex-col items-center gap-2 text-center col-span-full sm:col-span-1"
                      >
                        <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center">
                          <BsLightningCharge className="text-lg" />
                        </div>
                        <span className="text-sm font-medium">
                          Generate All Metadata
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <GradientButton
                    type="submit"
                    className="px-6 py-2.5 font-medium text-sm sm:text-base flex items-center gap-2"
                    isLoading={isSubmitting}
                  >
                    {!isSubmitting && <BsUpload className="w-4 h-4" />}
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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-5">
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
                  disabled={
                    isGeneratingTitle ||
                    isGeneratingTags ||
                    isGeneratingCategory ||
                    !metadataPrompt.trim()
                  }
                >
                  {isGeneratingTitle ||
                  isGeneratingTags ||
                  isGeneratingCategory ? (
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
