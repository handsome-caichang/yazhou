const routerBus = () => Promise.resolve(Vue.options.components.routerBus);

const OrderList = () => import('parent/pages/order/order-list');
const OrderDetail = () => import('parent/pages/order/order-detail');

const routes = [{
	path: '/orderList/:status',
	name: 'orderList',
	component: routerBus,
	meta: {
		page: OrderList
	}
}, {
	path: '/orderDetail',
	name: 'orderDetail',
	component: routerBus,
	meta: {
		page: OrderDetail
	}
}]

export default routes;