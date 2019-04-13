const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Transaction = () => import(/*webpackChunkName: "Transaction"*/ 'parent/pages/transaction/transaction')

const routes = [{
    path: '/transaction',
    name: 'Transaction',
    component: routerBus,
    meta: {
        page: Transaction
    }
}]

export default routes;