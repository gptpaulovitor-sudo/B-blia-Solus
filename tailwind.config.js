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
        crimson: {
          50: '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f98080',
          500: '#8B1C24',
          600: '#7A151C',
          700: '#681117',
          800: '#520d12',
          900: '#3d080c',
        },
        solus: {
          bgDark: '#121212',
          cardDark: '#1C1C1E',
          textDark: '#EAE6DF',
          mutedDark: '#A1A1AA',
          accentDark: '#8B1C24',
          borderDark: '#27272A',

          bgLight: '#F9F7F1',
          cardLight: '#FFFFFF',
          textLight: '#232323',
          mutedLight: '#52525B',
          accentLight: '#7A151C',
          borderLight: '#E4E4E7',
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
