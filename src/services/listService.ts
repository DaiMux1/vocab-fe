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

export function getMyFavoritesList(filter: FilterList) {
	const params = {
		search: filter.search
	};
	return httpService.get(apiEndpoint + '/my-favorites-list', { params });
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

export function requestPublic(id: string) {
	return httpService.post(apiEndpoint + '/request_public/' + id);
}

export function getAllReqPublic() {
	return httpService.get(apiEndpoint + '/request_public');
}

export function handleReqPublic(statement: number, listId: string) {
	return httpService.post(apiEndpoint + '/handle_request_public', {
		listId,
		statement
	});
}

export function requestContributor(listId: string, vocab: Vocab) {
	return httpService.post(apiEndpoint + '/request_contributor', {
		listId,
		vocab: [vocab]
	});
}

export function getAllReqContributor() {
	return httpService.get(apiEndpoint + '/request_contributor');
}

export function getOneReqContributor(id: string) {
	return httpService.get(apiEndpoint + '/request_contributor/' + id);
}

export function handleReqContributor(statement: number, id: string) {
	return httpService.post(apiEndpoint + '/handle_request_contributor', {
		id,
		statement
	});
}

export function voteStarApi(star: number, listId: string) {
	return httpService.post(apiEndpoint + '/star', { star, listId });
}
