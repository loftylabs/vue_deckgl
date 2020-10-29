import theme from '@nuxt/content-theme-docs'

export default theme({
  // [additional nuxt configuration]
  generate: {
    dir: '../docs'
  },
  router: {
    base: '/vue_deckgl/'
  }
})