const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const PasswordModify = () => import(/*webpackChunkName: "PasswordModify"*/ 'teacher/pages/teacher/personal-center/password-modify')

const routes = [{
    path: '/passwordModify',
    name: 'PasswordModify',
    component: routerBus,
    meta: {
        page: PasswordModify
    }
}]

export default routes;