const NoFindComponent = () =>
    import ( /*webpackChunkName: "404"*/ 'mall/pages/no-find/no-find.vue')

import store from '../store'
import mainRouter from './routes/main-router'

let routes = [
    ...mainRouter,
    {
        path: '*',
        name: 'nofind',
        component: NoFindComponent,
        meta: {
            model: {
                type: 'more',
                max: 2
            }
        }
    }
]

// 在路由时,动态在hash上加上当前校区的查询参数
function beforeChange(location) {
    if (!location.query.cid) {
        location.query.cid = store.state.curCampus.id;
    }
    window.routeMode = location.routeMode;
    return location;
}

app.tool.transRoutes(routes)

const router = new VueRouter({
    routes,
    beforeChange
});

export default router;