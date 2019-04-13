const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const RenewalClass = () => import(/*webpackChunkName: "RenewalClass"*/ 'teacher/pages/teacher/renewal/renewalclass')
const renewalclassStudentList = () => import(/*webpackChunkName: "RenewalClassStudentList"*/ 'teacher/pages/teacher/renewal/renewalclass-students-list')

const routes = [
    {
        path: '/renewalclass',
        name: 'renewalclass',
        component: routerBus,
        meta: {
            page: RenewalClass
        }
    },
    {
        path: '/renewalclassStudentList/:id',
        name: 'renewalclassStudentList',
        component: routerBus,
        meta:{
            page:renewalclassStudentList
        }
    }
]

export default routes;