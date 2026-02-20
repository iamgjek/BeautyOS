const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  publicPath: '/designer',
  lintOnSave: true,
  devServer: {
    // proxy: {
    // '/graphql': {
    //   target: 'https://apibeautyos.mlgroup.vip',
    //   changeOrigin: true,
    //   // https://apibeautyos.mlgroup.vip/graphql
    // },
    // },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/app.scss";',
      },
    },
    sourceMap: false,
  },

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line
        args[0].title = 'BeautyOS 設計師';
        return args;
      });
  },
  configureWebpack: {
    plugins: [
      new ESLintPlugin({
        context: 'src',
        extensions: ['.vue', '.js'],
        fix: true,
      }),
    ],
  },
  pwa: {
    name: 'Bos Designer',
    themeColor: '#F1F0F7',
    msTileColor: '#000000',
  },
};
