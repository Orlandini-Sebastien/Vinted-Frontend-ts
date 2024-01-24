/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {    
      colors:{
      'blue-vinted' : '#0AB1BA'
      },
      height:{
        "screen/2": "50vh",
        "scree2/3": "calc(200vh / 3)",
        "screen/4": "calc(100vh / 4)",
        "screen/5": "calc(100vh / 5)",
      }
    },

  },
  plugins: [],
}
