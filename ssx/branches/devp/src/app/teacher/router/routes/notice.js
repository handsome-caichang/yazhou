const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const NoticeList = () => import(/*webpackChunkName: "NoticeList"*/ 'teacher/pages/teacher/notice/notice-list')
const NoticeDetail = () => import(/*webpackChunkName: "NoticeDetail"*/ 'teacher/pages/teacher/notice/notice-detail')
const NoticeAdd = () => import(/*webpackChunkName: "NoticeAdd"*/ 'teacher/pages/teacher/notice/notice-add')
const NoticeStudentList = () => import(/*webpackChunkName: "NoticeStudentList"*/ 'teacher/pages/teacher/notice/notice-students-list')

const routes = [
    {
    	path: '/noticeList',
    	name: 'noticeList',
    	component: routerBus,
    	meta: {
			page: NoticeList    		
    	}
    },
    {
    	path: '/noticeDetail/:id',
    	name: 'noticeDetail',
    	component: routerBus,
    	meta: {
			page: NoticeDetail    		
    	}
    },
    {
    	path: '/noticeAdd',
    	name: 'NoticeAdd',
    	component: routerBus,
    	meta: {
			page: NoticeAdd    		
    	}
    },
    {
    	path: '/noticeStudentList/:id',
    	name: 'NoticeStudentList',
    	component: routerBus,
    	meta: {
			page: NoticeStudentList    		
    	}
    },
]

export default routes;