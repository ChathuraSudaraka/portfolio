// Article.js
import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../../context/data";
import { FaBlog, FaCalendar, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const BlogCard = ({ blog, index }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      y: 30
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: "spring",
        duration: 1,
        delay: index * 0.2,
        bounce: 0.3
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <div className="relative bg-gradient-to-b from-white/80 to-white/30 dark:from-gray-900/80 dark:to-gray-900/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image container */}
        <motion.div 
          className="relative h-[220px] w-full overflow-hidden"
          whileHover="hover"
        >
          <motion.div
            variants={imageVariants}
            className="absolute inset-0"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"
              variants={{
                hover: { opacity: 0.9 }
              }}
            />
          </motion.div>

          {/* Category badge with animation */}
          <motion.div 
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-sm text-white border border-white/10 rounded-full">
              {blog.category}
            </span>
          </motion.div>
        </motion.div>

        {/* Content section with updated colors */}
        <motion.div 
          className="flex-1 flex flex-col p-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <FaCalendar className="w-4 h-4" />
            {blog.date}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt with flex grow */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 flex-1">
            {blog.content1}
          </p>

          {/* Footer with updated styling */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50 mt-auto relative z-20">
            {/* Author section */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="/assets/icon.png"
                alt="Author"
                className="w-8 h-8 rounded-full border border-gray-200/50 dark:border-gray-700/50"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Chathura Sudaraka
              </span>
            </motion.div>

            {/* Read button with better interaction */}
            <motion.div
              className="relative z-30"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToTop();
                  window.location.href = `/blog/${blog.id}`;
                }}
                className="flex items-center gap-2 text-secondary hover:text-secondary/80 transition-all duration-300 px-3 py-1 rounded-full hover:bg-secondary/10"
              >
                <span className="text-sm font-medium">Read</span>
                <FaArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 via-white/5 to-transparent dark:from-secondary/20 dark:via-gray-800/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-0" />
      </div>
    </motion.div>
  );
};

const Article = () => {
  return (
    <section className="relative py-20" id="blog">
      <div className="container px-4">
        {/* Header */}
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
            <p className="text-sm font-medium text-secondary">Latest Articles</p>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-secondary">Blog</span>
          </h2>

          <Link
            to="/blog"
            onClick={scrollToTop}
            className="inline-flex items-center px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-full transition-colors duration-200"
          >
            <FaBlog className="w-5 h-5 mr-2" />
            <span>View All Posts</span>
          </Link>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.slice(0, 6).map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Article;
