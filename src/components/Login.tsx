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
import { makeValidate, TextField } from 'mui-rff';
import * as React from 'react';
import { Form } from 'react-final-form';
import { NavLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { getCurrentUser, login } from '../services/authService';
import { UserRole } from '../types/user';

interface LoginFormData {
	username?: string | null;
	password?: string | null;
}

const schema: Yup.SchemaOf<LoginFormData> = Yup.object().shape({
	username: Yup.string().required(),
	password: Yup.string().min(5).required()
});

const validate = makeValidate<LoginFormData>(schema);

export default function Login() {
	const handleSubmit = async (user: LoginFormData) => {
		if (user.username && user.password) {
			try {
				await login({
					username: user.username,
					password: user.password
				});

				const currentUser = JSON.parse(getCurrentUser() as string);
				console.log('currentUser', currentUser);

				// const path = currentUser.role === UserRole.admin ? '/admin' : '/';
				// window.location.replace('/');
			} catch (e) {
				alert(e);
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
					Login
				</Typography>
				<Form<LoginFormData>
					onSubmit={handleSubmit}
					validate={validate}
					render={({ handleSubmit, invalid, submitting }) => {
						return (
							<form onSubmit={handleSubmit}>
								<TextField
									margin="normal"
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									autoFocus
								/>
								<TextField
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
								{/* <FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Remember me"
								/> */}
								<Button
									disabled={invalid || submitting}
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Login
								</Button>
							</form>
						);
					}}
				/>

				<Grid container>
					<Grid item xs>
						<NavLink to="/forgot-password">
							<Link variant="body2">Forgot password?</Link>
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
