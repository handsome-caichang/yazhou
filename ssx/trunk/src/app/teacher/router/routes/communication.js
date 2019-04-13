const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CommunicationList = () => import(/*webpackChunkName: "CommunicationList"*/ 'teacher/pages/teacher/communication-management-students/communication-list.vue')
const CommunicationRecord = () => import(/*webpackChunkName: "CommunicationRecord"*/ 'teacher/pages/teacher/communication-management-students/communication-record.vue')
const BuyDetail = () => import(/*webpackChunkName: "BuyDetail"*/ 'teacher/pages/teacher/communication-management-students/buy-detail.vue')
const AddStudentCommunication = () => import(/*webpackChunkName: "BuyDetail"*/ 'teacher/pages/teacher/communication-management-students/add-communication.vue')

const routes = [
    {
    	path: '/communicationList',
    	name: 'communicationList',
    	component: routerBus,
    	meta: {
			page: CommunicationList    		
    	}
    },
    {
    	path: '/communicationRecord/:studentID',
    	name: 'communicationRecord',
    	component: routerBus,
    	meta: {
			page: CommunicationRecord    		
    	}
    },
    {
    	path: '/buyDetail/:studentUserID',
    	name: 'buyDetail',
    	component: routerBus,
    	meta: {
			page: BuyDetail    		
    	}
    },
    {
    	path: '/addStudentCommunication/:studentID',
    	name: 'addStudentCommunication',
    	component: routerBus,
    	meta: {
			page: AddStudentCommunication    		
    	}
    }
]

export default routes;