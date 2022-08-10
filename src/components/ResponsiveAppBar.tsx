import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext } from 'react';
import UserContext from './Context/UserContext';
import { Link } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { useHistory } from 'react-router-dom';
import logo from '../assets/icons/newlogo.png';
import { getAllReqPublic } from '../services/listService';
import { get } from 'dot-prop';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
	let history = useHistory();
	const [reqPubic, setReqPublic] = React.useState<Array<any>>();
	const [roleUser, setRoleUser] = React.useState(0);

	const getData = async () => {
		const { data } = await getAllReqPublic();
		console.log('datareq', data);

		setReqPublic(data);
	};

	React.useEffect(() => {
		const interval = setInterval(() => {
			getData();
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	React.useEffect(() => {
		const currentUser = getCurrentUser();

		if (currentUser) {
			setRoleUser(currentUser.role);
		}
	}, []);

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	// const [noti]

	const [anchorElNotify, setAnchorElNotify] =
		React.useState<null | HTMLElement>(null);

	const { user } = useContext(UserContext);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleOpenNotifyMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNotify(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleCloseNotifyMenu = () => {
		setAnchorElNotify(null);
	};

	const handleSettings = (setting: string) => {
		if (setting === 'Logout') {
			logout();
			history.push('/login');
		}
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<img src={logo} width="100px" alt="" />
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{/* {pages.map(page => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))} */}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						{!!user ? (
							<>
								<Tooltip title="Open notify">
									<IconButton
										onClick={handleOpenNotifyMenu}
										size="large"
										aria-label="show 17 new notifications"
										color="inherit"
									>
										<Badge
											badgeContent={
												roleUser === 1 && reqPubic ? reqPubic.length : 0
											}
											color="error"
										>
											<NotificationsIcon />
										</Badge>
									</IconButton>
								</Tooltip>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/2.jpg"
										/>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-user"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map(setting => (
										<MenuItem key={setting} onClick={handleCloseUserMenu}>
											<Button onClick={() => handleSettings(setting)}>
												<Typography textAlign="center">{setting}</Typography>
											</Button>
										</MenuItem>
									))}
								</Menu>

								<Menu
									sx={{ mt: '45px' }}
									id="menu-notify"
									anchorEl={anchorElNotify}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={Boolean(anchorElNotify)}
									onClose={handleCloseNotifyMenu}
								>
									{roleUser === 1 &&
										reqPubic &&
										reqPubic.map(r => (
											<MenuItem key={r} onClick={handleCloseNotifyMenu}>
												<Button
													onClick={() =>
														history.push(
															`/handle-public-list/${get(r, 'listId')}`
														)
													}
												>
													<Typography textAlign="center">
														{get(r, 'author')} yêu cầu public danh từ vựng
													</Typography>
												</Button>
											</MenuItem>
										))}
								</Menu>
							</>
						) : (
							<Button
								key="Login"
								component={Link}
								to="/login"
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								Login
							</Button>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
