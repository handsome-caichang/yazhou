const routerBus = () => Promise.resolve(Vue.options.components.routerBus)

const PersonalInformation = () => import(/*webpackChunkName: "PersonalInformation"*/ 'parent/pages/personal-center/personal-information')
const PasswordModify = () => import(/*webpackChunkName: "PasswordModify"*/ 'parent/pages/personal-center/password-modify')
const ExamScore = () => import(/*webpackChunkName: "ExamScore"*/ 'parent/pages/personal-center/exam-score')
const XyxPersonalInformation = () => import(/*webpackChunkName: "XyxPersonalInformation"*/ 'parent/pages/personal-center/xyx/xyx-personal-information')

const routes = [{
    path: '/personalInformation',
    name: 'PersonalInformation',
    component: routerBus,
    meta: {
        page: PersonalInformation
    }
},{
    path: '/passwordModify/:name',
    name: 'PasswordModify',
    component: routerBus,
    meta: {
        page: PasswordModify
    }
},{
    path: '/examScore',
    name: 'examScore',
    component: routerBus,
    meta: {
        page: ExamScore
    }
},{
    path: '/xyxPersonalInformation/:flag',
    name: 'XyxPersonalInformation',
    component: routerBus,
    meta: {
        page: XyxPersonalInformation
    }
}]

export default routes;