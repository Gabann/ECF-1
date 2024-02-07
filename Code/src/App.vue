<script setup>
import FooterComponent from "./components/footerComponent.vue";
import HeaderComponent from "./components/headerComponent.vue";
import {RouterView} from 'vue-router';
</script>

<template>
	<header-component class="header"></header-component>

	<div class="container-fluid">

		<main>

			<div class="col-10 mx-auto">
				<RouterView/>
			</div>

		</main>

	</div>


	<footer-component class="footer"></footer-component>
</template>

<style>
:root {
	--header-height: 7vh;
	--footer-height: 7vh;
}

.header {
	height: var(--header-height);
}

.container-fluid {
	min-height: calc(100vh - var(--header-height) - var(--footer-height));
}

.footer {
	height: var(--footer-height);
}
</style>