/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563eb",
          light: "#60a5fa",
          dark: "#1d4ed8",
        },
        secondary: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
          dark: "#5b21b6",
        },
        headingcolor: "#1e293b",
        bgShade: "#f8fafc",
        body: "#334155",
        "custom-blue": "#080f1f",
        "custom-dark-blue": "#000000",
        "dark-white": "#8a9fb1",
        "blog-bg": "#111827",
        "blog-component-bg": "#1f2937",
        "border-color": "#374151",
      },
    },
  },
  plugins: [],
};
