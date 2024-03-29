import http from './httpService';
import jwtDecode from 'jwt-decode';
import { CurrentUser, UserLogin, UserSignUp } from '../types/user';
import axios, { AxiosResponse } from 'axios';

const apiEndpoint = '/auth';

const tokenKey = 'token';

type Token = {
	access_token: string;
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

export async function forgotPass(email: string) {
	return http.post(apiEndpoint + '/forgot-pass', { email });
}

export async function newPassWhenFotgot(token: string, newPass: string) {
	return http.post(apiEndpoint + 'verify-forgot-pass', { token, newPass });
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

export function signup(user: UserSignUp) {
	return http.post(apiEndpoint + '/signup', user);
}

export function getCurrentUser(): CurrentUser | undefined {
	try {
		const jwt = localStorage.getItem(tokenKey) as string;
		return jwtDecode(jwt);
	} catch (ex) {
		return undefined;
	}
}
