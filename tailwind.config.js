const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: {
        content: ["./src/**/*.tsx"],
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                focus: "0px 0px 0px 2px #04bdf2",
            },
        },
        colors: {
            transparent: "transparent",

            black: "#000",
            white: "#FFFFFF",

            gray: {
                200: "#A6A7A9",
                400: "#2D3137",
                500: "#272B2F",
                700: "#212529",
            },
            blue: {
                500: "#3F84F8",
                300: "#00BDF2",
            },
        },
    },
    variants: {
        backgroundColor: ["responsive", "even", "odd", "hover", "focus"],
    },
    plugins: [require("@tailwindcss/ui")],
    important: true,
};
