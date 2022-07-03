import { FilterList } from '../types/filter';
import { CreateList, UpdateVocabInList, Vocab } from '../types/list';
import httpService from './httpService';

const apiEndpoint = '/list';

export function createList(body: CreateList) {
	return httpService.post(apiEndpoint + '/new', body);
}

export function getMyList(filter: FilterList) {
	const params = {
		search: filter.search
	};
	return httpService.get(apiEndpoint + '/my-list', { params });
}

export function deleteList(id: string) {
	return httpService.delete(apiEndpoint + '/' + id);
}

export function updateNameList(id: string, newName: string) {
	return httpService.put(apiEndpoint, { id, newName });
}

export function getMyListDetail(id: string) {
	return httpService.get(apiEndpoint + '/' + id);
}

export function updateVocabInList(body: UpdateVocabInList) {
	return httpService.put(apiEndpoint + '/vocab-update', body);
}

export function addVocabToList(body: CreateList) {
	return httpService.post(apiEndpoint, body);
}

export function removeVocabInList(body: { name: string; vocab: Vocab }) {
	return httpService.put(apiEndpoint + '/vocab', body);
}

export function getPubList(name: string, page: number, perPage: number) {
	const params = {
		name,
		page,
		perPage
	};
	return httpService.get(apiEndpoint + '/search-public', { params });
}
