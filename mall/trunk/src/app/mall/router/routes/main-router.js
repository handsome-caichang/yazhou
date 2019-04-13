/**
 *  meta: {
 *      page: '该路由对应的要渲染的组件',
 *      enableShare: '是否要以被分享, 用于决定是否要显示或隐藏微信菜单的相关按钮'      
 *  }  
 */

const Home = () =>
    import(/*webpackChunkName: "Home"*/ "mall/pages/home/home.vue");
const WebsiteLsitPage  = () => import(/*webpackChunkName: "WebsiteLsitPage"*/ "page/website/page/website-list-page.vue");
const WebsiteCustomPage  = () => import(/*webpackChunkName: "WebsiteCustomPage"*/ "page/website/page/website-rich-text-page.vue");
const WebsiteTeacherDetail  = () => import(/*webpackChunkName: "WebsiteTeacherDetail"*/ "page/website/page/teacher-detail.vue");
const AppClose = () =>
    import(/*webpackChunkName: "AppClose"*/ "page/app-close/app-close");
const Login = () =>
    import(/*webpackChunkName: "Login"*/ "page/login/login");
const Register = () =>
    import(/*webpackChunkName: "Register"*/ "page/login/register");
const OrderList = () =>
    import(/*webpackChunkName: "OrderList"*/ "page/app-user/order-list");
const OrderComment = () =>
    import(/*webpackChunkName: "OrderComment"*/ "page/app-user/order-comment");
const OrderDetail = () =>
    import(/*webpackChunkName: "OrderDetail"*/ "page/app-user/order-detail");
const MessageList = () =>
    import(/*webpackChunkName: "MessageList"*/ "page/app-user/message-list");
const MessageDetail = () =>
    import(/*webpackChunkName: "MessageDetail"*/ "page/app-user/message-detail");
const UserSetting = () =>
    import(/*webpackChunkName: "UserSetting"*/ "page/app-user/user-setting");
const PasswordSetting = () =>
    import(/*webpackChunkName: "PasswordSetting"*/ "page/app-user/password-setting");
const AddressSetting = () =>
    import(/*webpackChunkName: "AddressSetting"*/ "page/app-user/address-setting");
const AddressEdit = () =>
    import(/*webpackChunkName: "AddressEdit"*/ "page/app-user/address-edit");
const FavoriteList = () =>
    import(/*webpackChunkName: "FavoriteList"*/ "page/app-user/favorite-list");
const HelpCenter = () =>
    import(/*webpackChunkName: "HelpCenter"*/ "page/app-user/help-center");
const CouponList = () =>
    import(/*webpackChunkName: "CouponList"*/ "page/app-user/coupon-list");
const CouponGet = () =>
    import(/*webpackChunkName: "CouponGet"*/ "page/app-user/coupon-get");
const AppOrder = () =>
    import(/*webpackChunkName: "AppOrder"*/ "page/app-cart/app-order");
const MallCart = () =>
    import(/*webpackChunkName: "MallCart"*/ "page/app-cart/mall-cart");
const Details = () =>
    import(/*webpackChunkName: "Details"*/ "page/details/details.vue");
const AppSearch = () =>
    import(/*webpackChunkName: "AppSearch"*/ "page/app-search/app-search");
const AppSearchList = () =>
    import(/*webpackChunkName: "AppSearchList"*/ "page/app-search-list/app-search-list");
const MallCustomPage = () =>
    import(/*webpackChunkName: "MallCustomPage"*/ "page/mall-custom-page/mall-custom-page.vue");
const TeacherAchievement = () =>
    import(/*webpackChunkName: "TeacherAchievement"*/ "page/teacher-achievement/my-achievement");
const AchievementDetail = () =>
    import(/*webpackChunkName: "AchievementDetail"*/ "page/teacher-achievement/achievement-detail");



const routes = [
    {
        path: "/website-list-page/:title/:type/:id",
        name: "websiteLsitPage",
        component: WebsiteLsitPage
    },
    {
        path: "/website-custom-page/:title/:id",
        name: "websiteCustomPage",
        component: WebsiteCustomPage
    },
    {
        path: "/teacher-detail/:id",
        name: "websiteTeacherDetail",
        component: WebsiteTeacherDetail,
        meta: {
            model: {
                type: "more",
                max: 2
            }
        }
    },
    {
        path: "/",
        redirect: "/home/0"
    },
    {
        path: "/appclose",
        name: "appclose",
        component: AppClose
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/home/:homeIndex",
        name: "home",
        component: Home
    },
    {
        path: "/search",
        name: "search",
        component: AppSearch
    },
    {
        // searchType: 100表示套餐,1表示普通商品, -1表示搜索;
        path: "/searchList/:searchType/:searchVal/:title",
        name: "searchList",
        component: AppSearchList
    },
    {
        path: "/details/:type/:ID",
        name: "details",
        component: Details,
        meta: {
            page: Details,
            model: {
                type: "more",
                max: 2
            }
        }
    },
    {
        path: "/cart",
        name: "cart",
        component: MallCart
    },
    {
        path: "/order",
        name: "order",
        component: AppOrder
    },
    {
        path: "/orderList/:status",
        name: "orderList",
        component: OrderList
    },
    {
        path: "/orderDetail",
        name: "orderDetail",
        component: OrderDetail
    },
    {
        path: "/orderComment",
        name: "orderComment",
        component: OrderComment
    },
    {
        path: "/addressSetting/:ptype",
        name: "addressSetting",
        component: AddressSetting
    },
    {
        path: "/addressEdit/:etype",
        name: "addressEdit",
        component: AddressEdit
    },
    {
        path: "/messageList",
        name: "messageList",
        component: MessageList
    },
    {
        path: "/messageDetail",
        name: "messageDetail",
        component: MessageDetail
    },
    {
        path: "/userSetting",
        name: "userSetting",
        component: UserSetting
    },
    {
        path: "/passwordSetting",
        name: "passwordSetting",
        component: PasswordSetting
    },
    {
        path: "/favoriteList",
        name: "favoriteList",
        component: FavoriteList
    },
    {
        path: "/couponList",
        name: "couponList",
        component: CouponList
    },
    {
        path: "/couponGet/:couponID",
        name: "couponGet",
        component: CouponGet
    },
    {
        path: "/helpCenter",
        name: "helpCenter",
        component: HelpCenter
    },
    {
        path: "/cpage/:type/:id",
        name: "MallCustomPage",
        component: MallCustomPage
    },
    {
        path: "/achievement",
        name: "TeacherAchievement",
        component: TeacherAchievement
    },
    {
        path: "/achievementDetail/:id",
        name: "AchievementDetail",
        component: AchievementDetail
    }
];

export default routes;