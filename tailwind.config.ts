import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        vsi: {
          blue: "#094074",
          baltic: "#3c6997",
          navy: "#003566",
          yellow: "#ffc300",
          gold: "#ffd60a",
        },
      },
    },
  },

  plugins: [],
};

export default config;