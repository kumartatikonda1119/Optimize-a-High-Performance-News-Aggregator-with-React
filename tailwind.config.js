/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0e13",
        paper: "#0c0f14",
        steel: "#141824",
        glow: "#6dd3ff",
        accent: "#7c5cff",
        coral: "#ff8b6a",
        haze: "#e6e9f2",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"Space Grotesk"', "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        halo: "0 0 60px rgba(124, 92, 255, 0.35)",
        soft: "0 20px 60px rgba(12, 15, 20, 0.35)",
        glow: "0 0 30px rgba(109, 211, 255, 0.4)",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at top, rgba(124, 92, 255, 0.35), transparent 55%), radial-gradient(circle at 20% 20%, rgba(109, 211, 255, 0.2), transparent 60%), radial-gradient(circle at 80% 10%, rgba(255, 139, 106, 0.2), transparent 60%)",
        mesh: "linear-gradient(120deg, rgba(124, 92, 255, 0.15), transparent 40%), linear-gradient(240deg, rgba(109, 211, 255, 0.18), transparent 45%), linear-gradient(320deg, rgba(255, 139, 106, 0.1), transparent 45%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.65" },
          "50%": { opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
        ticker: "ticker 28s linear infinite",
      },
    },
  },
  plugins: [],
};
