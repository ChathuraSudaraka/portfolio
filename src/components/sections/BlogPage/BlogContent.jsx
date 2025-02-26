import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiRefreshCcw, FiTag } from "react-icons/fi";
import Category from "./Category";
import { blogs } from "../../../context/data";
import SearchBar from "../BlogPage/SearchBar";
import Pagination from "./Pagination";
import BlogCard from "./BlogCard";

const BlogContent = () => {
  // Get all blogs including user-created ones
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load blogs from both sources on component mount
  useEffect(() => {
    // Debug what's in localStorage
    console.log("Loading blogs from localStorage");
    
    try {
      // Get user blogs from localStorage
      const userBlogsString = localStorage.getItem("userBlogs");
      console.log("Raw userBlogs from localStorage:", userBlogsString);
      
      const userBlogs = userBlogsString ? JSON.parse(userBlogsString) : [];
      console.log("Parsed userBlogs:", userBlogs);
      
      // Combine with imported blogs
      const combinedBlogs = [...blogs, ...userBlogs];
      
      // Add unique ID for each blog that doesn't have one
      const processedBlogs = combinedBlogs.map(blog => ({
        ...blog,
        id: blog.id?.toString() || Date.now().toString()
      }));
      
      console.log("Combined blogs:", processedBlogs);
      
      // Sort by date (newest first)
      processedBlogs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return dateB - dateA;
      });
      
      setAllBlogs(processedBlogs);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading blogs:", error);
      setAllBlogs(blogs); // Fallback to imported blogs only
      setIsLoaded(true);
    }
  }, []);

  // Extract unique categories once
  const uniqueCategories = React.useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(blogs.map((blog) => blog.category).filter(Boolean))
      ),
    ];
  }, []);

  // Filter blogs whenever category or search query changes
  useEffect(() => {
    // Small delay to allow for smooth transitions
    const timer = setTimeout(() => {
      const filtered = filterBlogs();
      setFilteredBlogs(filtered);

      // Debug info
      console.log(
        `Found ${filtered.length} blogs matching category: "${selectedCategory}" and query: "${searchQuery}"`
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, allBlogs]);

  const filterBlogs = () => {
    let filtered = [...allBlogs]; // Use allBlogs instead of blogs

    // Apply category filter if not "All"
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (blog) =>
          blog?.category &&
          blog.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply search filter if query exists
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (blog) =>
          (blog?.title && blog.title.toLowerCase().includes(query)) ||
          (blog?.description && blog.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <section className="relative py-16 min-h-[800px]" id="latest-posts">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full mb-4">
            <FiTag className="text-primary" />
            <span className="text-sm font-medium text-primary">
              Blog Articles
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest <span className="text-primary">Insights</span> & Articles
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my thoughts on development, design patterns, and the
            ever-evolving tech landscape. Filter by category or search for
            specific topics.
          </p>
        </motion.div>

        {/* Search and filter tools */}
        <div className="mb-10 space-y-6">
          {/* Enhanced SearchBar with proper prop passing */}
          <div className="max-w-xl mx-auto">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Category
              categories={uniqueCategories}
              onFilterBlogsByCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </motion.div>
        </div>

        {/* Content area with fixed height to prevent layout shifts */}
        <div className="relative min-h-[600px]">
          {/* Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}

          {/* No Results Message */}
          {isLoaded && filteredBlogs.length === 0 && (
            <motion.div
              className="text-center py-16 my-8 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FiTag className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No matching articles
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                No blogs found matching your criteria. Try adjusting your
                filters or search query.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FiRefreshCcw className="text-lg mr-2" />
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* Blog Grid with Pagination */}
          {isLoaded && filteredBlogs.length > 0 && (
            <Pagination
              items={filteredBlogs}
              itemsPerPage={6}
              renderItem={(currentItems) => (
                <motion.div
                  className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {currentItems.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </motion.div>
              )}
              containerClassName="mt-8"
              scrollToTopId="latest-posts"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogContent;
