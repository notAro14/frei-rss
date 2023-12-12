const { radixThemePreset } = require("radix-themes-tw");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [radixThemePreset],
};
