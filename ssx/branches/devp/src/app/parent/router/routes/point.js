const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Point = () => import(/*webpackChunkName: "Point"*/ 'parent/pages/point/point')
const PointRule = () => import(/*webpackChunkName: "PointRule"*/ 'parent/pages/point/point-rule')

const routes = [{
    path: '/point',
    name: 'point',
    component: routerBus,
    meta: {
        page: Point
    }
},{
    path: '/pointRule',
    name: 'pointRule',
    component: routerBus,
    meta: {
        page: PointRule
    }
}]

export default routes;