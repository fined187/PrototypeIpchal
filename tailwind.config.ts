import type { Config } from 'tailwindcss'

const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['Nanum Gothic', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      blue: colors.blue,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
      indigo: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
      teal: colors.teal,
      orange: colors.orange,
      cyan: colors.cyan,
      lime: colors.lime,
      emerald: colors.emerald,
      rose: colors.rose,
      fuchsia: colors.fuchsia,
      violet: colors.violet,
      amber: colors.amber,
      lightBlue: colors.lightBlue,
      sky: colors.sky,
      mygray: '#8D8D8D',
      mybg: '#F6F6F6',
      myborder: '#E0E0E0',
      mygold: '#C89C23',
      mygraybg: '#D1D1D1',
      myyellow: '#D3AB3B',
      myRed: '#FF0000',
      myBlue: '#4a81a4'
    }
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

export default config
