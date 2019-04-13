import router from 'crm/router/index.js'

import studentOperate from './student-operate/student-operate.js'
import responsibleOfficer from './responsible-officer/responsible-officer.js'
import workwxShare from './workwx-share/workwx-share.js'



var root = window.app

// 学员操作插件
Vue.use(studentOperate, {
    router,
    root
});

// 责任人
Vue.use(responsibleOfficer, {
    router,
    root
});


// 企业微信分享
Vue.use(workwxShare, {
    router,
    root
});