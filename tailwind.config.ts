import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#07070A',
          2: '#0E0E13',
          3: '#15151C',
          4: '#1D1D26'
        },
        brand: {
          DEFAULT: '#FF6A00',
          300: '#FFA366',
          400: '#FF8A33',
          500: '#FF6A00',
          600: '#E55F00',
          700: '#B84C00'
        },
        amber: '#FF9F0D',
        mint: {
          DEFAULT: '#00C27A',
          300: '#4DE0A8',
          600: '#009C62'
        },
        cream: '#F4F1EA',
        muted: '#9A9AA3',
        line: 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6.5vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.4rem, 5vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.6rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF6A00 0%, #FF9F0D 55%, #FFC46B 100%)',
        'gradient-mint': 'linear-gradient(135deg, #00C27A 0%, #4DE0A8 100%)',
        'gradient-ink': 'linear-gradient(180deg, rgba(14,14,19,0) 0%, #07070A 100%)'
      },
      boxShadow: {
        glow: '0 0 40px rgba(255,106,0,0.45), 0 0 120px rgba(255,106,0,0.15)',
        'glow-sm': '0 0 24px rgba(255,106,0,0.35)',
        'glow-mint': '0 0 40px rgba(0,194,122,0.35)',
        card: '0 30px 80px -30px rgba(0,0,0,0.8)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.06)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        blink: {
          '0%, 90%, 100%': { transform: 'scaleY(0)' },
          '95%': { transform: 'scaleY(1)' }
        },
        blinkDouble: {
          '0%, 16%, 26%, 42%, 100%': { transform: 'scaleY(0)' },
          '8%, 34%': { transform: 'scaleY(1)' }
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(1.8)', opacity: '0' }
        }
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 22s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        blink: 'blink 6s ease-in-out infinite',
        'blink-double': 'blinkDouble 2.8s ease-in-out 0.2s infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite'
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: []
};

export default config;
