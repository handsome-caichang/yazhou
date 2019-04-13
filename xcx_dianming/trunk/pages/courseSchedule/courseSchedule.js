var app = getApp();

Page({
    data: {
        IMG: app.globalData.IMG, //weixuanze,danxuan
        schedule: [], //进度列表
        selectindex: 0 //已选下标
    },
    onLoad: function (options) {
        var page = getCurrentPages()[getCurrentPages().length-2];

        this.setData({
            schedule: page.data.schedule,
            selectindex: page.data.selectindex
        })
    },
    choose: function (e) {
        var index = e.currentTarget.dataset.index;
        wx.navigateBack({
            delta: 1
        });
        var page = getCurrentPages()[getCurrentPages().length-2];
        page.setData({
            selectindex: index,
            content: this.data.schedule[index].content
        })
    }
})