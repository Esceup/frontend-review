/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070d18",
          900: "#0a1120",
          850: "#0c1526",
          800: "#101a2e",
          750: "#12203a",
          700: "#152238",
          600: "#21324f",
          500: "#2c4066",
        },
        mist: {
          100: "#e9eef9",
          300: "#c6d2e6",
          400: "#8fa1bf",
          500: "#5b6f92",
        },
        accent: {
          html: "#ff8a3d",
          css: "#43d2ff",
          js: "#ffc857",
          http: "#3dd68c",
          ts: "#4a9eff",
          react: "#61dafb",
          redux: "#b58df2",
        },
        lvl: {
          0: "#ff6b6b",
          1: "#ffc857",
          2: "#43d2ff",
          3: "#3dd68c",
        },
      },
      fontFamily: {
        display: ["Unbounded", "system-ui", "sans-serif"],
        body: ["'Golos Text'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};