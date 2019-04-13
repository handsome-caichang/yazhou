const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const DataScreen = () => import(/*webpackChunkName: "DataScreen"*/ 'teacher/pages/teacher/report/data-screen.vue');
const StudentReport = () => import(/*webpackChunkName: "StudentReport"*/ 'teacher/pages/teacher/report/student-report.vue');
const SaleReport = () => import(/*webpackChunkName: "SaleReport"*/ 'teacher/pages/teacher/report/sale-report.vue');
const ConsumeReport = () => import(/*webpackChunkName: "ConsumeReport"*/ 'teacher/pages/teacher/report/consume-report.vue');
const RefundReport = () => import(/*webpackChunkName: "RefundReport"*/ 'teacher/pages/teacher/report/refund-report.vue');
const FullClassRateReport = () => import(/*webpackChunkName: "FullClassRateReport"*/ 'teacher/pages/teacher/report/fullClassRate-report.vue');
const FullClassRateDetail = () => import(/*webpackChunkName: "FullClassRateDetail"*/ 'teacher/pages/teacher/report/fullClassRate-detail.vue');

const routes = [
    {
    	path: '/dataScreen',
    	name: 'dataScreen',
    	component: routerBus,
    	meta: {
			page: DataScreen    		
    	}
    },{
    	path: '/studentReport',
    	name: 'studentReport',
    	component: routerBus,
    	meta: {
			page: StudentReport    		
    	}
    },{
    	path: '/saleReport',
    	name: 'saleReport',
    	component: routerBus,
    	meta: {
			page: SaleReport    		
    	}
    },{
    	path: '/consumeReport',
    	name: 'consumeReport',
    	component: routerBus,
    	meta: {
			page: ConsumeReport    		
    	}
    },{
    	path: '/refundReport',
    	name: 'refundReport',
    	component: routerBus,
    	meta: {
			page: RefundReport    		
    	}
    },{
    	path: '/fullClassRateReport',
    	name: 'fullClassRateReport',
    	component: routerBus,
    	meta: {
			page: FullClassRateReport    		
    	}
    },{
    	path: '/fullClassRateDetail',
    	name: 'fullClassRateDetail',
    	component: routerBus,
    	meta: {
			page: FullClassRateDetail
    	}
    }
]

export default routes;