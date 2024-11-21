/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [ 
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#096235",
      },
    },
  },
  plugins: [],
}

