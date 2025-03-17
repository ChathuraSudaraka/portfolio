import React from "react";

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-secondary to-transparent" />
  </>
);

export const GradientButton = ({ 
  children, 
  className = "", 
  isLoading,
  asChild,
  type = "button",
  ...props 
}) => {
  const Component = asChild ? "div" : "button";
  
  return (
    <Component
      type={asChild ? undefined : type}
      className={`
        relative cursor-pointer group/btn 
        bg-white dark:bg-gray-900
        hover:bg-gray-50 dark:hover:bg-gray-800
        text-gray-900 dark:text-white
        border border-gray-200 dark:border-gray-800
        shadow-sm hover:shadow-md
        transition-all duration-300
        rounded-lg
        backdrop-blur-sm
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={isLoading}
      {...props}
    >
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
      
      {isLoading ? (
        <span className="flex items-center gap-2 text-primary">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              fill="none" 
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
            />
          </svg>
          Processing...
        </span>
      ) : children}
      
      <BottomGradient />
    </Component>
  );
};

export default GradientButton;
