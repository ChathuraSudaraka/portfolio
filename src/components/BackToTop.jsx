import React, { useState, useEffect } from "react";
import { Arrow } from "./hooks/CustomTag";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      // Show the button when the user scrolls down 200px
      setIsVisible(true);
    } else {
      // Hide the button when the user is at the top
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scroll behavior
      duration: 500, // Specify the duration in milliseconds (e.g., 500ms)
    });
  };

  useEffect(() => {
    // Add a scroll event listener to track the scroll position
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-slate-400">
      <div
        className={`fixed ${
          isVisible ? "bottom-5" : "-bottom-16"
        } right-0 w-16 bg-white rounded-l-full shadow-lg p-1`}
      >
        <button
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 dark:border-yellow-500 border-gray-600`}
          onClick={scrollToTop}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export default BackToTop;
