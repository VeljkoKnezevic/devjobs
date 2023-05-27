/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      violet: "#5964E0",
      "light-violet": "#939BF4",
      "very-dark-blue": "#19202D",
      midnight: "#121721",
      white: "#ffffff",
      "light-gray": "#F4F6F8",
      gray: "#9DAEC2",
      "dark-gray": " #6E8098",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      kumbh: "'Kumbh Sans', sans-serif",
    },
    extend: {},
  },
  plugins: [],
};
