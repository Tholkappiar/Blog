/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                "3xl": "2500px",
            },
            fontFamily: {
                "koh-santepheap": ["Koh Santepheap", "serif"],
                Oranienbaum: ["Oranienbaum", "serif"],
            },
            colors: {
                background: "#f3f4f6", // Light background
                textMain: "#4b5563", // Main text color (content)
                primary: "#111827", // Primary color (blog title)
                muted: "#6b7280", // Muted text (info)
                card: "#ffffff",
                accentBackground: "#e5e7eb", // Accent background (tags bg)
                accentText: "#374151", // Accent text (tags text)

                // Dark Mode
                darkBackground: "#111827", // Dark background
                darkTextMain: "#d1d5db", // Main text color in dark mode
                darkPrimary: "#ffffff", // Primary color in dark mode (blog title)
                darkMuted: "#9ca3af", // Muted text in dark mode (info)
                darkCard: "#1f2937", // dark card background
                darkAccentBackground: "#374151", // Dark accent background (tags bg)
                darkAccentText: "#d1d5db", // Dark accent text (tags text)
            },
            animation: {
                shimmer: "shimmer 1.5s infinite linear",
            },
            keyframes: {
                shimmer: {
                    "0%": { "background-position": "-100% 0" },
                    "100%": { "background-position": "100% 0" },
                },
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
