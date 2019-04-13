const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const HomeworkList = () => import(/*webpackChunkName: "HomeworkList"*/ 'parent/pages/homework/homework-list')
const HomeworkDetail = () => import(/*webpackChunkName: "HomeworkDetail"*/ 'parent/pages/homework/homework-detail')

const routes = [{
	path: '/homeworkList',
	name: 'homeworkList',
	component: routerBus,
	meta: {
		page: HomeworkList
	}
}, {
	path: '/homeworkDetail/:id',
	name: 'homeworkDetail',
	component: routerBus,
	meta: {
		page: HomeworkDetail
	}
}]

export default routes;