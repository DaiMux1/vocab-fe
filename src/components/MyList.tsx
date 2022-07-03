import {
	Box,
	Button,
	Container,
	IconButton,
	Pagination,
	TableContainer,
	TextField,
	Typography
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { FilterList } from '../types/filter';
import _ from 'lodash';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ListReturn } from '../types/list';
import PublicIcon from '@mui/icons-material/Public';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { deleteList, getMyList, updateNameList } from '../services/listService';
import { useSnackbar } from 'notistack';
import ConfirmEditDialog from './ConfirmEditDialog';
import { SIZE_PAGINATION } from '../constants/constans';
import Loading from './Loading';

function MyList() {
	const history = useHistory();
	const [search, setSearch] = useState('');
	const [lists, setLists] = useState<ListReturn[]>([]);
	const [listId, setListId] = useState<string>('');
	const [openDetele, setOpenDelete] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const { enqueueSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);

	const [filter, setFilter] = useState<FilterList>({
		search: ''
	});

	const getData = async (filter: FilterList) => {
		const { data } = await getMyList(filter);
		setLists(data as ListReturn[]);
		setTotalPage(
			Math.ceil((data as ListReturn[]).length / SIZE_PAGINATION) === 0
				? 1
				: Math.ceil((data as ListReturn[]).length / SIZE_PAGINATION)
		);
	};

	useEffect(() => {
		setIsLoading(true);

		getData(filter);
		setIsLoading(false);

		return () => {};
	}, [filter]);

	const debounce = _.debounce((filter: FilterList) => {
		setFilter(filter);
	}, 1000);

	const handleOpenDeleteDialog = (id: string) => {
		setListId(id);
		setOpenDelete(true);
	};

	const handleCloseDialog = () => {
		setOpenDelete(false);
		setListId('');
	};

	const handleDelete = async () => {
		let flag = true;
		try {
			await deleteList(listId);
			enqueueSnackbar('Xóa list thành công', { variant: 'success' });
		} catch (error) {
			enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
			flag = false;
		}

		if (flag) {
			const newLists = lists.filter(list => list.id !== listId);
			setLists(newLists);
			setOpenDelete(false);
		}
	};

	const handleOpenEditDialog = (id: string) => {
		setListId(id);
		setOpenEdit(true);
	};

	const handleCloseEditDialog = () => {
		setOpenEdit(false);
		setListId('');
	};

	const handleEdit = async (newName: string) => {
		let flag = true;
		try {
			await updateNameList(listId, newName);
			enqueueSnackbar('Cập nhật tên list thành công', { variant: 'success' });
		} catch (error) {
			enqueueSnackbar('Có lỗi xảy ra', { variant: 'error' });
			flag = false;
		}

		if (flag) {
			const newLists = lists.map(list => {
				if (list.id === listId) {
					list.name = newName;
				}
				return list;
			});
			setLists(newLists);
			setOpenEdit(false);
		}
	};

	return (
		<Container maxWidth="xl">
			<Box mx={10}>
				<Typography my={2} variant="h4" sx={{ color: '#1976d2' }}>
					List của tôi
				</Typography>
				<Box marginTop={3}>
					<Box sx={{ display: 'flex', marginBottom: 5 }}>
						<TextField
							sx={{ background: 'white' }}
							margin="none"
							value={search}
							onChange={e => {
								setSearch(e.target.value);
								debounce({
									...filter,
									search: e.target.value
								});
							}}
							placeholder="Tìm list"
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
						<Button
							component={Link}
							to="/create-list"
							sx={{ mx: 3, whiteSpace: 'nowrap' }}
							variant="contained"
						>
							Tạo List mới
						</Button>
					</Box>
				</Box>
				<Box>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableBody>
								{isLoading ? (
									<Loading />
								) : (
									lists
										.slice((page - 1) * SIZE_PAGINATION, page * SIZE_PAGINATION)
										.map(list => (
											<TableRow
												key={list.id}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
													// cursor: 'pointer',
													textDecoration: 'none',
													color: 'white'
												}}
												hover
												// classes={{ hover: 'cursor' }}
												// to={`/my-list/${list.id}`}
												// component={Link}
											>
												{/* <Box
													sx={{
														'&:last-child td, &:last-child th': { border: 0 },
														cursor: 'pointer',
														textDecoration: 'none',
														color: 'white'
													}}
													// classes={{ hover: 'cursor' }}
													to={`/my-list/${list.id}`}
													component={Link}
												> */}
												<TableCell
													sx={{ cursor: 'pointer' }}
													component="th"
													scope="row"
													style={{ width: 800 }}
													onClick={() => {
														history.push(`/my-list/${list.id}`);
													}}
												>
													<Typography variant="h4">{list.name}</Typography>
												</TableCell>
												{/* </Box> */}

												<TableCell align="right"></TableCell>
												<TableCell align="right">
													{list.public === 1 ? (
														<IconButton>
															<PublicIcon />
														</IconButton>
													) : (
														<IconButton>Yêu cầu public</IconButton>
													)}
													<IconButton
														// to={`/admin/books/${list.id}`}
														// component={Link}
														onClick={() => handleOpenEditDialog(list.id)}
													>
														<EditIcon />
													</IconButton>
													<IconButton
														onClick={() => handleOpenDeleteDialog(list.id)}
													>
														<DeleteIcon sx={{ color: '#F26464' }} />
													</IconButton>
												</TableCell>
											</TableRow>
										))
								)}
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
					<ConfirmDeleteDialog
						open={openDetele}
						onClose={handleCloseDialog}
						onDelete={handleDelete}
					/>
					<ConfirmEditDialog
						open={openEdit}
						onClose={handleCloseEditDialog}
						onEdit={handleEdit}
					/>
				</Box>
			</Box>
		</Container>
	);
}

export default MyList;
