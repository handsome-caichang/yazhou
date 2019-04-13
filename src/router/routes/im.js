const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const Home = () => import(/*webpackChunkName: "Home"*/ 'src/pages/home/home.vue')
const Chat = () => import(/*webpackChunkName: "Chat"*/ 'src/pages/chat/chat.vue')
const ContactClassMember = () => import(/*webpackChunkName: "ContactClassMember"*/ 'src/pages/contact-class-member/contact-class-member.vue')
const TeamDetail = () => import(/*webpackChunkName: "TeamDetail"*/ 'src/pages/team-detail/team-detail.vue')
const CustomMsg = () => import(/*webpackChunkName: "CustomMsg"*/ 'src/pages/customMsg/customMsg.vue')


// 用于后续需求的准备
// import demo from 'src/pages/demo-发送表情-按字母捡索/demo.vue'


/**
 *  meta: {
 *      page: '该路由对应的要渲染的组件',
 *      enableShare: '是否要以被分享, 用于决定是否要显示或隐藏微信菜单的相关按钮'      
 *  }
 */


const routes = [
    {
        path: '/',
        redirect: 'home/0',
    }, {
        path: '/home/:homeIndex',
        name: 'home',
        component: routerBus,
        meta: {
            page: Home
        }
    }, {
        path: '/chat/:scene/:to/:toName',
        name: 'chat',
        component: routerBus,
        meta: {
            page: Chat
        }
    }, {
        path: '/contactClassMember/:classID/:className',
        name: 'contactClassMember',
        component: routerBus,
        meta: {
            page: ContactClassMember
        }
    }, {
        path: '/teamDetail/:teamId/:teamName',
        name: 'teamDetail',
        component: routerBus,
        meta: {
            page: TeamDetail
        }
    }, {
        path: '/customMsg/:FromAccID/:ToAccID/:CustomType',
        name: 'customMsg',
        component: routerBus,
        meta: {
            page: CustomMsg
        }
    }/*, {
        path: '/demo',
        name: 'demo',
        component: routerBus,
        meta: {
            page: demo
        }
    },*/
]

export default routes;