import {
	Button,
	Container,
	Grid,
	Icon,
	IconButton,
	TextField,
	Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { createList } from '../services/listService';
import { Vocab } from '../types/list';
import { SnackbarProvider, useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';

const checkFormInput = (form: Vocab[]) => {
	for (const vocab of form) {
		for (const value of Object.values(vocab)) {
			if (!value) {
				return false;
			}
		}
	}
	return true;
};

export function CreateList() {
	const [error, setError] = useState('');
	const [name, setName] = useState('');
	const [flag, setFlag] = useState(true);
	// const [formInput, setFormInput] = useReducer(
	// 	(state: Vocab[], action: { index: number; value?: Partial<Vocab> }) => {
	// 		if (action.index === state.length) {
	// 			state.push({
	// 				word: '',
	// 				meaning: '',
	// 				example: ''
	// 			});
	// 		} else {
	// 			state[action.index] = { ...state[action.index], ...action.value };
	// 		}
	// 		return state;
	// 	},
	// 	[
	// 		{
	// 			word: '',
	// 			meaning: '',
	// 			example: ''
	// 		}
	// 	]
	// );
	const [words, setWords] = useState<Vocab[]>([
		{
			word: '',
			meaning: '',
			example: ''
		}
	]);

	const { enqueueSnackbar } = useSnackbar();

	const handleInput = (
		evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const name = evt.target.name;
		const newValue = evt.target.value;
		words[index] = { ...words[index], ...{ [name]: newValue } };
		setWords(words);
		setFlag(!flag);
	};

	const handleAddWord = () => {
		words.push({
			word: '',
			meaning: '',
			example: ''
		});
		setWords(words);
		setFlag(!flag);
	};

	const handleDelete = (index: number) => {
		let newWords = words.filter((_, ind) => ind !== index);
		setWords(newWords);
		setFlag(!flag);
	};

	const handleSubmit = async (
		evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		try {
			await createList({ name, vocab: words });
			enqueueSnackbar('Tạo list thành công', { variant: 'success' });
		} catch (e) {
			const error = e as AxiosError;
			if (error.response) {
				// console.log('111', error.response);
				const { data } = error.response;
				setError(data.message);
				enqueueSnackbar('Tạo list thất bại', { variant: 'error' });
			}
		}
	};

	const newWordForm = (vocab: Vocab, index: number) => {
		return (
			<Grid container spacing={2} mb={2}>
				<Grid item xs={3}>
					<TextField
						fullWidth
						sx={{ marginRight: 2 }}
						label="Từ tiếng anh"
						id="Word"
						name="word"
						value={vocab.word}
						onChange={e => handleInput(e, index)}
					/>
				</Grid>
				<Grid item xs={3}>
					<TextField
						fullWidth
						sx={{ marginRight: 2 }}
						label="Nghĩa tiếng việt"
						id="Meaning"
						name="meaning"
						defaultValue={vocab.meaning}
						onChange={e => handleInput(e, index)}
					/>
				</Grid>
				<Grid item xs={5}>
					<TextField
						fullWidth
						label="Ví dụ"
						id="Example"
						name="example"
						defaultValue={vocab.example}
						onChange={e => handleInput(e, index)}
					/>
				</Grid>
				<Grid item xs={1} mt={1}>
					<IconButton onClick={() => handleDelete(index)}>
						<DeleteIcon color="error" />
					</IconButton>
				</Grid>
			</Grid>
		);
	};

	return (
		<>
			<Container maxWidth="xl">
				<Box mx={10}>
					<Typography my={2} variant="h4" sx={{ color: '#1976d2' }}>
						Tạo List
					</Typography>
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
					{words.map((vocab, index) => newWordForm(vocab, index))}

					{error && <Typography sx={{ color: 'red' }}>{error}</Typography>}

					<Box display="flex" justifyContent="center" px={2}>
						<Button
							sx={{ mx: 10 }}
							disabled={!name || !checkFormInput(words) || !!error}
							type="submit"
							variant="contained"
							color="primary"
							onClick={handleAddWord}
						>
							Thêm từ
						</Button>
						<Button
							disabled={!name || !checkFormInput(words) || !!error}
							sx={{ mx: 20 }}
							type="submit"
							variant="contained"
							color="primary"
							onClick={e => handleSubmit(e)}
						>
							Tạo List
						</Button>
					</Box>
				</Box>
			</Container>
		</>
	);
}
