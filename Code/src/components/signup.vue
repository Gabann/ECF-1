<script setup>
let username, password, email;

function submitForm(username, email, password) {
	const url = `http://localhost:3000/signup?username=${username}&email=${email}&password=${password}`;
	// const data = {
	// 	username: username,
	// 	email: email,
	// 	password: password
	// };

	// console.log(url);
	// console.log(JSON.stringify(data));

	fetch(url, {
		method: 'POST',
		mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		// .then(response => response.json())
		.then(data => console.log(data))
		.catch((error) => {
			console.error('Error:', error);
		});
}


</script>

<template>
	<div class="signup">
		<h1>Signup</h1>
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