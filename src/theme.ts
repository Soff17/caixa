"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles/shadows";

// Example soft shadow for all elevation levels (customize as needed)
const softShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
const allShadows: Shadows = Array(25).fill(softShadow) as Shadows;

let theme = createTheme({
    palette: {
        primary: {
            main: "#84BF23", // Your primary color
        },
        secondary: {
            main: "#00407A", // Your secondary color
        },
    },
    shape: {
        borderRadius: 20, // Global border radius
    },
    shadows: allShadows,
    typography: {
        fontFamily: "Inter, sans-serif", // Global font family

        // Headings
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 400,
        },
        h3: {
            fontWeight: 400,
        },
        h4: {
            fontWeight: 400,
        },

        // Body and Subtitles
        body1: {
            fontWeight: 300,
        },
        body2: {
            fontWeight: 300,
        },
        subtitle1: {
            fontWeight: 300,
        },
        subtitle2: {
            fontWeight: 300,
        },

        // Buttons
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: "transform 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.02)",
                    },
                },
            },
        },
    },
});

theme = responsiveFontSizes(theme);

export default theme;
