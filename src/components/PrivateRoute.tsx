import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserRole } from '../types/user';
import { Typography } from '@mui/material';
import { getCurrentUser } from '../services/authService';

const PrivateRoute: React.FC<
	RouteProps & {
		userRoles?: UserRole;
	}
> = ({ path, userRoles = UserRole.user, component: Component, ...rest }) => {
	const user = getCurrentUser();

	if (!user) {
		return <Redirect to="/login" />;
	}
	console.log(user);

	if (user.role >= userRoles) {
		return <Route path={path} component={Component} {...rest} />;
	} else {
		return <Typography variant="h3"> you have no permission </Typography>;
	}
};

export default PrivateRoute;
