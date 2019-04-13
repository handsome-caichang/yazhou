let config = {
    sdk: 'NIM_Web_SDK_v4.2.0.js',
    // 用户自定义的登录注册地址
    loginUrl: '/webdemo/h5/login.html',
    registUrl: '/webdemo/h5/regist.html',
    homeUrl: '/webdemo/h5/index.html#/session',

    // 资源路径根目录，为了方便用户部署在二级以上URL路径上
    resourceUrl: 'http://yx-web.nos.netease.com/webdoc/h5',
    // 用户logo地址
    logo: 'http://yx-web.nos.netease.com/webdoc/h5/im/logo.png',
    // 默认用户头像
    defaultUserIcon: 'https://cdn01.xiaogj.com/uploads/ssx/im/student.jpg',
    // 默认群头像
    defaultTeamIcon: 'https://cdn01.xiaogj.com/uploads/ssx/im/group.jpg',
    // 系统通知图标
    noticeIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/notice-icon.png',
    // 我的手机图标
    myPhoneIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/my-phone.png',
    // 本地消息显示数量，会影响性能
    localMsglimit: 36,
    // 开发环境
    env: 'online'
}


let appConfig = {
    // 用户的appkey
    // 用于在web demo中注册账号异步请求demo 服务器中使用
    test: {
        type: 'demo',
        appkey: 'fe416640c8e8a72734219e1847ad2547',
        postUrl: 'https://apptest.netease.im'
    },
    demo: {
        type: 'demo',
        appkey: '45c6af3c98409b18a84451215d0bdd6e',
        postUrl: 'https://app.netease.im'
    },
    online: {
        type: 'test',
        appkey: '8e733de93ca64667f39c2354b5d9cceb',
        postUrl: '',
        wxAppId: 'wx51186b5333ed5ec1'
    }
}

config = Object.assign(config, appConfig[config.env])

export default config