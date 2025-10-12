/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['0.95rem', { lineHeight: '1.5' }],
        sm: ['0.85rem', { lineHeight: '1.4' }],
      },
      lineHeight: {
        snug: '1.45',
        relaxed: '1.65',
      },
      borderRadius: {
        lg: '0.5rem',
      },
      colors: {
        // Force RGB fallback for oklch
        surface: '#1e293b',
        primary: '#2563eb',
        text: '#e2e8f0',

        primary: "#C62828",   // strong red
        secondary: "#1565C0", // royal blue
        info: "#64B5F6",      // sky blue
        accent: "#F9A825",    // golden yellow
        dark: "#000000",      // black
        light: "#F5F5F5"      // light gray
      },
    }
  },
  plugins: [
     require('@tailwindcss/forms')({
      strategy: 'class', // we’ll apply our own form classes
    }),
  ],
}
