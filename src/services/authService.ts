import http, { post } from './httpService';
import jwtDecode from 'jwt-decode';
import { UserLogin } from '../types/user';
import axios, { AxiosResponse } from 'axios';

const apiEndpoint = '/auth';

const tokenKey = 'token';

// http.setJwt(getJwt());

type Token = {
	access_token: string;
};

export async function login(user: UserLogin) {
	try {
		const { data } = await post(
			apiEndpoint + '/signin',
			user
		);
		console.log('debug', data);
	} catch (error) {
		console.log(error);
	}

	// localStorage.setItem(tokenKey, jwt);
}

export async function loginWithJwt(token: any) {
	localStorage.setItem(tokenKey, token);
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey) as string;
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}
