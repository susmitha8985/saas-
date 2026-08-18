/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "var(--bg-color)",
          card: "var(--card-bg)",
          border: "var(--border-light)",
          text: "var(--text-dark)",
          muted: "var(--text-muted)",
        },
        primary: {
          indigo: "var(--primary-indigo)",
          purple: "var(--primary-purple)",
          cyan: "var(--primary-blue)",
          pink: "#ec4899",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
