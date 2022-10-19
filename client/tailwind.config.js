/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-50': ' #e0fcff',
        'primary-100': ' #bef8fd',
        'primary-200': ' #87eaf2',
        'primary-300': '#54d1db',
        'primary-400': '#38bec9',
        'primary-500': '#2cb1bc',
        'primary-600': '#14919b',
        'primary-700': '#0e7c86',
        'primary-800': '#0a6c74',
        'primary-900': '#044e54',
      },
    },
  },
  extend: {
    spacing: {
      navh: '6rem',
    },
  },
  plugins: [],
};
