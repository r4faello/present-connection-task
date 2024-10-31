/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundGradientFrom: '#e3d2c0',
        backgroundGradientTo: '#ECF0F1',
        first: "#2B2118",
        second: "#B99266",
        third: "#F7F3E3",
        fourth: "#6F1A07",
        inputFieldBorder: "#E0CAB2"
      },
      fontFamily: {
        sans: ['"Proxima Nova"', 'sans-serif'],
      },
      boxShadow: {
        'custom': '0 0px 45px rgba(225, 194, 168, 1)', // Custom shadow with x, y, blur, spread, and color
      },
      
    },
  },
  plugins: [],
};