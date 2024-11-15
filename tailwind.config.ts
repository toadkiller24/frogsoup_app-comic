import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: ["var(--font-roboto-condensed)"],
        'open-sans': ["var(--font-open-sans)"],
        playfair: ["var(--font-playfair)"],
        'memo-gold': ["var(--font-memo-gold)"],
      },
    },
  },
  plugins: [],
};
export default config;