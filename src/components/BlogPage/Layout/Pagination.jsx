import React from "react";
import { NextIcon, PreviousIcon } from "../../Portfolio/hooks/CustomTag";

const Pagination = () => {
  return (
    <div className="bg-gray-900 flex items-center border-t border-gray-400 justify-center py-6 lg:px-0 sm:px-6 px-4">
      <div className="lg:w-3/5 w-full flex items-center justify-between">
        <div className="flex items-center pt-3 text-gray-400 hover:text-indigo-700 cursor-pointer">
          <PreviousIcon />
          <p className="text-lg ml-3 font-medium leading-none text-indigo-400">
            Previous
          </p>
        </div>
        <div className="sm:flex hidden">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
            <p
              key={page}
              className={`text-lg font-medium leading-none cursor-pointer text-gray-400 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2 ${
                page === 4 ? "text-indigo-700" : ""
              }`}
            >
              {page}
            </p>
          ))}
        </div>
        <div className="flex items-center pt-3 text-gray-400 hover:text-indigo-700 cursor-pointer">
          <p className="text-lg font-medium leading-none mr-3">Next</p>
          <NextIcon />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
