import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiGrid } from "react-icons/fi";

const Pagination = ({
  items,
  itemsPerPage,
  renderItem,
  containerClassName,
  scrollToTopId,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  // Calculate pagination whenever items or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(0);
    setItemOffset(0);

    const newPageCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
    setPageCount(newPageCount);

    updateCurrentItems(0);
  }, [items, itemsPerPage]);

  const updateCurrentItems = useCallback(
    (offset) => {
      const endOffset = Math.min(offset + itemsPerPage, items.length);
      setCurrentItems(items.slice(offset, endOffset));
    },
    [items, itemsPerPage]
  );

  const handlePageClick = useCallback(
    (event) => {
      const newOffset = Math.min(
        event.selected * itemsPerPage,
        Math.max(0, items.length - 1)
      );

      setItemOffset(newOffset);
      setCurrentPage(event.selected);
      updateCurrentItems(newOffset);

      setTimeout(() => {
        const element = document.getElementById(
          scrollToTopId || "latest-posts"
        );
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    },
    [items, itemsPerPage, updateCurrentItems, scrollToTopId]
  );

  // Calculate display range
  const startItem = items.length === 0 ? 0 : itemOffset + 1;
  const endItem = Math.min(itemOffset + itemsPerPage, items.length);

  return (
    <div className="w-full">
      {/* Content with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className={containerClassName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderItem(currentItems)}
        </motion.div>
      </AnimatePresence>

      {/* Pagination interface */}
      {pageCount > 1 && items.length > 0 && (
        <div className="mt-16 flex flex-col items-center">
          {/* Status bar */}
          <motion.div
            className="mb-8 w-full max-w-md bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 dark:from-primary/20 dark:via-primary/10 dark:to-secondary/20 backdrop-blur-sm p-1 rounded-full overflow-hidden flex items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Progress indicator */}
            <div
              className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
              style={{
                width: `${((currentPage + 1) / pageCount) * 100}%`,
                transition: "width 0.5s ease",
              }}
            ></div>
          </motion.div>

          {/* Main pagination controls */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Info badge */}
            <motion.div
              className="text-sm bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <FiGrid className="text-primary" />
              <span className="text-gray-600 dark:text-gray-300">
                <b className="text-primary">
                  {startItem}-{endItem}
                </b>{" "}
                of <b className="text-primary">{items.length}</b>
              </span>
            </motion.div>

            {/* Pagination buttons */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ReactPaginate
                breakLabel={<span className="text-primary">•••</span>}
                nextLabel={<NextButton />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={window.innerWidth < 640 ? 1 : 2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                forcePage={currentPage}
                previousLabel={<PrevButton />}
                renderOnZeroPageCount={null}
                pageClassName="inline-block"
                pageLinkClassName="page-btn"
                containerClassName="flex items-center gap-2"
                activeClassName="active-page"
                previousClassName="nav-btn-container"
                nextClassName="nav-btn-container"
                breakClassName="break-item"
                disabledClassName="disabled"
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx="true">{`
        /* Page buttons */
        .page-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          font-weight: 500;
          position: relative;
          border: 2px solid transparent;
          background-color: rgba(var(--color-primary-rgb), 0.05);
          color: var(--color-text);
          transition: all 0.25s ease;
        }

        /* Active page */
        .active-page .page-btn {
          background: linear-gradient(
            to bottom right,
            var(--color-primary),
            var(--color-secondary)
          );
          color: white;
          font-weight: 600;
          transform: scale(1.1);
          box-shadow: 0 3px 10px rgba(var(--color-primary-rgb), 0.3);
        }

        /* Hover effects */
        .page-btn:hover:not(.active-page .page-btn) {
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }

        /* Navigation buttons */
        .nav-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
          height: 38px;
          border-radius: 19px;
          font-weight: 500;
          background-color: #fff;
          color: var(--color-text);
          border: 1px solid rgba(var(--color-primary-rgb), 0.2);
          transition: all 0.2s ease;
        }

        .nav-btn:hover:not(.disabled .nav-btn) {
          background: linear-gradient(
            to right,
            rgba(var(--color-primary-rgb), 0.05),
            rgba(var(--color-secondary-rgb), 0.05)
          );
          border-color: var(--color-primary);
        }

        /* Disabled state */
        .disabled .nav-btn {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Dark mode adjustments */
        html.dark .page-btn {
          background-color: rgba(var(--color-primary-rgb), 0.15);
          color: var(--color-text-dark);
        }

        html.dark .nav-btn {
          background-color: #1f2937;
          color: var(--color-text-dark);
          border-color: rgba(var(--color-primary-rgb), 0.3);
        }

        html.dark .active-page .page-btn {
          color: white;
          box-shadow: 0 3px 10px rgba(var(--color-primary-rgb), 0.5);
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .page-btn {
            width: 32px;
            height: 32px;
            font-size: 0.875rem;
          }

          .nav-btn {
            padding: 0 12px;
            height: 32px;
            font-size: 0.875rem;
          }

          .break-item {
            display: none;
          }
        }

        /* CSS Variables */
        :root {
          --color-primary: rgb(79, 70, 229);
          --color-primary-rgb: 79, 70, 229;
          --color-secondary: rgb(67, 56, 202);
          --color-secondary-rgb: 67, 56, 202;
          --color-text: #1f2937;
          --color-text-dark: #f9fafb;
        }
      `}</style>
    </div>
  );
};

// Navigation button components
const PrevButton = () => (
  <div className="nav-btn">
    <FiChevronLeft className="h-4 w-4 mr-1" />
    <span className="hidden sm:inline">Prev</span>
  </div>
);

const NextButton = () => (
  <div className="nav-btn">
    <span className="hidden sm:inline">Next</span>
    <FiChevronRight className="h-4 w-4 ml-1" />
  </div>
);

export default Pagination;
