/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html, js, ts, vue, jsx, tsx}", 
    "./src/**/*"
  ],
  theme: {
    extend: {},
     fontFamily: {
      sans: ['IBM Plex Mono', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [    
    require('@tailwindcss/forms'),
],
}