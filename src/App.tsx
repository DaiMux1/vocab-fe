import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
	return (
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/signup" component={SignUp} />
		</Switch>
	);
}

export default App;
