/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3264DF",  
        secondary: "#D9DFFF", 
        black: "#000000",
        white: "#FFFFFF",
    },
  },
  plugins: [],
  }
}