import {
	Button,
	Container,
	Grid,
	Icon,
	TextField,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { AxiosError } from 'axios';
import { useContext, useReducer, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { createList } from '../services/listService';
import { Vocab } from '../types/list';
import UserContext from './Context/UserContext';

const checkFormInput = (form: Vocab) => {
	for (const value of Object.values(form)) {
		if (!value) {
			return false;
		}
	}
	return true;
};

export function CreateList() {
	const { user } = useContext(UserContext);
	const [error, setError] = useState('');
	const [name, setName] = useState('');
	const [formInput, setFormInput] = useReducer(
		(state: Vocab, newState: Partial<Vocab>) => ({
			...state,
			...newState
		}),
		{
			word: '',
			meaning: '',
			example: ''
		}
	);

	if (!getCurrentUser()) {
		return <Redirect to="/login" />;
	}

	const handleInput = (
		evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const name = evt.target.name;
		const newValue = evt.target.value;
		setFormInput({ [name]: newValue });
	};

	const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		console.log({ name, formInput });

		try {
			await createList({ name, vocab: [formInput] });
			alert('Oke');
		} catch (e) {
			const error = e as AxiosError;
			if (error.response) {
				// console.log('111', error.response);
				const { data } = error.response;
				setError(data.message);
			}
		}
	};

	return (
		<>
			<Container maxWidth="xl">
				<Box mx={10}>
					<Typography my={2} variant="h4" sx={{ color: '#1976d2' }}>
						Tạo List
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Tên List từ vựng"
							id="Name"
							name="name"
							defaultValue={name}
							onChange={e => {
								setError('');
								setName(e.target.value);
							}}
						/>
						<Typography my={2} variant="h4" sx={{ color: '#1976d2' }}>
							Từ vựng
						</Typography>
						<Grid container spacing={2} mb={2}>
							<Grid item xs={3}>
								<TextField
									fullWidth
									sx={{ marginRight: 2 }}
									label="Từ tiếng anh"
									id="Word"
									name="word"
									defaultValue={formInput.word}
									onChange={handleInput}
								/>
							</Grid>
							<Grid item xs={3}>
								<TextField
									fullWidth
									sx={{ marginRight: 2 }}
									label="Nghĩa tiếng việt"
									id="Meaning"
									name="meaning"
									defaultValue={formInput.meaning}
									onChange={handleInput}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									fullWidth
									label="Ví dụ"
									id="Example"
									name="example"
									defaultValue={formInput.example}
									onChange={handleInput}
								/>
							</Grid>
						</Grid>

						{error && <Typography sx={{ color: 'red' }}>{error}</Typography>}

						<Box display="flex" justifyContent="center" px={2}>
							<Button
								disabled={!user || !checkFormInput(formInput) || !!error}
								type="submit"
								variant="contained"
								color="primary"
							>
								Tạo List
							</Button>
						</Box>
					</form>
				</Box>
			</Container>
		</>
	);
}
