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
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],

  css: [
    '~/assets/css/main.css',
    // 'mapbox-gl/dist/mapbox-gl.css',
    // '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
  ],

    runtimeConfig: {
    public: {
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
})