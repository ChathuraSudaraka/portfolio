// Pagination.jsx
import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      forcePage={currentPage} // Set the active page manually
      renderOnZeroPageCount={null}
      containerClassName={"flex justify-end my-4 pt-5"}
      pageClassName={"mx-2 flex items-center"} // Set flex on each page item
      pageLinkClassName={
        "px-3 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition duration-300 ease-in-out"
      }
      activeClassName={"bg-blue-500 rounded text-white"}
      previousClassName={
        "px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-300 ease-in-out"
      }
      nextClassName={
        "px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-300 ease-in-out"
      }
    />
  );
};

export default Pagination;
