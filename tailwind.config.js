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
      colors: {
        primary: "#C62828",   // strong red
        secondary: "#1565C0", // royal blue
        info: "#64B5F6",      // sky blue
        accent: "#F9A825",    // golden yellow
        dark: "#000000",      // black
        light: "#F5F5F5"      // light gray
      }
    }
  },
  plugins: [],
}
