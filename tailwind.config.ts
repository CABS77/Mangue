import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Premium palette
        'forest-green': {
          DEFAULT: '#1B4332',
          light: '#2D5A45',
          dark: '#122E22',
        },
        'gold': {
          DEFAULT: '#D4A843',
          light: '#E4C06A',
          dark: '#B8903A',
        },
        'cream': {
          DEFAULT: '#FFF8F0',
          dark: '#F5EDE0',
        },
        'mango-orange': {
          DEFAULT: '#E8913A',
          light: '#F0A85A',
        },
        'charcoal': {
          DEFAULT: '#2D2D2D',
          light: '#4A4A4A',
        },
        // Legacy Senegal palette (mapped to new colors for compatibility)
        senegal: {
          green: {
            50: "#f0f7f2",
            100: "#d4ecd9",
            200: "#a8d9b3",
            300: "#6cc97e",
            400: "#3db55a",
            500: "#1B4332",
            600: "#1B4332",
            700: "#1B4332",
            800: "#1B4332",
            900: "#122E22",
          },
          yellow: {
            50: "#FFF8F0",
            100: "#ffefc2",
            200: "#ffe099",
            300: "#ffd066",
            400: "#ffc233",
            500: "#D4A843",
            600: "#B8903A",
            700: "#996c00",
          },
          gold: {
            50: "#fdf8ef",
            100: "#f9ecd3",
            200: "#f2d9a7",
            300: "#e8c170",
            400: "#daa844",
            500: "#D4A843",
            600: "#B8903A",
            700: "#78571a",
          },
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "'Times New Roman'", "serif"],
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'premium': '0 4px 30px rgba(27, 67, 50, 0.08)',
        'premium-lg': '0 20px 60px rgba(27, 67, 50, 0.12), 0 8px 24px rgba(27, 67, 50, 0.08)',
        'premium-xl': '0 25px 80px rgba(27, 67, 50, 0.15), 0 10px 30px rgba(27, 67, 50, 0.1)',
        'gold': '0 4px 20px rgba(212, 168, 67, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '1280px',
      },
      letterSpacing: {
        'premium': '0.15em',
      },
    },
  },
  plugins: [],
};
export default config;
