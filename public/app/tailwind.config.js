const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: {
    content: ['./src/**/*.js', './public/index.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['disabled', 'invalid'],
      borderColor: ['disabled', 'invalid'],
      cursor: ['disabled', 'invalid'],
      placeholderColor: ['disabled', 'invalid'],
      textColor: ['disabled', 'invalid'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e }) {
      addVariant('invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
};
