import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cssTransition } from "react-toastify";

// Custom transition for toasts that matches site animations
const customTransition = cssTransition({
  enter: "animate__animated animate__fadeIn",
  exit: "animate__animated animate__fadeOut",
  duration: 300,
});

// Custom toast component to export for use in other components
export const useCustomToast = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Update theme detection
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };
    
    updateTheme(); // Initial check
    
    // Set up observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateTheme();
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    // Clean up observer on unmount
    return () => observer.disconnect();
  }, []);

  // Custom toast methods with consistent styling
  const showToast = {
    success: (message, options = {}) => {
      return toast.success(message, {
        position: "bottom-center",
        ...options,
        className: `${isDarkTheme ? 'dark-toast' : 'light-toast'}`,
      });
    },
    error: (message, options = {}) => {
      return toast.error(message, {
        position: "bottom-center",
        ...options,
        className: `${isDarkTheme ? 'dark-toast' : 'light-toast'}`,
      });
    },
    info: (message, options = {}) => {
      return toast.info(message, {
        position: "bottom-center",
        ...options,
        className: `${isDarkTheme ? 'dark-toast' : 'light-toast'}`,
      });
    },
    warning: (message, options = {}) => {
      return toast.warning(message, {
        position: "bottom-center",
        ...options,
        className: `${isDarkTheme ? 'dark-toast' : 'light-toast'}`,
      });
    },
    loading: (message, options = {}) => {
      return toast.loading(message, {
        position: "bottom-center",
        ...options,
        className: `${isDarkTheme ? 'dark-toast' : 'light-toast'}`,
      });
    },
    dismiss: toast.dismiss
  };

  return { showToast, isDarkTheme };
};

// Custom Toast Container with theme-aware styling
const UseToast = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    document.documentElement.classList.contains("dark")
  );
  
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains("dark"));
    };
    
    updateTheme(); // Initial check
    
    // Set up observer for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateTheme();
          
          // Force update all existing toasts
          const toastElements = document.querySelectorAll('.Toastify__toast');
          const isDark = document.documentElement.classList.contains("dark");
          
          toastElements.forEach(el => {
            if (isDark) {
              el.classList.add('dark-toast');
              el.classList.remove('light-toast');
            } else {
              el.classList.add('light-toast');
              el.classList.remove('dark-toast');
            }
          });
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    // Clean up observer on unmount
    return () => observer.disconnect();
  }, []);
  
  // Add custom CSS for toast styling
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .Toastify__toast-container {
        width: auto !important;
        max-width: 450px;
        padding: 0 !important;
      }
      
      .Toastify__toast {
        border-radius: 12px;
        padding: 12px 16px;
        margin-bottom: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        border: 1px solid;
      }
      
      .light-toast {
        background-color: rgba(255, 255, 255, 0.95) !important;
        color: #1f2937 !important;
        border-color: rgba(229, 231, 235, 0.8) !important;
      }
      
      .dark-toast {
        background-color: rgba(31, 41, 55, 0.95) !important;
        color: #f9fafb !important;
        border-color: rgba(55, 65, 81, 0.8) !important;
      }
      
      .Toastify__toast-icon {
        margin-right: 12px !important;
      }
      
      .Toastify__progress-bar {
        height: 3px !important;
      }
      
      .Toastify__toast--success .Toastify__progress-bar {
        background: linear-gradient(90deg, #10b981, #059669) !important;
      }
      
      .Toastify__toast--error .Toastify__progress-bar {
        background: linear-gradient(90deg, #ef4444, #dc2626) !important;
      }
      
      .Toastify__toast--info .Toastify__progress-bar {
        background: linear-gradient(90deg, #3b82f6, #2563eb) !important;
      }
      
      .Toastify__toast--warning .Toastify__progress-bar {
        background: linear-gradient(90deg, #f59e0b, #d97706) !important;
      }
      
      .Toastify__toast--loading .Toastify__progress-bar {
        background: linear-gradient(90deg, #6366f1, #4f46e5) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={isDarkTheme ? "dark" : "light"}
      className={isDarkTheme ? "dark-toast-container" : "light-toast-container"}
      toastClassName={isDarkTheme ? "dark-toast" : "light-toast"}
    />
  );
};

export default UseToast;
