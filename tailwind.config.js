/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Oswald, sans-serif",
        secondary: "Inter, sans-serif",
      },
      colors: {
        blueColor: "#2a68ff",
        greyIsh: "#f1f4f8",
        cardShadow: "#f7f8f9",
        textColor: "#252b36",
      },
    },
  },
  plugins: [],
};
