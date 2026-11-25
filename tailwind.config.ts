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
          olive: "#54683C",
          oliveLight: "#708953",
          oliveDark: "#3E4E2A",
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
        sans: ["var(--font-sans-main)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif-main)", "Georgia", "serif"],
        display: ["var(--font-serif-main)", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
