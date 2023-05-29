/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Black Han Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  corePlugins: {
    preflight: false,
  },
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
  },
};
