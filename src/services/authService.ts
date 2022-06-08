import http from './httpService';
import jwtDecode from 'jwt-decode';
import { UserLogin } from '../types/user';
import axios, { AxiosResponse } from 'axios';

const apiEndpoint = '/auth';

const tokenKey = 'token';

type Token = {
	access_token: string;
};

type CurrentUser = {
	iat: number;
	id: string;
	role: number;
	status: number;
	username: string;
};

http.setJwt(getJwt());

export async function login(user: UserLogin) {
	const { data } = await http.post<Token>(apiEndpoint + '/signin', user);
	try {
		localStorage.setItem(tokenKey, data.access_token);
	} catch (error) {
		console.log(error);
	}
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

export function signup(user: UserLogin) {
	return http.post<Token>(apiEndpoint + '/signup', user);
}

export function getCurrentUser(): CurrentUser | null {
	try {
		const jwt = localStorage.getItem(tokenKey) as string;
		return jwtDecode(jwt);
	} catch (ex) {
		return null;
	}
}
