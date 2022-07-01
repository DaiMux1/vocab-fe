import { FilterList } from '../types/filter';
import { CreateList } from '../types/list';
import httpService from './httpService';

const apiEndpoint = '/list';

export function createList(body: CreateList) {
	return httpService.post(apiEndpoint + '/new', body);
}

export function getMyList(filter: FilterList) {
	const params = new URLSearchParams([['search', filter.search]]);
	return httpService.get(apiEndpoint + '/my-list', { params });
}

export function deleteList(id: string) {
	return httpService.delete(apiEndpoint);
}
