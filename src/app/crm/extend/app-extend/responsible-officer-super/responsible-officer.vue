<style scoped lang="scss">
    .responsible-officer-container{
        @include position-absolute;
        background-color: $color-assist-1;
        z-index: 999999;
    }
    .scroller-s{
        @include position-absolute;
        bottom: 50px;
        &.full{
            bottom:0;
        }
        .item{
            background-color: $color-white;
            margin: 8px 16px;
            border-radius: 6px;
            padding: 0 16px;
            height: 49px;
            line-height: 49px;
            @include flex-between;
            color: $color-3;
            .val{
                color: $color-primary;
            }
        }
    }

    .footer{
        border-top: 1px solid $color-assist-1;
        .control-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: $color-white;
            z-index: 9999992;
            @include flex-between;
            padding: 0 15px;
            @include fs-lh(15);
            color: $color-9;
            %btn {
                width: 85px;
                height: 40px;
                border-radius: 2px;
                @include flex-center;
            }
            .btns-right {
                @include flex-between;
                .pre-page {
                    @extend %btn;
                    margin-right: 10px;
                    color: #A5ADB7;
                    border:1px solid #C2CCDC;
                }
                .enter-btn {
                    @extend %btn;
                    background-color: $color-primary;
                    color: $color-white;
                }
            }
            .count{
                color: $color-primary;
            }
        }
    }
    .edit-emp-sheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 9999993;
        .chosen-emp-box {
            padding: 20px;
            min-height: 400px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-content: flex-start;
            align-items: flex-start;
            .chosen-item {
                width: 29%;
                height: 30px;
                background: #EEF1F6;
                @include fs-lh(12);
                color: $color-3;
                margin-left: 2%;
                margin-right: 2%;
                margin-bottom: 15px;
                @include flex-between;
                padding: 0 8px;
                .chosen-item-name {
                    @include ellipsis-single;
                    width: calc(100% - 15px);
                    text-align: center;
                }
                .icon {
                    @include fs-lh(14);
                }
            }
        }
    }
    .void{
        height: 20px;
        width: 100%;
    }
</style>

<template>

    <div class="responsible-officer-container" v-show="opened" @close="close">
        <!--学校列表-->
        <scroller-base class="scroller-s" :class="{'full':type==0}" :data="renderData" v-show="!showEmpPage">
            <div class="item" @click="goToEmp(item)" v-for="(item,index) in schoolList" :key="index">
                <div class="describe">{{item.name}}</div>
                <div class="val">
                    <span class="selected" v-if="type==1&&item.count>0">已选{{item.count}}人</span>
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>

        <emp-template
                :empList="empList"
                :chosenEmpList="chosenEmpList"
                :echoEmpList="echoEmpList"
                :type="type"
                :validFn="validFn"
                @singleMainPerson="singleMainPerson"
                :opened.sync="showEmpPage"></emp-template>
        <div class="footer" v-show="type==1">
            <div class="control-bar">
                <!--已选-->
                <div class="chosen-info" @click="openEdit">
                    <span>已选：</span>
                    <span v-if="chosenEmpList.length>0" class="count">{{chosenEmpList.length}}</span>
                    <span v-if="chosenEmpList.length>0">人</span>
                    <svg class="icon" aria-hidden="true" v-show="chosenEmpList.length>1">
                        <use xlink:href="#icon-shangla"></use>
                    </svg>
                </div>

                <div class="btns-right">
                    <div class="pre-page" @click="backPrevious" v-show="showEmpPage">上一页</div>
                    <div class="enter-btn" @click="submit">确定</div>
                </div>
            </div>
        </div>

        <action-sheet
                @close="closeEdit"
                v-show="openedEdit"
                :data="chosenEmpList"
                class="edit-emp-sheet"
                ref="editSheet">
            <div class="chosen-emp-box">
                <div class="chosen-item" @click="deleteEmp(item,index)" v-for="(item,index) in chosenEmpList" :data-rindex="index" :key="item.id">
                    <div class="chosen-item-name">{{item.name}}</div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shanchuanniu"></use>
                    </svg>
                </div>
            </div>
        </action-sheet>

        <loading class="loading" v-show="isLoading"></loading>
    </div>

</template>

