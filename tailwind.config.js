/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cin: {
          bg: '#0b0b0b',
          card: '#111111',
          border: '#1e1e1e',
          gold: '#c9a84c',
          goldlt: '#e8c97a',
          muted: '#5a5a5a',
          text: '#e8e4dc',
          red: '#8b1a1a',
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
