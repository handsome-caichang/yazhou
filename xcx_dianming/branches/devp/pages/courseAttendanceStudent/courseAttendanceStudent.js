import { QueryBrief, addStudentCourse, addStudentClass } from '../../api/api.js';

var app = getApp(),
    PageIndex = 1,
    PageSize = 20,
    PageCount = 0,
    loadData = function (that) { //请求数据
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        QueryBrief({
            Query: that.data.keyword,
            campusFlag: 1,
            signStatus: -1,
            status: 1,
            sort: 'Name',
            PageIndex: PageIndex,
            PageSize: PageSize,
            UsePlatform: 4
        }).then(res => {
            if (PageIndex == 1) {
                that.setData({
                    list: []
                });
            }
            wx.hideLoading();
            PageCount = res.pagecount;
            var list = that.data.list;
            res.data.forEach(item => {
                item.check = false;
                list.push(item);
            });
            that.setData({
                list: list
            })
        });
    }

Page({
    data: {
        hidden: true,
        IMG: app.globalData.IMG,
        cfgAddClass: true, //是否显示加入此班.0隐藏,1不隐藏
        cfgQuery: 0, //是否可以用空字符串查询,0和2都不可以,1可以
        list: [],
        scrollTop: 0,
        scrollHeight: 0, //scroll-view滚动区域高度
        showSubmitFlag: false, //加入此班弹窗
        keyword: '', //搜索关键字
        id: '', //排课id
        classid: '', //班级id
    },
    onLoad: function (e) { //scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight - 99
                });
            }
        });
        that.setData({
            id: e.id,
            classid: e.classid,
            cfgAddClass: app.globalData.CFG.hidemorestudentsonclass == '0',
            cfgQuery: app.globalData.CFG.enablestudentqueryempty,
        });
    },
    scroll: function (e) { //页面滚动时的事件，记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
        this.setData({
            scrollTop: e.detail.scrollTop
        });
    },
    bindDownLoad: function (e) { //页面滑动到底部，然后做上拉加载
        if (PageIndex >= PageCount) {
            return;
        }
        PageIndex++;
        loadData(this);
    },
    topLoad: function (e) { //页面滑动到顶部，然后做下拉刷新
        this.refreshData();
    },
    search: function () { //搜索
        if (this.data.cfgQuery == '1') {
            if (this.data.keyword.length == 0) {
                wx.showToast({ title: '请输入需要查询学员的姓名/学号/电话。', icon: 'none' });
                return;
            }
        } else {
            let result = app.Util.checkQueryLength(this.data.keyword.trim());
            if (result) {
                wx.showToast({ title: result, icon: 'none' })
                return;
            }
        }
        this.refreshData();
    },
    refreshData: function (e) {
        PageIndex = 1;
        this.setData({
            scrollTop: 0
        });
        loadData(this);
    },
    searchInput: function (e) {
        this.setData({
            keyword: e.detail.value
        })
    },
    chooseStudent: function (e) {
        var index = e.currentTarget.dataset.index,
            item = this.data.list[index];
        item.check = !item.check;
        this.setData({
            list: this.data.list
        })
    },
    postOneCourse: function (e) { //仅上这节课
        let params = {
            id: this.data.id,
            students: this.data.list.filter(item => item.check).map(item => item.id).join(',')
        }
        if (params.students == '') {
            wx.showToast({ title: '请选择学员。', icon: 'none' });
            return;
        }
        addStudentCourse(params).then(res => {
            if (res.errorcode == 200) {
                getCurrentPages()[getCurrentPages().length-2].addStu();
                wx.navigateBack();
            } else {
                app.Util.confirm({
                    title: '提示',
                    content: app.Util.convertHtmlToText(res.errormsg.replace(/<BR>+/g,'')),
                    showCancel: false
                })
            }
        })
    },
    postAddToClass() { //加入此班
        let students = this.data.list.filter(item => item.check).map(item => item.id).join(',');
        if (students == '') {
            wx.showToast({ title: '请选择学员。', icon: 'none' });
            return;
        }
        this.selectComponent('#submitAction').open();
    },
    postaddtoclassevent: function (e) {
        let date = new Date();
        addStudentClass({
            id: this.data.classid,
            students: this.data.list.filter(item => item.check).map(item => item.id).join(','),
            indate: date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + Number(date.getDate()),
            outReason: e.detail.reason
        }).then(res => {
            if (res.errorcode == 200) {
                getCurrentPages()[getCurrentPages().length-2].addStu();
                wx.navigateBack();
            } else {
                app.Util.confirm({
                    title: '提示',
                    content: app.Util.convertHtmlToText(res.errormsg.replace(/<BR>+/g,'')),
                    showCancel: false
                })
            }
        });
    }
});