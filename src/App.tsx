import { ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import UserContext from './components/Context/UserContext';
import { Home } from './components/Home';
import Loading from './components/Loading';
import Login from './components/Login';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import SignUp from './components/SignUp';
import { theme } from './components/Theme/theme';
import { getCurrentUser } from './services/authService';
import { CurrentUser } from './types/user';

function App() {
	const [user, setUser] = useState<CurrentUser | undefined>();
	const [loading, setLoading] = useState<boolean>(false);
	let location = useLocation();
	console.log('location', location);

	useEffect(() => {
		setLoading(true);
		if (localStorage.getItem('token')) {
			// get user from backend using axios
			// getUser(user.id).then(data => {setUser(data.response.user); setLoading(false)}).catch(localStorage.removeItem("user"))
			// setUser(users.find(({ id }) => id === user.id));
			setUser(getCurrentUser());
		}
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return loading ? (
		<Loading />
	) : (
		<ThemeProvider theme={theme}>
			<UserContext.Provider value={{ user }}>
				{location.pathname !== '/login' && location.pathname !== '/signup' && (
					<ResponsiveAppBar />
				)}
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<Route path='/' component={Home} />
				</Switch>
			</UserContext.Provider>
		</ThemeProvider>
	);
}

export default App;
