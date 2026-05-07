/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00eaff',
          50: '#e6fdff',
          100: '#ccfbff',
          200: '#99f7ff',
          300: '#66f3ff',
          400: '#33efff',
          500: '#00eaff',
          600: '#00bbcc',
          700: '#008c99',
          800: '#005d66',
          900: '#002e33',
        },
        surface: {
          DEFAULT: '#000000',
          50: '#0a0a0a',
          100: '#111111',
          200: '#1a1a1a',
          300: '#222222',
          400: '#2a2a2a',
          500: '#333333',
        },
        glass: {
          light: 'rgba(255,255,255,0.02)',
          DEFAULT: 'rgba(255,255,255,0.04)',
          strong: 'rgba(255,255,255,0.06)',
          border: 'rgba(0,234,255,0.08)',
        },
        neon: {
          glow: '#00eaff',
          soft: 'rgba(0,234,255,0.15)',
          medium: 'rgba(0,234,255,0.3)',
          strong: 'rgba(0,234,255,0.5)',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'Cairo', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'circuit-flow': 'circuitFlow 10s linear infinite',
        'sweep': 'sweep 4s linear infinite',
        'border-pulse': 'borderPulse 4s ease-in-out infinite',
        'dot-pulse': 'dotPulse 2s ease-in-out infinite',
        'orb-float': 'orbFloat 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,234,255,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0,234,255,0.4), 0 0 60px rgba(0,234,255,0.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        circuitFlow: {
          '0%': { strokeDashoffset: '600' },
          '100%': { strokeDashoffset: '-600' },
        },
        sweep: {
          '0%': { transform: 'translateX(-150%)' },
          '100%': { transform: 'translateX(150%)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(0,234,255,0.1)' },
          '50%': { borderColor: 'rgba(0,234,255,0.35)' },
        },
        dotPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(2)', opacity: '0.3' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0,234,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,255,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '50px 50px',
        'grid-lg': '80px 80px',
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(0,234,255,0.15)',
        'neon-md': '0 0 20px rgba(0,234,255,0.2)',
        'neon-lg': '0 0 40px rgba(0,234,255,0.25)',
        'neon-xl': '0 0 60px rgba(0,234,255,0.3)',
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '6px',
        'xl': '8px',
        '2xl': '10px',
        '3xl': '12px',
      },
    },
  },
  plugins: [],
}
