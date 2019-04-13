const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const bukeManage = () => import(/*webpackChunkName: "bukeManage"*/ 'teacher/pages/teacher/buke/bukeManage')
const bukeManageNewClass = () => import(/*webpackChunkName: "bukeManageNewClass"*/ 'teacher/pages/teacher/buke/bukeManage-newClass')
const bukeManageFollowClass = () => import(/*webpackChunkName: "bukeManageFollowClass"*/ 'teacher/pages/teacher/buke/bukeManage-followClass')

const routes = [
    {
        path: '/bukeManage',
        name: 'bukeManage',
        component: routerBus,
        meta: {
            page: bukeManage
        }
    },
    {
        path: '/bukeManageNewClass',
        name: 'bukeManageNewClass',
        component: routerBus,
        meta: {
            page: bukeManageNewClass
        }
    },
    {
        path: '/bukeManageFollowClass',
        name: 'bukeManageFollowClass',
        component: routerBus,
        meta: {
            page: bukeManageFollowClass
        }
    }
]

export default routes;