/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      spacing: {
        '15': '3.75rem', // 60px
      }
    },
  },
  plugins: [],
}
