const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Home = () =>
    import( /*webpackChunkName: "Home"*/ 'manage/pages/home/home')

const UpDateOutfit = () =>
    import( /*webpackChunkName: "UpDateOutfit"*/ 'manage/pages/upDate-outfit/upDate-outfit.vue')

const ApplyPass = () =>
    import( /*webpackChunkName: "ApplyPass"*/ 'manage/pages/applyPass/applyPass.vue')

const IntroductXrx = () =>
    import( /*webpackChunkName:  "introductXrx"*/ 'manage/pages/introductXrx/introductXrx.vue')

const PerfectInformation = () =>
    import( /*webpackChunkName:  "PerfectInformation"*/ 'manage/pages/perfectInformation/perfectInformation.vue')

const ActivityEntryList = () =>
    import( /*webpackChunkName:  "ActivityEntryList"*/ 'manage/pages/activity-manage/activity-entry-list.vue');

const WonderfulMethod = () =>
    import( /*webpackChunkName:  "WonderfulMethod"*/ 'manage/pages/wonderfulMethod/wonderfulMethod.vue')

const BindsXrx = () =>
    import( /*webpackChunkName: "BindsXrx"*/ 'manage/pages/upDate-outfit/child/bindsXrx.vue')

const HasBinds = () =>
    import( /*webpackChunkName: "HasBinds"*/ 'manage/pages/upDate-outfit/child/hasBinds.vue')

// 模板详情
const TemplateDetail = () => import( /*webpackChunkName:  "TemplateDetail"*/ 'common/pages/templateDetail.vue')
// 模板编辑
const TemplateEdit = () => import( /*webpackChunkName:  "TemplateEdit"*/ 'common/pages/templateEdit.vue')


let routes = [{
    path: '/',
    redirect: 'home/0'
}, {
    path: '/home/:homeIndex',
    name: 'home',
    component: routerBus,
    meta: {
        page: Home
    }
}, {
    path: '/templateDetail/:id',
    name: 'templateDetail',
    component: routerBus,
    meta: {
        model: {
            type: "more",
            max: 2
        },
        page: TemplateDetail
    }
}, {
    path: '/templateEdit/:id',
    name: 'templateEdit',
    component: routerBus,
    meta: {
        page: TemplateEdit
    }
}, {
    path: '/upDateoutfit',
    name: 'upDateoutfit',
    component: routerBus,
    meta: {
        page: UpDateOutfit
    }
}, {
    path: '/applyPass',
    name: 'applyPass',
    component: routerBus,
    meta: {
        page: ApplyPass
    }
}, {
    path: '/introductXrx',
    name: 'introductXrx',
    component: routerBus,
    meta: {
        page: IntroductXrx
    }
}, {
    path: '/perfectInformation',
    name: 'perfectInformation',
    component: routerBus,
    meta: {
        page: PerfectInformation
    }
}, {
    path: '/activityEntryList/:id',
    name: 'activityEntryList',
    component: routerBus,
    meta: {
        page: ActivityEntryList
    }
}, {
    path: '/wonderfulMethod',
    name: 'wonderfulMethod',
    component: routerBus,
    meta: {
        page: WonderfulMethod
    }
}, {
    path: '/bindsXrx',
    name: 'bindsXrx',
    component: routerBus,
    meta: {
        page: BindsXrx
    }
}, {
    path: '/hasBinds',
    name: 'hasBinds',
    component: routerBus,
    meta: {
        page: HasBinds
    }
}]

const router = new VueRouter({
    routes
});

export default router;