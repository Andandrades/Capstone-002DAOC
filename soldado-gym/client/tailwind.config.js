/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "button-primary": "#3936C1",
        
        "gradiant" : "rgb(255, 255, 255);"
      }
    },

  },
  plugins: [],
}

