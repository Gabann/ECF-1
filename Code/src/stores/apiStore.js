import {defineStore} from "pinia";
import Cookies from "js-cookie";

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
					'Authorization': `Bearer ${Cookies.get('token')}`
				},
				body: JSON.stringify(data),
			});
			apiResponse = await response.json();
		} catch (error) {
			console.error('Error:', error);
		}
		return apiResponse;
	}

	async function get(url) {
		let fullUrl = baseUrl + url;
		let apiResponse = '';

		try {
			const response = await fetch(fullUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${Cookies.get('token')}`
				},
			});
			apiResponse = await response.json();
		} catch (error) {
			console.error('Error:', error);
		}
		return apiResponse;
	}

	async function checkIsLoggedIn() {
		let response = await post('verifyToken');
		return response.message === true;
	}

	function logOut() {
		Cookies.remove('token');
	}

	return {post, checkIsLoggedIn, logOut, get};
});