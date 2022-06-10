import { createTheme } from '@mui/material';

export const theme = createTheme({
	// palette: {
	// 	primary: {
	// 		main: '#ffffff'
	// 	},
	// 	secondary: {
	// 		main: '#00b0ff'
	// 	}
	// },
	typography: {
		fontFamily: [
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
		].join(',')
	}
});