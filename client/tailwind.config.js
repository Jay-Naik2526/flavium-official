/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        racing: {
          dark: '#1a1f1a',
          black: '#0a0a0a',
          accent: '#c8f550',
          light: '#e8e8e3',
        }
      },
      fontFamily: {
        brier: ["Brier", "sans-serif"],
        mona: ["Mona Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}