import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiRefreshCcw, FiTag } from "react-icons/fi";
import Category from "./Category";
import { CardContainer, CardItem } from "../../ui/3d-card";
import Pagination from "../../common/Pagination";
import { blogs } from "../../../context/data";
import SearchBar from "../BlogPage/SearchBar";

const BlogContent = () => {
  // Initialize with all blogs instead of empty array to prevent flash of no content
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

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
      setIsLoaded(true);

      // Debug info
      console.log(
        `Found ${filtered.length} blogs matching category: "${selectedCategory}" and query: "${searchQuery}"`
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const filterBlogs = () => {
    let filtered = [...blogs]; // Create a fresh copy

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

          {/* /* No Results Message */}
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

// BlogCard component with improved error handling
const BlogCard = ({ blog }) => {
  if (!blog) return null;

  // Safely extract properties with fallbacks
  const {
    id = "",
    title = "Untitled Article",
    description = "No description available",
    image = "/assets/project/project-placeholder.jpg",
    category = "Uncategorized",
    author = {},
  } = blog;

  const displayDate = blog.date || blog.publishDate || "No date";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      className="h-full"
    >
      <CardContainer className="flex flex-col h-[500px] group bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Card Image */}
        <div className="relative w-full h-56 overflow-hidden">
          {/* Image with fallback */}
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/project/project-placeholder.jpg";
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          {/* Category badge */}
          <span className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-primary/20">
            {category}
          </span>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-grow p-5 sm:p-6">
          {/* Date */}
          <div className="flex items-center mb-3 text-gray-500 dark:text-gray-400">
            <FiCalendar className="w-4 h-4 mr-2 text-primary/70" />
            <span className="text-sm">{displayDate}</span>
          </div>

          {/* Title */}
          <CardItem
            as={Link}
            to={`/blog/${id}`}
            translateZ="60"
            className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary dark:hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]"
          >
            {title}
          </CardItem>

          {/* Description */}
          <CardItem
            as="div"
            translateZ="50"
            className="flex-grow overflow-hidden mb-5"
          >
            <p className="text-gray-600 dark:text-gray-300 line-clamp-4 text-sm">
              {description}
            </p>
          </CardItem>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
            {/* Author */}
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src={author?.avatar || "/assets/icon.png"}
                  alt={author?.name || "Author"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/icon.png";
                  }}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                {author?.name || "Chathura Sudaraka"}
              </span>
            </div>

            {/* Read more link */}
            <CardItem
              as={Link}
              to={`/blog/${id}`}
              translateZ="30"
              className="group/link text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1"
            >
              Read more
              <FiArrowRight className="ml-1 transition-transform group-hover/link:translate-x-1" />
            </CardItem>
          </div>
        </div>
      </CardContainer>
    </motion.div>
  );
};

export default BlogContent;
