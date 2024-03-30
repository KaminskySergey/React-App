/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: {'min': '320px', 'max': '767px'},
      md: '768px',
      lg: '1280px',
      xl: '1440px',
    },
  },
  plugins: [],
}