const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CheckinList = () => import(/*webpackChunkName: "CheckinList"*/ 'parent/pages/checkin/checkin-list')

const routes=[{
    path:'/checkinList',
    name:'checkinList',
    component:routerBus,
    meta:{
        page:CheckinList
    }
}]

export default routes