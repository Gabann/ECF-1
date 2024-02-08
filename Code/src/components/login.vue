<script setup>
import {ref} from "vue";
import {useApiStore} from "@/stores/apiStore";
import Cookies from 'js-cookie';

let username = ref(""), password = ref("");
let apiResponse = ref('');

async function submitForm(username, password) {
	//TODO make the route a constant across all files
	apiResponse.value = await useApiStore().post(`logIn`, {username: username, password: password});
	if (apiResponse._rawValue.token) {
		//TODO fix Cookie “token” does not have a proper “SameSite” attribute value. Soon, cookies without the “SameSite” attribute or with an invalid value will be treated as “Lax”. This means that the cookie will no longer be sent in third-party contexts. If your application depends on this cookie being available in such contexts, please add the “SameSite=None“ attribute to it. To know more about the “SameSite“ attribute, read https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite
		Cookies.set('token', apiResponse._rawValue.token);
	}
}
</script>

<template>
	<div class="login">
		<h1>Login</h1>
		<h3 v-if="apiResponse.message">{{ apiResponse.message }}</h3>
		<form @submit.prevent="submitForm(username, password)">
			<label for="username">Username:</label>
			<input id="username" v-model="username" required type="text">

			<label for="password">Password:</label>
			<input id="password" v-model="password" required type="password">

			<button type="submit">Login</button>
		</form>

		<Router-link to="signup">
			Don't have an account yet? Sign up here
		</Router-link>
	</div>
</template>

<style scoped>

</style>