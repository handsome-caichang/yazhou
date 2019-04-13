/* 异步主键 */
import publicRouter from './week-routes/week-home.js';

const routes = [
    ...publicRouter
]



const router = new VueRouter({
	  routes
});


export default router;