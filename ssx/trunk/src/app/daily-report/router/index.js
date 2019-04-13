/* 异步主键 */
import publicRouter from './routes/home.js';
import detail from './routes/detail.js';

const routes = [
    ...detail,
    ...publicRouter
]



const router = new VueRouter({
	  routes
});


export default router;