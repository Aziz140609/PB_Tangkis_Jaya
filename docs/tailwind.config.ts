import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002451",
        "primary-container": "#1a3a6b",
        "primary-fixed": "#d7e2ff",
        "primary-fixed-dim": "#abc7ff",
        "on-primary": "#ffffff",
        "on-primary-container": "#89a5dd",
        "on-primary-fixed": "#001b3f",
        "on-primary-fixed-variant": "#284678",
        "inverse-primary": "#abc7ff",

        secondary: "#b7102a",
        "secondary-container": "#db313f",
        "secondary-fixed": "#ffdad8",
        "secondary-fixed-dim": "#ffb3b1",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#fffbff",
        "on-secondary-fixed": "#410007",
        "on-secondary-fixed-variant": "#92001c",

        tertiary: "#735c00",
        "tertiary-container": "#cba72f",
        "tertiary-fixed": "#ffe088",
        "tertiary-fixed-dim": "#e9c349",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#4e3d00",
        "on-tertiary-fixed": "#241a00",
        "on-tertiary-fixed-variant": "#574500",

        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        background: "#f8f9fa",
        "on-background": "#191c1d",

        surface: "#f8f9fa",
        "surface-dim": "#d9dadb",
        "surface-bright": "#f8f9fa",
        "surface-variant": "#e1e3e4",
        "on-surface": "#191c1d",
        "on-surface-variant": "#43474f",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "surface-tint": "#415e91",
        "surface-border": "#dee2e6",

        outline: "#747780",
        "outline-variant": "#c4c6d0",

        "inverse-surface": "#2e3132",
        "inverse-on-surface": "#f0f1f2",

        "text-main": "#212529",
        "text-muted": "#6c757d",
        "warning": "#ffc107",
        success: "#28a745",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "margin-mobile": "16px",
        gutter: "24px",
        "margin-desktop": "40px",
        "container-max": "1280px",
        "diagonal-offset": "4vw",
        unit: "8px",
        "sidebar-width": "260px",
        "stack-sm": "0.5rem",
        "stack-md": "1rem",
        "stack-lg": "1.5rem",
        "container-padding": "2rem",
      },
      fontFamily: {
        "headline-xl": ["Barlow Condensed", "sans-serif"],
        "headline-lg": ["Barlow Condensed", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "display-lg": ["Barlow Condensed", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
      },
      fontSize: {
        "headline-xl": ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        "headline-lg": [
          "32px",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "headline-lg-mobile": [
          "28px",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "headline-md": [
          "18px",
          { lineHeight: "24px", fontWeight: "600" },
        ],
        "display-lg": [
          "72px",
          {
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-lg": [
          "18px",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        "label-md": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.02em",
            fontWeight: "500",
          },
        ],
        "label-sm": [
          "11px",
          {
            lineHeight: "14px",
            letterSpacing: "0.05em",
            fontWeight: "600",
          },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
