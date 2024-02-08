import {defineStore} from "pinia";

const baseUrl = 'http://localhost:3000/';

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
			const responseData = await response.json(); // Renamed 'data' to 'responseData'
			apiResponse = responseData.response;
		} catch (error) {
			console.error('Error:', error);
		}

		return apiResponse;
	}

	return {post};
});