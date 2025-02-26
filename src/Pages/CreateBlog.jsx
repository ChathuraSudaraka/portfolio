import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tiptap from "../components/sections/BlogPage/Tiptap/NotePad";
import { GradientButton } from "../components/ui/gradient-button";
import { Input } from "../components/ui/input";
import { Select } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { toast } from "react-toastify";
import { BsUpload } from "react-icons/bs";
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

                {/* Cover Image */}
                <div className="group/field space-y-2">
                  <Label className="mb-2 block">Cover Image URL</Label>
                  <Input
                    type="url"
                    name="image"
                    value={blogData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
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
