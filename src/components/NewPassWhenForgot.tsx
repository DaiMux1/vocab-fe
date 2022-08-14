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
import { NavLink, Redirect, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import {
	forgotPass,
	getCurrentUser,
	newPassWhenFotgot
} from '../services/authService';
import { UserRole } from '../types/user';

interface FotgotFormData {
	newPass?: string;
}

const schema: Yup.SchemaOf<FotgotFormData> = Yup.object().shape({
	newPass: Yup.string().min(5).required()
});

const validate = makeValidate(schema);

export default function NewPassWhenForgot() {
	const [error, setError] = useState('');

	const { token } = useParams<{ token: string }>();

	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async (user: FotgotFormData) => {
		if (user.newPass) {
			try {
				console.log('token', token);
				console.log('user.newPass', user.newPass);
				await newPassWhenFotgot(token, user.newPass);
				enqueueSnackbar(
					'Đổi mật khẩu thành công bạn có thể đăng nhập với mật khẩu mới',
					{
						variant: 'success'
					}
				);
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
									name="newPass"
									label="New Password"
									type="password"
									id="newPass"
									autoComplete="current-password"
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
									Send
								</Button>
							</form>
						);
					}}
				/>
			</Box>
		</Container>
	);
}
