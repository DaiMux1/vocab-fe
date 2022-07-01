import {
	Box,
	Button,
	Container,
	IconButton,
	TableContainer,
	TextField,
	Typography
} from '@mui/material';
import { Link } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ListReturn } from '../types/list';
import PublicIcon from '@mui/icons-material/Public';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { getMyList } from '../services/listService';

function MyList() {
	const [search, setSearch] = useState('');
	const [lists, setLists] = useState<ListReturn[]>([]);
	const [listId, setListId] = useState('');
	const [open, setOpen] = useState(false);

	const [filter, setFilter] = useState<FilterList>({
		search: '',
		page: 1
	});

	const getData = async (filter: FilterList) => {
		const { data } = await getMyList(filter);
		console.log(data);
		setLists(data as ListReturn[]);
	};

	useEffect(() => {
		getData(filter);
		return () => {};
	}, [filter]);

	const debounce = _.debounce((filter: FilterList) => {
		setFilter(filter);
	}, 1000);

	const handleOpenDeleteDialog = (id: string) => {
		setListId(id);
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
		setListId('');
	};

	const handleDelete = async () => {
		console.log('delete');
		// try {
		// 	await deleteBook(bookId as number);
		// } catch (error) {
		// 	alert(error);
		// }

		// const newBooks = books.filter(book => book.id !== bookId);
		// setBooks(newBooks);

		// setOpen(false);
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
							placeholder="Search"
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
							sx={{ mx: 3 }}
							variant="contained"
							startIcon={<AddIcon />}
						>
							Add
						</Button>
					</Box>
				</Box>
				<Box>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							{/* <TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell align="right"></TableCell>
									<TableCell align="right"></TableCell>
								</TableRow>
							</TableHead> */}
							<TableBody>
								{lists.map(list => (
									<TableRow
										key={list.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
										hover
										// onClick={}
										// component={Button}
									>
										<TableCell component="th" scope="row">
											{list.name}
										</TableCell>
										<TableCell align="right"></TableCell>
										{/* <TableCell align="right">{list.numberOfDownload}</TableCell>
										<TableCell align="right">{list.updateAt}</TableCell> */}
										<TableCell align="right">
											{list.public === 1 && (
												<IconButton>
													<PublicIcon />
												</IconButton>
											)}
											<IconButton
												to={`/admin/books/${list.id}`}
												component={Link}
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
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{/* <Box
						alignItems="center"
						sx={{
							'& ul': {
								margin: 2,
								justifyContent: 'center'
							}
						}}
					>
						<Pagination
							count={10}
							page={filter.page || 1}
							onChange={(e, value: number) => {
								setFilter({ ...filter, page: value });
							}}
						/>
					</Box> */}
					<ConfirmDeleteDialog
						open={open}
						onClose={handleCloseDialog}
						onDelete={handleDelete}
					/>
				</Box>
			</Box>
		</Container>
	);
}

export default MyList;
