const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Customers = () => import(/*webpackChunkName: "Customers"*/ 'teacher/pages/teacher/customers/customers')
const AddedToday = () => import(/*webpackChunkName: "AddedToday"*/ 'teacher/pages/teacher/customers/child/addedToday')
const CustomDetail = () => import(/*webpackChunkName: "CustomDetail"*/ 'teacher/pages/teacher/customers/child/customDetail')
const CommunicationRecord = () => import(/*webpackChunkName: "CommunicationRecord"*/ 'teacher/pages/teacher/customers/child/communicationRecord')
const AddCommunication = () => import(/*webpackChunkName: "AddCommunication"*/ 'teacher/pages/teacher/customers/child/addCommunication/addCommunication')
const CustomHadle = () => import(/*webpackChunkName: "CustomHadle"*/ 'teacher/pages/teacher/customers/child/customHadle/customHadle')
const AddCustomer = () => import(/*webpackChunkName: "AddCustomer"*/ 'teacher/pages/teacher/customers/child/addCustomer/addCustomer')
const SelectCourse = () => import(/*webpackChunkName: "SelectCourse"*/ 'teacher/pages/teacher/customers/child/addCustomer/selectCourse')
const CustomerManger = () => import(/*webpackChunkName: "CustomerManger"*/ 'teacher/pages/teacher/customers/child/customerManger/customerManger')
const CustomerAnalyse = () => import(/*webpackChunkName: "CustomerAnalyse"*/ 'teacher/pages/teacher/customers/child/customerAnalyse/customerAnalyse')
const CustomerSourceDetail = () => import(/*webpackChunkName: "CustomerSourceDetail"*/ 'teacher/pages/teacher/customers/child/customerAnalyse/customerSourceDetail')
const CustomerFollowUp = () => import(/*webpackChunkName: "CustomerFollowUp"*/ 'teacher/pages/teacher/customers/child/customerFollowUp/customerFollowUp')
const CommCustomer = () => import(/*webpackChunkName: "CommCustomer"*/ 'teacher/pages/teacher/customers/child/commCustomer/commCustomer')

const routes = [
    {
    	path: '/customers',
        name: 'customers',
        component: routerBus,
        meta: {
            page: Customers
        }
    },
    {
        path: '/addedToday',
        name: 'addedToday',
        component: routerBus,
        meta: {
            page: AddedToday
        }
    },
    {
        path: '/customDetail/:id/:name',
        name: 'customDetail',
        component: routerBus,
        meta: {
            page: CustomDetail
        }
    },
    {
        path: '/communicationRecord/:id',
        name: 'communicationRecord',
        component: routerBus,
        meta: {
            page: CommunicationRecord
        }
    },
    {
        path: '/addCommunication/:id',
        name: 'addCommunication',
        component: routerBus,
        meta: {
            page: AddCommunication
        }
    },
    {
        path: '/customHadle',
        name: 'customHadle',
        component: routerBus,
        meta: {
            page: CustomHadle
        }
    },
    {
        path: '/addCustomer',
        name: 'addCustomer',
        component: routerBus,
        meta: {
            page: AddCustomer
        }
    },
    {
        path: '/selectCourse',
        name: 'selectCourse',
        component: routerBus,
        meta: {
            page: SelectCourse
        }
    },
    {
        path: '/customerManger',
        name: 'customerManger',
        component: routerBus,
        meta: {
            page: CustomerManger
        }
    },
    {
        path: '/customerAnalyse',
        name: 'customerAnalyse',
        component: routerBus,
        meta: {
            page: CustomerAnalyse
        }
    },
    {
        path: '/customerSourceDetail',
        name: 'customerSourceDetail',
        component: routerBus,
        meta: {
            page: CustomerSourceDetail
        }
    },
    {
        path: '/customerFollowUp',
        name: 'customerFollowUp',
        component: routerBus,
        meta: {
            page: CustomerFollowUp
        }
    },
    {
        path: '/commCustomer/:type',
        name: 'commCustomer',
        component: routerBus,
        meta: {
            page: CommCustomer
        }
    }
]

export default routes;