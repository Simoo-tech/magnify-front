/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkGrey: "#647d68",
        color1: "#d9b693",
        color2: "#8cccf0",
        color3: "#4face0",
      },
      screens: {
        sm: "350px",
        md: "768px",
        lg: "996px",
        xl: "1440px",
      },
      container: {
        center: true,
        padding: {
          sm: "1.1rem",
          lg: "1.1rem",
          xl: "2.6rem",
        },
      },
    },
  },
  plugins: [],
};
