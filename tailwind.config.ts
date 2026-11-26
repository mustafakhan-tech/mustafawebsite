import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { paper: "#100E0B", ink: "#F2ECE2", money: "#E3A563", mint: "#1F1A14", leaf: "#E3A563" },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"], serif: ["var(--font-serif)", "Georgia", "serif"] },
      maxWidth: { page: "1120px" },
    },
  },
  plugins: [],
};
export default config;
