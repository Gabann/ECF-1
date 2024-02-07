<script setup>
let username, password;

//todo move api request to a store
function submitForm(username, password) {
	//todo make the route a constant across all files
	const url = `http://localhost:3000/logIn?username=${username}&password=${password}`;
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
	<div class="login">
		<h1>Login</h1>
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