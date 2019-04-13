const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const LookClass = () => import(/*webpackChunkName: "NoticeList"*/ 'parent/pages/lookClass/look-class')
const selectClass = () => import(/*webpackChunkName: "NoticeDetail"*/ 'parent/pages/lookClass/select-class')

const routes = [
    {
        path: "/lookClass",
        name: "lookClass",
        component: routerBus,
        meta: {
            page: LookClass
        }
    },
    {
        path: "/lookClass/:id",
        name: "selectClass",
        component: routerBus,
        meta: {
            page: selectClass
        }
    }
];

export default routes;