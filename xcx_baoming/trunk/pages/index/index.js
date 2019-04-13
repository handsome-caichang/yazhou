//index.js
const app = getApp()
var flag = false;



Page({
    data: { //页面的初始数据
        isShowPwd: false, //明文显示密码
        isShowForgetPwd: false, //展示忘记密码提示
        isShowUnameTips: false, //展示“请输入正确的用户名”
        uname: '', //用户名
        upwd: '', //密码
        focus: false, //聚焦密码输入框
        showAuthBtn: false, //展示授权按钮
        showLoginForm: false, //展示登录表单
        showExitBtn: false, //展示关闭小程序按钮
        count: 0,
        showSelectUser:false,   //是否显示切换用户,需要拿到userid
        toRedirect : ''     //需要进入的转发的页面
    },
    onLoad:function(options){
        //说明是转发
        options.url = decodeURIComponent(options.url);

        if (options.url && options.transmit == '1'){
            let key = options.url.match(/https:\/\/mall\.xiaogj\.com\/([^\/]*)/);
            key = key && key[1];

            this.setData({
                toRedirect:options.url       //直接跳转 转发的页面;
            })

            let encryptedDataTemp = '',
                ivTemp = '';
            wx.login({
                success: res => {
                    wx.getUserInfo({
                        success: userRes => {
                            encryptedDataTemp = userRes.encryptedData;
                            ivTemp = userRes.iv;
                        },
                        complete: userRes => {
                            this.authLogin({
                                code: res.code,
                                encryptedData: encryptedDataTemp,
                                iv: ivTemp,
                                logining: true
                            },key)
                        },
                    });
                },
            });

            
        }
    },

    onShow: function() { //监听页面显示
        if (app.globalData.showExitBtn) { //处理退出登录展示
            wx.setNavigationBarTitle({
                title: '登录'
            });
            this.setData({
                showExitBtn: app.globalData.showExitBtn,
                uname: app.globalData.userName,
                upwd: '',
                showLoginForm: true
            })
            return;
        }
        if ((app.globalData.count==0||((app.globalData.mallUnloadTimeStamp-app.globalData.appShowTimeStamp)<500)) && this.data.toRedirect==='') { //处理首次登录展示
            wx.getSetting({
                success: (res) => {
                    if (!res.authSetting['scope.userInfo']) {
                        wx.setNavigationBarTitle({
                            title: '微信授权登录'
                        })
                        this.setData({
                            showAuthBtn: true,
                            showLoginForm: false,
                            focus: false
                        })
                    } else {
                        wx.login({
                            success: res => {
                                wx.getUserInfo({
                                    success: userRes => {
                                        this.authLogin({
                                            code: res.code,
                                            encryptedData: userRes.encryptedData,
                                            iv: userRes.iv
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }

        if (app.globalData.count>0&&((app.globalData.mallUnloadTimeStamp-app.globalData.appShowTimeStamp)>500)) { //处理返回的展示
            this.setData({
                count: app.globalData.count
            })
            wx.setNavigationBarTitle({
                title: ''
            });
        }
    },
    getUserInfoFN(e) { //授权
        this.setData({
            showAuthBtn: false
        })
        var userRes = e.detail;
        if (userRes.iv) {
            wx.login({
                success: res => {
                    this.authLogin({
                        code: res.code,
                        encryptedData: userRes.encryptedData,
                        iv: userRes.iv
                    })
                }
            })
        } else {
            wx.setNavigationBarTitle({
                title: '登录'
            });
            this.setData({
                showLoginForm: true
            })
        }
    },
    changePwdType() { //切换密码明文暗文
        this.setData({
            isShowPwd: !this.data.isShowPwd,
            focus: true
        })
    },
    showForgetPwd(e) { //展示忘记密码提示
        wx.showModal({
            content: '为了保障您的信息安全，请到相关学校询问您的密码。',
            showCancel: false,
            confirmText: '我知道了',
            confirmColor: '#1E88F5'
        });
    },
    unameInput(e) { //输入用户名
        this.setData({
            uname: e.detail.value
        })
    },
    upwdInput(e) { //输入密码
        this.setData({
            upwd: e.detail.value.replace(/[\u4e00-\u9fa5]+/g,'')
        })
    },
    unameBlur() { //用户名失焦
        this.setData({
            isShowUnameTips: this.data.uname && this.data.uname.indexOf("@") == -1
        })
    },
    login() { //点击登录
        if(flag) {
            return;
        }
        flag = true;

        if (this.data.uname && this.data.uname.indexOf("@") == -1) {
            this.setData({
                isShowUnameTips: true
            })
            flag = false;
            return;
        }

        if (this.data.uname && this.data.upwd) {
            wx.getNetworkType({ //返回网络类型, 有效值：wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                success: function(res) {
                    if (res.networkType == 'none') {
                        wx.showToast({
                            title: '登录失败，请检查您的网络。',
                            icon: "none"
                        })
                        flag = false;
                        return;
                    }
                }
            });
            wx.login({
                success: res => {
                    var encryptedDataTemp = '',
                        ivTemp = '';
                    wx.getUserInfo({
                        success: userRes => {
                            encryptedDataTemp = userRes.encryptedData;
                            ivTemp = userRes.iv;
                        },
                        complete: userRes => {
                            this.authLogin({
                                code: res.code,
                                encryptedData: encryptedDataTemp,
                                iv: ivTemp,
                                logining: true
                            })
                        }
                    })
                }
            })
        }
    },
    verify(openid) { //发送登录请求
        wx.request({
            url: 'https://open.xgjssx.com/mini2login/verify?openid=' + openid,
            method: 'POST',
            data: {
                username: this.data.uname,
                password: this.data.upwd,
            },
            success: res => {
                var verifyData = res.data;
                if (verifyData.errcode == 200) { //已登录
                    this.setData({
                        showLoginForm: false,
                        showSelectUser:true,
                    })
                    app.globalData.showExitBtn = false;
                    app.globalData.companyKey =  verifyData.data.key;
                    app.globalData.userid = verifyData.data.userid;
                    app.globalData.redirectUrl = 'https://mall.xiaogj.com/' + verifyData.data.key + '/api/page/wxlogin?source=4&userID=' + verifyData.data.userid + '&openID=' + openid + '&redirectUrl=' + app.globalData.companyUrl();
                    
                    wx.navigateTo({
                        url: '/pages/mall/mall'
                    })
                } else {
                    this.setData({
                        showLoginForm: true
                    });
                    wx.showToast({
                        title: verifyData.errmsg,
                        icon: "none",
                        duration: 2000
                    })
                }
            },
            fail: res => {
                wx.showToast({
                    title: '登录失败，请重新登录。',
                    icon: "none"
                })
            },
            complete: res => {
                flag = false;
            }
        })
    },
    authLogin: function(opt,transmit) {
        wx.request({
            url: 'https://open.xgjssx.com/mini2login/index',
            data: {
                code: opt.code,
                encryptedData: opt.encryptedData || "",
                iv: opt.iv || ""
            },
            success: res => {
                //跳转到商城的公共逻辑
                let redirectToMall = (key,openid,userid,data) => {
                    app.globalData.companyKey = key;   //转发的学校
                    app.globalData.openid = openid;   //用户的openid
                    if (userid){
                        app.globalData.userid = userid;    //用户userid
                        app.globalData.redirectUrl = 'https://mall.xiaogj.com/' + key + '/api/page/wxlogin?source=4&userID=' + userid + '&openID=' + openid + '&redirectUrl=' + (this.data.toRedirect || app.globalData.companyUrl());
                    
                        data.data.bindlist.MiniBindUsers.forEach(item=>{
                            data.data.bindlist.Customers.some(val=>{
                                if (item.WebSite === val.WebSite){
                                    item.Key = val.Key;
                                }
                            });
                        });
                        app.globalData.userList = data.data.bindlist.MiniBindUsers;      //用户的账号列表
                    } else {
                        app.globalData.redirectUrl = 'https://mall.xiaogj.com/' + key + '/api/page/wxlogin?source=4&openID=' + openid + '&redirectUrl=' + (this.data.toRedirect || app.globalData.companyUrl());
                    }
                    wx.navigateTo({
                        url: '/pages/mall/mall'
                    })
                    this.setData({
                        showLoginForm: false,
                        showSelectUser: !!userid
                    })
                    app.globalData.showExitBtn = false;
                }

                var data = res.data;               

                
                //如果是转发，有登录过该校区，自动登录，否则直接进网页
                if (transmit){
                    if (data.errcode == 200){
                        let cus = data.data.bindlist.Customers;
                        
                        if (data.data.key === transmit){   //默认账号就是该学校的，直接登录                
                            redirectToMall(transmit,data.data.openid,data.data.userid,data);
                        } else  if (cus.some(item=>item.Key === transmit)){        //有该学校的账号，需要查询一下转发的学校下的默认账号;
                            wx.request({
                                url: 'https://open.xgjssx.com/mini2login/getUserIdByOpenId?openId='+data.data.openid+'&suffix='+ data.data.key,
                                method: 'GET',
                                success: res => {
                                    if (res.data.errcode == 200){
                                        redirectToMall(transmit,data.data.openid,res.data.data,data);
                                   } else {                                        
                                        wx.showToast({title:'getUserIdByOpenId接口错误',icon:'none'});
                                   }
                                }
                            });
                        } else {
                            //不登陆，只告诉后台是小程序登录并告诉openid;
                            redirectToMall(transmit,data.data.openid);
                        }                        
                    } else if (data.errcode == 404){
                        //不登陆，只告诉后台是小程序登录并告诉openid;
                        redirectToMall(transmit,data.data.openid);
                    } else {
                        wx.showToast({
                            title: data.errmsg,
                            icon: "none",
                            duration: 2000
                        });
                    }
                    return;
                }


                if (opt.logining && data.data && data.data.openid) {
                    app.globalData.openid = data.data.openid;
                    this.verify(data.data.openid);
                    return;
                }
                if (data.errcode == 200) { //已登录
                    redirectToMall(data.data.key,data.data.openid,data.data.userid,data);
                } else if (data.errcode == 404) { //未登录
                    wx.setNavigationBarTitle({
                        title: '登录'
                    });
                    this.setData({
                        showLoginForm: true
                    })
                } else {
                    wx.showToast({
                        title: data.errmsg,
                        icon: "none",
                        duration: 2000
                    })
                }
            }
        })
    },
    enterIndex(){
        app.globalData.redirectUrl=app.globalData.companyUrl();
        wx.navigateTo({
            url: '/pages/mall/mall'
        });
    },
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