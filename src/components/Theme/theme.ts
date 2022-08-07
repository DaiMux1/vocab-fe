import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#6308F7',
			light: '#EEE5FE',
			dark: '#3C0594',
			bg: '#110932',
			note: '#00E1D2'
		},
		secondary: {
			main: '#00A7E5',
			light: '#F2FCFF',
			dark: '#007099'
		},
		success: {
			main: '#00CC67',
			light: '#F2FFF9',
			dark: '#00994D'
		},
		warning: {
			main: '#EEEE2C',
			light: '#FFFFF2',
			dark: '#6A5300'
		},
		error: {
			main: '#E40173',
			light: '#FFF2F9',
			dark: '#98014C'
		},
		grayscale: {
			offwhite: '#FCFCFC',
			background: '#F7F7FC',
			input: '#EFF0F6',
			line: '#D9DBE9',
			placeholder: '#A0A3BD',
			label: '#6E7191',
			body: '#4E4B66',
			ash: '#262338',
			offback: '#14142B',
			backgroundTable: '#180D48'
		},
		text: {
			primary: '#6308F7',
			secondary: '#4E4B66',
			disabled: 'rgba(55, 65, 81, 0.48)'
		}
		// background: {
		// 	default: '#110932'
		// }
	},
	shape: {
		borderRadius: 8
	},
	typography: {
		fontFamily: [
			'"Poppins"',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		h1: {
			fontSize: '6.0625rem',
			fontWeight: 700,
			lineHeight: '125%',
			letterSpacing: '-1.5px'
		},
		h2: {
			fontSize: '3.8125rem',
			fontWeight: 700,
			lineHeight: '125%',
			letterSpacing: '-0.5px'
		},
		h3: {
			fontSize: '3rem',
			fontWeight: 700,
			lineHeight: '125%'
		},
		h4: {
			fontSize: '2.125rem',
			fontWeight: 700,
			lineHeight: '150%',
			letterSpacing: '0.25px'
		},
		h5: {
			fontSize: '1.5rem',
			fontWeight: 700,
			lineHeight: '150%'
		},
		h6: {
			fontSize: '1.25rem',
			fontWeight: 700,
			lineHeight: '150%',
			letterSpacing: '0.15px'
		},
		subtitle1: {
			fontSize: '1rem',
			fontWeight: 600,
			lineHeight: '150%',
			letterSpacing: '0.15px'
		},
		subtitle2: {
			fontSize: '0.875rem',
			fontWeight: 600,
			lineHeight: '150%',
			letterSpacing: '0.1px'
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: '150%',
			letterSpacing: '0.5px'
		},
		body2: {
			fontSize: '0.875rem',
			fontWeight: 600,
			lineHeight: '150%',
			letterSpacing: '0.25px'
		},
		button: {
			fontSize: '0.875rem',
			fontWeight: 600,
			lineHeight: '150%',
			letterSpacing: '1.25px',
			textTransform: 'uppercase'
		},
		caption: {
			fontSize: '0.75rem',
			fontWeight: 600,
			lineHeight: '150%',
			letterSpacing: '0.4px'
		},
		overline: {
			fontSize: '0.625rem',
			fontWeight: 600,
			lineHeight: '150%',
			letterSpacing: '1.5px'
		}
	}
});
