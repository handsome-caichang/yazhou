import Login from 'crm/pages/login/login.vue'
import Home from 'crm/pages/home/home.vue'

// 客户详情
import CustomerDetail from 'crm/pages/customer/customer-detail.vue'
// 沟通详情
import CommunicationDetail from 'crm/pages/customer/communication-detail.vue'

// 添加沟通记录
import CommunicationAdd from 'crm/pages/customer/communication-add.vue'

// 邀约记录
import InviteCustomer from 'crm/pages/customer/invite-customer.vue'


// 应用-新建客户
import AddCustomer from 'crm/pages/addCustomer/addCustomer.vue'
import EditCustomer from 'crm/pages/addCustomer/editCustomer.vue'
// 应用-客户公海
import CustomerSeas from 'crm/pages/customerSeas/customerSeas'
// 应用-邀约确认
import Offer from 'crm/pages/offer/offer.vue'
// 应用-今日计划
import TodayPlan from 'crm/pages/todayPlan/todayPlan.vue'
// 应用-我的业绩
import myWork from 'crm/pages/myWork/myWork.vue'
// 应用-数据分析
import customerAnalyse from 'crm/pages/customerAnalyse/customerAnalyse.vue'
// 应用-二维码生成
import QrCode from 'crm/pages/qrCode/qrCode.vue'
// 二维码配置
import ConfigQrCode from 'crm/pages/configQrCode/configQrCode.vue'

// 搜索
import Search from 'crm/pages/search/search.vue'


/**
 *  meta: {
 *      page: '该路由对应的要渲染的组件',
 *      enableShare: '是否要以被分享, 用于决定是否要显示或隐藏微信菜单的相关按钮'      
 *  }  
 */
const routes = [{
    path: '/',
    redirect: '/home/0'
}, {
    path: '/home/:homeIndex',
    name: 'home',
    component: Home
}, {
    path: '/communicationDetail/:id',
    name: 'communicationDetail ',
    component: CommunicationDetail
}, { //followstatus 1公海 2线索 3跟进中 4试听中 5转化成功（状态不能改）
    path: '/communicationAdd/:id/:followstatus',
    name: 'communicationAdd ',
    component: CommunicationAdd
}, {
    path: '/inviteCustomer/:id',
    name: 'inviteCustomer',
    component: InviteCustomer
}, {
    path: '/addCustomer/:optype',
    name: 'addCustomer',
    component: AddCustomer
}, {
    path: '/editCustomer/:id/:optype',
    name: 'editCustomer',
    component: EditCustomer
}, {
    path: '/customerSeas',
    name: 'customerSeas',
    component: CustomerSeas
}, {
    path: '/detail/:id/:followstatus',
    name: 'detail',
    component: CustomerDetail
}, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/offer',
    name: 'offer',
    component: Offer
}, {
    path: '/todayPlan',
    name: 'todayPlan',
    component: TodayPlan
}, {
    path: '/search/:scope',
    name: 'search',
    component: Search
}, {
    path: '/myWork',
    name: 'myWork',
    component: myWork
}, {
    path: '/customerAnalyse',
    name: 'customerAnalyse',
    component: customerAnalyse
}, {
    path: '/configQrCode/:optype',
    name: 'configQrCode',
    component: ConfigQrCode
}, {
    path: '/qrCode',
    name: 'qrCode',
    component: QrCode
}]

export default routes;