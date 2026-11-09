/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./pages/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
