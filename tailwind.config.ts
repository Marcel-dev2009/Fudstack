import {Config} from "tailwindcss"

export default {
  // Optional: Define custom rules if you are overriding automatic scanning
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary:{
          // shades of white
        "ivory":"#FFFFF0",
        "eggshell":"#F0EAD6",
        "pearl":"#E2DFD2"
        },
        secondary:{
        // shades of black
        "black":"#000000",
        "licorice":"	#1B1212",
        "onyx":"#353935"
        }
       /*  accent: {
          primary: '#FFFFF0',
          secondary: '#0000',
        } */
      },
      spacing: {
        '128': '32rem',
      },
      fontSize:{
        "micro":"0.65rem",
      },
      screens: {
        '3xl': '1920px',
      },
      width: {
        'chunky-card': '450px',
        'readable-prose': '65ch',
      }
    },
  },
  plugins: [],
} satisfies Config
