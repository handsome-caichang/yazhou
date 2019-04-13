const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const NoticeList = () => import(/*webpackChunkName: "NoticeList"*/ 'parent/pages/notice/notice-list')
const NoticeDetail = () => import(/*webpackChunkName: "NoticeDetail"*/ 'parent/pages/notice/notice-detail')

const routes = [{
	path: '/noticeList',
	name: 'noticeList',
	component: routerBus,
	meta: {
		page: NoticeList
	}
}, {
	path: '/noticeDetail/:id',
	name: 'noticeDetail',
	component: routerBus,
	meta: {
		page: NoticeDetail
	}
}]

export default routes;