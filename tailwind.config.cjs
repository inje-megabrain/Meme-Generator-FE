/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
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
