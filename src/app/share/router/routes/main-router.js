const StudentQrcode = () =>
    import ('share/pages/home/home.vue')

/**
 *  meta: {
 *      page: '该路由对应的要渲染的组件',
 *      enableShare: '是否要以被分享, 用于决定是否要显示或隐藏微信菜单的相关按钮'      
 *  }  
 */

const routes = [{
    path: '/',
    redirect: 'studentsQrcode',
}, {
    path: '/studentsQrcode',
    name: 'studentsQrcode',
    component: StudentQrcode,
}]

export default routes;