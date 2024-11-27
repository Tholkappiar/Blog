import { Button } from "@/components/ui/button";

export function ButtonDemo() {
    return <Button>Button</Button>;
}

// /** @type {import('tailwindcss').Config} */
// export default {
//     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//     theme: {
//         extend: {
//             screens: {
//                 "3xl": "2500px",
//             },
//             fontFamily: {
//                 "koh-santepheap": ["Koh Santepheap", "serif"],
//                 Oranienbaum: ["Oranienbaum", "serif"],
//             },
//             colors: {
//                 background: "hsl(var(--background))",
//                 textMain: "#4b5563",
//                 primary: {
//                     DEFAULT: "hsl(var(--primary))",
//                     foreground: "hsl(var(--primary-foreground))",
//                 },
//                 muted: {
//                     DEFAULT: "hsl(var(--muted))",
//                     foreground: "hsl(var(--muted-foreground))",
//                 },
//                 card: {
//                     DEFAULT: "hsl(var(--card))",
//                     foreground: "hsl(var(--card-foreground))",
//                 },
//                 accentBackground: "#e5e7eb",
//                 accentText: "#374151",
//                 darkBackground: "#111827",
//                 darkTextMain: "#d1d5db",
//                 darkPrimary: "#ffffff",
//                 darkMuted: "#9ca3af",
//                 darkCard: "#1f2937",
//                 darkAccentBackground: "#374151",
//                 darkAccentText: "#d1d5db",
//                 foreground: "hsl(var(--foreground))",
//                 popover: {
//                     DEFAULT: "hsl(var(--popover))",
//                     foreground: "hsl(var(--popover-foreground))",
//                 },
//                 secondary: {
//                     DEFAULT: "hsl(var(--secondary))",
//                     foreground: "hsl(var(--secondary-foreground))",
//                 },
//                 accent: {
//                     DEFAULT: "hsl(var(--accent))",
//                     foreground: "hsl(var(--accent-foreground))",
//                 },
//                 destructive: {
//                     DEFAULT: "hsl(var(--destructive))",
//                     foreground: "hsl(var(--destructive-foreground))",
//                 },
//                 border: "hsl(var(--border))",
//                 input: "hsl(var(--input))",
//                 ring: "hsl(var(--ring))",
//                 chart: {
//                     1: "hsl(var(--chart-1))",
//                     2: "hsl(var(--chart-2))",
//                     3: "hsl(var(--chart-3))",
//                     4: "hsl(var(--chart-4))",
//                     5: "hsl(var(--chart-5))",
//                 },
//             },
//             animation: {
//                 shimmer: "shimmer 1.5s infinite linear",
//             },
//             keyframes: {
//                 shimmer: {
//                     "0%": {
//                         "background-position": "-100% 0",
//                     },
//                     "100%": {
//                         "background-position": "100% 0",
//                     },
//                 },
//             },
//             borderRadius: {
//                 lg: "var(--radius)",
//                 md: "calc(var(--radius) - 2px)",
//                 sm: "calc(var(--radius) - 4px)",
//             },
//         },
//     },
//     plugins: [require("tailwindcss-animate")],
//     darkMode: ["class"],
// };
