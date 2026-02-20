module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        'reverse-spin-slow': 'reverseSpin 5s linear infinite',
        'spin-slow': 'spinSlow 1.5s cubic-bezier(.58,.32,.02,.79) infinite',
        'float': 'float 3s ease-in-out infinite',
        'reverse-float': 'reverseFloat 3s ease-out infinite',
        'shine': 'shine 2s infinite',
        'shine-yellow': 'shineYellow 1.5s infinite',
        'floatText-1': 'floatText 1s ease-in-out infinite alternate',
        'floatText-2': 'floatText 1s 0.1s ease-in-out infinite alternate',
        'floatText-3': 'floatText 1s 0.2s  ease-in-out infinite alternate',
        'floatText-4': 'floatText 1s 0.3s ease-in-out infinite alternate',
        'floatText-5': 'floatText 1s 0.4s ease-in-out infinite alternate',
        'floatText-6': 'floatText 1s 0.5s ease-in-out infinite alternate',
        'floatText-7': 'floatText 1s 0.6s ease-in-out infinite alternate',
        'cut': 'cut 1.5s linear infinite'
      },
      keyframes: {
        reverseSpin: {
          to: {
            transform: 'rotate(-360deg)'
          }
        },
        spinSlow: {
          to: {
            transform: 'rotate(360deg)'
          }
        },
        reverseFloat: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(20px)'
          }
        },
        shine: {
          '0%, 100%': {
            'box-shadow': '0px 0px 6px 5px rgba(255, 255, 255, 0.25)'
          },
          '50%': {
            'box-shadow': '0px 0px 1px 1px rgba(255, 255, 255, 0.25)'
          }
        },
        shineYellow: {
          '0%, 100%': {
            'box-shadow': '0px 0px 6px 5px rgba(254, 100, 0, 0.25)'
          },
          '50%': {
            'box-shadow': '0px 0px 1px 1px rgba(254, 100, 0, 0.25)'
          }
        },
        floatText: {
          '0%, 100%': {
            'transform': 'translateY(0px)'
          },
          '20%': {
            'transform': 'translateY(-20px)'
          }
        },
        cut: {
          '0%, 100%': {
            transform: 'rotate(-30deg)'
          },
          '20%': {
            transform: 'rotate(-60deg)'
          },
          '40%': {
            transform: 'rotate(-30deg)'
          },
          '60%': {
            transform: 'rotate(-60deg)'
          },
          '80%': {
            transform: 'rotate(-30deg)'
          },
        }
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp')
  ],
}
