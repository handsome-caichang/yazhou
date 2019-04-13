const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const StatisticsList = () => import(/*webpackChunkName: "StatisticsList"*/ 'parent/pages/statistics/statistics-list')
const StatisticsDetail = () => import(/*webpackChunkName: "StatisticsDetail"*/ 'parent/pages/statistics/statistics-detail')

const routes=[{
    path:'/statisticsList',
    name:'StatisticsList',
    component:routerBus,
    meta:{
        page:StatisticsList
    }
},{
    path:'/statisticsDetail/:shiftId',
    name:'StatisticsDetail',
    component:routerBus,
    meta:{
        page:StatisticsDetail
    }
}]

export default routes