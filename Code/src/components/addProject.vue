<script setup>
import {ref} from "vue";
import {useApiStore} from "@/stores/apiStore";
import Cookies from "js-cookie";
import router from '../router/vueRouter';

let projectName, projectDescription;
let apiResponse = ref('');

async function submitForm(projectName, projectDescription) {
	apiResponse.value = await useApiStore().post(`addProject`, {
		projectName: projectName,
		projectDescription: projectDescription,
		token: Cookies.get('token')
	});
	router.go();
}
</script>

<template>
	<div class="add-task">
		<h3>Add project</h3>
		<h3 v-if="apiResponse">{{ apiResponse.message }}</h3>
		<form @submit.prevent="submitForm(projectName, projectDescription)">
			<label for="username">Project name:</label>
			<input id="username" v-model="projectName" required type="text">

			<label for="password">Project description:</label>
			<input id="password" v-model="projectDescription" required type="text">

			<button type="submit">Login</button>
		</form>
	</div>
</template>

<style scoped>

</style>