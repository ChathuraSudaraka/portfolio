import React, { useState, useEffect } from "react";
import { Arrow } from "./hooks/CustomTag";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Show/hide the button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? "block" : "hidden"
      } fixed bottom-6 right-5 bg-blue-500 hover:bg-blue-600 text-white py-2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-300`}
    >
      <Arrow fillRule="evenodd" />
    </button>
  );
};

export default BackToTop;