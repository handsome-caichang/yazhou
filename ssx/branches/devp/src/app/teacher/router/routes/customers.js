const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Customers = () =>
    import ( /*webpackChunkName: "Customers"*/ 'teacher/pages/teacher/customers/customers.vue')
const AddedToday = () =>
    import ( /*webpackChunkName: "AddedToday"*/ 'teacher/pages/teacher/customers/child/addedToday.vue')
const CustomDetail = () =>
    import ( /*webpackChunkName: "CustomDetail"*/ 'teacher/pages/teacher/customers/child/customDetail.vue')
const CommunicationRecords = () =>
    import ( /*webpackChunkName: "CommunicationRecord"*/ 'teacher/pages/teacher/customers/child/communicationRecord.vue')
const AddCommunication = () =>
    import ( /*webpackChunkName: "AddCommunication"*/ 'teacher/pages/teacher/customers/child/addCommunication/addCommunication.vue')
const CustomHadle = () =>
    import ( /*webpackChunkName: "CustomHadle"*/ 'teacher/pages/teacher/customers/child/customHadle/customHadle.vue')
const AddCustomer = () =>
    import ( /*webpackChunkName: "AddCustomer"*/ 'teacher/pages/teacher/customers/child/addCustomer/addCustomer.vue')
// const AddCustomer = () => import(/*webpackChunkName: "AddCustomer"*/ 'teacher/pages/teacher/customers/child/addCustomerNew/addCustomerNew.vue')
const SelectCourse = () =>
    import ( /*webpackChunkName: "SelectCourse"*/ 'teacher/pages/teacher/customers/child/addCustomer/selectCourse.vue')
const CustomerManger = () =>
    import ( /*webpackChunkName: "CustomerManger"*/ 'teacher/pages/teacher/customers/child/customerManger/customerManger.vue')
const CustomerAnalyse = () =>
    import ( /*webpackChunkName: "CustomerAnalyse"*/ 'teacher/pages/teacher/customers/child/customerAnalyse/customerAnalyse.vue')
const CustomerSourceDetail = () =>
    import ( /*webpackChunkName: "CustomerSourceDetail"*/ 'teacher/pages/teacher/customers/child/customerAnalyse/customerSourceDetail.vue')
const CustomerFollowUp = () =>
    import ( /*webpackChunkName: "CustomerFollowUp"*/ 'teacher/pages/teacher/customers/child/customerFollowUp/customerFollowUp.vue')
const CommCustomer = () =>
    import ( /*webpackChunkName: "CommCustomer"*/ 'teacher/pages/teacher/customers/child/commCustomer/commCustomer.vue')
const StatusCountList = () =>
    import ( /*webpackChunkName: "StatusCountList"*/ 'teacher/pages/teacher/customers/child/customerAnalyse/child/statusCountList.vue')
const CampusCompare = () =>
    import ( /*webpackChunkName: "CampusCompare"*/ 'teacher/pages/teacher/customers/child/customerAnalyse/child/campusCompare.vue')
const CusAnalysisStatusDetail = () =>
    import ( /*webpackChunkName: "CusAnalysisStatusDetail"*/ 'teacher/pages/teacher/customers/child/customerAnalyse/child/cusAnalysisStatusDetail.vue')
// const Demo = () => import(webpackChunkName: "Demo" 'teacher/pages/teacher/customers/child/demo.vue')
// const SelectRole = () =>
//     import ( webpackChunkName: "SelectRole" 'teacher/pages/teacher/customers/child/addCustomer/selectRole.vue')
const Examine = () =>
    import ( /*webpackChunkName: "Examine"*/ 'teacher/pages/teacher/customers/child/examine.vue')
const CustomerToBeAllocated = () =>
    import ( /*webpackChunkName: "CustomerToBeAllocated"*/ 'teacher/pages/teacher/customers/child/customerToBeAllocated/customerToBeAllocated.vue')

const routes = [{
        path: '/customers',
        name: 'customers',
        component: routerBus,
        meta: {
            page: Customers
        }
    }, {
        path: '/addedToday',
        name: 'addedToday',
        component: routerBus,
        meta: {
            page: AddedToday
        }
    }, {
        path: '/customDetail/:id/:name/:salePersonId',
        name: 'customDetail',
        component: routerBus,
        meta: {
            page: CustomDetail
        }
    }, {
        path: '/communicationRecords/:id/:salePersonId',
        name: 'communicationRecords',
        component: routerBus,
        meta: {
            page: CommunicationRecords
        }
    }, {
        path: '/addCommunication/:id/:type/:salePersonId',
        name: 'addCommunication',
        component: routerBus,
        meta: {
            page: AddCommunication
        }
    }, {
        path: '/customHadle/:type',
        name: 'customHadle',
        component: routerBus,
        meta: {
            page: CustomHadle
        }
    }, {
        path: '/addCustomer/:type',
        name: 'addCustomer',
        component: routerBus,
        meta: {
            page: AddCustomer
        }
    }, {
        path: '/selectCourse/:id',
        name: 'selectCourse',
        component: routerBus,
        meta: {
            page: SelectCourse
        }
    }, {
        path: '/customerManger',
        name: 'customerManger',
        component: routerBus,
        meta: {
            page: CustomerManger
        }
    }, {
        path: '/customerAnalyse',
        name: 'customerAnalyse',
        component: routerBus,
        meta: {
            page: CustomerAnalyse
        }
    }, {
        path: '/customerSourceDetail/:id',
        name: 'customerSourceDetail',
        component: routerBus,
        meta: {
            page: CustomerSourceDetail
        }
    }, {
        path: '/customerFollowUp',
        name: 'customerFollowUp',
        component: routerBus,
        meta: {
            page: CustomerFollowUp
        }
    }, {
        path: '/commCustomer/:type',
        name: 'commCustomer',
        component: routerBus,
        meta: {
            page: CommCustomer
        }
    }, {
        path: '/statusCountList',
        name: 'statusCountList',
        component: routerBus,
        meta: {
            page: StatusCountList
        }
    }, {
        path: '/campusCompare',
        name: 'campusCompare',
        component: routerBus,
        meta: {
            page: CampusCompare
        }
    },
    /*{
        path: '/demo',
        name: 'demo',
        component: routerBus,
        meta: {
            page: Demo
        }
    },*/
    {
        path: '/cusAnalysisStatusDetail/:campusId',
        name: 'cusAnalysisStatusDetail',
        component: routerBus,
        meta: {
            page: CusAnalysisStatusDetail
        }
    }, {
        path: '/examine/:id',
        name: 'examine',
        component: routerBus,
        meta: {
            page: Examine
        }
    }, {
        path: '/customerToBeAllocated/:teacherid',
        name: 'customerToBeAllocated',
        component: routerBus,
        meta: {
            page: CustomerToBeAllocated
        }
    }
    /*, {
            path: '/selectRole',
            name: 'selectRole',
            component: routerBus,
            meta: {
                page: SelectRole
            }
        }*/
]

export default routes;