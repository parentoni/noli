/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "noli-text": "#2A2A2A",
        "noli-primary": "#FEE54C",
        "noli-primary-text": "#F2D40D",
        "noli-border": "#E6E6E6",
        "noli-neutral": "#FAFAFA",
        "noli-neutral-text": "#5F5F5F",
        "noli-background": "#FFFEFA"
      }
    },
  },
  plugins: [],
}

