export default {
  server: {
    host: '0.0.0.0'
  },
  head: {
    title: 'BeautyOS 會員',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '客戶預約系統' },
      { name: 'format-detection', content: 'telephone=no' },

      // pwa
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'google', content: 'notranslate' }
    ],
    script: [
      { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-SRS53HF281' }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/icon.png" },

      // pwa 設定 apple 桌面 icon
      { rel: "apple-touch-icon", sizes: "128x128", href: "/icon.png" }
    ]
  },

  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/static/style/main.css'
  ],

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  plugins: [
    { src: '~/plugins/api.js' },
    { src: '~/plugins/auth.js' },
    { src: '~/plugins/cookies.js' },
    { src: '~/plugins/importServiceWorker.js', ssr: false },
    { src: '~/plugins/vee-validate.js', ssr: false },
    { src: '~/plugins/tw-element-path', ssr: false },
    { src: '~/plugins/aos', ssr: false },
    { src: '~/plugins/sweet-alert', ssr: false },
    { src: '~/plugins/v-calendar', ssr: false },
    { src: '~/directives/index' },
    { src: '~/plugins/permisstion', ssr: false },
    { src: '~/plugins/ga', ssr: false }
  ],

  components: true,

  router: {
    scrollBehavior(to, from, savedPosition) {
      // 切換頁面時讓 Element 回到頂部
      const el = document.querySelector('.member__container')
      if (el) {
        setTimeout(() => {
          el.scrollTop = 0
        }, 500)
      }

      // 讓 window 回到頂部
      return { x: 0, y: 0 }
    }
  },

  buildModules: [
    '@nuxt/postcss8',
    '@nuxtjs/fontawesome',
    ["@nuxtjs/dotenv", { filename: ".env." + process.env.NODE_ENV }]
  ],

  fontawesome: {
    component: 'fa',
    icons:{
      brands:true
    },
    proIcons: {
      solid: ['faCheck', 'faAngleLeft', 'faAngleRight', 'faXmark', 'faQuestion', 'faCalendarDays', 'faSpinner', 'faArrowRight', 'faTicket','faCalendarCheck'],
      regular: ['faHouse', 'faHeart', 'faArrowRightFromBracket', 'faUser', 'faSackDollar', 'faCircleDollar', 'faTicket', 'faCircleP', 'faCircleQuestion', 'faEllipsis', 'faCirclePlus', 'faCircleMinus', 'faMagnifyingGlass', 'faCircleInfo', 'faAngleDown', 'faBagShopping', 'faVolume', 'faEnvelope'],
      light: ['faPen']
    }
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  axios: {
    baseURL: '/',
  },

  pwa: {
    meta: {
      title: 'bos',
      author: 'CBSD'
    },
    manifest: {
      "lang": "zh-TW",
      "name": "bos",
      "short_name": "bos",
      "description": "客戶預約系統",
      "background_color": "#ffffff",
      "display": "standalone",
      "start_url": "/",
    },
    icon: {
      fileName: 'icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    }
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
