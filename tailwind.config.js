/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      gray10: '#F7F7F7',
      gray20: '#EFEFEF',
      gray30: '#E5E5E5',
      gray50: '#A1A1A1',
      gray80: '5F5F5F',
      gray100: '#292929',
      black: '#222222',
      point_yellow: '#F3FF00',
      point_red: '#F74242',
    },
    extend: {},
    fontFamily: {
      rammetto: ['"Rammetto One"'],
    },
  },
  plugins: [
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      addUtilities({
        '.body1-bold': {
          'font-size': '1.8rem',
          'font-weight': 700,
          'line-height': '2.6rem',
        },
        '.body1-medium': {
          'font-size': '1.8rem',
          'font-weight': 500,
          'line-height': '2.6rem',
        },
        '.body1-regular': {
          'font-size': '1.8rem',
          'font-weight': 400,
          'line-height': '2.6rem',
        },
        '.body2-bold': {
          'font-size': '1.6rem',
          'font-weight': 700,
          'line-height': '2.4rem',
        },
        '.body2-medium': {
          'font-size': '1.6rem',
          'font-weight': 500,
          'line-height': '2.4rem',
        },
        '.body2-regular': {
          'font-size': '1.6rem',
          'font-weight': 400,
          'line-height': '2.4rem',
        },
        '.body3-bold': {
          'font-size': '1.4rem',
          'font-weight': 700,
          'line-height': '2.2rem',
        },
        '.body3-medium': {
          'font-size': '1.4rem',
          'font-weight': 500,
          'line-height': '2.2rem',
        },
        '.body3-regular': {
          'font-size': '1.4rem',
          'font-weight': 400,
          'line-height': '2.2rem',
        },
        '.body4-bold': {
          'font-size': '1.2rem',
          'font-weight': 700,
          'line-height': '2.0rem',
        },
        '.body4-medium': {
          'font-size': '1.2rem',
          'font-weight': 500,
          'line-height': '2.0rem',
        },
        '.body4-regular': {
          'font-size': '1.2rem',
          'font-weight': 400,
          'line-height': '2.0rem',
        },
        '.body5-bold': {
          'font-size': '1.0rem',
          'font-weight': 700,
          'line-height': '1.8rem',
        },
        '.body5-medium': {
          'font-size': '1.0rem',
          'font-weight': 500,
          'line-height': '1.8rem',
        },
        '.body5-regular': {
          'font-size': '1.0rem',
          'font-weight': 400,
          'line-height': '1.8rem',
        },
      });
    },
  ],
};
