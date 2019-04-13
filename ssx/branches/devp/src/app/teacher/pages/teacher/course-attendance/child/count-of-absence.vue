<!--缺勤原因统计弹框-->
<style scoped lang="scss">
    .count-of-absence{
        .header{
            padding: 15px 10px 0 10px;
            .closePop{
                text-align: right;
                padding-right: 5px;
            }
            .title{
                text-align: center;
                font-size: 17px;
                color: $color-primary;
                padding: 3px 0 20px 0;
            }

            .head-tab{
                @include flex-between;
                height: 44px;
                line-height: 44px;
                font-size: 13px;
                color: $color-6;
                background-color: #F4F4F4;
                padding: 0 12px;
                border: 1px solid $color-assist-1;
                .tab-rt{
                    @include flex-base;
                    align-items: center;
                    .operation{
                        width: 60px;
                        margin-left: 10px;
                        .btn{
                            font-size: 11px;
                            text-align: center;
                            width: 60px;
                            height: 22px;
                            line-height: 20px;
                            border-radius: 22px;
                            background-color: $color-white;
                            border: 1px solid #DDDDDD;
                            &.active{
                                background-color: #FF3433;
                                border: 1px solid #FF3433;
                                color: $color-white;
                            }
                        }
                    }
                }
            }
        }
        .count-of-absence-container{
            padding: 0 10px 24px 10px;
            .item{
                @include flex-between;
                font-size: 15px;
                color: $color-3;
                padding: 12px;
                border: 1px solid $color-assist-1;
                border-top: none;
                .tab-rt{
                    @include flex-base;
                    align-items: center;
                    color: $color-6;
                    .operation{
                        width: 60px;
                        margin-left: 10px;
                        .btn{
                            font-size: 11px;
                            text-align: center;
                            width: 60px;
                            height: 22px;
                            line-height: 20px;
                            border-radius: 22px;
                            background-color: $color-white;
                            border: 1px solid #DDDDDD;
                            &.active{
                                background-color: #FF3433;
                                border: 1px solid #FF3433;
                                color: $color-white;
                            }
                        }
                    }
                }
                .tab-lf{
                    max-width: 60%;
                    word-break: break-all;
                }
            }
        }
        .footer{
            height: 20px;
        }
    }
</style>

<template>
    <action-sheet
            v-show="opened"
            class="count-of-absence"
            :position="'center'"
            :data="list"
            @close="close">
        <div class="header" slot="header">
            <div class="closePop">
                <svg aria-hidden="true" class="icon" @click="close">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
            </div>
            <div class="title">缺勤统计</div>
            <div class="head-tab">
                <div class="tab-lf">缺勤原因</div>
                <div class="tab-rt">
                    <div class="count">次数</div>
                    <div class="operation">
                        <div class="btn" :class="{'active':clearAllWarnFlag}" @click="clearAll()" v-if="!showClearAll>0">全部清零</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="count-of-absence-container">
            <div class="item" v-for="(item,index) in list" :key="index">
                <div class="tab-lf">{{item.AbsentCause}}</div>
                <div class="tab-rt">
                    <div class="count">{{item.Count}}</div>
                    <div class="operation">
                        <div class="btn" :class="{'active':item.active}" @click="clearItem(item)" v-if="item.Count>0">次数清零</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" slot="footer"></div>
    </action-sheet>
</template>

<script>
    // 单次清除，confirm的promise的then之后没有去刷新弹框，而是手动改变item的count
    // 弹框清除之后，点名界面通过自定义事件以及本地存储去改变缺勤次数。1是减少请求；2是点名界面显示的是listClone,而请求数据是改变的list。
    import { processGet,savePost } from "teacher/api/common";
    export default {
        name: "count-of-absence",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            causeParams:{}
        },
        data() {
            return {
                wxTitle: "",
                list:[],
                clearAllWarnFlag:false, //点击效果
            }
        },
        computed: {
            showClearAll(){
                return (this.list.length > 0) && this.list.every(val=>{
                    return val.Count<1
                });
            },
        },
        methods: {
            getData(){
                processGet({
                    pname:'getAbsentCauseCount',
                    classId:app.ls.getStorage('courseAttendanceStudentsClassid').classId,
                    studentID:this.causeParams.id
                }).then((res)=>{
                    if(res.errcode == app.errok){
                        res.data.forEach((item)=>{
                            item.active = false;
                        });
                        this.list = res.data;
                    }else{
                        app.toast('error',res.errmsg)
                    }
                })

            },
            clearAll(){
                this.deepBg(0);
                app.confirm({
                    title: "提示",
                    text: '确定将缺勤原因的次数统计全部清除吗？',
                    btns: [{
                        text: '取消',
                        style: {color: '#333'},
                        action: false // 'cancel'
                    }, {
                        text: '确定',
                        style: {color:'#1E88F5'},
                        action: true // 'confirm'
                    }]
                }).then(res => {
                    if (res) {
                        let ids=[];
                        // 次数大于0的才需要传给后台
                        this.list.forEach((item)=>{
                            item.Count>0&&ids.push(item.AbsentCauseId)
                        });
                        savePost({
                            saveFlag:'ClearAbsentCauseCount',
                            classId:app.ls.getStorage('courseAttendanceStudentsClassid').classId,
                            studentID:this.causeParams.id,
                            absentCauseIDs:ids.join(',')
                        }).then(res => {
                            if (res.errcode == 200) {
                                this.list.forEach((item)=>{
                                    item.Count=0;
                                });

                                app.ls.setStorage('deleteCountOfAbsence', {
                                    Count: res.data
                                });
                                app.eventDefine.emit('deleteCountOfAbsence');

                                app.toast("success", '清零成功');

                            } else {
                                app.toast("error", res.errmsg);
                            }

                        });

                    }
                });
            },
            clearItem(item){
                this.deepBg(1,item);
                let that = this;
                app.confirm({
                    title: "提示",
                    text: '确定将缺勤原因的次数统计清除吗？',
                    btns: [{
                        text: '取消',
                        style: {color: '#333'},
                        action: false // 'cancel'
                    }, {
                        text: '确定',
                        style: {color:'#1E88F5'},
                        action: true // 'confirm'
                    }]
                }).then(res => {
                    if (res) {
                        savePost({
                            saveFlag:'ClearAbsentCauseCount',
                            classId:app.ls.getStorage('courseAttendanceStudentsClassid').classId,
                            studentID:this.causeParams.id,
                            absentCauseIDs:item.AbsentCauseId
                        }).then(res => {
                            if (res.errcode == 200) {
                                item.Count=0;
                                app.ls.setStorage('deleteCountOfAbsence', {
                                    Count: res.data
                                });
                                app.eventDefine.emit('deleteCountOfAbsence');
                                app.toast("success", '清零成功');
                            } else {
                                app.toast("error", res.errmsg);
                            }
                        });
                    }
                });
            },
            //红色背景点击效果
            deepBg(flag,item){
                if(flag==1){
                    item.active = true;
                    setTimeout(()=>{
                        item.active = false;
                    },101);
                }else{
                    this.clearAllWarnFlag = true;
                    setTimeout(()=>{
                        this.clearAllWarnFlag = false;
                    },101);
                }
            },
        },
        created() {
        },
        beforeDestroy(){
            app.ls.remove('deleteCountOfAbsence');
        },
        watch:{
            opened(newVal,oldVal){
                if(newVal){
                    this.getData()
                }
            }
        }
    }
</script>