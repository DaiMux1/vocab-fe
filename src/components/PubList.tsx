import {
	Box,
	Button,
	Container,
	IconButton,
	listClasses,
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
import {
	deleteList,
	getMyList,
	getPubList,
	updateNameList
} from '../services/listService';
import { useSnackbar } from 'notistack';
import ConfirmEditDialog from './ConfirmEditDialog';
import { SIZE_PAGINATION } from '../constants/constans';
import Loading from './Loading';

function PubList() {
	const history = useHistory();
	const [search, setSearch] = useState('');
	const [lists, setLists] = useState<ListReturn[]>([]);
	const [totalPage, setTotalPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [loadable, setLoadable] = useState(true);
	const { enqueueSnackbar } = useSnackbar();

	const [filter, setFilter] = useState<FilterList>({
		search: ''
	});

	const getData = async (filter: FilterList) => {
		const { data } = await getPubList(filter.search, page, SIZE_PAGINATION);
		setLists(data);
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

	const handleGetMoreData = async () => {
		const { data } = await getPubList(filter.search, page + 1, SIZE_PAGINATION);
		if (data.length > 0) {
			setLists([...lists, ...data]);
			setPage(page + 1);
		} else {
			setLoadable(false);
			enqueueSnackbar('Load hết dữ liệu', { variant: 'warning' });
		}
	};

	return (
		<Container maxWidth="xl">
			<Box mx={10}>
				<Typography my={2} variant="h4" sx={{ color: '#1976d2' }}>
					Tìm kiếm list
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
							placeholder="Tìm kiếm ..."
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
				<Box>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableBody>
								{isLoading ? (
									<Loading />
								) : (
									lists.map(list => (
										<TableRow
											key={list.id}
											sx={{
												'&:last-child td, &:last-child th': { border: 0 },
												cursor: 'pointer',
												textDecoration: 'none',
												color: 'white',
												'& .MuiTableCell-root': { py: 1 }
											}}
											hover
											onClick={() => {
												history.push(`/my-list/${list.id}`);
											}}
										>
											<TableCell
												sx={{ cursor: 'pointer' }}
												component="th"
												scope="row"
												style={{ width: 800 }}
											>
												<Typography variant="h6" color="primary">
													{list.name}
												</Typography>
												<Typography variant="h6" sx={{ fontSize: 16 }}>
													Tác giả: {list.author.username}
												</Typography>
											</TableCell>

											<TableCell align="right"></TableCell>
											{/* <TableCell align="right">
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
											</TableCell> */}
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					</TableContainer>
					{lists.length > 8 ? (
						<Box
							display="flex"
							alignItems="center"
							sx={{
								'& button': {
									mt: 6,
									marginLeft: '50%',
									justifyContent: 'center',
									bottom: 5
								}
							}}
						>
							<Button
								disabled={!loadable}
								variant="contained"
								sx={{ justifyContent: 'center' }}
								onClick={handleGetMoreData}
							>
								Hiển thị thêm
							</Button>
						</Box>
					) : (
						<Box
							display="flex"
							alignItems="center"
							sx={{
								'& button': {
									margin: 2,
									justifyContent: 'center',
									position: 'fixed',
									bottom: 5,
									right: '40%'
								}
							}}
						>
							<Button
								variant="contained"
								disabled={!loadable}
								sx={{ justifyContent: 'center' }}
								onClick={handleGetMoreData}
							>
								Hiển thị thêm
							</Button>
						</Box>
					)}
				</Box>
			</Box>
		</Container>
	);
}

export default PubList;
