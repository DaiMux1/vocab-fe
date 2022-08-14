import httpService from './httpService';

const apiEndpoint = '/user';

export function getMyFavoritesList() {
	return httpService.get(apiEndpoint + '/my-favorites-list');
}

export function addFavoriteList(listId: string) {
	return httpService.post(apiEndpoint + '/add-favorites-list', { listId });
}

export function removeFavoriteList(listId: string) {
	return httpService.post(apiEndpoint + '/remove-favorites-list', { listId });
}
