// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

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
    
    // '@/assets/css/pdf-form.css',
  ],
  
  plugins: ['~/plugins/mapbox.client'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

    runtimeConfig: {
    public: {
      mapboxToken: process.env.NUXT_PUBLIC_MAPBOX_TOKEN,
      mapboxStyleUrl: process.env.NUXT_PUBLIC_MAPBOX_STYLE_URL,
      mapboxBoundaryTileset: process.env.NUXT_PUBLIC_MAPBOX_BOUNDARY_TILESET_ID,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },
  supabase: {
    redirect: false
  }
})