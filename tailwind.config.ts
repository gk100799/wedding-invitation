import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0708',
        cream: '#f5ede0',
        rose: '#d4537e',
        deepRose: '#993556',
        marigold: '#fac775',
        ember: '#f0997b',
        midnight: '#1a0a2e',
        gold: '#d9b15f',
        champagne: '#f3e1bb',
        // Mor-pankh — the iridescent teal-blue of a peacock feather's eye.
        morpankh: '#2b6e8a',
        morpankhDeep: '#13455a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
