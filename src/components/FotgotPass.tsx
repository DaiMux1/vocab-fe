import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { AxiosError } from 'axios';

import { makeValidate, TextField } from 'mui-rff';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Form } from 'react-final-form';
import { NavLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { forgotPass, getCurrentUser } from '../services/authService';
import { UserRole } from '../types/user';

interface FotgotFormData {
	email?: string;
}

const schema: Yup.SchemaOf<FotgotFormData> = Yup.object().shape({
	email: Yup.string().email().required()
});

const validate = makeValidate(schema);

export default function ForgotPass() {
	const [error, setError] = useState('');

	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (user: FotgotFormData) => {
		if (user.email) {
			try {
				await forgotPass(user.email);
				enqueueSnackbar('Vui lòng vào email để xác nhận', {
					variant: 'success'
				});
			} catch (e) {
				const error = e as AxiosError;
				if (error.response) {
					// console.log('111', error.response);
					const { data } = error.response;
					setError(data.message);
				}
				enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
			}
		}
	};

	// yes, this can even be async!

	if (getCurrentUser()) return <Redirect to="/" />;

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Forgot password
				</Typography>
				<Form<FotgotFormData>
					onSubmit={handleSubmit}
					validate={validate}
					render={({ handleSubmit, invalid, submitting }) => {
						return (
							<form onSubmit={handleSubmit}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									autoFocus
								/>
								{error && (
									<Typography sx={{ color: 'red' }}>{error}</Typography>
								)}

								<Button
									disabled={invalid || submitting}
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Send mail
								</Button>
							</form>
						);
					}}
				/>

				<Grid container>
					<Grid item xs>
						<NavLink to="/login">
							<Link variant="body2">Login</Link>
						</NavLink>
					</Grid>
					<Grid item>
						<NavLink to="/signup">
							<Link variant="body2">Don't have an account? Sign Up</Link>
						</NavLink>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
