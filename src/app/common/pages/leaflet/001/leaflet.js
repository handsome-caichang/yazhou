import store from 'manage/store/index.js'
import {
    ChinaAddressV4Data
} from "vux"
let date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)



function formatDate(num) {
    if (num < 10) {
        return '0' + num
    } else {
        return num
    }
}

export const templateData = {
    "activitytype": 3, //活动类型（0未知，1拼团，2砍价，3传单）  
    "expiretime": `${date.getFullYear()}-${formatDate(date.getMonth() + 1)}-${formatDate(date.getDate())} ${formatDate(date.getHours())}:${formatDate(date.getMinutes())}`, //过期时间 
    "name": "微传单", //活动实例名称  
    "title": "全城火爆招生！限时低价抢购！9.9元抢200元课程学费！", //活动实例标题    
    "contentmain": `参与活动即可享受本课程套餐优惠。
1：报名即可获得9.9元抢200元的课程优惠。
2：后期续报，还可以享受更多优惠。
3：转发活动3天，到校可以获得精美礼品一份。
注意事项：
1：本次优惠不与其他优惠叠加。
2：本次优惠每人只能使用一次。
3：活动最终解释权归机构所有。`,
    "orgintroduce": `快乐学教育成立于2010年，总校区在深圳，是一家专注于小升初，初升高的综合性培训机构。立足于k12教育近10年，快乐学教育屡次获得深圳优秀培训机构荣誉。目前在深圳拥有20家分校，培育了上万名优秀学员。快乐学目前拥有专职老师200人占比90%，80%以上的专制教师为本科以上学历。`, //机构介绍  
    "contactinfo": `联系地址：长沙岳麓区芯城科技园
联系电话：0731-8888888`,
    "orgphone": "4008888888",
    "orgname": "快乐学教育机构",
    "enterbuttonname": "立即报名",
    "actinsconfigleaflet": {
        "enterusercountmax": 50,
        "islimitenterusercount": false
    },
    "actinsfilelist": [{
        filepath: "https://cdn01.xiaogj.com/file/6b26156e67dd41ed97ef315ab5b7f781/201903/0b8ce4f87d1647d7abf0a8204e15bb7f.png",
        type: 10, // 10 主题 20 班级 30 机构
    }, {
        filepath: 'https://cdn01.xiaogj.com/file/aeae4398d0a24bd8bb7f4115a3db45a6/201903/8adb2bc51e5242f382337199f878e630.png',
        type: 30,
    }]
}

export function setLeafletTtemplateData() {
    let addressInfo = store.state.addressInfo;
    let map = {}
    if (addressInfo.id) { //如果有机构信息  则使用机构信息里面的内容
        ChinaAddressV4Data.forEach(obj => {
            map[obj.value] = obj.name
        })
        templateData.orgname = addressInfo.companyname
        templateData.orgphone = addressInfo.companyphone
        templateData.contactinfo = (map[addressInfo.province] || '') + (map[addressInfo.city] || '') + (map[addressInfo.district] || '') + addressInfo.addressdetail
        templateData.orgintroduce = addressInfo.companyintroduction
        let list = addressInfo.filelist.map(item => {
            let temp = {
                type: 30
            }
            return Object.assign({}, item, temp)

        })
        templateData.actinsfilelist = templateData.actinsfilelist.filter(obj => obj.type != 30)
        templateData.actinsfilelist = templateData.actinsfilelist.concat(list)
    }
}