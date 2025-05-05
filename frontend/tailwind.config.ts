import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],  // Adding the custom font family
      },
    },
    keyframes: {
      wave: {
        '0%': { transform: 'translateY(0)' },
        '30%': { transform: 'translateY(-8px)' },
        '60%': { transform: 'translateY(4px)' },
        '100%': { transform: 'translateY(0)' },
      },
    },
    animation: {
      waveOnce: 'wave 1s ease-in-out',
    },
    
  },
  plugins: [],
} satisfies Config;