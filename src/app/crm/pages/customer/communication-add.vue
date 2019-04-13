<!-- 添加沟通记录 （入口：客户||学员主页‘沟通记录tab’）-->
<style scoped lang="scss">
    .communication-add-container {
        .scroller {
            @include position-absolute(0, 0, 51px, 0);
            background-color: $color-assist-1;
            padding: 10px 16px;
            .com-area {
                border-radius: 6px;
                background-color: $color-white;
                border: 1px solid $color-assist-1;
                padding-bottom: 12px;
                .text-box {
                    padding: 15px;
                    .com-text {
                        color: $color-3;
                        word-break: break-word;
                        user-select: text;
                        font-family: inherit;
                        height: 100px;
                        box-shadow: none;
                        margin: 0;
                        resize: none;
                        padding: 0;

                    }
                }
                .img-area {
                    padding: 0 10px;
                }
            }
            .item{
                position: relative;
                padding: 0 15px;
                @include flex-between;
                height: 49px;
                line-height: 49px;
                font-size: 14px;
                color: $color-3;
                background-color: $color-white;
                border-radius: 6px;
                margin-top: 10px;
                .attr{
                    color:$color-9;
                    &.necessary{
                        @include flex-between;
                        .icon{
                            margin-left: 4px;
                            color: #FF735C;
                            font-size: 10px;
                            transform:scale(0.8);
                        }
                    }
                }

                .val{
                    .level{
                        margin-left: 10px;
                        font-size: 18px;
                        color:#E7E7E6;
                        &.active{
                            color:#FFD427;
                        }
                    }
                }
            }
        }
        .void{
            height: 20px;
            background-color: $color-assist-1;
        }
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 5px 10px 6px;
            border-top: 1px solid $color-assist-1;
            .submit-btn {
                font-size: 17px;
                color: $color-white;
                text-align: center;
                background-color: #5991FF;
                height: 40px;
                line-height: 40px;
                border-radius: 4px;
            }
        }
    }
    .state-as,.loading{
        @include position-absolute();
    }
</style>

