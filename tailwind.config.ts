import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#C0DEFF",
        purple: "#ADA2FF",
        red: "#FF003D",
        yellow: "#FFFDDE",
        gray: "#D6D6D6",
        deepBlue: "#429CFF",
        green: "#80AB28",
        background: "#F8F8F8",
      },
    },
  },
  plugins: [],
} satisfies Config;
