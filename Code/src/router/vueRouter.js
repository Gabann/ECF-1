import {createRouter, createWebHistory} from 'vue-router';
import NotFound404 from "@/components/notFound404.vue";
import Main from "@/views/main.vue";
import login from "@/components/login.vue";
import Signup from "@/components/signup.vue";
import AddTask from "@/components/addTask.vue";
import AddProject from "@/components/addProject.vue";
import Cookies from 'js-cookie';
import {useApiStore} from "@/stores/apiStore";

const routes = [
	{path: '/:pathMatch(.*)*', redirect: 'not-found'},
	{path: '/not-found', component: NotFound404},
	{path: '/', component: Main},
	{path: '/login', component: login},
	{path: '/signUp', component: Signup},
	{path: '/addTask', component: AddTask, meta: {requiresAuth: true}},
	{path: '/addProject', component: AddProject, meta: {requiresAuth: true}}
];

const vueRouter = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from) {
		// always scroll to top on route change
		if (to.path !== from.path) {
			return {top: 0};
		}
	},
});

vueRouter.beforeEach(async (to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		let token = Cookies.get('token');
		if (!token || !(await useApiStore().checkLoggedIn('verifyToken', {token}))) {
			next({
				path: '/login',
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default vueRouter;