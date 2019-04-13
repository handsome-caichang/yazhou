const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const AnnouncementList = () => import(/*webpackChunkName: "AnnouncementList"*/ 'teacher/pages/teacher/announcement/announcement-list');
const AnnouncementDetail = () => import(/*webpackChunkName: "AnnouncementDetail"*/ 'teacher/pages/teacher/announcement/announcement-detail');

const routes = [
    {
    	path: '/announcementList',
    	name: 'announcementList',
    	component: routerBus,
    	meta: {
			page: AnnouncementList    		
    	}
    },
    {
    	path: '/announcementDetail/:id',
    	name: 'announcementDetail',
    	component: routerBus,
    	meta: {
			page: AnnouncementDetail    		
    	}
    }
]

export default routes;