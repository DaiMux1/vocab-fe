import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';

function App() {
	return (
		<Switch>
			<Route path="/login" component={Login} />
		</Switch>
	);
}

export default App;
