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
        xs: '1rem',
      },
    },
    extend: {
      display: {
        'inline-masonry': 'inline-masonry',
      },
      screens: {
        'xs': '490px',
        // 'xss': '355px',
      },
      fontFamily: {
        'manrope': ["Manrope", 'sans-serif'],
        'fugaz': ["Fugaz One", 'serif'],
      },
      colors: {
        'custom-primary': '#7c3ff2',
        'custom-half-primary': 'rgba(123, 63, 242, .3)',
        'black': '#1C0F23',
        'font-color':'#756F7D',
        'custom-gray':'#e6e6e6',
        'custom-metalic-gray':'#837c8526'
      },
    },
  },
  plugins: [require('daisyui'),],

};


