import { ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import UserContext from './components/Context/UserContext';
import Loading from './components/Loading';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { theme } from './components/Theme/theme';
import { getCurrentUser } from './services/authService';
import { CurrentUser } from './types/user';

function App() {
	const [user, setUser] = useState<CurrentUser | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		if (localStorage.getItem('user')) {
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
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
				</Switch>
			</UserContext.Provider>
		</ThemeProvider>
	);
}

export default App;
