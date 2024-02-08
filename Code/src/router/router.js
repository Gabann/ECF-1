import {createRouter, createWebHistory} from 'vue-router';
import NotFound404 from "@/components/notFound404.vue";
import Main from "@/views/main.vue";
import login from "@/components/login.vue";
import Signup from "@/components/signup.vue";
import Test from "@/components/test.vue";
import AddTask from "@/components/addTask.vue";
import AddProject from "@/components/addProject.vue";


const routes = [
	{path: '/:pathMatch(.*)*', redirect: 'not-found'},
	{path: '/not-found', component: NotFound404},
	{path: '/', component: Main},
	{path: '/login', component: login},
	{path: '/signUp', component: Signup},
	{path: '/test', component: Test},
	{path: '/addTask', component: AddTask},
	{path: '/addProject', component: AddProject}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from) {
		// always scroll to top on route change
		if (to.path !== from.path) {
			return {top: 0};
		}
	},
});


// router.beforeEach((to, from, next) => {
// 	if (to.matched.some(record => record.meta.requiresAuth)) {
// 		const token = Cookies.get('token');
// 		if (!token) {
// 			next({
// 				path: '/login',
// 				query: {redirect: to.fullPath},
// 			});
// 		} else if () {
// 			next();
// 		}
// 	} else {
// 		next();
// 	}
// });

export default router;