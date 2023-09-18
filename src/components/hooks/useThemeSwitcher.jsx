import React, { useEffect, useState } from "react";

const useThemeSwitcher = () => {
  const perferDarkQuery = "(prefers-color-scheme: dark)";
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(perferDarkQuery);
    const userPref = window.localStorage.getItem("theme");
    const initialMode = userPref || (mediaQuery.matches ? "dark" : "light");
    
    document.documentElement.classList.toggle("dark", initialMode === "dark");
    
    const handleChange = () => {
      const mode = mediaQuery.matches ? "dark" : "light";
      window.localStorage.setItem("theme", mode);
      document.documentElement.classList.toggle("dark", mode === "dark");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const [mode, setMode] = useState(() => {
    const userPref = window.localStorage.getItem("theme");
    const mediaQuery = window.matchMedia(perferDarkQuery);
    return userPref || (mediaQuery.matches ? "dark" : "light");
  });

  useEffect(() => {
    if (mode === "dark") {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return [mode, setMode];
};

export default useThemeSwitcher;
