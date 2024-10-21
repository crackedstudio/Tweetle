import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Plus Jakarta Sans", "sans-serif"],
        },
        extend: {
            keyframes: {
                rotateX: {
                    "0%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(360deg)" },
                },
            },
            animation: {
                rotateX: "rotateX 5s infinite linear",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            boxShadow: {
                letterShadow: "-2.97px 2.97px 2.97px 0px #000000",
            },
            backgroundImage: {
                "gradient-svg": "url('/assets/Gradient.svg')",
            },
        },
    },
    plugins: [],
};
export default config;
