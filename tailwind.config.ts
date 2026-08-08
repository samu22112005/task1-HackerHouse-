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
        hhgoa: {
          bg: "#0B3D2E",
          secondary: "#14532D",
          card: "#1B4332",
          yellow: "#FFD23F",
          gold: "#E9B949",
          pink: "#FF007A",
          dark: "#0D2A22",
          light: "#FFFDF7",
          muted: "#D6DCCF",
          border: "#2E5A46",
          success: "#59C173",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant-garamond)", "serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      boxShadow: {
        "expedition-yellow": "0 0 25px -5px rgba(255, 210, 63, 0.4), 0 0 10px -2px rgba(233, 185, 73, 0.3)",
        "card-glass": "0 10px 30px 0 rgba(11, 61, 46, 0.5)",
      },
      backgroundImage: {
        "jungle-gradient": "radial-gradient(ellipse at top, #14532D 0%, #0B3D2E 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(27, 67, 50, 0.85) 0%, rgba(20, 83, 45, 0.7) 100%)",
        "yellow-gradient": "linear-gradient(135deg, #FFD23F 0%, #E9B949 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
