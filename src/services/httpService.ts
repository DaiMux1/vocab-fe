import axios from 'axios';
import { toast } from 'react-toastify';

const instance_axios = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000'
});

instance_axios.interceptors.response.use(
	(data) => data,
	error => {
		const expected =
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500;

		if (!expected) {
			toast.error('An unexpected error occurred.');
		}
		return Promise.reject(error);
	}
);

export function setJwt(jwt: any) {
	instance_axios.defaults.headers.common['x-auth-token'] = jwt;
}

export async function post(endPoint: string, payload: any) {
	let newData = await axios.post('http://localhost:5000' + endPoint, payload);
	console.log('ahihi', newData);

	const data = await instance_axios.post(endPoint, payload);
	console.log("data", data);
	return data;
}

export default {
	get: instance_axios.get,
	post: instance_axios.post,
	put: instance_axios.put,
	delete: instance_axios.delete,
	setJwt
};
