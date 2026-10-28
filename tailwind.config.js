/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          base: '#0A0E17',
          deep: '#0F1420',
          card: '#141926',
        },
        brand: {
          cyan: '#00E5FF',
          violet: '#7C5CFF',
          magenta: '#FF4FCB',
          qa: '#3DDC97',
        },
        text: {
          primary: '#F5F7FA',
          muted: '#8A93A6',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #00E5FF 0%, #7C5CFF 50%, #FF4FCB 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glow-gradient': 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, rgba(124, 92, 255, 0.05) 50%, transparent 100%)',
      },
      boxShadow: {
        'cyan-glow': '0 4px 14px rgba(0, 229, 255, 0.25)',
        'cyan-glow-hover': '0 6px 20px rgba(0, 229, 255, 0.4)',
        'violet-glow': '0 4px 14px rgba(124, 92, 255, 0.25)',
        'glass-card': '0 20px 60px rgba(0, 0, 0, 0.4)',
        'glass-card-hover': '0 25px 70px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 229, 255, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientShift: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
