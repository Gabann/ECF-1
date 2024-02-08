<script setup>
import {computed, ref} from "vue";
import {useApiStore} from "@/stores/apiStore";

let username = ref('');
let password = ref('');
let email = ref('');
let apiResponse = ref('');

async function submitForm(username, email, password) {
	//TODO add feedback to user when form submition is prevented
	if (validUsername.value === 'invalid' || validPassword.value === 'invalid' || validEmail.value === 'invalid') {
		return;
	}

	apiResponse.value = await useApiStore().post(`signup`, {username: username, email: email, password: password});
}

let validUsername = computed(() => {
	// At least 3 char long
	// Only letters and numbers
	let regex = /^[a-zA-Z0-9]{3,}$/;
	return regex.test(username.value) ? 'valid' : 'invalid';
});

let validPassword = computed(() => {
	// At least 8 characters long
	// Contains at least one uppercase letter
	// Contains at least one lowercase letter
	// Contains at least one digit
	// Contains at least one special character
	let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return regex.test(password.value) ? 'valid' : 'invalid';
});

let validEmail = computed(() => {
	// At least 8 characters long
	// Contains at least one uppercase letter
	// Contains at least one lowercase letter
	// Contains at least one digit
	// Contains at least one special character
	let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return regex.test(email.value) ? 'valid' : 'invalid';
});
</script>

<template>
	<div class="signup">
		<h1>Signup</h1>
		<h3 v-if="apiResponse">{{ apiResponse }}</h3>
		<form @submit.prevent="submitForm(username, email, password)">
			<label :class="validUsername" for="username">Username:</label>
			<input id="username" v-model="username" required type="text">

			<label :class="validEmail" for="email">Email:</label>
			<input id="email" v-model="email" required type="email">

			<label :class="validPassword" for="password">Password:</label>
			<input id="password" v-model="password" required type="password">

			<button type="submit">Signup</button>
		</form>

		<Router-link to="login">
			You already have an account? Log in here
		</Router-link>
	</div>
</template>


<style scoped>

</style>