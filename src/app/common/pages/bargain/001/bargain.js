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
let expiretime = `${date.getFullYear()}-${formatDate(date.getMonth() + 1)}-${formatDate(date.getDate())} ${formatDate(date.getHours())}:${formatDate(date.getMinutes())}`
export let templateData = {
    "activitytype": 2, //活动类型（0未知，1拼团，2砍价，3传单）	
    "expiretime": expiretime, //过期时间	
    // expiretime: app.tool.getDatesByIndex('1').sdate ,
    "name": "砍价", //活动实例名称	
    "title": "最低1元！春季班豪华礼包来袭，课价由你定，疯狂砍到底！", //活动实例标题	
    "imageurl": "https://cdn01.xiaogj.com/file/af79c6f46a3141d88f475337545538a3/201903/cfafbb5c0ab74ba9b7ca212674213973.png", //主图Url	
    "contentmain": '儿童创意绘画是启发少儿思维及智力的有效载体,儿童绘画能力的发展与其心理发展紧密相连。通过系统学习,可以提升少儿的注意力、观察力、想象力、创造力。', // 主要内容（活动描述）
    "productname": "1元享199元艺术体验课程大礼包", //产品名称	
    "orgname": '快乐学教育机构',
    "productdescribe": `参与砍价即可享受本课程套餐。
1：周六可体验艺术课程中的任意1节。
2：后期续报，可以享受更多优惠。
3：转发活动3天，到校可以获得精美礼品一份。
注意事项：
1：本次优惠不与其他优惠叠加。
2：本次优惠每人只能使用一次。
3：活动最终解释权归机构所有。`, //产品描述	
    "orgintroduce": "快乐学教育成立于2010年，总校区在深圳，是一家专注于小升初，初升高的综合性培训机构。立足于k12教育近10年，快乐学教育屡次获得深圳优秀培训机构荣誉。目前在深圳拥有20家分校，培育了上万名优秀学员。快乐学目前拥有专职老师200人占比90%，80%以上的专制教师为本科以上学历。", //机构介绍	
    "contactinfo": `联系地址：长沙岳麓区芯城科技园
联系电话：0731-8888888`,
    "orgphone": 4008888888,
    "actinsconfigbargain": { //活动实例砍价配置	
        "activityinstanceid": "", //活动实例Id（string型long）	
        "status": 0, //状态（-1已删除，0停用/失效，1正常/启用）	
        "createtime": "0001-01-01 00:00:00", //创建时间	s
        "createuserid": "", //创建者UserId（string型long）	
        "originalprice": 199, //原价	
        "floorprice": 9.9, //底价	
        "bargainusercount": 3, //砍价人数	
        "enterusercountmax": 50 //发起砍价活动人数上限	
    },
    actinsrecruitcount: {
        "visitcount": 8000, // 预览人数
        'enterusercount': 4000, // 报名人数
        bargainedecount: 100
    },
    "actinsfilelist": [{
        filepath: 'https://cdn01.xiaogj.com/file/af79c6f46a3141d88f475337545538a3/201903/cfafbb5c0ab74ba9b7ca212674213973.png',
        type: 10, // 10 主题 20 班级 30 机构
    }, {
        filepath: 'https://cdn01.xiaogj.com/file/aeae4398d0a24bd8bb7f4115a3db45a6/201903/8adb2bc51e5242f382337199f878e630.png',
        type: 20,
    }, {
        filepath: 'https://cdn01.xiaogj.com/file/aeae4398d0a24bd8bb7f4115a3db45a6/201903/8adb2bc51e5242f382337199f878e630.png',
        type: 30,
    }],
}
export function setBargainTtemplateData() {
    let map = {}
    let addressInfo = store.state.addressInfo;
    if (addressInfo.id) {
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
