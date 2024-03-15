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
    fontSize: {
      'body1-bold': ['1.8rem', { lineHeight: '2.6rem', fontWeight: 700 }],
      'body1-medium': ['1.8rem', { lineHeight: '2.6rem', fontWeight: 500 }],
      'body1-regular': ['1.8rem', { lineHeight: '2.6rem', fontWeight: 400 }],
      'body2-bold': ['1.6rem', { lineHeight: '2.4rem', fontWeight: 700 }],
      'body2-medium': ['1.6rem', { lineHeight: '2.4rem', fontWeight: 500 }],
      'body2-regular': ['1.6rem', { lineHeight: '2.4rem', fontWeight: 400 }],
      'body3-bold': ['1.4rem', { lineHeight: '2.2rem', fontWeight: 700 }],
      'body3-medium': ['1.4rem', { lineHeight: '2.2rem', fontWeight: 500 }],
      'body3-regular': ['1.4rem', { lineHeight: '2.2rem', fontWeight: 400 }],
      'body4-bold': ['1.2rem', { lineHeight: '2.0rem', fontWeight: 700 }],
      'body4-medium': ['1.2rem', { lineHeight: '2.0rem', fontWeight: 500 }],
      'body4-regular': ['1.2rem', { lineHeight: '2.0rem', fontWeight: 400 }],
      'body5-bold': ['1.0rem', { lineHeight: '1.8rem', fontWeight: 700 }],
      'body5-medium': ['1.0rem', { lineHeight: '1.8rem', fontWeight: 500 }],
      'body5-regular': ['1.0rem', { lineHeight: '1.8rem', fontWeight: 400 }],
    },
    extend: {},
    fontFamily: {
      rammetto: ['"Rammetto One"'],
    },
  },
  plugins: [],
};
