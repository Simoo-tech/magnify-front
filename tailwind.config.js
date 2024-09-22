/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "14px",
        sm: "16px",
        base: "18px",
        lg: "25px",
        xl: "29px",
        "2xl": "33px",
        "3xl": "35px",
        "4xl": "80px",
        "5xl": "100px",
      },
      colors: {
        primary: {
          color1: "#497B62",
          color2: "#2B5540",
          color3: "#6C9583",
          color4: "#B0D8C4",
        },
        textColor: "#8B8B8B",
        textColor2: "#B6EED6",
        lightGreen: "#D2ECDF",
        darkGreen: "#65947F",
        lineColor: { color1: "#939393", color2: "#A9A9A9" },
        errorContainer: "#EDBBBB",
        errorIcon: "#BD5151",

        darkGrey: "#647d68",
        color1: "#d9b693",
        color2: "#8cccf0",
        color3: "#4face0",
      },
      screens: {
        sm: "0px",
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
