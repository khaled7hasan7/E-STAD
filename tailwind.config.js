/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#096235", // Main green color for your app
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: Ensures better styling for forms
  ],
}
