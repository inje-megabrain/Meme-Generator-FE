/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Gaegu', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: false,
  },
  daisyui: {
    themes: ['light', 'dark'],
  },
  darkMode: 'media',
};
