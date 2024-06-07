/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './script.js',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-24': 'span 24/ span 24',
      },
      fontFamily: {
        poppins: 'poppins',
      },
    },
  },
  plugins: [],
};
