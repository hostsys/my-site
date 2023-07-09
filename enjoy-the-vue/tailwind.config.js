/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.vue', './src/index.css'],
  theme: {
    container: {
      // center: true,
    },
    extend: {
      backgroundImage: {
        star: "url('star-texture500.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
