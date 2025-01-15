/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '5%',
        sm: '1rem',
      },
    },
    extend: {
      display: {
        'inline-masonry': 'inline-masonry',
      },
      screens: {
        'xs': '490px',
      },
      fontFamily: {
        'manrope': ["Manrope", 'sans-serif'],
        'fugaz': ["Fugaz One", 'serif'],
      },
      colors: {
        'custom-primary': '#e8092e',
        'custom-half-primary': '#faced5',
        'black':'#1e1e1e',
        'black-font':'#797979',
        'custom-ash': '#f0f0f0',
      },
    },
  },
  plugins: [require('daisyui'),],

};


