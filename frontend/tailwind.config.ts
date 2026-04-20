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
        gold: {
          50: "#FFF9E6",
          100: "#FFF0BF",
          200: "#FFE699",
          300: "#FFD966",
          400: "#FFCC33",
          500: "#D4A017",
          600: "#B8860B",
          700: "#966F00",
          800: "#7A5A00",
          900: "#5E4500",
        },
        navy: {
          50: "#E8EAF0",
          100: "#C5CAD9",
          200: "#9FA8C0",
          300: "#7886A7",
          400: "#5B6D94",
          500: "#3E5481",
          600: "#384D79",
          700: "#30436E",
          800: "#283A64",
          900: "#1B2951",
          950: "#0F1A33",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "gold-glow": "0 0 20px rgba(212, 160, 23, 0.3)",
        "gold-soft": "0 4px 14px 0 rgba(212, 160, 23, 0.15)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-gold": "pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 160, 23, 0.4)" },
          "50%": { boxShadow: "0 0 20px 10px rgba(212, 160, 23, 0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
