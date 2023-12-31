/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#5E3BEE",
        headingcolor: "#282938",
        bgShade: "#F5FCFA",
        bgcom: "#F5FCFF",
        dribble: "#E62872",
        body: "#1C1E53",
        "custom-blue": "#080f1f",
        "custom-dark-blue": "#19203a",
        "dark-white": "#8a9fb1",
        "blog-bg": "#111827",
        "blog-component-bg": "#1f2937",
        "border-color": "#374151",
      },
    },
  },
  plugins: [],
};
