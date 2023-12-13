const { radixThemePreset } = require("radix-themes-tw");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      height: {
        "100dvh": "100dvh",
      },
    },
  },
  plugins: [],
  presets: [radixThemePreset],
  corePlugins: {
    preflight: false,
  },
};
