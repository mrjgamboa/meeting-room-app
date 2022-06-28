// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(0, 0%, 100%)',
        secondary: 'hsl(48, 5%, 18%)',
        accent: {
          'orange-light': 'hsl(28, 79%, 52%)',
          'orange-dark': 'hsl(28, 79%, 32%)',
          'blue-light': 'hsl(213, 30%, 36%)',
          'blue-dark': 'hsl(213, 30%, 16%)',
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
        serif: ['"Lora"', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};
