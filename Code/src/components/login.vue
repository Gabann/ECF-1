<script setup>
import {ref} from "vue";
import {useApiStore} from "@/stores/apiStore";
import Cookies from 'js-cookie';

let username, password;
let apiResponse = ref('');

async function submitForm(username, password) {
	//todo make the route a constant across all files
	apiResponse.value = await useApiStore().post(`logIn`, {username: username, password: password});
	if (apiResponse._rawValue.token) {
		Cookies.set('token', apiResponse._rawValue.token);
		console.log(Cookies.get('token'));
	}
}
</script>

<template>
	<div class="login">
		<h1>Login</h1>
		<h3 v-if="apiResponse">{{ apiResponse }}</h3>
		<form @submit.prevent="submitForm(username, password)">
			<label for="username">Username:</label>
			<input id="username" v-model="username" required type="text">

			<label for="password">Password:</label>
			<input id="password" v-model="password" required type="password">

			<button type="submit">Login</button>
		</form>

		<router-link to="signup">
			Don't have an account yet? Sign up here
		</router-link>
	</div>
</template>

<style scoped>

</style>