<template>
    <div class="communication-add-container">
        <scroller-base class="scroller" :data="renderData">
            <!--文本 语音 图片-->
            <div class="com-area">
                <div class="text-box">
                    <textarea
                            class="com-text"
                            maxlength="300"
                            v-model="contentMsgModel"
                            placeholder="请输入跟进记录内容~（300字以内）"
                            @touchstart="app.area.start($event)"
                            @touchmove="app.area.move($event)"
                            @touchend="app.area.end($event)">
                    </textarea>
                </div>

                <crm-img-area
                    class="img-area"
                    :edit="true"
                    :fileList="imageList"
                    :getAppToken="getAppToken"
                    @fileUploadFinished="imgsUploadFinished">
                </crm-img-area>
            </div>
            
            <!--沟通类型 *-->
            <div class="item" @click="selectStateAs(0)">

                <div class="attr necessary">
                    <div class="">
                        沟通类型
                    </div>
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-bitianxing"></use>
                    </svg>
                </div>
                <div class="val">
                    {{communicationType.value}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <!--客户状态 转化成功之后的客户状态不能改变--> 
            <div class="item" @click="selectStateAs(1)" v-if="followstatus!=5">
                <div class="attr">客户状态</div>
                <div class="val">
                    {{customerStatu.value}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <!--意向级别 转化成功之后的意向级别不能改变-->
            <div class="item" v-if="followstatus!=5">
                <div class="attr">意向级别</div>
                <div class="val">
                    <svg class="icon level" :class="{'active':interstingLevel>num}" aria-hidden="true" v-for="num in 5" @click="selectInterstingLevel(num)">
                        <use xlink:href="#icon-wuxing"></use>
                    </svg>
                </div>
            </div>
            <!--诺到访-->
            <div class="item" @click="selectPromiseVisitDate">
                <div class="attr">承诺到访</div>
                <div class="val">
                    {{promiseVisitDate}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <!--诺到访类型-->
            <div class="item" @click="selectStateAs(2)" v-show="promiseVisitDate!==''">
                <div class="attr">诺到访类型</div>
                <div class="val">
                    {{promiseVisitType.value}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <!--下次跟进时间-->
            <div class="item" @click="selectNextFollwTime">
                <div class="attr necessary">
                    <div class="">
                        下次跟进时间
                    </div>
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-bitianxing"></use>
                    </svg>
                </div>
                <div class="val">
                    {{nextFollwTime}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <!-- 下次跟进类型 -->
            <div class="item" @click="selectStateAs(3)">
                <div class="attr">下次跟进类型</div>
                <div class="val">
                    {{nextFollwType.value}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <div class="footer">
            <div class="submit-btn" @click="submit">提交</div>
        </div>
        
        <state-actionsheet class="state-as" 
            :opened.sync="openStateAs"
            :current="current"
            :list="list"
            :title="title"
            @stateItem="stateItem">
        </state-actionsheet>
        <loading class="loading" v-show="isLoading" :bgType="1" :isDefault="false"></loading>
    </div>
     
</template>

<script>
    import StateActionsheet from './child/state-actionsheet'
    import CrmImgArea from 'crm/components/crm-img-area/crm-img-area.vue'
    import {getUploadToken, getCustomerInformationConfigList,getOpCustomerCommunicateRecordInfo} from 'crm/api/ldj.js'
    export default {
        name: "communication-add",
        data() {
            return {
                wxTitle: "添加沟通记录",
                isLoading:false,
                contentMsgModel: '',     //1 沟通内容
                imageList: [],            //2 图片
                submitImageList: [],     // 需要提交到后台的图片
                communicationType:{      //3 沟通类型
                    describe:'',
                    id:''
                },
                customerStatu:{      //4 客户状态 
                    describe:'',
                    id:''
                },   
                interstingLevel:0,       //5 意向级别
                promiseVisitDate:'',     //6 诺到访日期
                promiseVisitType:{       //7 诺到访类型
                    describe:'',
                    id:''
                },     
                nextFollwTime:'',        //8 下次跟进时间
                nextFollwType:{          //9 下次跟进类型
                    describe:'',
                    id:''
                },        

                _customerStatus:[],      //沟通类型||下次跟进类型 弹框数据列表
                _communicationType:[],   //客户状态 弹框数据列表
                _promiseVisitType:[],     //诺到访类型 弹框数据列表

                openStateAs:false,
                flag:null,
                list:[],
                current:{
                    id:'',
                    describe:''
                },
                title:'',

                followstatus:'', //1公海 2线索 3跟进中 4试听中 5转化成功（状态不能改）
            
            }
        },
        computed: {
            renderData() {
                return {
                    promiseVisitDate: this.promiseVisitDate,
                    submitImageList: this.submitImageList
                }
            }
        },
        methods: {
            getAppToken() {
                return getUploadToken().then(res => {
                    if (res.result.code === app.errok) {
                        return res.data
                    } else {
                        return Promise.reject()
                    }
                })
            },
            imgsUploadFinished(files) {
                this.submitImageList  = files
            },
            getConfigList(type){
                getCustomerInformationConfigList({type:type}).then(res=>{
                    if(type=='CustomerStatus'){
                        this._customerStatus = res.data;
                    }else if(type=='CommunicationType'){
                        this._communicationType = res.data;
                    }else if(type=='PromiseVisitType'){
                        this._promiseVisitType = res.data;
                    }
                })
            },
            //沟通类型 客户状态 诺到访类型 下次跟进类型 （其中沟通类型和下次跟进类型列表一致）
            selectStateAs(flag){
                this.flag = flag; //在接收时的判断
                if(flag==0){
                    this.list = this._communicationType;
                    this.current = this.communicationType;
                    this.title = '沟通类型';
                }else if(flag==1){
                    this.list = this._customerStatus;
                    this.current = this.customerStatu;
                    this.title = '客户状态';
                }else if(flag==2){
                    this.list = this._promiseVisitType;
                    this.current = this.promiseVisitType;
                    this.title = '诺到访类型';
                }else if(flag==3){
                    this.list = this._communicationType;
                    this.current = this.nextFollwType;
                    this.title = '下次跟进类型';
                }
                this.openStateAs = !this.openStateAs;
            },
            stateItem(item){
                if(this.flag==0){
                    this.communicationType =item;
                }else if(this.flag==1){
                    this.customerStatu=item;
                }else if(this.flag==2){
                    this.promiseVisitType=item;
                }else if(this.flag==3){
                    this.nextFollwType=item;
                }
            },
            // 选择意向级别
            selectInterstingLevel(num){
                if(num==1&&this.interstingLevel==2){
                    this.interstingLevel=1
                }else{
                    this.interstingLevel = num+1;
                }
            },
            // 诺到访日期  wone规则是可以小于今天
            selectPromiseVisitDate(){
                app.datetimePicker({format: 'YYYY-MM-DD HH:mm'}).then(res => {
                    this.promiseVisitDate = res;
                })

            },
            // 诺到访类型
            //下次跟进时间 wone规则是不能小于今天
            selectNextFollwTime(){
                app.calendar().then(res => {
                    // 判断下次跟进时间
                    if((new Date(res)).getTime() < new Date(app.tool.getDatesByIndex(0,app.localTimeToServer).sdate).getTime()) {
                        app.toast('info', '下次跟进时间不能小于今天')
                        return;
                    }
                    this.nextFollwTime = res;
                });
            },
            //下次跟进类型
            //提交
            submit(){
                let currentTime = new Date().getTime();
                if (currentTime < 1000) {
                    return;
                }
                this.isLoading = true;//避免多次的点击提交多次
                if(app.tool.trim(this.contentMsgModel)==''){
                    app.toast('info','请填写沟通内容');
                    this.isLoading = false;
                    return
                }
                if(this.communicationType.id==''){
                    app.toast('info','请选择沟通类型');
                    this.isLoading = false;
                    return
                }
                if(this.nextFollwTime==''){
                    app.toast('info','请选择下次跟进时间');
                    this.isLoading = false;
                    return
                }

                var submitImagePromiseList = this.submitImageList.map(item => {
                    return item.promise
                })


                let params = {
                    isinvite:0,
                    optype:1,
                    customerid:'',
                    content:"",//沟通内容
                    customcommunicatetype:"",//沟通类型
                    customstatus:"",   //客户状态
                    intentionlevel:"",//意向级别
                    promisevisittime:"",//承诺到访（日期）
                    promisevisittype:"",//诺到访类型
                    nextfollowtime:"",//下次跟进时间
                    nextcommunicatetype:""//下次跟进类型
                };
                params.customerid = this.$route.params.id;
                params.content = this.contentMsgModel;
                params.customcommunicatetype = this.communicationType.id;
                params.customstatus = this.customerStatu.id;
                params.intentionlevel = this.interstingLevel-1;
                params.promisevisittime = this.promiseVisitDate;
                params.promisevisittype = this.promiseVisitType.id;
                params.nextfollowtime = this.nextFollwTime;
                params.nextcommunicatetype = this.nextFollwType.id;

                Promise.all(submitImagePromiseList).then(res => {
                    params.filelist = res
                    this.send(params);
                })

                // this.send(params);
            },
            send(params){
                getOpCustomerCommunicateRecordInfo(params).then(res=>{
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 300);

                    if(res.result.code == app.errok){
                        app.toast('success', '提交成功');
                        this.$router.back();
                        app.eventDefine.emit('commonDetailAddRefresh');
                    }else{
                        app.toast('error', res.result.msg);
                    }
                })
            }
        },
        created() {
            this.followstatus = this.$route.params.followstatus;
            this.getConfigList('CustomerStatus');//沟通类型||下次跟进类型
            this.getConfigList('CommunicationType');//客户状态
            this.getConfigList('PromiseVisitType');//诺到访类型
        },
        components: {
            StateActionsheet,
            CrmImgArea
        }
    }
</script>

