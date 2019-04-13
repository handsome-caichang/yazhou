<style scoped lang="scss">
    .course-filter{
        @include position-absolute;
        z-index: 9999990;
        .header{
            font-size:14px;
            padding:0 12px;
            background-color:#f0f0f0;
            color:#666;
            height:44px;
            @include flex-center;
            justify-content: flex-start;
            line-height:44px;
        }

        .body{
            .group:first-child .group-head{
                border-top:none;
            }
            .group{                
                .group-head{
                    margin-left:12px;
                    margin-right:12px;
                    @include flex-between;
                    height:44px;
                    .group-head-title{
                        width:70px;
                    }
                    .group-head-selected{
                        width: calc(100% - 90px);
                        padding-left:20px;
                        text-align: right;
                        color: #2197f3;
                        @include ellipsis-single;
                    }
                    .group-head-icon{
                        width:20px;
                        @include flex-center;
                    }
                    border-top:1px solid #eaeaea;
                }


                .group-body{
                    @include flex-center;
                    justify-content:flex-start;
                    flex-wrap:wrap;      
                    max-height: 100px;     
                    overflow:hidden;     
                    padding-right:12px;
                    &.open{
                        max-height:9999px;
                    }
                    .choose-item{
                        flex:0 0 auto;
                        width: calc(33.3% - 12px);
                        height: 38px;
                        line-height: 38px;
                        margin-left:12px;
                        margin-bottom: 12px;
                        padding-left: 6px;
                        padding-right: 6px;
                        color: #333;
                        background-color: #f0f0f0;
                        text-align: center;
                        border-radius: 4px;
                        font-size: 12px;
                        @include ellipsis-single;
                        &.active{
                            color: #2197f3;
                            background-color: #b4e0ff;
                        }
                    }
                }
                
            }        
        }
        

        .footer{
            @include flex-between;
            line-height: 44px;
            height:44px;
            font-size: 16px;
            text-align: center;
            .reset{
                background-color: #b4e0ff;
                color: #2197f3;                
                flex:1;
            }
            .submit{
                background-color: #2197f3;
                color: #fff;
                flex:1;
            }
        }
    }

</style>

<template>
    <action-sheet class="course-filter" v-show="opened" @close="close" :position="'sideRight'" ref="sheet">
        <div slot="header" class="header">
            <svg class="icon">
                <use xlink:href="#ixz-xiangzuo"></use>
            </svg>
            <span>{{title}}</span>
        </div>

        <div class="body" @click="choose">
            <slot name="group-extend"></slot>

            <div class="group" v-for="(group,groupIndex) in list" :key="groupIndex">
                <div class="group-head">
                    <div class="group-head-title">{{group.name}}</div>
                    <div class="group-head-selected">{{group.active.map(item=>item.Value).join(',')}}</div>
                    <div class="group-head-icon" @click="openGroup(groupIndex)">
                        <svg class="icon">
                            <use :xlink:href="group.open?'#ixz-arrow-up': '#ixz-arrow-down'"></use>
                        </svg>
                    </div>
                </div>

                <div class="group-body" :class="{open:group.open}">
                    <div class="choose-item" v-for="(item,index) in group.data" :key="index" :data-identity="group.key + '-' + index" v-bind:class="{active:exsit(item.ID,group.active)}">
                        {{item.Value}}
                    </div>
                </div>
            </div>

            <slot name="group-extend-end"></slot>
        </div>

        <div slot="footer" class="footer">
            <div class="reset" @click="reset">重置</div>
            <div class="submit" @click="submit">完成</div>
        </div>
    </action-sheet>
    
</template>


<script>
    const API = '/api/MasterReport/GetShiftType',
          CATEGORY = ['CLASS_TERM','SHIFT_GRADE','SUBJECT','SHIFT_CAT'];        //课程属性，分别是期段，年级，科目，类型

    
    function createYears(){
        let thisYear = app.localTimeToServer.getFullYear();
        return [0,1,2,3,4,5].map(item=> ({
            ID: thisYear - item,
            Value:thisYear - item
        }));
    }



    var list = [{
        key:'YEAR',
        name:'年份',
        data:createYears(),
        active:[],
        open:false
    },{
        key:'CLASS_TERM',
        name:'期段',
        data:[],
        active:[],
        open:false
    },{
        key:'SHIFT_GRADE',
        name:'年级',
        data:[],
        active:[],
        open:false
    },{
        key:'SUBJECT',
        name:'科目',
        data:[],
        active:[],
        open:false
    },{
        key:'SHIFT_CAT',
        name:'类型',
        data:[],
        active:[],
        open:false
    }]

export default {
    name:'course-filter',
    mixins:[app.mixin.popupWindowRouteMixin],
    props:{
        title: {
            type: String,
            default:'筛选'
        },
        opened:{
            type:Boolean,
            default:false,
        },
        initData:{
            type:Object,
            default:()=>({})
        }
    },
    data(){
        return {           
            list,
            asyncGet:null,
        }
    },
    methods:{
        init(){
            this.asyncGet().then(res=>{
                this.list.forEach(item=>{
                    res[item.key] && (item.data = res[item.key]);
                    item.open = false;
                })
                this.$nextTick(()=>{
                    this.$refs.sheet.refresh();
                });
            })
        },
        choose(e){
            let tar = e.target;
            while ( tar && !tar.dataset.identity){
                tar = tar.parentElement;
            }
            if (tar){
                let identity = tar.dataset.identity,
                    result = /(.+)-([^-]+)/.exec(identity),
                    key = result[1],
                    index =result[2],
                    group = this.list.filter(item=>item.key == key)[0],
                    item = group.data[index];
                
                if (this.exsit(item.ID,group.active)){
                    group.active = group.active.filter(g=>g.ID != item.ID);
                } else {
                    group.active.push(item);
                }                
            }
        },
        exsit(id,list){
            return list.some(item=>item.ID === id);
        },
        openGroup(index){
            this.list[index].open = !this.list[index].open;
            this.$nextTick(()=>{
                this.$refs.sheet.refresh();
            });
        },
        reset(){
            this.list.forEach(item=>item.active = []);
            this.$emit('reset');
        },
        submit(){
            let result = {
                year:this.list[0].active,
                term:this.list[1].active,
                grade:this.list[2].active,
                subject:this.list[3].active,
                category:this.list[4].active
            }
            this.$emit('submit',result);
            this.close();
        },


    },
    created(){
        let pro = null,
            condition= 'CLASS_TERM,SHIFT_GRADE,SUBJECT,SHIFT_CAT';
        this.asyncGet = ()=>{
            return pro ? pro : 
                (pro = axios.ajax(API,{condition}).then(res => {
                        if (res.ErrorCode == app.errok) {
                            return res.Data;
                        } else {
                            app.toast("error", res.ErrorMsg);
                            return [];
                        }
                    })
                );
        };
    },
    watch:{
        initData(newval){
            this.list[0].active = newval.year || [];
            this.list[1].active = newval.term || [];
            this.list[2].active = newval.grade || [];
            this.list[3].active = newval.subject || [];
            this.list[4].active = newval.category || [];
        },
        opened(newval){
            newval && this.init();
        }
    }
}

</script>
