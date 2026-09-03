/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF9EE',
          100: '#FAF1D6',
          200: '#F5E3AD',
          300: '#EED180',
          400: '#E4BE53',
          500: '#D4AF37',
          600: '#B58A24',
          700: '#9E7418',
          800: '#7E560C',
          900: '#5F3E06',
        },
        solus: {
          bgDark: '#0E0E12',
          cardDark: '#18181D',
          textDark: '#F6F4EE',
          mutedDark: '#A39D90',
          accentDark: '#D4AF37',
          borderDark: '#2C271E',

          bgLight: '#FAF8F5',
          cardLight: '#FFFFFF',
          textLight: '#1F1C18',
          mutedLight: '#6B6357',
          accentLight: '#9E7418',
          borderLight: '#E8E2D5',
        },
        highlight: {
          yellow: '#fef08a',
          green: '#bbf7d0',
          blue: '#bfdbfe',
          pink: '#fbcfe8',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'Playfair Display', 'serif'],
        crimson: ['Crimson Pro', 'Lora', 'serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['Crimson Pro', 'Lora', 'Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
        heading: ['Cinzel', 'Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
