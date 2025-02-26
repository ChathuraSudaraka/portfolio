import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogLayout from "../components/Layouts/BlogLayout";
import Tiptap from "../components/sections/BlogPage/Tiptap/NotePad";
import { blogs } from "../context/data";
import { toast } from "react-toastify"; // Import toast if available in your project

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    category: "Web Development",
    tags: "",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000",
  });
  
  const [editorContent, setEditorContent] = useState("");
  const navigate = useNavigate();

  // Listen for editor content changes
  useEffect(() => {
    // Check if there's content in localStorage when component mounts
    const storedContent = localStorage.getItem("editorContent");
    if (storedContent) {
      setEditorContent(storedContent);
    }

    // Setup listener for storage changes
    const handleStorageChange = () => {
      const updatedContent = localStorage.getItem("editorContent");
      if (updatedContent) {
        setEditorContent(updatedContent);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get content from state or localStorage
    const content = editorContent || localStorage.getItem("editorContent");
    
    // Validate form data
    if (!blogData.title) {
      toast ? toast.error("Please add a title for your blog") : alert("Please add a title for your blog");
      return;
    }
    
    if (!content || content === "<p>Write a Blog</p>" || content === "<p></p>") {
      toast ? toast.error("Please add some content to your blog") : alert("Please add some content to your blog");
      return;
    }
    
    // Generate a guaranteed unique ID
    const blogId = `user-${Date.now().toString()}`;
    
    // Create new blog post with proper data structure
    const newBlog = {
      id: blogId,
      title: blogData.title,
      category: blogData.category,
      tags: blogData.tags ? blogData.tags.split(',').map(tag => tag.trim()) : [],
      image: blogData.image,
      description: content,
      createdAt: new Date().toISOString(),
      author: {
        name: "User",
        avatar: "/assets/icon.png"
      }
    };

    console.log("Saving new blog:", newBlog);

    try {
      // Get existing blogs or initialize empty array
      const existingBlogsStr = localStorage.getItem("userBlogs");
      const existingBlogs = existingBlogsStr ? JSON.parse(existingBlogsStr) : [];
      
      // Add new blog
      existingBlogs.unshift(newBlog); // Add to beginning
      
      // Save back to localStorage
      localStorage.setItem("userBlogs", JSON.stringify(existingBlogs));
      console.log("Successfully saved blogs to localStorage");
      
      // Clear the editor content
      localStorage.removeItem("editorContent");
      
      // Show success message
      toast ? toast.success("Blog published successfully!") : alert("Blog published successfully!");
      
      // Redirect to the blog page
      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.error("Error saving blog:", error);
      toast ? toast.error("Failed to publish blog. Please try again.") : alert("Failed to publish blog. Please try again.");
    }
  };

  // Handle direct editor content update
  const handleEditorUpdate = (content) => {
    setEditorContent(content);
  };

  return (
    <BlogLayout>
      <div className="px-4 py-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Form fields remain unchanged */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Blog Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          
          {/* Other form fields... */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Category</label>
            <select
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="Web Development">Web Development</option>
              <option value="Technology">Technology</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={blogData.tags}
              onChange={handleChange}
              placeholder="React, JavaScript, Web"
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Cover Image URL</label>
            <input
              type="url"
              name="image"
              value={blogData.image}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
            />
            {blogData.image && (
              <div className="mt-2">
                <img 
                  src={blogData.image} 
                  alt="Preview" 
                  className="h-40 object-cover rounded-lg" 
                />
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Blog Content</label>
            <Tiptap onUpdate={handleEditorUpdate} />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </BlogLayout>
  );
};

export default CreateBlog;
