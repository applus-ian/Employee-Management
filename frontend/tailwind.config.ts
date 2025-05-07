import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        dialog: '80rem', // adjust as needed (e.g., 1280px)
      },
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
    
    
  },
  plugins: [],
} satisfies Config;