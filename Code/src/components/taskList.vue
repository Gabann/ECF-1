<script setup>
import {onMounted, ref} from "vue";
import {useApiStore} from "@/stores/apiStore";

let apiResponse = ref('');

async function fetchData() {
	apiResponse.value = await useApiStore().get('getTasks');
}

onMounted(() => {
	fetchData();
});
</script>

<template>
	<h3>Task List</h3>

	<table>
		<thead>
			<tr>
				<th>Task Name</th>
				<th>Task Description</th>
				<th>Task Priority</th>
				<th>Is task done</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="task in apiResponse.tasks" :key="task.id">
				<td class="cell">{{ task.taskName }}</td>
				<td class="cell">{{ task.taskDescription }}</td>
				<td class="cell">{{ task.taskPriority }}</td>
				<td class="cell">{{ task.isDone }}</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
.cell {
	padding: 10px 30px 10px 30px;
}
</style>