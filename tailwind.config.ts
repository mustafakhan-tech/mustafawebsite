import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { flannel: "#DADDDF", ink: "#0F1C33", tape: "#F2C230", chalk: "#4E73B5", pin: "#C8372D" },
      fontFamily: { display: ["var(--font-display)", "sans-serif"], serif: ["var(--font-serif)", "Georgia", "serif"] },
    },
  },
  plugins: [],
};
export default config;
