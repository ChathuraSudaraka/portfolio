import React from "react";
import { FiArrowRight, FiCalendar, FiClock, FiBookmark } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, index = 0 }) => {
  if (!blog) return null;

  // Simplified animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants = {
    initial: {
      scale: 1,
      y: 0,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Simple image zoom on hover
  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.5 },
    },
  };

  // Safely extract properties with fallbacks
  const {
    id = "",
    title = "Untitled Article",
    description = "No description available",
    image = "/assets/project/project-placeholder.jpg",
    category = "Uncategorized",
    createdAt,
    date,
    publishDate,
  } = blog;

  // Ensure ID is converted to string for consistent comparison
  const blogId = String(id);

  // Format date properly - check multiple possible date properties
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date)
      ? date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "No date";
  };

  const displayDate = formatDate(createdAt || date || publishDate);

  // Calculate reading time based on description length
  const calculateReadTime = () => {
    if (!description) return "1 min read";
    const wordsPerMinute = 200;
    // Handle both HTML and plain text descriptions
    const cleanText =
      typeof description === "string"
        ? description.replace(/<[^>]*>/g, "")
        : "";
    const wordCount = cleanText.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Truncate description for display
  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    // For HTML content, strip tags first
    const plainText =
      typeof text === "string" ? text.replace(/<[^>]*>/g, "") : "";
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };

  // Handle bookmark functionality
  const [isBookmarked, setIsBookmarked] = React.useState(() => {
    try {
      const savedBookmarks = localStorage.getItem("bookmarkedBlogs");
      if (savedBookmarks) {
        const bookmarks = JSON.parse(savedBookmarks);
        return Array.isArray(bookmarks) && bookmarks.includes(blogId);
      }
    } catch (err) {
      console.error("Error checking bookmark status:", err);
    }
    return false;
  });

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const savedBookmarks = JSON.parse(
        localStorage.getItem("bookmarkedBlogs") || "[]"
      );

      if (isBookmarked) {
        const updated = savedBookmarks.filter(
          (bookmarkId) => bookmarkId !== blogId
        );
        localStorage.setItem("bookmarkedBlogs", JSON.stringify(updated));
      } else {
        savedBookmarks.push(blogId);
        localStorage.setItem("bookmarkedBlogs", JSON.stringify(savedBookmarks));
      }

      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  // Extract tags safely
  const tags = Array.isArray(blog.tags) ? blog.tags : [];

  // Get author information
  const getAuthorInfo = (blog) => {
    // Case 1: blog.author is an object with name and avatar
    if (typeof blog.author === "object" && blog.author !== null) {
      return {
        name: blog.author.name || "Anonymous",
        avatar: blog.author.avatar || "/assets/icon.png",
      };
    }

    // Case 2: blog.author is a string (just the name)
    if (typeof blog.author === "string") {
      return {
        name: blog.author,
        avatar: "/assets/icon.png",
      };
    }

    // Case 3: blog has separate authorName and authorAvatar fields (legacy format)
    if (blog.authorName || blog.authorAvatar) {
      return {
        name: blog.authorName || "Anonymous",
        avatar: blog.authorAvatar || "/assets/icon.png",
      };
    }

    // Default case: no author information
    return {
      name: "Anonymous",
      avatar: "/assets/icon.png",
    };
  };

  // Use the helper function to get author info
  const author = getAuthorInfo(blog);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full flex"
    >
      <motion.div
        className="flex flex-col w-full bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
        variants={hoverVariants}
        initial="initial"
        whileHover="hover"
      >
        {/* Card Image */}
        <div className="relative w-full h-56 overflow-hidden">
          <motion.img
            variants={imageVariants}
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/project/project-placeholder.jpg";
            }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          {/* Category badge */}
          <span className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider">
            {category}
          </span>

          {/* Bookmark button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleBookmark}
            className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full ${
              isBookmarked
                ? "bg-primary text-white"
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            <FiBookmark
              className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`}
            />
          </motion.button>

          {/* Reading time badge */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
            <FiClock className="w-3 h-3" />
            <span>{calculateReadTime()}</span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col flex-grow p-5 sm:p-6">
          {/* Date */}
          <div className="flex items-center mb-3 text-gray-500 dark:text-gray-400">
            <FiCalendar className="w-4 h-4 mr-2 text-primary/70" />
            <span className="text-sm">{displayDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-primary dark:hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>

          {/* Tags (if available) */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((tag, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                >
                  #{typeof tag === "string" ? tag : "tag"}
                </motion.span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          <div className="flex-grow overflow-hidden mb-5">
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm">
              {truncateText(description, 150)}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
            {/* Author */}
            <div className="flex items-center">
              <div className="relative">
                <img
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  src={author.avatar}
                  alt={author.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/icon.png";
                  }}
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">
                {author.name}
              </span>
            </div>

            {/* Read more link with subtle animation */}
            <motion.div
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link
                to={`/blog/${blogId}`}
                className="text-sm font-medium text-primary hover:text-primary-dark flex items-center gap-1"
              >
                Read more
                <FiArrowRight className="ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;
