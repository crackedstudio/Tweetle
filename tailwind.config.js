/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      backgroundImage: {
        "button-image": "url('./assets/liquid.png')",
        "gradient-svg": "url('./assets/Gradient.svg')",
      },
    },
  },
  plugins: [],
};
