/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F3FA',
          100: '#E1E7F5',
          200: '#C3CFEC',
          300: '#94AADB',
          400: '#5F7FC6',
          500: '#3B5BC0',
          600: '#2A46A5',
          700: '#1E3A8A', // Primary Navy
          800: '#172E6F',
          900: '#112253',
          950: '#0B1538',
        },
        surface: '#FFFFFF',
        background: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow-navy': '0 0 16px rgba(30, 58, 138, 0.25)',
        'glow-rose': '0 0 16px rgba(225, 29, 72, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'radar': 'radar 3s linear infinite',
      },
      keyframes: {
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-3px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(3px, 0, 0)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
