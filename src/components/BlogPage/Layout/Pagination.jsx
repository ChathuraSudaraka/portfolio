import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
  items,
  itemsPerPage,
  renderItem,
  containerClassName,
  pageLinkClassName,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  return (
    <div className="container mx-auto px-4">
      <div className={containerClassName}>{renderItem(currentItems)}</div>
      <div className="flex items-center justify-between mt-8">
        <p className="ml-4 text-sm text-gray-600 hidden sm:block">
          Displaying {itemStart} to {endOffset} of {items.length} items
        </p>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          pageLinkClassName={`px-3 py-1 font-semibold rounded-md hover:bg-gray-300 dark:text-[#374151] ${pageLinkClassName}`}
          containerClassName="flex items-center justify-center"
          activeClassName="bg-[#000] dark:bg-[#FFFF] rounded-full text-white dark:text-white" // Set active button styling here
          previousClassName="px-3 py-1 text-gray-700 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:border-primary-500"
          nextClassName="px-3 py-1 text-gray-700 font-semibold rounded-md hover:bg-gray-300 focus:outline-none focus:border-primary-500"
        />
      </div>
    </div>
  );
};

export default Pagination;
