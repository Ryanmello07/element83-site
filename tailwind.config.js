/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#15122a',
          900: '#1a1733',
          800: '#221e3d',
          700: '#2c274d',
          600: '#3a3560',
        },
        mist: {
          50: '#f4f2fa',
          100: '#e8e6f0',
          200: '#c9c5d8',
          300: '#9c98b0',
          400: '#6f6c84',
        },
        haze: {
          300: '#c9bcff',
          400: '#b7a4ff',
          500: '#a78bfa',
          600: '#8a6bee',
          700: '#6b4fd0',
        },
        signal: {
          rose: '#ff3c78',
          cyan: '#46d2ff',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        script: ['"La Belle Aurore"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(167, 139, 250, 0.35)',
        'glow-lg': '0 0 48px rgba(167, 139, 250, 0.45)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-slow': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'cube-reveal': {
          '0%': { opacity: '0', filter: 'grayscale(1) brightness(0.35)' },
          '60%': { opacity: '1', filter: 'grayscale(0.6) brightness(0.7)' },
          '100%': { opacity: '1', filter: 'grayscale(0) brightness(1)' },
        },
        flicker: {
          '0%,100%': { opacity: '0.06' },
          '50%': { opacity: '0.09' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out both',
        'fade-in-slow': 'fade-in-slow 1.2s ease-out both',
        'cube-reveal': 'cube-reveal 1.6s ease-out both',
        flicker: 'flicker 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
