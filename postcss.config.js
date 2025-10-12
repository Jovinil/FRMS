// postcss.config.js
export default {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    // Allows nested rules like Sass
    'postcss-nesting': {},
    // Ensures Tailwind uses final RGB/hex colors (not oklch)
    'postcss-preset-env': {
      stage: 1,
      features: {
        'oklab-function': false,
        'nesting-rules': true,
      },
    },
    // Optional optimization for production builds
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
