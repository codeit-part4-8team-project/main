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
  plugins: [],
};
