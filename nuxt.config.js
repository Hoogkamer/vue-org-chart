const pkg = require('./package')

module.exports = {
  mode: 'spa',
  // change router for githup pages
  router: { mode: 'hash' },
  /*
  ** Headers of the page
  */

  head: {
    title: 'Organization chart',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Free Organization Chart generator and viewer'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'vuejs, nuxt, javascript, orgchart, organization, open-source'
      },
      {
        name: 'google-site-verification',
        content: 'faMBWsCcw7RZQp1wVNh-Hgy7aQ8D2KMMNpwg0LKtsu4'
      }
    ],
    script: [
      {
        src: 'data.js'
      },
      { src: 'config.js' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */

  modules: ['nuxt-material-design-icons'],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

    plugins: [],
    extend(config, ctx) {
      if (!ctx.isDev) {
        config.output.publicPath = './_nuxt/'
      }
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
