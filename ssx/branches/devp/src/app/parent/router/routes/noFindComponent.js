const routerBus = () => Promise.resolve(Vue.options.components.routerBus)
const NoFindComponent = () => import(/*webpackChunkName: "404"*/'parent/pages/no-find/no-find.vue')

const routes = [
    {
        path: '*',
        name: 'nofind',
        component: routerBus,
        meta: {
            page: NoFindComponent,
            model: {
                type: 'more',
                max: 2
            }
        }
    }
]

export default routes;