const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const AchievementReport = () => import ( /*webpackChunkName: "AchievementReport"*/ 'teacher/pages/master/achievementReport/achievement-report.vue');
const AchievementDetail = () => import ( /*webpackChunkName: "AchievementDetail"*/ 'teacher/pages/master/achievementReport/achievement-detail.vue');

const routers = [{
    path: '/achievementReport',
    name: 'achievementReport',
    component: routerBus,
    meta: {
        page: AchievementReport
    }
},{
    path: '/achievementDetail',
    name: 'achievementDetail',
    component: routerBus,
    meta: {
        page: AchievementDetail
    }
}]

export default routers