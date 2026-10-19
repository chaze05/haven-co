import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        paper: "#F6F1E7",
        ink: "#1D1B18",
        clay: "#B4552D",
        "clay-dark": "#8F3F1F",
        olive: "#4B5744",
        sand: "#E8DDCB",
        line: "#DED4C4",
        muted: "#6A6359",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: { page: "1240px" },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        "ken-burns": {
          from: { transform: "scale(1)" },
          to: { transform: "scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 46s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
