/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Executive Design Tokens ─────────────────────────
        base:    '#08090f',      // page background (dark)
        surface: '#0f1117',      // panel / card background
        panel:   '#161b27',      // metric card background
        'exec-border': '#1e2a3a',
        gold: {
          DEFAULT: '#c9922a',
          light:   '#e8b84b',
          dark:    '#a87420',
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#c9922a',
          600: '#a87420',
          700: '#8a5f1a',
        },
        emerald: { DEFAULT: '#10B981' },
        // light mode
        cream:   '#f7f5f0',
        parchment: '#ede9e0',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'float':       'float 7s ease-in-out infinite',
        'pulse-slow':  'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':   'spin 24s linear infinite',
        'fade-up':     'fadeUp 0.7s ease-out forwards',
        'shimmer':     'shimmer 2.5s linear infinite',
        'pulse-ring':  'pulseRing 2s ease-out infinite',
        'slide-up':    'slideUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(0.85)', opacity: '1' },
          '100%': { transform: 'scale(2.2)',  opacity: '0' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #c9922a 0%, #e8b84b 100%)',
        'dark-gradient':  'linear-gradient(180deg, #08090f 0%, #0f1117 100%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 12px rgba(201,146,42,0.25)',
        'gold-md': '0 4px 24px rgba(201,146,42,0.35)',
        'gold-lg': '0 8px 48px rgba(201,146,42,0.20)',
        'exec':    '0 4px 24px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
