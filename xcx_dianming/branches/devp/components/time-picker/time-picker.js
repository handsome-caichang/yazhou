let fill = (item,index)=> index < 10 ? '0' + index : '' + index,
    hours = Array(24).fill(1).map(fill),
    minutes = Array(60).fill(1).map(fill);


//传入start和dur时间,计算endtime
function calcTime(start,dur){
    let s = new Date('2000/01/01 ' + start),
        d =  (+dur.slice(0,2)) * 60 + (+dur.slice(3,5)),
        end = new Date(s.getTime() + d*60000),
        h = end.getHours(),
        m = end.getMinutes();
    return (h < 10 ? '0'+ h : h) + ':' + (m < 10 ? '0' + m : m);
}


Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        time:{
            type:String,
            value:'00:00,00:00',
            observer:function(newVal){
                if (newVal.indexOf(',') == -1){
                    return;
                }
                let [stime,duration] =  newVal.split(','),
                    etime = calcTime(stime,duration);
                this.setData({
                    stime,
                    duration,
                    etime,
                    stimeInit:[stime.slice(0,2),stime.slice(3,5)],
                    durInit:[duration.slice(0,2),duration.slice(3,5)]
                })
            }
        } 
    },
    data:{
        IMG:getApp().globalData.IMG,
        stime:'00:00',
        etime:'00:00',
        duration:'00:00',
        stimeInit:['00','00'],
        durInit:['00','00'],
        hours,
        minutes,
        showStart:false,
        showDur:false,
    },
    methods: { 
        open(){
            this.selectComponent("#a").open();
        },
        close(){
            this.triggerEvent("close");
        },
        toggleStart(){
            let showStart = this.data.showStart,
                showDur = this.data.showDur;
            if (!showStart && showDur){
                showDur = false;
            }
            showStart = !showStart;
            this.setData({
                showStart,
                showDur
            })
        },
        toggleDur(){
            let showStart = this.data.showStart,
                showDur = this.data.showDur;
            if (!showDur && showStart){
                showStart = false;
            }
            showDur = !showDur;
            this.setData({
                showStart,
                showDur
            })
        },
        changeStart(event){
            let detail = event.detail.value,
                [t1,t2] = detail,
                stime = hours[t1] + ':' + minutes[t2],     
                etime = calcTime(stime,this.data.duration);            
            this.setData({
                stime,
                etime
            })
        },
        changeDur(event){
            let detail = event.detail.value,
            [t1,t2] = detail,
            duration = hours[t1] + ':' + minutes[t2],     
            etime = calcTime(this.data.stime,duration);            
            this.setData({
                duration,
                etime
            })
        },
        submit(){
            //判断结束时间是否大于开始时间
            let {stime,etime,duration} = this.data;
            if (stime > etime){
                wx.showToast({
                    title:'结束时间不能小于开始时间。',
                    icon:'none',
                })
            } else if (stime == etime){
                wx.showToast({
                    title:'上课时长不能为0。',
                    icon:'none',
                })
            } else {
                this.triggerEvent('change',{
                    stime,
                    etime,
                    duration
                });
                this.close();
            }
        }
    }
})