//index.js
const app = getApp()

Page({
    data: { //页面的初始数据
        showAuthBtn: false, //展示授权按钮
        count: 0,
        toRedirect: '', //需要进入的转发的页面
        scene: '', //小程序二维码传递进来的编号->通过此编号能解析出实例详情的
        sharepara: {}
    },
    onLoad: function(options) {
        console.log('打印用户端options',options);
        console.log(options.scene);
        //说明是通过转发进入
        if (options && options.returl) {
            options.returl = decodeURIComponent(options.returl);
            this.setData({
                toRedirect: options.returl //直接跳转转发的页面;
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
                                        })
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }

        //说明是通过扫描海报的二维码进入，scene需要使用decodeURIComponent才能获取到生成二维码时传入的scene
        if (options && options.scene) { //说明是通过smart扫描二维码进入，获取smart的用户id
            this.setData({
                scene:  decodeURIComponent(options.scene)
            })
            this.getShareshowFN();
        }
    },
    onShow: function() { //监听页面显示
        //1、处理首次登录展示
        if ((app.globalData.count == 0 || ((app.globalData.mallUnloadTimeStamp - app.globalData.appShowTimeStamp) < 500)) && (this.data.toRedirect==''&&this.data.scene=='')) { //处理首次登录展示
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

        if (app.globalData.count > 0 && ((app.globalData.mallUnloadTimeStamp - app.globalData.appShowTimeStamp) > 500)) { //处理返回的展示
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
                        code: res.code,
                        userRes: userRes
                    });
                }
            })
        } 
    },
    getShareshowFN() { //获取二维码的具体参数信息
        wx.request({
            url: 'https://mzs.xrx100.com/wxapp.do?appid=4&action=getshareshowparameter', //getrunenvironment
            method: 'POST',
            data: {
                id: this.data.scene
            },
            success: res=>{
                if (res.data.result.code == 200) {
                    this.setData({
                        sharepara: res.data.data
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
                                                })
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }else {
                    wx.showToast({
                        title: res.data.result.msg,
                        icon: "none",
                        duration: 2000
                    })
                }
            }
        });
    },
    authLogin: function(opt) { //用户授权接口
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

                    //处理重定向路径
                    let returl = '';
                    if(this.data.toRedirect){ //转发
                        returl = this.data.toRedirect;
                    }else if(this.data.scene&&this.data.sharepara.shareid){ //扫描海报
                        returl = app.globalData.envHost+'/user/index.html#/templateDetail/' + this.data.sharepara.styleid + '?ruleid=' + this.data.sharepara.ruleid + '&id=' + this.data.sharepara.shareid;
                    }else {
                        returl = app.globalData.envHost+'/user/index.html?v=' + new Date().getTime();
                    }
                    wx.request({
                        url: app.globalData.envHost+'/wx.do?appid=2&action=userauthorize',
                        method: 'POST',
                        data: {
                            code: opt.code,
                            encrypteddata: opt.userRes.encryptedData||'',
                            iv: opt.userRes.iv||'',
                            nickname: opt.userRes.userInfo.nickName||'',
                            smstel: '', //手机号码要通过getPhoneNumber才能拿到
                            photourl: opt.userRes.userInfo.avatarUrl||'',
                            terminal: 2, //1管理端2用户端
                            returl: returl
                        },
                        success: res => {
                            if(res.data.result.code == 200){
                                app.globalData.redirectUrl = res.data.website;
                                app.globalData.userbaseinfo = res.data.userbaseinfo;
                                this.setData({
                                    showAuthBtn: false
                                })
                                wx.navigateTo({
                                    url: '/pages/user/user'
                                })
                            }else {
                                wx.showToast({
                                    title: res.result.msg,
                                    icon: "none",
                                    duration: 2000
                                })
                            }
                        }
                    })
                }else {
                    wx.showToast({
                        title: res.result.msg,
                        icon: "none",
                        duration: 2000
                    })
                }
            }
        });
    },
    enterIndex(){
        app.globalData.redirectUrl = app.globalData.envHost+'/user/index.html?v=' + new Date().getTime();
        wx.navigateTo({
            url: '/pages/user/user'
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