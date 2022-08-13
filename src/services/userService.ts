import httpService from './httpService';

const apiEndpoint = '/user';

export function getMyFavoritesList() {
	return httpService.get(apiEndpoint + '/my-favorites-list');
}
