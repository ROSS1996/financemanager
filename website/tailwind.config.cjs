/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");
/* eslint-enable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        content: "calc(100vh - 65px)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
        merriweather: ["var(--font-merriweather)", ...fontFamily.sans],
        oxanium: ["var(--font-oxanium)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
