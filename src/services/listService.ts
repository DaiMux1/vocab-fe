import { CreateList } from '../types/list';
import httpService from './httpService';

const apiEndpoint = '/list';

export function createList(body: CreateList) {
	return httpService.post(apiEndpoint + '/new', body);
}
