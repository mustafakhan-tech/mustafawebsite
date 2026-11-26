import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { paper: "#EDF1EC", ink: "#10241A", money: "#2C6E4E", mint: "#CDE6D4", leaf: "#9FD3B2" },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"], serif: ["var(--font-serif)", "Georgia", "serif"] },
      maxWidth: { page: "1120px" },
    },
  },
  plugins: [],
};
export default config;
