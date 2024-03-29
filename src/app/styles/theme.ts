import { MantineThemeOverride } from "@mantine/core";

export const myTheme: MantineThemeOverride = {
	components: {
		Button: {
			defaultProps: (theme) => ({
				radius: "xl",
				size: "sm",
				uppercase: true,
			}),
		},
	},

	fontSizes: {
		Button: "10px",
	},
	loader: "bars",
	fontFamily: "Open Sans, sans serif",
	spacing: { xs: "0.5rem", sm: "1rem", md: "1.5rem", lg: "2rem", xl: "2.5rem" },
	headings: {
		fontFamily: "Roboto, sans-serif",
		sizes: {
			h1: { fontSize: "5em" },
			h2: { fontSize: "1rem" },
			h3: { fontSize: "2rem" },
			h4: { fontSize: "2rem" },
			h5: { fontSize: "2rem" },
		},
	},
	colors: {
		brand: ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4", "#039BE5", "#0288D1", "#0277BD", "#01579B"],
		dark: ["#d5d7e0", "#acaebf", "#8c8fa3", "#666980", "#4d4f66", "#34354a", "#2b2c3d", "#1d1e30", "#0c0d21", "#01010a"],
	},
	primaryColor: "indigo",
	primaryShade: { light: 6, dark: 9 },
	defaultGradient: { deg: 60, from: "indigo", to: "indigo.3" },
};
