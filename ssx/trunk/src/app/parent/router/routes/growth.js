const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const GrowthList = () => import(/*webpackChunkName: "GrowthList"*/ 'parent/pages/growth/growth-list')

const routes = [
    {
        path: '/GrowthList',
        name: 'GrowthList',
        component: routerBus,
        meta: {
            page: GrowthList
        }
    }
]

export default routes