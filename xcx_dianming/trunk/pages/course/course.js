import { getCourseList,getRole } from '../../api/api.js';

var app = getApp(),
    week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

Page({
    data: {
        IMG: app.globalData.IMG,
        roles: [],
        currentRole: '',
        roleName: '',
        list: [],
        dateInfo: null,
        dateChange: false, //是否可以更改日期
        openRoleFlag: false //是否打开切换角色
    },
    onLoad: function (options) {
        app.globalData.count = app.globalData.count + 1;
        this.setData({
            dateInfo: this.getDateByDay(new Date(), 0),
            roles: app.globalData.roles,
            currentRole: app.globalData.currentRole,
            dateChange: app.globalData.CFG.courseconfirmdatechange=='1' || app.globalData.CFG.courseconfirmdatechange=='2'
        })
        this.getCourseInfo();
        this.getRoleName();
    },
    onUnload: function () {
        app.globalData.mallUnloadTimeStamp = new Date().getTime();
    },
    getCourseInfo: function() {
        let that = this;
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        return getCourseList({
            date: that.data.dateInfo.date,
            UsePlatform: 4
        }).then(res => {
            that.setData({
                list: res.data
            });
            wx.hideLoading();
        });
    },
    getDateByDay: function (date, num) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        date.setDate(date.getDate() + Number(num));
        let dateTemp = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + Number(date.getDate());
        return {
            date: dateTemp,
            dateStr: app.Util.formatDatetime(dateTemp, 'M月d日'),
            weekday: week[date.getDay()]
        }
    },
    changeDate(e) { //切换日期
        let dateArr = this.data.dateInfo.date.split('-');
        this.setData({
            dateInfo: this.getDateByDay(new Date(dateArr[0],dateArr[1]-1,dateArr[2]), e.currentTarget.dataset.num)
        })
        this.getCourseInfo();
    },
    openRole() { //打开选择角色弹框
        if (this.data.roles.length<2) {
            return;
        }
        this.setData({
            openRoleFlag: true
        })
        this.selectComponent("#roleList").open();
    },
    selectRole(e) { //选择角色
        var id = e.detail.id;
        if (id == 1024) {
            wx.showToast({
                title: '不能切换校长角色。',
                icon: "none"
            })
            return;
        }
        this.getRoleInfo(id);
    },
    getRoleInfo: function(id){
        getRole({
            currole: id||0,
            UsePlatform: 4
        }).then(res => {
            app.globalData.currentRole = res.currole;
            this.setData({
                currentRole: res.currole
            });
            this.getRoleName();
            this.getCourseInfo();
        })
    },
    closeRole(e) { //关闭选择角色弹框
        this.setData({
            openRoleFlag: false
        })
    },
    getRoleName() {
        this.data.roles.forEach(role => { //获取当前用户角色
            if (role.id == this.data.currentRole) {
                this.setData({
                    roleName: role.name
                })
            }
        });
    }
})