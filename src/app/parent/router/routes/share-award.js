const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const ShareAward = () => import(/*webpackChunkName: "ShareAward"*/ 'parent/pages/share-award/share-award')

const routes = [{
    path: '/shareaward',
    name: 'shareaward',
    component: routerBus,
    meta: {
        page: ShareAward
    }
}
]

export default routes;