<script>
    import EmpTemplate from './child/emp-template';
    import {getCampusList,getCustomerManagerList} from 'crm/api/ldj.js'
    export default {
        name: "responsible-officer",
        mixins: [app.mixin.popupWindowRouteMixin],
        data() {
            return {
                wxTitle: "",
                isLoading:true,
                opened:false,      // 组件开关
                openedEdit:false,  //已选弹窗开关
                type:0,            // 主副责任人     0表示主责任人(单选)  1表示副责任人(多选)
                showEmpPage:false, //展示校区页还是员工页
                keyword:'',        //搜索关键字
                schoolList:[],     // 校区列表
                empList:[],        //员工列表
                chosenEmpList:[],  //已选择的员工  (只有多选才有用)
                rebackChosenEmpList:[],  //已选择的员工  (没有点确定时赋值给chosenEmpList)
                echoEmpList:[],    //再次进入时回显的员工
                validFn:null,      //验证是否能选择
                _resolve:null,
                refreshNum:0
            }
        },
        computed: {
            renderData(){
                return{
                    schoolList:this.schoolList,
                }
            }
        },
        methods: {
            show(type, initEmpArr, validFn){
                this.type = type;
                this.validFn = validFn;
                if(type==0){
                    this.echoEmpList = initEmpArr; //回显员工赋值 在点击获取员工列表后处理
                }else{
                    this.chosenEmpList = app.tool.clone(initEmpArr); //回显员工赋值 在点击获取员工列表后处理 避免改变原数组，在不点确定的情况下导致出错
                    this.rebackChosenEmpList = app.tool.clone(initEmpArr); //回显员工赋值 在点击获取员工列表后处理 避免改变原数组，在不点确定的情况下导致出错
                }
                this.getSchoolData();

                this.showEmpPage = false; //避免返回之后再进来显示学员列表页
                this.opened = true;//开关

                return new Promise((resolve)=>{
                    this._resolve = resolve;
                })
            },

            //接受单选的联系人
            singleMainPerson(item){
                this._resolve(item);
                this.close();
            },
            goToEmp(item){
                this.showEmpPage = !this.showEmpPage;
                this.getEmpDate(item);

            },
            //返回上一页
            backPrevious(){
                this.showEmpPage = !this.showEmpPage;
                // 计算校区下已选人数
                this.initCampus(this.schoolList);
            },
            // //确定
            submit(){
                // alert('submit')
                if(this.showEmpPage){
                    this.showEmpPage = false
                }
                // 解决ios上确定后 要点两次返回才能回退路由
                setTimeout(() => {
                    this._resolve(this.chosenEmpList);
                    this.close();
                }, 30)


            },
            //获取学校列表
            getSchoolData(){
                getCampusList().then(res=>{
                    this.schoolList = this.initCampus(res.data);
                    this.isLoading = false;//先渲染再去loading
                })
                
            },
            //校区已选人数回旋处理
            initCampus(arr){
                // arr :校区数组，每个要加属性 count表示已选人数
                if(arr&&arr.length&&this.chosenEmpList.length>0){
                    //循环员工数组导出id
                    let empids=[];
                    this.chosenEmpList.forEach((item,index)=>{
                        empids.push(item.campusid);
                    });
                    arr.forEach((item,index)=>{
                        item.count = empids.filter((i)=> i==item.id).length;
                    });
                    
                }
                return arr
            },
            //员工回显的处理 在进入员工页面之前 员工数据赋值时
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

            //获取员工列表
            getEmpDate(item){
                app.ls.setStorage('responsibleCurrentCampusId',item.id)

            },
            //打开已选弹框
            openEdit(){
                if(this.chosenEmpList.length==0){
                    return
                }
                this.openedEdit = !this.openedEdit;
            },
            //关闭已选弹框
            closeEdit() {
                this.openedEdit = false;
            },
            //已选弹框里 删除某学员
            deleteEmp(item,index) {
                // 1.清除 chosenEmpList 里的  2.清除当前数组里的  3.当前校区列表删除其他校区，则在进去其他校区时会根据choosenEmpList回显
                // 已选删除
                this.chosenEmpList.splice(index,1);
                this.empList.forEach((i,index)=>{
                    if(i.id==item.id){
                        i.active = false;
                    }
                })
                this.initCampus(this.schoolList);//计算校区下所选员工人数

            },
        },
        created() {
        },
        components: {
            EmpTemplate
        }
    }
</script>

