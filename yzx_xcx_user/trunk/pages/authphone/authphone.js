const app = getApp();
import {parseHash,jsonToQueryStr} from '../../utils/util.js';
import {updateusertel} from '../../api/api.js';

Page({
    data: {
        options: {}
    },
    onLoad: function (options) {
        options.url = decodeURIComponent(options.url);
        this.setData({
            options: options
        })
    },
    getPhoneNumberFN(e) { //获取微信授权
        var userRes = e.detail;
        if (userRes.iv) {
            wx.login({
                success: res => {
                    updateusertel({
                        code: res.code,//微信code
                        encrypteddata: userRes.encryptedData,
                        iv: userRes.iv,
                        terminal: 2, //1管理端2用户端
                        // companyid: app.globalData.userbaseinfo.company,
                        // userid: app.globalData.userbaseinfo.uid
                    }).then(res=> {
                        if(res.result.code == 200){
                            let parse = parseHash(this.data.options.url),
                                paraObj = Object.assign({},parse.query,{'grant':'phone'}),
                                paraObjStr = jsonToQueryStr(paraObj),
                                urlArr = this.data.options.url.split('#'),
                                urlIndex = urlArr[0].indexOf('?'),
                                timeStamp = new Date().getTime();
                            if(urlIndex==-1){
                                app.globalData.redirectUrl = `${urlArr[0]}?t=${timeStamp}${parse.hash}${paraObjStr}`;
                            }else{
                                app.globalData.redirectUrl = `${urlArr[0]}&t=${timeStamp}${parse.hash}${paraObjStr}`
                            }
                            console.log(app.globalData.redirectUrl)
                            wx.navigateBack();
                        }else {
                            wx.showToast({
                                title: res.result.msg,
                                icon: "none",
                                duration: 2000
                            })
                        }
                    })
                }
            });
        }
    }
})