/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C3639",    // Dark slate
        secondary: "#3F4E4F",  // Medium slate
        accent: "#A27B5C",     // Warm brown
        light: "#DCD7C9"       // Light cream
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/library-img1.jpg')"
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}