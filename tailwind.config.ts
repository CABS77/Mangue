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
        // Senegal-inspired palette
        senegal: {
          green: {
            50: "var(--green-50)",
            100: "var(--green-100)",
            200: "var(--green-200)",
            300: "var(--green-300)",
            400: "var(--green-400)",
            500: "var(--green-500)",
            600: "var(--green-600)",
            700: "var(--green-700)",
            800: "var(--green-800)",
            900: "var(--green-900)",
          },
          yellow: {
            50: "var(--yellow-50)",
            100: "var(--yellow-100)",
            200: "var(--yellow-200)",
            300: "var(--yellow-300)",
            400: "var(--yellow-400)",
            500: "var(--yellow-500)",
            600: "var(--yellow-600)",
            700: "var(--yellow-700)",
          },
          gold: {
            50: "var(--gold-50)",
            100: "var(--gold-100)",
            200: "var(--gold-200)",
            300: "var(--gold-300)",
            400: "var(--gold-400)",
            500: "var(--gold-500)",
            600: "var(--gold-600)",
            700: "var(--gold-700)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
