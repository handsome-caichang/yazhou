Component({
    properties: { 
        list:{
            type:Array,
            value:[],
            observer:function(newVal){
                this.setData({
                    list1:[{
                        id:"00000000-0000-0000-0000-000000000000",
                        name:'无'
                    },...newVal]
                })
            }
        },
    },
    data:{
        stu:{
            absentcauseid:"00000000-0000-0000-0000-000000000000",
        },
        list1:[],
        IMG:getApp().globalData.IMG,
    },
    methods: {
        open(stu){
            this.setData({stu})
            this.selectComponent('#b').open();
            wx.setNavigationBarTitle({
                title:'请选择缺勤原因'
            })
        },
        select({currentTarget}){
            let index = currentTarget.dataset.index,
                item = this.data.list1[index];
            this.data.stu.absentcauseid = item.id;
            this.data.stu.absentcausename = item.id == "00000000-0000-0000-0000-000000000000" ? '' : item.name;
            this.selectComponent('#b').close();
            this.triggerEvent("selectAbsent");
        },
        close(){
            wx.setNavigationBarTitle({
                title:'学生列表'
            })
        }
    }
})