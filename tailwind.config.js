/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}","./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        bai: ['Bai Jamjuree', 'sans-serif'],
      },
      colors: {
        wizardGreen: "#16f293"
      }
    },
  },
  plugins: [],
}

