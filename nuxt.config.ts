// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  // dir: {
  //   pages: './app/pages',
  //   layouts: './app/layouts',
  //   middleware: './app/middleware',
  // },
  // components: [
  //   {
  //     path: '~/app/components', 
  //     extensions: ['vue'],
  //     pathPrefix: false, 
  //   },

  // ],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  css: [
    '~/assets/css/main.css',
  ],
})