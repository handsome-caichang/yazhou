const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

// import CommunicationList from 'teacher/pages/teacher/communication-management-students/communication-list';

const CommunicationList = () => import(/*webpackChunkName: "CommunicationList"*/ 'teacher/pages/teacher/communication-management-students/communication-list.vue')

const routes = [
    {
    	path: '/communicationList',
    	name: 'communicationList',
    	component: routerBus,
    	meta: {
			page: CommunicationList    		
    	}
    },
//     {
//     	path: '/announcementDetail/:id',
//     	name: 'announcementDetail',
//     	component: routerBus,
//     	meta: {
// 			page: AnnouncementDetail    		
//     	}
//     }
]

export default routes;