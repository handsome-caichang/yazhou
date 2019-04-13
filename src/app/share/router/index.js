const page404 = () => import(/*webpackChunkName: "404"*/ 'share/pages/no-find/no-find.vue')


import mainRouter from './routes/main-router.js'

let routes = [
    ...mainRouter,

    {
        path: '*',
        name: 'nofind',
        component: page404,
        meta: {
            model: {
                type: 'more',
                max: 2
            }
        }
    }
]


app.tool.transRoutes(routes)

const router = new VueRouter({
  	routes
});

export default router;