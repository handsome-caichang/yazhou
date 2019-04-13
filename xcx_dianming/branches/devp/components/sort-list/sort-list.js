Component({
    data:{
        list:[
                {
                    name:'名字',
                    attr:'_orderIdx',
                },
                {
                    name:'出勤',
                    attr:'isattend',
                },
                {
                    name:'计费',
                    attr:'iscost',
                },
                {
                    name:'试听',
                    attr:'istry',
                },
            ],
        sortType:0,   
        desc:false,
        IMG:getApp().globalData.IMG,
        showTip:false,
        showTipDOM:false,
        timer:[],
    },
    methods: {
        open(){
            this.selectComponent('#c').open();
        },
        select({currentTarget}){
            let data = this.data,
                index = currentTarget.dataset.index,
                item = data.list[index];
            data.desc = data.sortType == index ? !data.desc : false;    //重复点则取反，点其他的则是升序
            data.sortType = index;
            
            this.setData({
                ...data
            })
            this.selectComponent('#c').close();
            this.triggerEvent('clickSort',{item,index,desc:data.desc});

            this.clearTimer();
            this.setData({showTipDOM:true});
            this.timeout(()=>this.setData({showTip:true}),50);
            this.timeout(()=>{
                this.setData({showTip:false})
                this.timeout(()=>this.setData({showTipDOM:false}),1000);
            },2000);
        },
        
        clearTimer(){
            this.data.timer.forEach(item=>clearTimeout(item));
            this.data.timer = [];
        },
        timeout(fn,delay){
            this.data.timer.push(setTimeout(fn,delay));
        }
    }
})