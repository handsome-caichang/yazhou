const routerBus = () => Promise.resolve(Vue.options.components.routerBus)
const NoFindComponent = () => import('src/pages/no-find/no-find.vue')

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