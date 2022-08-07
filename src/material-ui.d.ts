export {};

import {
	PaletteOptions,
	PaletteColorOptions
} from '@mui/material/styles/createPalette';
import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles/createPalette' {
	export interface PaletteOptions {
		grayscale: {
			offwhite;
			background;
			input;
			line;
			placeholder;
			label;
			body;
			ash;
			offback;
			backgroundTable;
		};
	}
	export interface SimplePaletteColorOptions {
		bg?;
		note?;
	}
}
