const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Home = () =>
    import ( /*webpackChunkName: "Home"*/ 'user/pages/home/home')
    
    // 模板详情
const TemplateDetail = () =>  import ( /*webpackChunkName:  "TemplateDetail"*/ 'common/pages/templateDetail.vue')
let routes = [{
    path: '/',
    redirect: 'home'
}, {
    path: '/home',
    name: 'home',
    component: routerBus,
    meta: {
        page: Home
    }
}, {
    path: '/templateDetail/:id',
    name: 'templateDetail',
    component: routerBus,
    meta: {
        page: TemplateDetail
    }
}]

const router = new VueRouter({
    routes
});

export default router;