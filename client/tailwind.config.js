/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FAF8F3',
          DEFAULT: '#F5F1E8',
          dark: '#E8E3D6'
        },
        gold: {
          light: '#E8D5B7',
          DEFAULT: '#C9A961',
          dark: '#A68A52'
        },
        brown: {
          light: '#8B7355',
          DEFAULT: '#5C4033',
          dark: '#3E2723'
        }
      }
    }
  },
  plugins: []
};
