// 企业版微信环境

// 封装微信JS-SDK相关操作功能, 依赖微信JS-SDK;
import base from '../../base.js'

import u from './wx.js'

var wxworksdk;

if (base.env === 'wxwork') {

    var wxworkjssdkApilist = ["selectEnterpriseContact", "selectExternalContact", 
        "openUserProfile"]

    u.jssdkApiList = u.jssdkApiList.concat(wxworkjssdkApilist)

    // 通过config接口注入权限验证配置
    u.setConfig = function(opts) {
        let config = {
            beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: "wx507dbff2a0ac7aae00",  // 必填，企业微信的corpID
            timestamp: 1513254847,   // 必填，生成签名的时间戳
            nonceStr: "WX_config_nonceStr",  // 必填，生成签名的随机串
            signature: "98260ffca01823d0bc7ddbbcce14d14f99a32df0",  // 必填，签名，见附录1
            jsApiList: u.jssdkApiList  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        }
        Object.assign(config, opts)
        wx.config(config);
        u.event.emit("wxconfig")
    }
}

wxworksdk = u;

export default wxworksdk