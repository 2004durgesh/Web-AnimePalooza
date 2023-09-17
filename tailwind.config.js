/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pro-red': '#DB202C',
      },
    },
    fontFamily: {
      'pro-regular': ['Netflix-regular', 'sans-serif'],
      'pro-medium': ['Netflix-medium', 'sans-serif'],
      'pro-bold': ['Netflix-bold', 'sans-serif'],
    },
  },
  variants: {
    extend: {
      scale: ['group-hover', 'hover'],
    },
  },
  plugins: [],
}

