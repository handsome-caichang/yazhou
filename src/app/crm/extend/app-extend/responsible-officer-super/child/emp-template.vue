<style scoped lang="scss">

    .emp-template-container{
        @include position-absolute(0,0,0,0);
        .search-bar {
            position: absolute;
            top: 0;
            padding: 0 15px;
            height: 44px;
            left: 0;
            right: 0;
            background:#F1F3F7;
            border-bottom: 1px solid #DCDCDC;
            @include flex-between;
            .search-box {
                width: calc(100% - 60px);
                height: 100%;
                position: relative;
                @include flex-center;
                input.search-input {
                    width: 100%;
                    height: 28px;
                    border-radius: 28px;
                    background: $color-white;
                    padding-left: 15px;
                    padding-right: 30px;
                    outline: none;
                    color: $color-6;
                }
                .icon {
                    position: absolute;
                    right: 10px;
                    width: 15px;
                    height: 20px;
                    bottom: 12px;
                }
            }
            .search-btn {
                margin-left: 10px;
                width: 50px;
                height: 30px;
                border-radius: 30px;
                background: $color-white;
                color: #1E88F5;
                font-size: 13px;
                @include flex-center;
            }
        }
        .scroller-e{
            @include position-absolute;
            top: 44px;
            &.full-bottom{
                bottom: 50px;
            }
            .item{
                background-color: $color-white;
                margin: 16px;
                border-radius: 6px;
                padding: 0 16px;
                height: 49px;
                line-height: 49px;
                @include flex-between;
                color: $color-3;
                .val{
                    color: $color-primary;
                    .icon{
                        font-size: 20px;
                    }
                }

            }
        }
        .void{
            height: 20px;
            width: 100%;
        }
    }
</style>

<template>
    <div class="emp-template-container" :class="{'full-page':type==0}" @close="close" v-show="opened">
        <!--搜索-->
        <div class="search-bar">
            <div class="search-box">
                <input class="search-input" placeholder="输入姓名搜索" v-model="keyword" />
                <svg class="icon" aria-hidden="true" @click="clear()">
                    <use xlink:href="#icon-shanchuanniu"></use>
                </svg>
            </div>
            <div class="search-btn" @click="searchEmp">搜索</div>
        </div>
        <scroller-base class="scroller-e" ref="empScroller" :class="{'full-bottom':type==1}" :data="empList">
            <div class="item" v-for="(item,index) in empList" :key="index" @click="selectEmp(item)">
                <div class="describe">{{item.name}}</div>
                <div class="val" v-if="type==1">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="item.active?'#icon-duoxuanxuanzhong':'#icon-duoxuanweixuanzhong'"></use>
                    </svg>
                </div>
                <div class="val" v-else>
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="item.active?'#icon-danxuanxuanzhong':'#icon-danxuanweixuanzhong'"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {getCustomerManagerList} from 'crm/api/ldj.js'
    export default {
        name: "emp-template",
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened:{//员工列表开关
                type: Boolean
            },
            type:{//单选多选
                type: Number
            },
            validFn:{//冲突判断方法
                type: Function
            },
            // empList:{//员工数据列表
            //     type: Array
            // },
            echoEmpList:{//用来操作的已选择的员工列表数组
                type: Array
            },
            chosenEmpList:{
                type: Array
            }
        },
        data() {
            return {
                wxTitle: "",
                isLoading:true,
                keyword:'',
                empList:[]
            }
        },
        computed: {
        },
        methods: {
            getData(){
                let params = {
                    query:this.keyword,
                    campusids:[app.ls.getStorage('responsibleCurrentCampusId')]
                }
                getCustomerManagerList(params).then(res=>{
                    this.empList = this.initEmp(res.data);
                    this.isLoading = false;
                })
            },
            searchEmp(){
                this.getData()
            },
            clear(){
                this.keyword='';
                this.getData()
            },
            initEmp(arr){

                if(arr.length){
                        let choosedArrId = []; //回显id
                        let refer = [];        // 回显数据
                        let Aa=[],Ao=[];       //排序的辅助数组 勾选在前

                        refer = this.type==0?this.echoEmpList:this.chosenEmpList;
                        //如果没有回显的内容则return
                        if(refer.length==0){
                            arr.forEach((item,index)=>{
                                item.active = false;
                            });
                            return arr
                        }else{
                            refer.forEach((item,index)=>{
                                choosedArrId.push(item.id);
                            });

                            arr.forEach((item,index)=>{
                                if(choosedArrId.indexOf(item.id)!==-1){
                                    item.active = true;
                                    Aa.push(item)
                                }else{
                                    item.active = false;
                                    Ao.push(item)
                                }
                            });
                            return Aa.concat(Ao)
                        }

                }else{
                    return arr
                }
            },
            selectEmp(item){
                // 返回true||false 冲突判断 1.不能同时担任主责任人和副责任人； 2.自己作为副负责人
                if(this.validFn&&!this.validFn(item)){
                    return
                }else{
                    if(this.type==0){
                        // 主责任人  单选
                        //所有选择置为false 当前为active
                        this.empList.forEach((card,index)=>{ 
                            card.active = false;
                        })

                        if(this.echoEmpList.length>0&&this.echoEmpList[0].id==item.id){
                            item.active = false;
                            this.$emit("singleMainPerson", {});
                        }else{
                            item.active = true;
                            this.$emit("singleMainPerson", item);
                        }
                        // 解决ios上确定后 要点两次返回才能回退路由
                        setTimeout(() => {
                            this.close();
                        }, 30)
                    }else{
                        // 副责任人  多选
                        if(item.active){
                            item.active = false;
                            this.deleteEmp(item);//在已选里面清除此人   在方法里会去掉active的激活状态
                        }else{
                            item.active = true;
                            this.chosenEmpList.push(item);
                        }
                    }
                }
            },
            deleteEmp(item) {
                // 列表取消
                item.active = false;
                //这个循环的话 要提前终止
                this.chosenEmpList.forEach((i,index)=>{
                    if(i.id==item.id){
                        this.chosenEmpList.splice(index,1);
                        return
                    }
                })
            },
            handleEmit(){
                this.close();
            }

        },
        created() {
        },
        components: {},
        watch:{
            opened(newVal,oldVal){
                if(newVal){
                    this.getData();
                    this.$nextTick(()=>{
                        this.$refs.empScroller.scroller.scrollTo(0, 0);
                    })
                }
            }
        }
    }
</script>

