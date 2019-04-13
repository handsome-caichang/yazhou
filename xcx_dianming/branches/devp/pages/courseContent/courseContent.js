var app = getApp();

//TODO:这里需要那边传参
Page({
    data: {
        IMG: app.globalData.IMG,
        detailpage: null, //上课点名详情页对象
        content: '', //上课内容
        schedule: [], //进度列表
        selectindex: 0 //已选下标
    },
    onLoad: function (options) {
        let page = getCurrentPages()[getCurrentPages().length-2],
            pageRes = page.data.res,
            shiftamount = pageRes.shiftamount === undefined ? '00000000-0000-0000-0000-000000000000' : pageRes.shiftamount, //本节课的课程进度
            schedule = pageRes.shiftschedulelist;

        //给进度增加一个"空"的元素
        if(schedule&&schedule.length>0) {
            let empty = [{
                title: '<空>',
                content: '',
                id: "00000000-0000-0000-0000-000000000000",
                shiftamount: "00000000-0000-0000-0000-000000000000"
            }];
            schedule = empty.concat(schedule);
            schedule.forEach((item, index) => {
                if(item.shiftamount == shiftamount) {
                    // this.selectIndex = index;
                    this.setData({
                        selectindex: index
                    })
                }
            });
        } else {
            this.setData({
                schedule: []
            })
        }
                
        this.setData({
            detailpage: page,
            content: pageRes.content,
            schedule: schedule,
        })
    },
    contentInput: function(e) {
        this.setData({
            content: e.detail.value
        })
    },
    triggerConfirm: function(e) {
        // console.log(this.data.schedule)
        let schedule = this.data.schedule[this.data.selectindex] || {
            id: "00000000-0000-0000-0000-000000000000",
            shiftamount: "00000000-0000-0000-0000-000000000000"
        }
        // console.log('打印提交内容->',{
        //     content: this.data.content,
        //     schedule,
        //     index: this.data.selectindex - 1
        // })

        this.data.detailpage.saveContentSchedule({
            content: this.data.content,
            schedule,
        });
        wx.navigateBack();
    }
})