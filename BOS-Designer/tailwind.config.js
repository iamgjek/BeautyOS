const animationDelay = require('./src/plugins/tailwindPlugin/animationDelay');

module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ml: '#222C4C',
        primary: '#231815',
        second: '#F6BA7B',
        gray: '#DBDCDC',
        sucessText: '#16A34A',
        rejectText: '#F43F5E',
        skyblue: '#57CDFF',
      },
      animation: {
        'reverse-spin-slow': 'reverseSpin 5s linear infinite',
        'spin-slow': 'spinSlow 2s cubic-bezier(.58,.32,.02,.79) infinite',
        float: 'float 3s ease-in-out infinite',
        'reverse-float': 'reverseFloat 3s ease-out infinite',
        shine: 'shine 2s infinite',
        'shine-yellow': 'shineYellow 1.5s infinite',
        'floatText-1': 'floatText 1s ease-in-out infinite alternate',
        'floatText-2': 'floatText 1s 0.1s ease-in-out infinite alternate',
        'floatText-3': 'floatText 1s 0.2s  ease-in-out infinite alternate',
        'floatText-4': 'floatText 1s 0.3s ease-in-out infinite alternate',
        'floatText-5': 'floatText 1s 0.4s ease-in-out infinite alternate',
        'floatText-6': 'floatText 1s 0.5s ease-in-out infinite alternate',
        'floatText-7': 'floatText 1s 0.6s ease-in-out infinite alternate',
        cut: 'cut 1.5s linear infinite',
      },
      fontFamily: {
        sans: [
          'Noto Sans TC, Roboto, Microsoft JhengHei, Avenir, Helvetica, Arial, sans-serif',
        ],
        arial: ['Arial'],
      },
      fontWeight: {
        hairline: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        'extra-bold': '800',
        black: '900',

      },
      keyframes: {
        reverseSpin: {
          to: {
            transform: 'rotate(-360deg)',
          },
        },
        spinSlow: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
        reverseFloat: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(20px)',
          },
        },
        shine: {
          '0%, 100%': {
            'box-shadow': '0px 0px 6px 5px rgba(255, 255, 255, 0.25)',
          },
          '50%': {
            'box-shadow': '0px 0px 1px 1px rgba(255, 255, 255, 0.25)',
          },
        },
        shineYellow: {
          '0%, 100%': {
            'box-shadow': '0px 0px 6px 5px rgba(254, 100, 0, 0.25)',
          },
          '50%': {
            'box-shadow': '0px 0px 1px 1px rgba(254, 100, 0, 0.25)',
          },
        },
        floatText: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '20%': {
            transform: 'translateY(-20px)',
          },
        },
        cut: {
          '0%, 100%': {
            transform: 'rotate(-30deg)',
          },
          '20%': {
            transform: 'rotate(-60deg)',
          },
          '40%': {
            transform: 'rotate(-30deg)',
          },
          '60%': {
            transform: 'rotate(-60deg)',
          },
          '80%': {
            transform: 'rotate(-30deg)',
          },
        },
      },
    },
  },
  plugins: [
    animationDelay,
  ],
  extend: {
  },
  safelist: [

    'h-[17px]',
    'h-[37px]',
    'h-[57px]',
    'h-[77px]',
    'h-[97px]',
    'h-[117px]',
    'h-[137px]',
    'h-[157px]',
    'h-[177px]',
    'h-[197px]',
    'h-[217px]',
    'h-[237px]',
    'h-[257px]',
    'h-[277px]',
    'h-[297px]',
    'h-[317px]',
    'h-[337px]',
    'h-[357px]',
    'h-[377px]',
    'h-[397px]',
    'h-[417px]',
    'h-[437px]',
    'top-[1px]',
    'top-[2px]',
    'top-[21px]',
    'top-[41px]',
    'top-[61px]',
    'top-[81px]',
    'top-[101px]',
    'top-[121px]',
    'top-[141px]',
    'top-[161px]',
    'top-[181px]',
    'top-[201px]',
    'top-[221px]',
    'top-[241px]',
    'top-[261px]',
    'top-[281px]',
    'top-[301px]',
    'top-[321px]',
    'top-[341px]',
    'top-[361px]',
    'top-[381px]',
    'top-[401px]',

    'top-[22px]',
    'top-[42px]',
    'top-[62px]',
    'top-[82px]',
    'top-[102px]',
    'top-[122px]',
    'top-[142px]',
    'top-[162px]',
    'top-[182px]',
    'top-[202px]',
    'top-[222px]',
    'top-[242px]',
    'top-[262px]',
    'top-[282px]',
    'top-[302px]',
    'top-[322px]',
    'top-[342px]',
    'top-[362px]',
    'top-[382px]',
    'top-[402px]',

    'mt-[21px]',
    'mt-[41px]',
    'mt-[61px]',
    'mt-[81px]',
    'mt-[101px]',
    'mt-[121px]',
    'mt-[141px]',
    'mt-[161px]',
    'mt-[181px]',
    'mt-[201px]',
    'mt-[221px]',
    'mt-[241px]',
    'mt-[261px]',
    'mt-[281px]',
    'mt-[301px]',
    'mt-[321px]',
    'mt-[341px]',
    'mt-[361px]',
    'mt-[381px]',
    'mt-[401px]',
  ],
};
