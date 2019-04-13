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

    .footer{
        border-top: 1px solid $color-assist-1;
        .control-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: $color-white;
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
            .icon{
                transform: rotate(180deg);
                font-size: 14px;
                margin-left: 6px;
            }
        }
    }
    .edit-emp-sheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        .chosen-emp-box {
            padding: 20px 10px;
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

        <!--底部统计栏-->
        <div class="footer" v-show="type==1">
            <div class="control-bar">
                <!--已选-->
                <div class="chosen-info" @click="openEdit">
                    <span>已选：</span>
                    <span v-if="chosenEmpList.length>0" class="count">{{chosenEmpList.length}}</span>
                    <span v-if="chosenEmpList.length>0">人</span>
                    <svg class="icon" aria-hidden="true" v-show="chosenEmpList.length>1">
                        <use xlink:href="#icon-zhankai1"></use>
                    </svg>
                </div>

                <div class="btns-right">
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
                keyword:'',        //搜索关键字
                empList:[],        //员工列表
                chosenEmpList:[],  //已选择的员工  (只有多选才有用)
                rebackChosenEmpList:[],  //已选择的员工  (没有点确定时赋值给chosenEmpList)
                echoEmpList:[],    //再次进入时回显的员工
                validFn:null,      //验证是否能选择
                _resolve:null,
                refreshNum:0
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
                this.getData();//员工数据获取

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

            // //确定
            submit(){
                this._resolve(this.chosenEmpList);
                this.close();
            },

            searchEmp(){
                this.getData()
            },
            clear(){
                this.keyword='';
                this.getData()
            },

            //获取员工列表
            getData(){
                let params = {
                    query:this.keyword,
                    campusids:['0000-00000000-00000000-0000']
                };
                getCustomerManagerList(params).then(res=>{
                    this.empList = this.initEmp(res.data);
                    this.isLoading = false;
                })

            },
            initEmp(arr){
                if(arr.length){
                    let choosedArrId = []; //回显id
                    let refer = [];        // 回显数据
                    let Aa=[],Ao=[];       //排序的辅助数组 勾选在前

                    refer = this.type==0?this.echoEmpList:this.chosenEmpList;
                    //如果没有回显的内容则return
                    if(refer.length==0){
                        arr.forEach((item)=>{
                            item.active = false;
                        });
                        return arr
                    }else{
                        refer.forEach((item)=>{
                            choosedArrId.push(item.id);
                        });

                        arr.forEach((item)=>{
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
                        this.empList.forEach((card)=>{
                            card.active = false;
                        })

                        if(this.echoEmpList.length>0&&this.echoEmpList[0].id==item.id){
                            item.active = false;
                            this.singleMainPerson({})
                        }else{
                            item.active = true;
                            this.singleMainPerson(item)
                        }
                        // 解决ios上确定后 要点两次返回才能回退路由
                        this.close();
                    }else{
                        // 副责任人  多选
                        if(item.active){
                            item.active = false;
                            this.deleteEmpMem(item);//在已选里面清除此人   在方法里会去掉active的激活状态
                        }else{
                            item.active = true;
                            this.chosenEmpList.push(item);
                        }
                    }
                }
            },
            deleteEmpMem(item) {
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

            },
        }
    }
</script>

