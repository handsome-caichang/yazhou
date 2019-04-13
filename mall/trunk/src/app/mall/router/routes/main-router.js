/**
 *  meta: {
 *      page: '该路由对应的要渲染的组件',
 *      enableShare: '是否要以被分享, 用于决定是否要显示或隐藏微信菜单的相关按钮'      
 *  }  
 */

const Home = () =>
    import ( /*webpackChunkName: "Home"*/ "mall/pages/home/home.vue");
const OrderList = () =>
    import ( /*webpackChunkName: "OrderList"*/ "page/app-user/order-list");
const UserSetting = () =>
    import ( /*webpackChunkName: "UserSetting"*/ "page/app-user/user-setting");
const PasswordSetting = () =>
    import ( /*webpackChunkName: "PasswordSetting"*/ "page/app-user/password-setting");
const AddressSetting = () =>
    import ( /*webpackChunkName: "AddressSetting"*/ "page/app-user/address-setting");
const AddressEdit = () =>
    import ( /*webpackChunkName: "AddressEdit"*/ "page/app-user/address-edit");
const OrderDetail = () =>
    import ( /*webpackChunkName: "OrderDetail"*/ "page/app-user/order-detail");
const AppOrder = () =>
    import ( /*webpackChunkName: "AppOrder"*/ "page/app-cart/app-order");
const Detail = () =>
    import ( /*webpackChunkName: "Detail"*/ "page/goods-detail/detail.vue");
const ConfirmOrder = () =>
    import ( /*webpackChunkName: "ConfirmOrder"*/ "page/app-confirm-order/confirm-order.vue");
const PaySucess = () =>
    import ( /*webpackChunkName: "PaySucess"*/ "page/paySucess/paySucess.vue");
const AppSearch = () =>
    import ( /*webpackChunkName: "AppSearch"*/ "page/app-search/app-search");
const AppSearchList = () =>
    import ( /*webpackChunkName: "AppSearchList"*/ "page/app-search-list/app-search-list");
const MallCart = () =>
    import ( /*webpackChunkName: "MallCart"*/ "page/app-cart/cart.vue");
const routes = [{
    path: "/",
    redirect: "/home/0"
}, {
    path: "/home/:homeIndex",
    name: "home",
    component: Home
}, {
    path: "/orderList/:status",
    name: "orderList",
    component: OrderList
}, {
    path: "/userSetting",
    name: "userSetting",
    component: UserSetting
}, {
    path: "/passwordSetting",
    name: "passwordSetting",
    component: PasswordSetting
}, {
    path: "/addressEdit/:etype",
    name: "addressEdit",
    component: AddressEdit
}, {
    path: "/addressSetting/:ptype",
    name: "addressSetting",
    component: AddressSetting
}, {
    path: "/orderDetail/:id",
    name: "orderDetail",
    component: OrderDetail
}, {
    path: "/order/:type",
    name: "order",
    component: AppOrder
}, {
    path: "/detail/:id/:type",
    name: "detail",
    component: Detail,
    meta: {
        page: Detail,
        model: {
            type: "more",
            max: 2
        }
    }
}, {
    path: "/confirmOrder",
    name: "confirmOrder",
    component: ConfirmOrder
}, {
    path: "/paySucess",
    name: "paySucess",
    component: PaySucess
}, {
    path: "/search",
    name: "search",
    component: AppSearch
}, {
    // searchType: 100表示套餐,1表示普通商品, -1表示搜索;
    path: "/searchList/:searchType/:searchVal/:title",
    name: "searchList",
    component: AppSearchList
}, {
    path: "/cart",
    name: "cart",
    component: MallCart
}];

export default routes;