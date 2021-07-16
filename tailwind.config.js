module.exports = {
  purge: ['src/**'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        DEFAULT: "'Noto Sans', sans-serif",
      },
      cursor: { 'zoom-in': 'zoom-in' },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
