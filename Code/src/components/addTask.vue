<script setup>
import {ref} from "vue";
import {useApiStore} from "@/stores/apiStore";
import Cookies from "js-cookie";
import router from "@/router/vueRouter";

let taskName, taskDescription, taskPriority;
let apiResponse = ref('');

async function submitForm(taskName, taskDescription, taskPriority) {
	apiResponse.value = await useApiStore().post(`addTask`, {
		taskName: taskName,
		taskDescription: taskDescription,
		taskPriority: taskPriority,
		token: Cookies.get('token')
	});
	router.go();
}
</script>

<template>
	<div class="add-task">
		<h1>Add task</h1>
		<h3 v-if="apiResponse">{{ apiResponse.message }}</h3>
		<form @submit.prevent="submitForm(taskName, taskDescription, taskPriority)">
			<label for="username">Task name:</label>
			<input id="username" v-model="taskName" required type="text">

			<label for="password">Task description:</label>
			<input id="password" v-model="taskDescription" required type="text">

			<label for="taskPriority">Task Priority:</label>
			<select id="taskPriority" v-model="taskPriority" required>
				<option disabled value="">Please select a priority</option>
				<option>Low</option>
				<option>Medium</option>
				<option>High</option>
			</select>

			<button type="submit">Login</button>
		</form>
	</div>
</template>

<style scoped>

</style>