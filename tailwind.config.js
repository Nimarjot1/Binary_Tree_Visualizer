/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'fab',
    'fa-github',
    'fa-linkedin',
    'text-blue-400',
    'text-gray-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
