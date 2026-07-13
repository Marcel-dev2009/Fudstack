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
        "pearl":"#E2DFD2",
        "patch" : "#FCF5E5",
        "blaster":"#EDEADE",
        "bone": "#F9F6EE",
        },
        secondary:{
        // shades of black
        "black":"#000000",
        "licorice":"	#1B1212",
        "onyx":"#353935",
        "coal":"#36454F",
        },
        brand:{
       // shades of orange
       "burn" : "#CC5500",
       "apricot" : "#FBCEB1"
        }
       /*  accent: {
          primary: '#FFFFF0',
          secondary: '#0000',
        } */
      },
       
      spacing: {
        '128': '32rem',
       
      },
     effect:{
      "effect":"underline",
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
