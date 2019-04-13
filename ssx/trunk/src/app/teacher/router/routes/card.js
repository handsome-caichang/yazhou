const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CradList = () =>
    import(/*webpackChunkName: "CradList"*/ "teacher/pages/teacher/card/card-list.vue");
const CardDetail = () =>
    import(/*webpackChunkName: "CardDetail"*/ "teacher/pages/teacher/card/card-detail.vue");
const CardAdd = () => 
    import(/*webpackChunkName: "CardAdd"*/ 'teacher/pages/teacher/card/card-add.vue')

const routes = [
    {
        path: '/cardList',
        name: 'cardList',
        component: routerBus,
        meta: {
            page: CradList
        }
    },
    {
        path: '/cardDetail/:id',
        name: 'cardDetail',
        component: routerBus,
        meta: {
            page: CardDetail
        }
    },
    {
        path: '/cardAdd/:id',
        name: 'cardAdd',
        component: routerBus,
        meta: {
            page: CardAdd
        }
    },
 
]

export default routes;