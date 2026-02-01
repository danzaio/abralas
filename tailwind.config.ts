import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#000000',
                foreground: '#ffffff',
                card: {
                    DEFAULT: 'hsl(0 0% 5%)',
                    foreground: 'hsl(0 0% 95%)'
                },
                popover: {
                    DEFAULT: 'hsl(0 0% 5%)',
                    foreground: 'hsl(0 0% 95%)'
                },
                primary: {
                    DEFAULT: '#b91c1c', /* Red-700 */
                    foreground: '#ffffff'
                },
                secondary: {
                    DEFAULT: 'hsl(0 0% 10%)',
                    foreground: 'hsl(0 0% 95%)'
                },
                muted: {
                    DEFAULT: 'hsl(0 0% 15%)',
                    foreground: 'hsl(0 0% 60%)'
                },
                accent: {
                    DEFAULT: '#fbbf24', /* Amber-400 (Gold) */
                    foreground: '#000000'
                },
                destructive: {
                    DEFAULT: 'hsl(0 62.8% 30.6%)',
                    foreground: 'hsl(0 0% 98%)'
                },
                border: 'hsl(0 0% 15%)',
                input: 'hsl(0 0% 15%)',
                ring: '#dc2626',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "glitch": "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "glitch": {
                    "0%": { transform: "translate(0)" },
                    "20%": { transform: "translate(-3px, 3px)" },
                    "40%": { transform: "translate(-3px, -3px)" },
                    "60%": { transform: "translate(3px, 3px)" },
                    "80%": { transform: "translate(3px, -3px)" },
                    "100%": { transform: "translate(0)" },
                }
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
