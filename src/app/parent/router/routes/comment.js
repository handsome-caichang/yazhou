const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CommentList = () => import(/*webpackChunkName: "CommentList"*/ 'parent/pages/comment/comment-list')
const CommentDetail = () => import(/*webpackChunkName: "CommentDetail"*/ 'parent/pages/comment/comment-detail')
const courseAttendanceDetail = () => import(/*webpackChunkName: "courseAttendanceDetail"*/ 'parent/pages/comment/course-attendance-detail')

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
},{
	path: '/courseAttendanceDetail/:id',
	name: 'courseAttendanceDetail',
	component: routerBus,
	meta: {
		page: courseAttendanceDetail
	}
}]

export default routes;