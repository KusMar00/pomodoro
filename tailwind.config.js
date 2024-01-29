/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik Mono One", "monospace"],
      },
      backgroundImage: {
        gradient: "url(./src/assets/gradient.jpg)",
        gradient2: "url(./src/assets/gradient2.avif)",
      },
    },
  },
  plugins: [],
};
