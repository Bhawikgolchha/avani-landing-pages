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
        avani: {
          forest: "#163515",
          tea: "#DCE7D4",
          sand: "#F4EFEA",
          emerald: "#0D200C",
          sage: "#8FA882",
          dark: "#0B190B",
          moss: "#2D5A27",
          cream: "#FAF7F2",
          neon: "#10B981",
          lagoon: "#1A4B4E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
