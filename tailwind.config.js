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
      gridTemplateRows: {
        'header-content': 'auto minmax(0, 1fr)',
      },
      screens: {
        '3xl': '2000px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
