import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Pagination,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import {
	getMyListDetail,
	getOneReqContributor,
	handleReqContributor,
	handleReqPublic,
	removeVocabInList,
	updateVocabInList
} from '../services/listService';
import { ListReturn, Vocab } from '../types/list';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import { SIZE_PAGINATION } from '../constants/constans';
import VocabDialog from './VocabDialog';
import { useSnackbar } from 'notistack';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { getCurrentUser } from '../services/authService';
import { get } from 'dot-prop';

function HandleContributor() {
	let history = useHistory();
	const { id } = useParams<{ id: string }>();
	const [list, setList] = useState<ListReturn | undefined>();
	const [listShow, setListShow] = useState<Vocab[] | undefined>();
	const [openEdit, setOpenEdit] = useState(false);
	const [newVocab, setNewVocab] = useState<Vocab | undefined>();
	const [vocab, setVocab] = useState('');
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [openDetele, setOpenDelete] = useState(false);
	const [isMyList, setIsMyList] = useState(false);
	const [voteStar, setVoteStar] = useState(0);

	console.log('voteStar', voteStar);

	const { enqueueSnackbar } = useSnackbar();

	const getData = async () => {
		const { data } = await getOneReqContributor(id);

		console.log('data', data);
		console.log('getCurrentUser()', getCurrentUser());

		if (get(data, 'author.username') === getCurrentUser()?.username) {
			setIsMyList(true);
		}
		setList(get(data, 'list'));
		console.log(
			"get(data, 'requestContributor.vocab[0]')",
			get(data, 'requestContributor.vocab')
		);
		setNewVocab(
			get<Vocab[]>(data, 'requestContributor.vocab', [
				{
					word: 'string',
					meaning: 'string',
					example: 'string'
				}
			])[0]
		);
	};

	useEffect(() => {
		getData();
	}, [id]);

	useEffect(() => {
		if (list) {
			let vocab = [...list.vocab].filter(v => v.word.match(new RegExp(search)));

			// let newListShow = list?.vocab.filter(v =>
			// 	v.word.match(new RegExp(search))
			// );
			console.log('newListShow', vocab);
			setTotalPage(
				Math.ceil(vocab.length / SIZE_PAGINATION) === 0
					? 1
					: Math.ceil(vocab.length / SIZE_PAGINATION)
			);

			setListShow(vocab);
			setVoteStar(list.star);
			// console.log(list?.vocab.filter(v => v.word.match(new RegExp(search))));
		}
	}, [search, list]);

	const handleOpenEditDialog = (word: string) => {
		setVocab(word);
		setOpenEdit(true);
	};

	const handleCloseEditDialog = () => {
		setOpenEdit(false);
		setVocab('');
	};

	const handleEdit = async (newVocab: Vocab) => {
		let flag = true;
		try {
			console.log('data', {
				name: list?.name as string,
				oldVocab: list?.vocab.find(v => v.word === vocab) as Vocab,
				newVocab
			});

			await updateVocabInList({
				name: list?.name as string,
				oldVocab: list?.vocab.find(v => v.word === vocab) as Vocab,
				newVocab
			});
			enqueueSnackbar('Cập nhật tên list thành công', { variant: 'success' });
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
			flag = false;
		}

		if (flag) {
			const newVocabs = list?.vocab.map(v => {
				if (v.word === vocab) {
					v = newVocab;
				}
				return v;
			});
			const newList = { ...list };
			newList.vocab = newVocabs;
			setList(newList as ListReturn);
			setOpenEdit(false);
			setVocab('');
		}
	};

	const handleCloseDialog = () => {
		setOpenDelete(false);
		setVocab('');
	};

	const handleDelete = async () => {
		let flag = true;
		console.log('data', {
			name: list?.name as string,
			vocab: list?.vocab.find(v => (v.word = vocab)) as Vocab
		});
		console.log('vocab', vocab);
		try {
			const result = await removeVocabInList({
				name: list?.name as string,
				vocab: list?.vocab.find(v => v.word === vocab) as Vocab
			});
			console.log('result', result);

			enqueueSnackbar('Xóa từ thành công', { variant: 'success' });
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
			flag = false;
		}

		if (flag) {
			const newList = { ...list } as ListReturn;
			newList.vocab = newList.vocab.filter(v => v.word !== vocab);
			setList(newList);
			setOpenDelete(false);
			setVocab('');
		}
	};

	const handleRequestContributor = async (state: number) => {
		try {
			await handleReqContributor(state, id);
			enqueueSnackbar('Xử lý thành công', { variant: 'success' });
		} catch (error) {
			console.log(error);
			enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
		} finally {
			history.push('/');
		}
	};

	return (
		<Container maxWidth="xl">
			<Box mx={10}>
				<Typography my={2} variant="h4">
					{list?.name}
				</Typography>
				<Box marginTop={3}>
					<Box sx={{ display: 'flex', marginBottom: 5 }}>
						<TextField
							sx={{ background: 'white' }}
							margin="none"
							value={search}
							onChange={e => {
								setSearch(e.target.value);
								// debounce(e.target.value);
							}}
							placeholder="Tìm từ"
							InputProps={{
								endAdornment: (
									<IconButton sx={{ p: '10px' }} aria-label="search">
										<SearchIcon />
									</IconButton>
								)
							}}
							size="medium"
							fullWidth
						/>
					</Box>
				</Box>
				{newVocab && (
					<Grid container spacing={2} mb={2}>
						<Grid item xs={3}>
							<TextField
								fullWidth
								sx={{ marginRight: 2 }}
								label="Từ tiếng anh"
								id="Word"
								name="word"
								value={newVocab.word}
							/>
						</Grid>
						<Grid item xs={3}>
							<TextField
								fullWidth
								sx={{ marginRight: 2 }}
								label="Nghĩa tiếng việt"
								id="Meaning"
								name="meaning"
								defaultValue={newVocab.meaning}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								label="Ví dụ"
								id="Example"
								name="example"
								defaultValue={newVocab.example}
							/>
						</Grid>
					</Grid>
				)}

				<Box display={'flex'} alignSelf="center" alignItems={'center'}>
					<Typography variant="h5">Xử lý:</Typography>
					<Box mx={1}></Box>
					<Button
						variant="contained"
						onClick={() => handleRequestContributor(2)}
					>
						Duyệt
					</Button>
					<Box mx={1}></Box>
					<Button
						variant="contained"
						onClick={() => handleRequestContributor(1)}
						sx={{ bgcolor: 'red' }}
					>
						Không duyệt
					</Button>
				</Box>
				<Box>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>
										<Typography variant="h4">Từ vựng</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography variant="h4" sx={{ whiteSpace: 'nowrap' }}>
											Nghĩa của từ
										</Typography>
									</TableCell>
									<TableCell sx={{ ml: 30 }} align="left">
										<Typography variant="h4">Ví dụ</Typography>
									</TableCell>
									<TableCell align="right"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{listShow &&
									(listShow as Vocab[])
										.slice((page - 1) * SIZE_PAGINATION, page * SIZE_PAGINATION)
										.map((vocab, index) => (
											<TableRow
												key={index}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
													cursor: 'pointer',
													textDecoration: 'none',
													color: 'white'
												}}
												hover
												classes={{ hover: 'cursor' }}
											>
												<TableCell align="left" style={{ width: 220 }}>
													<Typography variant="subtitle1">
														{vocab.word}
													</Typography>
												</TableCell>
												<TableCell align="left" style={{ width: 220 }}>
													<Typography variant="subtitle1">
														{vocab.meaning}
													</Typography>
												</TableCell>
												<TableCell sx={{ ml: 30 }} align="left">
													<Typography variant="subtitle1">
														{vocab.example}
													</Typography>
												</TableCell>
												<TableCell align="right"></TableCell>
											</TableRow>
										))}
							</TableBody>
						</Table>
					</TableContainer>
					<Box
						alignItems="center"
						sx={{
							'& ul': {
								margin: 2,
								justifyContent: 'center',
								position: 'fixed',
								bottom: 5,
								right: '40%'
							}
						}}
					>
						<Pagination
							count={totalPage}
							page={page || 1}
							onChange={(_, value: number) => {
								setPage(value);
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Container>
	);
}

export default HandleContributor;
