const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const charge = () => import(/*webpackChunkName: "daily-charge"*/ 'dailyReport/pages/charge.vue')
const classes = () => import(/*webpackChunkName: "daily-classes"*/ 'dailyReport/pages/classes.vue')
const customer = () => import(/*webpackChunkName: "daily-customer"*/ 'dailyReport/pages/customer.vue')
const consume = () => import(/*webpackChunkName: "daily-consume"*/ 'dailyReport/pages/consume.vue')



const routes = [
    {
        path: '/charge',
        name: 'charge',
        component: routerBus,
        meta: {
            page: charge
        }
    }, 
    {
        path: '/classes',
        name: 'classes',
        component: routerBus,
        meta: {
            page: classes
        }
    }, 
    {
        path: '/customer',
        name: 'customer',
        component: routerBus,
        meta: {
            page: customer
        }
    }, 
    {
        path: '/consume',
        name: 'consume',
        component: routerBus,
        meta: {
            page: consume
        }
    },
]
export default routes;