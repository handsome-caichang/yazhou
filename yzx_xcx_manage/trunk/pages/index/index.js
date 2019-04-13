//index.js
const app = getApp();

Page({
    data: { //页面的初始数据
        showAuthBtn: false, //展示授权按钮
        count: 0,
        scene: '' //小程序二维码传递进来的
    },
    onLoad: function(options) {
        console.log('打印管理端options',options);
        console.log(options.scene);
        if (options && options.binding) { //重新绑定了机构信息
            wx.login({
                success: res => {
                    wx.getUserInfo({
                        success: userRes => {},
                        complete: userRes => {
                            this.authLogin({
                                code: res.code, //微信code
                                userRes: userRes //userInfo
                            }, options)
                        }
                    });
                }
            });
        }

        //scene需要使用decodeURIComponent才能获取到生成二维码时传入的scene
        if (options && options.scene) { //说明是通过smart扫描二维码进入，获取smart的用户id
            this.setData({
                scene:  decodeURIComponent(options.scene)
            })

            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.userInfo']) { //未授权
                        wx.setNavigationBarTitle({
                            title: '微信授权登录'
                        })
                        this.setData({
                            showAuthBtn: true
                        })
                    } else {
                        wx.login({
                            success: res => {
                                wx.getUserInfo({
                                    success: userRes => {},
                                    complete: userRes => {
                                        this.authLogin({
                                            code: res.code, //微信code
                                            userRes: userRes //userInfo
                                        }, {
                                            scene: this.data.scene
                                        })
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    },
    onShow: function() { //监听页面显示
        //1、处理首次登录展示
        if ((app.globalData.count == 0 || ((app.globalData.mallUnloadTimeStamp - app.globalData.appShowTimeStamp) < 500)) && this.data.scene === '') {
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.userInfo']) { //未授权
                        wx.setNavigationBarTitle({
                            title: '微信授权登录'
                        })
                        this.setData({
                            showAuthBtn: true
                        })
                    } else {
                        wx.login({ //已授权
                            success: res => {
                                wx.getUserInfo({
                                    success: userRes => {
                                        this.authLogin({
                                            code: res.code, //微信code
                                            userRes: userRes //userInfo
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }

        //2、处理返回的展示
        if (app.globalData.count > 0 && ((app.globalData.mallUnloadTimeStamp - app.globalData.appShowTimeStamp) > 500)) {
            this.setData({
                count: app.globalData.count
            })
            wx.setNavigationBarTitle({
                title: ''
            });
        }
    },
    getUserInfoFN(e) { //获取微信授权
        var userRes = e.detail;
        if (userRes.iv) {
            wx.login({
                success: res => {
                    this.authLogin({
                        code: res.code, //微信code
                        userRes: userRes //userInfo
                    }, {
                        scene: this.data.scene
                    })
                }
            })
        }
    },
    authLogin: function(opt, scan) { //1、判断当前环境2、用户授权接口
        wx.request({
            url: 'https://mzs.xrx100.com/wxapp.do?appid=4&action=getrunenvironment', //getrunenvironment
            method: 'POST',
            success: res=>{
                if (res.data.result.code == 200) { //devtools对应是1,0对应1，大于0的都是3
                    for(var item in app.globalData.host){
                        if(res.data.env == item){
                            app.globalData.envHost = app.globalData.host[item];
                        }
                    }
                    wx.request({
                        url: app.globalData.envHost+'/wx.do?appid=2&action=userauthorize', //userauthorize
                        method: 'POST',
                        data: {
                            code: opt.code,
                            encrypteddata: opt.userRes.encryptedData || '',
                            iv: opt.userRes.iv || '',
                            nickname: opt.userRes.userInfo.nickName || '',
                            smstel: '', //手机号码要通过getPhoneNumber才能拿到
                            photourl: opt.userRes.userInfo.avatarUrl || '',
                            terminal: 1, //1管理端2用户端
                            returl: (scan&&scan.url) ? scan.url : app.globalData.envHost+'/manage/index.html?v=' + new Date().getTime(),
                            id: (scan&&scan.scene) ? scan.scene : '' //扫描校锐星二维码时获取的用户id
                        },
                        success: res => {
                            if (res.data.result.code == 200) {
                                app.globalData.redirectUrl = res.data.website;
                                app.globalData.userbaseinfo = res.data.userbaseinfo;
                                this.setData({
                                    showAuthBtn: false
                                })
                                wx.navigateTo({
                                    url: '/pages/manage/manage'
                                })
                            } else if(res.data.result.code == 20034){ //账号已有绑定用户，一个账号只能绑定一次
                                //TODO：产品确认怎么提示
                                wx.showToast({
                                    title: res.data.result.msg,
                                    icon: "none",
                                    duration: 2000
                                })
                            }else {
                                wx.showToast({
                                    title: res.data.result.msg,
                                    icon: "none",
                                    duration: 2000
                                })
                            }
                        }
                    })
                }else {
                    wx.showToast({
                        title: res.data.result.msg,
                        icon: "none",
                        duration: 2000
                    })
                }
            }
        })
    },
    enterIndex() {
        app.globalData.redirectUrl = app.globalData.envHost+'/manage/index.html?v=' + new Date().getTime();
        wx.navigateTo({
            url: '/pages/manage/manage'
        });
    }
})

/*
    onShow
	通过authSetting['scope.userInfo']判断是否授权
    未授权->展示授权界面
        —>同意
        ->不同意
    已授权->通过code,encryptedData,iv登录
    20180713bug：下拉小程序进入二级界面，再从发现进入小程序，小程序globalData数据保留，其他界面全都unload
*/