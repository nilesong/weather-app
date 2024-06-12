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
      backgroundImage: {
        'weather-app': "url('./img/background.jpg')",
      },
      colors: {
        black: {
          DEFAULT: '#020403', 100: '#000101', 200: '#010101', 300: '#010202', 400: '#010302', 500: '#020403', 600: '#244735', 700: '#458a68', 800: '#79bb9a', 900: '#bcddcd',
        },
        umber: {
          DEFAULT: '#645347', 100: '#14110e', 200: '#29221d', 300: '#3d332b', 400: '#51433a', 500: '#645347', 600: '#8d7564', 700: '#ab9789', 800: '#c7bab0', 900: '#e3dcd8',
        },
        raisin_black: {
          DEFAULT: '#1A212F', 100: '#050609', 200: '#0a0d12', 300: '#0f131c', 400: '#141a25', 500: '#1a212f', 600: '#384867', 700: '#586f9f', 800: '#8e9fc1', 900: '#c6cfe0',
        },
        black_2: {
          DEFAULT: '#000001', 100: '#000000', 200: '#000000', 300: '#000000', 400: '#000000', 500: '#000001', 600: '#000066', 700: '#0000cc', 800: '#3333ff', 900: '#9999ff',
        },
        black_3: {
          DEFAULT: '#000006', 100: '#000001', 200: '#000002', 300: '#000003', 400: '#000004', 500: '#000006', 600: '#00006a', 700: '#0000cf', 800: '#3535ff', 900: '#9a9aff',
        },
      },
    },
  },
  plugins: [],
};
