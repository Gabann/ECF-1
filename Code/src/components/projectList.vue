<script setup>
import {onMounted, ref} from "vue";
import {useApiStore} from "@/stores/apiStore";

let apiResponse = ref('');

async function fetchData() {
	apiResponse.value = await useApiStore().get('getProjects');
}

onMounted(() => {
	fetchData();
});
</script>

<template>
	<h3>Project List</h3>

	<table>
		<thead>
			<tr>
				<th>Project Name</th>
				<th>Project Description</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="project in apiResponse.projects" :key="project.id">
				<td class="cell">{{ project.projectName }}</td>
				<td class="cell">{{ project.projectDescription }}</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
.cell {
	padding: 10px 30px 10px 30px;
}
</style>