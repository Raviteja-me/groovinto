import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './blog/**/*.{md,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: '#0B0B0F',
        purple: '#FF6A00',
        neon: '#00C27A',
        accent: '#FF9F0D',
        neutral: '#8A8A8A',
        light: '#F5F5F5'
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF6A00 0%, #FF9F0D 45%, #00C27A 100%)',
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(255,106,0,0.18), transparent 25%), radial-gradient(circle at 80% 0%, rgba(255,159,13,0.2), transparent 30%), radial-gradient(circle at 60% 70%, rgba(0,194,122,0.18), transparent 35%)'
      },
      boxShadow: {
        glass: '0 10px 60px rgba(0,0,0,0.55)',
        glow: '0 0 30px rgba(255,106,0,0.5)',
        'card-soft': '0 20px 60px rgba(11,11,15,0.55)'
      }
    }
  },
  plugins: []
};

export default config;
