const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const ConsumeReport = () =>
    import ( /*webpackChunkName: "ConsumeReport"*/ 'teacher/pages/master/consumeReport/consumeReport.vue');

const ConsumeCampReport = () =>
    import ( /*webpackChunkName: "ConsumeCampReport"*/ 'teacher/pages/master/consumeReport/consumeCampReport.vue');

const ConsumeDetail = () =>
    import ( /*webpackChunkName: "ConsumeDetail"*/ 'teacher/pages/master/consumeReport/consumeDetail.vue');

const routers = [{
    path: '/consumeReport',
    name: 'consumeReport',
    component: routerBus,
    meta: {
        page: ConsumeReport
    }
}, {
    path: '/consumeCampReport/:id',
    name: 'consumeCampReport',
    component: routerBus,
    meta: {
        page: ConsumeCampReport
    }
}, {
    path: '/consumeDetail/:id/:campusName',
    name: 'consumeDetail',
    component: routerBus,
    meta: {
        page: ConsumeDetail
    }
}, {
    path: '/consumeCampReport',
    name: 'consumeCampReportTwo',
    component: routerBus,
    meta: {
        page: ConsumeCampReport
    }
}]

export default routers