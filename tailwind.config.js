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
        'custom-primary': '#7c3ff2',
        'custom-half-primary': 'rgba(123, 63, 242, 0.3)',
        'black': '#1C0F23',
        'black-font':'#D4D4D8',
        'custom-ash': '#f0f0f0',
      },
    },
  },
  plugins: [require('daisyui'),],

};


