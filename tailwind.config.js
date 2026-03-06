/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        consitec: {
          primary: "#0033A0",
          secondary: "#0055D4"
        }
      },
      fontFamily: {
        cambria: ["Cambria", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};
