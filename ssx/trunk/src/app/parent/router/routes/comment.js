const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CommentList = () => import(/*webpackChunkName: "CommentList"*/ 'parent/pages/comment/comment-list')
const CommentDetail = () => import(/*webpackChunkName: "CommentDetail"*/ 'parent/pages/comment/comment-detail')

const routes = [{
	path: '/commentList',
	name: 'commentList',
	component: routerBus,
	meta: {
		page: CommentList
	}
},{
	path: '/commentDetail/:id/:studentId',
	name: 'commentDetail',
	component: routerBus,
	meta: {
		page: CommentDetail
	}
}]

export default routes;