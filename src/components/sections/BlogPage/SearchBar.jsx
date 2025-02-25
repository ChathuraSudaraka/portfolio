import React from "react";
import { motion } from "framer-motion";
import { PlaceholdersAndVanishInput } from "../../ui/placeholders-and-vanish-input";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="relative">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;
