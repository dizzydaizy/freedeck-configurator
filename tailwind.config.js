const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  important: true,
  purge: {
    content: ["./src/**/*.{ts,tsx,js,jsx,}"],
    safelist: [
      "grid-cols-1",
      "grid-cols-2",
      "grid-cols-3",
      "grid-cols-4",
      "grid-cols-5",
      "grid-cols-6",
      "grid-cols-7",
      "grid-cols-8",
      "grid-cols-9",
      "grid-cols-10",
      "grid-cols-11",
      "grid-cols-12",
      "grid-cols-13",
      "grid-cols-14",
      "grid-cols-15",
      "grid-cols-16",
      "grid-rows-1",
      "grid-rows-2",
      "grid-rows-3",
      "grid-rows-4",
      "grid-rows-5",
      "grid-rows-6",
      "grid-rows-7",
      "grid-rows-8",
      "grid-rows-9",
      "grid-rows-10",
      "grid-rows-11",
      "grid-rows-12",
      "grid-rows-13",
      "grid-rows-14",
      "grid-rows-15",
      "grid-rows-16",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Barlow", ...defaultTheme.fontFamily.sans],
    },
    colors: {
      white: "#fff",
      black: "#000",
      gray: {
        DEFAULT: "#2D2D2F",
        50: "#B6B6B9",
        100: "#A7A7AA",
        200: "#87878C",
        300: "#69696E",
        400: "#4B4B4E",
        500: "#2D2D2F",
        600: "#262627",
        700: "#1E1E1F",
        800: "#171718",
        900: "#0F0F10",
      },
      primary: {
        DEFAULT: "#754BAB",
        50: "#EDE7F4",
        100: "#E0D5ED",
        200: "#C5B2DD",
        300: "#AA8ECE",
        400: "#8F6BBE",
        500: "#754BAB",
        600: "#5D3B88",
        700: "#442C64",
        800: "#2C1C41",
        900: "#140D1D",
      },
      // primary: {
      //   DEFAULT: "#009F9F",
      //   50: "#85FFFF",
      //   100: "#6CFFFF",
      //   200: "#39FFFF",
      //   300: "#06FFFF",
      //   400: "#00D2D2",
      //   500: "#009F9F",
      //   600: "#006C6C",
      //   700: "#003939",
      //   800: "#000606",
      //   900: "#000000",
      // },
      success: {
        DEFAULT: "#4DCA9E",
        50: "#FEFFFE",
        100: "#EAF9F4",
        200: "#C3EDDE",
        300: "#9CE1C9",
        400: "#74D6B3",
        500: "#4DCA9E",
        600: "#34B084",
        700: "#298867",
        800: "#1D6149",
        900: "#113A2C",
      },
      danger: {
        DEFAULT: "#CA4356",
        50: "#FCF6F7",
        100: "#F7E2E5",
        200: "#ECBAC1",
        300: "#E0939E",
        400: "#D56B7A",
        500: "#CA4356",
        600: "#AA3041",
        700: "#822532",
        800: "#5A1A23",
        900: "#330E13",
      },
    },
    extend: {
      height: {
        "dp-settings": "600px",
      },
      width: {
        "dp-settings": "800px",
      },
      gap: {
        "1px": "1px",
      },
    },
  },
  variants: {},
  plugins: [
    function ({ addComponents }) {
      const arrows = {
        ".arrow-up": {
          width: "0px",
          height: "0px",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "8px solid #262627",
        },
      };
      addComponents(arrows);
    },
  ],
};
