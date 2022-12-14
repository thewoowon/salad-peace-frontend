/** @type {import('tailwindcss').Config} */

const colors =require("tailwindcss/colors");
module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    
  ],
  darkMode: false, // or 'media' or 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        lime:colors.lime,
      }
    },
  },
  variants:{
    extends:{}
  },
  plugins: [],
}
