import {defineStore} from "pinia";

const baseUrl = 'http://localhost:3000/api/';

export const useApiStore = defineStore('apiStore', () => {
	async function post(url, data) {
		let fullUrl = baseUrl + url;
		let apiResponse = '';

		try {
			const response = await fetch(fullUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${data.token}`
				},
				body: JSON.stringify(data),
			});
			apiResponse = await response.json();
		} catch (error) {
			console.error('Error:', error);
		}
		return apiResponse;
	}

	async function checkLoggedIn(url, data) {
		return await post(url, data) === true;
	}

	return {post, checkLoggedIn};
});