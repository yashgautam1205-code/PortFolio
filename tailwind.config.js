/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#070b14',
        panel: '#0e1728',
        line: 'rgba(148, 163, 184, 0.2)',
        glow: '#7dd3fc',
        violet: '#8b5cf6'
      },
      boxShadow: {
        soft: '0 0 0 1px rgba(148,163,184,0.12), 0 25px 80px rgba(4,7,15,0.45)'
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif']
      }
    }
  },
  plugins: []
};
