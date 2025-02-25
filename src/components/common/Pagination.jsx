import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({
  items,
  itemsPerPage,
  renderItem,
  containerClassName,
  pageLinkClassName,
  activeClassName,
  previousClassName,
  nextClassName,
  scrollToTopId
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  // Calculate pagination whenever items or itemsPerPage changes
  useEffect(() => {
    // Reset to page 1 when items change
    setCurrentPage(0);
    setItemOffset(0);
    
    // Calculate page count
    const newPageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
    setPageCount(newPageCount);
    
    // Update current items
    updateCurrentItems(0);
  }, [items, itemsPerPage]);

  // Update current items based on offset
  const updateCurrentItems = useCallback((offset) => {
    const endOffset = Math.min(offset + itemsPerPage, items.length);
    setCurrentItems(items.slice(offset, endOffset));
  }, [items, itemsPerPage]);

  // Handle page change
  const handlePageClick = useCallback((event) => {
    // Calculate new offset, ensuring it's within bounds
    const newOffset = Math.min(
      event.selected * itemsPerPage,
      Math.max(0, items.length - 1)
    );
    
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
    updateCurrentItems(newOffset);
    
    // Scroll to top with a slight delay for animation
    setTimeout(() => {
      const element = document.getElementById(scrollToTopId || 'latest-posts');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }, [items, itemsPerPage, updateCurrentItems, scrollToTopId]);

  // Calculate display range for pagination info
  const startItem = items.length === 0 ? 0 : itemOffset + 1;
  const endItem = Math.min(itemOffset + itemsPerPage, items.length);

  return (
    <div className="container mx-auto w-full">
      {/* Render items with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className={containerClassName}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderItem(currentItems)}
        </motion.div>
      </AnimatePresence>

      {/* Only show pagination and info if we have more than one page */}
      {pageCount > 1 && items.length > 0 && (
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Pagination info */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-medium text-gray-900 dark:text-gray-200">{startItem}</span> to{" "}
            <span className="font-medium text-gray-900 dark:text-gray-200">{endItem}</span> of{" "}
            <span className="font-medium text-gray-900 dark:text-gray-200">{items.length}</span> results
          </div>
          
          {/* Pagination controls */}
          <ReactPaginate
            breakLabel="..."
            nextLabel={<NextButton />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={window.innerWidth < 640 ? 1 : 3}
            marginPagesDisplayed={window.innerWidth < 640 ? 1 : 2}
            pageCount={pageCount}
            forcePage={currentPage}
            previousLabel={<PreviousButton />}
            renderOnZeroPageCount={null}
            pageClassName="inline-block"
            pageLinkClassName={`${pageLinkClassName || 'w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/50'}`}
            containerClassName="flex flex-wrap items-center justify-center gap-2"
            activeClassName={activeClassName || 'active'}
            activeLinkClassName="bg-primary text-white border-primary hover:bg-primary hover:text-white"
            previousClassName={previousClassName || 'prev-btn'}
            nextClassName={nextClassName || 'next-btn'}
            breakClassName="text-gray-500 dark:text-gray-400"
            disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
          />
        </motion.div>
      )}
    </div>
  );
};

const PreviousButton = () => (
  <div className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/50">
    <FiChevronLeft className="w-4 h-4" />
    <span className="hidden sm:inline text-sm font-medium">Previous</span>
  </div>
);

const NextButton = () => (
  <div className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/50">
    <span className="hidden sm:inline text-sm font-medium">Next</span>
    <FiChevronRight className="w-4 h-4" />
  </div>
);

export default Pagination;
