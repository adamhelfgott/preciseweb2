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
        // Base Palette - Apple-inspired neutrals
        "pure-white": "#FFFFFF",
        "soft-white": "#FAFAFA",
        "light-gray": "#F5F5F7",
        "medium-gray": "#86868B",
        "dark-gray": "#1D1D1F",
        "pure-black": "#000000",
        
        // Accent Colors - Spotify energy
        "brand-green": "#1DB954",
        "bright-purple": "#7B4FFF",
        "electric-blue": "#1E90FF",
        "warm-coral": "#FF6B6B",
        
        // Luxury Accents - Hermès touches
        "champagne": "#F7E7CE",
        "deep-bronze": "#804A00",
        "silk-gray": "#E5E5E7",
      },
      fontFamily: {
        display: ["SF Display", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-hero": "clamp(56px, 7vw, 96px)",
        "display-large": "clamp(40px, 5vw, 64px)",
        "display-medium": "clamp(32px, 4vw, 48px)",
        "heading-large": "32px",
        "heading-medium": "24px",
        "body-large": "20px",
        "body-regular": "17px",
        "caption": "15px",
        "micro": "13px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;