/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      textColor: {
        current: "currentColor",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  corePlugins: {
    preflight: false,
  },
};
