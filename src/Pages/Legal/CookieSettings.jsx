import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LegalLayout from "../../components/Layouts/LegalLayout";
import { toast } from "react-toastify";
import GradientButton from "../../components/ui/gradient-button";

const CookieSettings = () => {
  // Load preferences from localStorage on initial load
  const [preferences, setPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem("portfolioCookiePreferences");
    return savedPreferences
      ? JSON.parse(savedPreferences)
      : {
          necessary: true,
          functional: false,
          analytics: false,
        };
  });

  const cookieTypes = [
    {
      type: "necessary",
      title: "Essential Cookies",
      description:
        "Required for basic portfolio functionality like theme preferences.",
      required: true,
    },
    {
      type: "functional",
      title: "Functional Cookies",
      description:
        "Enhance your experience by remembering your preferences and settings.",
      features: [
        "Remember dark/light mode preference",
        "Save language preferences",
        "Optimize portfolio loading",
      ],
    },
    {
      type: "analytics",
      title: "Analytics Cookies",
      description:
        "Help me understand how visitors interact with my portfolio.",
      features: [
        "Anonymous usage statistics",
        "Page view information",
        "Portfolio section engagement",
      ],
    },
  ];

  const handleToggle = (type) => {
    if (type === "necessary") return; // Can't toggle necessary cookies
    setPreferences((prev) => {
      const newPreferences = {
        ...prev,
        [type]: !prev[type],
      };

      // Save to localStorage immediately on toggle
      localStorage.setItem(
        "portfolioCookiePreferences",
        JSON.stringify(newPreferences)
      );

      return newPreferences;
    });
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      "portfolioCookiePreferences",
      JSON.stringify(preferences)
    );

    // Show success toast notification
    toast.success("Your preferences have been saved!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: "🍪",
    });

    // Trigger an event that the app can listen to for updating cookie behavior
    window.dispatchEvent(new Event("cookiePreferencesUpdated"));
  };

  // Detect changes in dark/light mode for toast styling
  useEffect(() => {
    document.title = "Cookie Settings - Chathura Sudaraka";
    const handleThemeChange = () => {
      // This will ensure toasts match the current theme
      const isDarkMode = document.documentElement.classList.contains("dark");
      document.documentElement.setAttribute(
        "data-theme",
        isDarkMode ? "dark" : "light"
      );
    };

    // Set initial theme
    handleThemeChange();

    // Listen for theme changes
    window.addEventListener("themeChanged", handleThemeChange);

    return () => {
      window.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  return (
    <LegalLayout>
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="container mx-auto px-4 py-20 relative">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 px-4 py-2 rounded-full mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-primary to-secondary" />
                </span>
                <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Portfolio Preferences
                </p>
              </div>

              {/* Title Tile */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Cookie <span className="text-primary">Settings</span>
              </h1>

              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Customize how my portfolio uses cookies to enhance your
                experience
              </p>
            </motion.div>
          </div>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/50 dark:bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50 shadow-lg"
            >
              {cookieTypes.map((cookie, index) => (
                <motion.div
                  key={cookie.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-8 last:mb-0"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {cookie.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {cookie.description}
                      </p>
                    </div>
                    {/* Enhanced Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[cookie.type]}
                        onChange={() =>
                          !cookie.required && handleToggle(cookie.type)
                        }
                        disabled={cookie.required}
                        className="sr-only peer"
                      />
                      <div
                        className={`relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer 
                      ${preferences[cookie.type] ? "bg-primary" : "bg-gray-400"}
                      primary-disabled:bg-gray-300 peer-disabled:cursor-not-allowed`}
                      >
                        <div
                          className={`absolute left-[4px] top-[4px] bg-white w-5 h-5 rounded-full transition-all duration-300
                        ${
                          preferences[cookie.type]
                            ? "translate-x-7"
                            : "translate-x-0"
                        }`}
                        />
                      </div>
                    </label>
                  </div>
                  {/* Feature List */}
                  {cookie.features && (
                    <ul className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
                      {cookie.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}

              {/* Save Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex justify-center"
              >
                <GradientButton
                  onClick={handleSavePreferences}
                  className="px-8 py-3"
                >
                  Save Preferences
                </GradientButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
};

export default CookieSettings;
