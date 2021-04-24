module.exports = {
  ...require('./nuxt.config'),
  ...{
    build: {
      publicPath: '.'
    }
  }
}
