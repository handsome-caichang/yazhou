const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const QrCode = () => import(/*webpackChunkName: "QrCode"*/ 'teacher/pages/teacher/qr-code/qr-code')

const routes = [
    {
        path: '/qrCode',
        name: 'qrCode',
        component: routerBus,
        meta: {
            page: QrCode
        }
    }
]

export default routes;