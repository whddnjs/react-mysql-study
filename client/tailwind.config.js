/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'nanum-light': ['nanum-light'],
        'nanum-regular': ['nanum-regular'],
        'nanum-bold': ['nanum-bold'],
        'nanum-eb': ['nanum-eb'],
      },
    },
  },
  plugins: [],
};
