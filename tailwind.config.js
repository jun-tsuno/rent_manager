const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			noto_sans: ["var(--font-inter)", ...fontFamily.serif],
		},
	},
	plugins: [],
};
