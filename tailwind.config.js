/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4F1EA",
        ink: "#2B2B26",
        olive: {
          DEFAULT: "#3F4F38",
          light: "#5C6E52",
          pale: "#8B9485",
        },
        gold: "#B08D57",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
    },
  },
  plugins: [],
};
