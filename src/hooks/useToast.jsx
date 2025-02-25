import { Toaster } from "react-hot-toast";

const UseToast = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        className: "text-sm sm:text-base",
        duration: 5000,
        style: {
          background: document.documentElement.classList.contains("dark")
            ? "#1f2937"
            : "#ffffff",
          color: document.documentElement.classList.contains("dark")
            ? "#f9fafb"
            : "#000000",
          border: document.documentElement.classList.contains("dark")
            ? "1px solid #374151"
            : "1px solid #e5e7eb",
          borderRadius: "8px",
        },
      }}
    />
  );
};

export default UseToast;
