// 优惠券
const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const CouponList = () => import(/*webpackChunkName: "CouponList"*/ 'parent/pages/coupon/coupon-list')

const routes=[{
    path:'/coupon',
    name:'coupon',
    component:routerBus,
    meta:{
        page:CouponList
    }
}]

export default routes