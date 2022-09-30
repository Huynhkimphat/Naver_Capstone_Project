/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light_blue: 'rgba(249, 249, 249, 0.15);',
        dark_blue: '#2A254B'
      }
    },
  },
  plugins: [],
}