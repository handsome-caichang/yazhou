const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

//收费报表-》收费汇总+退费汇总
const charge = () =>
    import ( /*webpackChunkName: "ChargeReport"*/ 'teacher/pages/master/feeReport/charge-report.vue');

const netEarning = () =>
    import ( /*webpackChunkName: "netEarning"*/ 'teacher/pages/master/feeReport/net-earning.vue');

// 收费报表-》目录
const FeeMenu = () =>
    import ( /*webpackChunkName: "FeeMenu"*/ 'teacher/pages/master/feeReport/fee-menu.vue');

// 收费报表-》课程收费汇总表
const CourseChargeArea = () =>
    import ( /*webpackChunkName: "CourseChargeArea"*/ 'teacher/pages/master/feeReport/course-charge/course-charge-area.vue');

// 收费报表-》课程收费汇总表
const CourseChargeCampus = () =>
    import ( /*webpackChunkName: "CourseChargeCampus"*/ 'teacher/pages/master/feeReport/course-charge/course-charge-campus.vue');

// 收费报表-》课程收费汇总表
const CourseChargeCampusBranch = () =>
    import ( /*webpackChunkName: "CourseChargeCampusBranch"*/ 'teacher/pages/master/feeReport/course-charge/course-charge-campus-branch.vue');

// 收费报表-》课程收费汇总表
const CourseChargeDetail = () =>
    import ( /*webpackChunkName: "CourseChargeDetail"*/ 'teacher/pages/master/feeReport/course-charge/course-charge-detail.vue');


const routers = [{
    path: '/feeReportCharge/:reportType/:level',
    name: 'feeReportCharge',
    component: routerBus,
    meta: {
        page: charge,
        model: {
            type: 'more',
            max: 3
        }
    }
},{
    path: '/netEarning',
    name: 'netEarning',
    component: routerBus,
    meta: {
        page: netEarning
    }
},{
    path: '/feeMenu',
    name: 'feeMenu',
    component: routerBus,
    meta: {
        page: FeeMenu
    }
},{
    path: '/courseChargeArea',
    name: 'courseChargeArea',
    component: routerBus,
    meta: {
        page: CourseChargeArea
    }
},{
    path: '/courseChargeCampus',
    name: 'courseChargeCampus',
    component: routerBus,
    meta: {
        page: CourseChargeCampus
    }
},{
    path: '/courseChargeCampusBranch/:campusid',
    name: 'courseChargeCampusBranch',
    component: routerBus,
    meta: {
        page: CourseChargeCampusBranch
    }
},{
    path:'/courseChargeDetail',
    name:'courseChargeDetail',
    component:routerBus,
    meta:{
        page:CourseChargeDetail
    }
}]

export default routers