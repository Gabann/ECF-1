import {createRouter, createWebHistory} from 'vue-router';
import NotFound404 from "@/views/notFound404.vue";
import Login from "@/views/login.vue";
import Signup from "@/views/signup.vue";
import AddTask from "@/components/addTask.vue";
import ManageProjects from "@/views/manageProjects.vue";
import ManageTasks from "@/views/manageTasks.vue";
import {useApiStore} from "@/stores/apiStore";

const routes = [
	{path: '/:pathMatch(.*)*', redirect: 'not-found'},
	{path: '/not-found', component: NotFound404},
	{path: '/', redirect: 'login'},
	{path: '/login', component: Login},
	{path: '/signUp', component: Signup},
	{path: '/addTask', component: AddTask, meta: {requiresAuth: true}},
	{path: '/manageProjects', component: ManageProjects, meta: {requiresAuth: true}},
	{path: '/manageTasks', component: ManageTasks, meta: {requiresAuth: true}}
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
	const userIsLoggedIn = await useApiStore().checkIsLoggedIn();

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!userIsLoggedIn) {
			next({
				path: '/login',
			});
		} else {
			next();
		}
	} else if ((to.path === '/login' || to.path === '/signup') && userIsLoggedIn) {
		next('/manageProjects'); // redirect to '/manageProjects' if user is already logged in
	} else {
		next();
	}
});

export default vueRouter;