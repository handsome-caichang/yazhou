const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const ClassCommentShare = () => 
    import(/*webpackChunkName: "classCommentShare"*/ 'parentShare/pages/class-comment-share/share.vue')
const Card = () =>
    import(/*webpackChunkName: "card"*/ "parentShare/pages/card/card.vue");
const XyxCommentShare = () => import(/*webpackChunkName: "xyxCommentShare"*/ 'parentShare/pages/class-comment-share/xyx-share.vue')
const Register = () =>
    import(/*webpackChunkName: "register"*/ "parentShare/pages/register/register.vue");
const CardRegister = () =>
    import(/*webpackChunkName: "cardRegister"*/ "parentShare/pages/card/card-register.vue");

const routes = [
    /*{
        path: '/',
        redirect: '/ClassCommentShare',
    },*/

    {
        path: "/xyxCommentShare",
        name: "XyxCommentShare",
        component: routerBus,
        meta: {
            page: XyxCommentShare
        }
    },
    {
        path: "/classCommentShare",
        name: "ClassCommentShare",
        component: routerBus,
        meta: {
            page: ClassCommentShare
        }
    },
    {
        path: "/register",
        name: "Register",
        component: routerBus,
        meta: {
            page: Register
        }
    },
    {
        path: "/card",
        name: "Card",
        component: routerBus,
        meta: {
            page: Card
        }
    },
    {
        path: "/cardRegister",
        name: "CardRegister",
        component: routerBus,
        meta: {
            page: CardRegister
        }
    }
];

const router = new VueRouter({
    routes
});

export default router;