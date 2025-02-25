import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Category = ({
  categories,
  onFilterBlogsByCategory,
  selectedCategory,
}) => {
  const containerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check overflow and scroll capabilities
  const checkScrollability = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Check if overflowing
    const isOverflow = container.scrollWidth > container.clientWidth;
    setIsOverflowing(isOverflow);

    // Check if can scroll left/right
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollWidth > container.clientWidth + container.scrollLeft
    );

    // Check if on mobile
    setIsMobile(window.innerWidth < 768);
  };

  // Initial check and setup resize listener
  useEffect(() => {
    checkScrollability();

    const handleResize = () => {
      checkScrollability();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  // Update scroll buttons when scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollWidth > container.clientWidth + container.scrollLeft
      );
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll functions for buttons
  const scrollLeft = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  // For wheel scrolling - prevent vertical scrolling when hovering over the category bar
  const handleWheel = (e) => {
    if (!isOverflowing) return;

    // If shift key is pressed, let default behavior work
    if (e.shiftKey) return;

    // Otherwise, prevent default scroll and manually scroll horizontally
    e.preventDefault();
    containerRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="relative w-full my-4">
      {/* Navigation arrows for non-mobile */}
      {isOverflowing && !isMobile && (
        <>
          {/* Left scroll button */}
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md transition-opacity duration-200 ${
              canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-5 h-5 text-primary" />
          </button>

          {/* Right scroll button */}
          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md transition-opacity duration-200 ${
              canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-5 h-5 text-primary" />
          </button>

          {/* Gradient indicators */}
          <div
            className={`absolute left-6 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
              canScrollLeft ? "opacity-80" : "opacity-0"
            }`}
          />
          <div
            className={`absolute right-6 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
              canScrollRight ? "opacity-80" : "opacity-0"
            }`}
          />
        </>
      )}

      {/* Category container - with proper wheel handling */}
      <div className="mx-auto max-w-full px-8">
        <motion.div
          ref={containerRef}
          className="flex overflow-x-auto py-2 px-1 scrollbar-hide scroll-smooth"
          onWheel={handleWheel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3 sm:gap-4 mx-auto min-w-max">
            {categories.map((category, index) => (
              <CategoryButton
                key={category}
                category={category}
                isSelected={selectedCategory === category}
                onClick={() => onFilterBlogsByCategory(category)}
                index={index}
                totalCategories={categories.length}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile scroll hint */}
      {isOverflowing && isMobile && (
        <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-400 animate-pulse">
          ← Swipe to see more categories →
        </div>
      )}

      <style jsx="true">{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

const CategoryButton = ({
  category,
  isSelected,
  onClick,
  index,
  totalCategories,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
        isSelected
          ? "text-white"
          : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: Math.min(index * 0.05, 0.5), // Limit maximum delay
      }}
    >
      {/* Animated background for selected button */}
      {isSelected && (
        <motion.div
          layoutId="selectedCategory"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Badge for "All" category */}
      {category === "All" && !isSelected && totalCategories > 1 && (
        <span className="absolute right-0 top-0 -mt-1 -mr-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-xs text-white justify-center items-center">
            {totalCategories - 1}
          </span>
        </span>
      )}

      {/* Button text */}
      <span className={`relative z-10 ${isSelected ? "text-white" : ""}`}>
        {category}
      </span>
    </motion.button>
  );
};

export default Category;
