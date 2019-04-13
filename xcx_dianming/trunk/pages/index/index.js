import {ajax} from '../../api/ajax.js';
import { getRole,getConfig,getPower } from '../../api/api.js';

const app = getApp()
var flag = false;
Page({
    data: { //页面的初始数据
        IMG: app.globalData.IMG,
        isShowPwd: false, //明文显示密码
        isShowForgetPwd: false, //展示忘记密码提示
        isShowUnameTips: false, //展示“请输入正确的用户名”
        uname: '', //用户名
        upwd: '', //密码
        focus: false, //聚焦密码输入框
        showAuthBtn: false, //展示授权按钮
        showLoginForm: false, //展示登录表单
        showExitBtn: false, //展示关闭小程序按钮
        showChangeUserBox: false, //展示切换用户界面
        count: 0,
        openid: '', //openid
        domain: 'https://open.xgjssx.com', //https://open.xgjssx.com正式环境，http://wx.xgjtms.com测试环境
        bindlist: [], //可选用户列表
        isShowUserActionsheet: false //是否打开切换用户
    },
    onShow: function() { //监听页面显示
        if (app.globalData.showExitBtn) { //处理退出登录展示
            wx.setNavigationBarTitle({
                title: '登录'
            });
            this.setData({
                showLoginForm: true,
                showExitBtn: app.globalData.showExitBtn,
                uname: app.globalData.userName,
                upwd: ''
            })
            return;
        }

        if (app.globalData.count==0||(app.globalData.mallUnloadTimeStamp-app.globalData.appShowTimeStamp<500)) { //处理首次登录展示
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

        if (app.globalData.count>0&&(app.globalData.mallUnloadTimeStamp-app.globalData.appShowTimeStamp>500)) { //处理返回的展示
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
    userActionsheetOpen() { //打开切换用户弹窗
        if (this.data.bindlist.length<=0) {
            return;
        }
        this.setData({
            isShowUserActionsheet: true
        })
        this.selectComponent("#userList").open();
    },
    userActionsheetSelect(e) { //弹窗切换用户
        wx.showLoading({
            title: '登录中...',
            mask: true
        });

        app.domain = e.detail.website;
        this.appLogin({
            userid: e.detail.name
        })
    },
    userActionsheetClose() { //关闭切换用户弹窗
        this.setData({
            isShowUserActionsheet: false
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
    triggerLogin() { //点击登录
        if(flag) {
            return;
        }
        flag = true;

        if (this.data.uname && this.data.uname.indexOf("@") == -1) {
            this.setData({
                isShowUnameTips: true
            })
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
                        return;
                    }
                }
            });
            wx.showLoading({
                title: '登录中...',
                mask: true
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
    changeUser() { //点击切换用户
        app.globalData.count =0;
        wx.setNavigationBarTitle({
            title: '切换用户'
        });
        this.setData({
            showChangeUserBox: true,
            count: app.globalData.count
        })
    },
    bindUser() { //点击绑定新用户
        wx.setNavigationBarTitle({
            title: '登录'
        });
        this.setData({
            showChangeUserBox: false,
            showLoginForm: true
        })
    },
    bindUserSelect(e) { //切换用户选择用户
        wx.showLoading({
            title: '登录中...',
            mask: true
        });
        let name = e.currentTarget.dataset.name;
        app.domain = e.currentTarget.dataset.website;
        this.appLogin({
            userid: name
        })
    },
    bindUserRemove(e) { //解绑用户
        var dataset = e.currentTarget.dataset;
        app.Util.confirm({
            title: '',
            content: '确定解除对 '+dataset.name+' 的绑定吗？'
        }).then(res => {
            if (res) {
                wx.request({
                    url: this.data.domain + '/attendminilogin/RemoveBind?openid='+this.data.openid,
                    header: {"Content-Type":"application/x-www-form-urlencoded"},
                    method: 'POST',
                    data: {
                        id: e.currentTarget.dataset.id
                    },
                    success: res => {
                        var data = res.data;
                        if (data.ErrorCode == 200) { //解绑成功
                            app.globalData.bindlist.splice(dataset.index,1);
                            this.setData({
                                bindlist: app.globalData.bindlist
                            })
                        }else {
                            wx.showToast({
                                title: data.ErrorMsg,
                                icon: "none",
                                duration: 2000
                            })
                        }
                    }
                })
            }
        })
    },
    authLogin: function(opt) {
        wx.request({
            url: this.data.domain + '/attendminilogin/index',
            data: {
                code: opt.code,
                encryptedData: opt.encryptedData || "",
                iv: opt.iv || ""
            },
            success: res => {
                var data = res.data.data;
                this.setData({
                    openid: data.openid
                })

                app.companyid = data.companyid
                app.openid = data.openid

                if (opt.logining && data && data.openid) {
                    this.verify();
                    return;
                }
                if (res.data.errcode == 200) { //已登录
                    app.domain = data.website;
                    app.globalData.showExitBtn = false;
                    this.setData({
                        bindlist: data.bindlist.MiniBindUsers
                    })
                    app.globalData.bindlist = data.bindlist.MiniBindUsers;
                    this.appLogin(data,true);
                } else if (res.data.errcode == 404) { //未登录
                    wx.hideLoading();
                    wx.setNavigationBarTitle({
                        title: '登录'
                    });
                    this.setData({
                        showLoginForm: true
                    })
                } else {
                    wx.hideLoading();
                    wx.showToast({
                        title: res.data.errmsg,
                        icon: "none",
                        duration: 2000
                    })
                }
            }
        })
    },
    verify: function() { //用户名密码登录请求
        wx.request({
            url: this.data.domain + '/attendminilogin/verify?openid=' + this.data.openid,
            method: 'POST',
            data: {
                username: this.data.uname,
                password: this.data.upwd,
            },
            success: res => {
                var verifyData = res.data;
                if (verifyData.errcode == 200) { //已登录
                    app.globalData.showExitBtn = false;
                    app.domain = verifyData.data.website;
                    this.appLogin(verifyData.data);
                } else {
                    wx.setNavigationBarTitle({
                        title: '登录'
                    });
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
    appLogin: function(obj,autologin) { //登录应用端,第二个参数0解决bug单10510
        let url = '/api/login/minilogin',
            postData = {name: obj.userid},
            KEY = '9355c2027d184436b23dfe4e9c37793e';

        ajax(url,postData,'POST',true).then(res => {
            if (res.errorcode == 200) {
                wx.setStorageSync('sessionId',res.data.sessionid)
                this.getConfigAndOp();
            }else {
                if (autologin) {
                    wx.setNavigationBarTitle({
                        title: '登录'
                    });
                    this.setData({
                        showLoginForm: true
                    });
                }else {
                    if (res.errorcode==0 && res.errormsg=='暂不支持此角色。') {
                        res.errormsg = '暂不支持校长角色，请联系管理员分配其他角色。';
                    }
                    wx.showToast({
                        title: res.errormsg,
                        icon: "none"
                    })
                }
            }
        })
    },
    getConfigAndOp(){
        let getRoleInfo = getRole({
                currole: 0,
                UsePlatform: 4
            })
        return Promise.all([getConfig(),getPower(),getRoleInfo]).then(([config,op,role])=>{
            wx.hideLoading();
            if (config.errcode === 200 && op.errorcode === 200 && role.errcode === 200){
                app.globalData.CFG = config.data.userconfig.sysinfo;
                app.globalData.Rights = op.data.rights;
                app.globalData.isAdmin = op.data.isadmin;

                let tempRoles = [];
                role.roles.forEach(role => {
                    if (role.id != 1024) {
                        tempRoles.push(role);
                    }
                });
                app.globalData.roles = tempRoles;
                app.globalData.currentRole = role.currole;
                this.setData({
                    showLoginForm: false,
                    showChangeUserBox: false,
                    uname: '', //用户名
                    upwd: '', //密码
                })
                wx.navigateTo({
                    url: '/pages/course/course'
                });
            } else {
                wx.showToast({title:'读取配置失败',icon:'none'});
            }
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