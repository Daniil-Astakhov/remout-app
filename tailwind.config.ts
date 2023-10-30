import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				tall: { raw: "(min-height: 600px) and (min-width: 1024px)" },
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				main: "#dbdbdb", // Определяем кастомный цвет "main"
				customText: "#FF0000", // Пример определения еще одного кастомного цвета
				borderBlack: "#ffffff21",
				blackColor: "#171717",
				greyColor: "#A1A1AA",
				disabledColor: "#DBDBDB",
				greenColor: "#18CA65",
				pinkColor: "#F31260",
				darkPinkColor: "#CC0A4E",
				yellowColor: "#FFB864",
				whiteColor: "#FFFFFF",
			},
			top: {
				dv10: "10dvh",
			},
			fontSize: {
				xxs: "12px",
				xs: "13px",
				s: "14px",
				m: "15px",
				l: "16px",
				xl: "17px",
				xxl: "18px",
			},
			width: {
				logo: "500px",
				dw: "100dvw",
			},
			height: {
				dv100: "100dvh",
				dv80: "80dvh",
				dv70: "70dvh",
				dv10: "10dvh",
			},
		},
		darkMode: "class",
	},

	darkMode: "class",
	plugins: [nextui()],
};
export default config;
