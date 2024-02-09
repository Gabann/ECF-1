<script setup>
import {useApiStore} from "@/stores/apiStore";
import {onMounted, ref} from "vue";

//TODO fix isLoggedIn not being reactive
const isLoggedIn = ref(false);
onMounted(async () => {
	isLoggedIn.value = await useApiStore().checkIsLoggedIn();
});
</script>

<template>
	<header class="d-flex align-items-center">
		<nav class="navbar navbar-expand-sm navbar-light bg-primary">
			<a class="navbar-brand" href="#">ECF-1</a>
			<button aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
			        data-bs-target="#navbarTogglerDemo02" data-bs-toggle="collapse" type="button">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div id="navbarTogglerDemo02" class="collapse navbar-collapse">
				<ul class="navbar-nav" style="margin-left: auto">
					<template v-if="!isLoggedIn">
						<RouterLink to="/login">
							<li class="nav-item">
								<a aria-current="page" class="nav-link " href="#">Log in</a>
							</li>
						</RouterLink>

						<RouterLink to="/signup">
							<li class="nav-item">
								<a aria-current="page" class="nav-link " href="#">Sign up</a>
							</li>
						</RouterLink>
					</template>
					<template v-else>

						<RouterLink to="/manageProjects">
							<li class="nav-item">
								<a aria-current="page" class="nav-link ">Manage projects</a>
							</li>
						</RouterLink>

						<RouterLink to="/manageTasks">
							<li class="nav-item">
								<a aria-current="page" class="nav-link " href="#">Manage tasks</a>
							</li>
						</RouterLink>

						<li class="nav-item">
							<a aria-current="page" class="nav-link " href="#" @click="useApiStore().logOut()">Log out</a>
						</li>
					</template>
				</ul>
			</div>
		</nav>
	</header>
</template>

<style>
nav {
	width: 100%;
	height: 100%;

	padding: 0 30px 0 30px !important;
}
</style>