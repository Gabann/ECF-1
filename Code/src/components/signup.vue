<script setup>
import {ref} from "vue";
import {useApiStore} from "@/stores/apiStore";

let username, password, email;
let apiResponse = ref('');

async function submitForm(username, email, password) {
	apiResponse.value = await useApiStore().post(`signup`, {username: username, email: email, password: password});
}
</script>

<template>
	<div class="signup">
		<h1>Signup</h1>
		<h3 v-if="apiResponse">{{ apiResponse }}</h3>
		<form @submit.prevent="submitForm(username, email, password)">
			<label for="username">Username:</label>
			<input id="username" v-model="username" required type="text">

			<label for="email">Email:</label>
			<input id="email" v-model="email" required type="email">

			<label for="password">Password:</label>
			<input id="password" v-model="password" required type="password">

			<button type="submit">Signup</button>
		</form>

		<router-link to="login">
			You already have an account? Log in here
		</router-link>
	</div>
</template>


<style scoped>

</style>