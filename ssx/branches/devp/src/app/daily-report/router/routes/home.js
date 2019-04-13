const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Home = () => import(/*webpackChunkName: "daily-home"*/ 'dailyReport/pages/home.vue')

/**
 *  meta: {
 *      page: '该路由对应的要渲染的组件',
 *      enableShare: '是否要以被分享, 用于决定是否要显示或隐藏微信菜单的相关按钮'      
 *  }  
 */

const routes = [
    {
        path: '/',
        redirect: 'home',
    },{
        path: '/home',
        name: 'home',
        component: routerBus,
        meta: {
            page: Home
        }
    }
]

export default routes;