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
import _ from 'lodash';
import { makeValidate, TextField } from 'mui-rff';
import React from 'react';
import { Form } from 'react-final-form';
import { NavLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { getCurrentUser, signup } from '../services/authService';

interface SignUpFormData {
	username: string;
	email: string;
	password: string;
	rePassword: string;
}

const schema: Yup.SchemaOf<SignUpFormData> = Yup.object().shape({
	username: Yup.string().min(3).required(),
	email: Yup.string().email().required(),
	password: Yup.string().min(5).required(),
	rePassword: Yup.string()
		.min(5)
		.required()
		.oneOf([Yup.ref('password')], 'Passwords must match')
});

const validate = makeValidate(schema);

const SignUp = () => {
	const handleSubmit = async (user: SignUpFormData) => {
		const userSignUp = _.pick(user, 'email', 'password', 'username');

		try {
			await signup(userSignUp);
			window.location.replace('/');
		} catch (e) {
			alert(e);
		}
	};

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
					Sign Up
				</Typography>
				<Form<SignUpFormData>
					onSubmit={handleSubmit}
					validate={validate}
					render={({ handleSubmit, invalid, submitting }) => {
						return (
							<form onSubmit={handleSubmit} noValidate>
								<div className=""></div>
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
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
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
								<TextField
									margin="normal"
									// required
									fullWidth
									name="rePassword"
									label="Re-type Password"
									type="password"
									id="re-password"
									autoComplete="current-password"
								/>
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Remember me"
								/>
								<Button
									disabled={invalid || submitting}
									type="submit"
									fullWidth
									variant="contained"
									sx={{ mt: 3, mb: 2 }}
								>
									Sign up
								</Button>
							</form>
						);
					}}
				/>

				<Grid container>
					<Grid item>
						<NavLink to="/login">
							<Link variant="body2">You have an account? Log In</Link>
						</NavLink>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
};

export default SignUp;
