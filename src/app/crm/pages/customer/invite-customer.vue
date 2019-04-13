<!--邀约客户 （客户-邀约-）-->
<style scoped lang="scss">
    
    

    .invite-customer-container{
        background-color: $color-assist-1;

        .scroller{
            padding: 0 16px;
            .item{
                padding: 0 15px 0 20px;
                @include flex-between;
                height: 49px;
                line-height: 49px;
                font-size: 14px;
                color: $color-3;
                background-color: $color-white;
                border-radius: 6px;
                margin-top: 10px;
                .val{
                    .level{
                        margin-left: 10px;
                        font-size: 18px;
                    }
                }
            }
        }
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 5px 10px 6px;
            border-top: 1px solid $color-assist-1;
            background-color: $color-white;
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
    .loading{
        @include position-absolute;
    }
</style>

<template>
    <div class="invite-customer-container">
        <scroller-base class="scroller" :data="renderData">
            <div class="item" @click="selectPromiseVisitType">
                <div class="attr">诺到访类型</div>
                <div class="val">
                    {{promiseVisitType.value}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
            <!--诺到访日期-->
            <div class="item" @click="selectPromiseVisitDate">
                <div class="attr">承诺到访</div>
                <div class="val">
                    {{promiseVisitDate}}
                    <svg aria-hidden="true" class="icon">
                        <use xlink:href="#icon-jiantou"></use>
                    </svg>
                </div>
            </div>
        </scroller-base>
        <div class="footer">
            <div class="submit-btn" @click="submit">
                确定
            </div>
        </div>
        <state-actionsheet class="state-as" 
            :opened.sync="openStateAs"
            :current="promiseVisitType"
            :list="list"
            :title="title"
            @stateItem="stateItem">
        </state-actionsheet>
        <loading class="loading" v-show="isLoading" :bgType="1" :isDefault="false"></loading>
    </div>
</template>

<script>
    import StateActionsheet from './child/state-actionsheet'
    import {getCustomerInformationConfigList,getOpCustomerCommunicateRecordInfo} from 'crm/api/ldj.js'
    export default {
        name: "invite-customer",
        data() {
            return {
                wxTitle: "邀约客户",
                isLoading:false,
                openStateAs:false,
                promiseVisitType:{   //沟通类型
                    id:'',
                    describe:''
                },
                list:[],
                title:'诺到访类型',
                promiseVisitDate:''   //诺到访日期
            }
        },
        computed: {
            renderData(){
                return{

                }
            }
        },
        methods: {
            //沟通类型
            selectPromiseVisitType(){
                this.openStateAs = !this.openStateAs;
            },
            stateItem(item){
                this.promiseVisitType = item;
            },
            // 诺到访日期  wone规则是可以小于今天
            selectPromiseVisitDate(){
                /*app.calendar().then(res => {
                    this.promiseVisitDate = res;
                    console.log('诺到访日期：',res)
                });*/
                app.datetimePicker({format:'YYYY-MM-DD HH:mm'}).then(res => {
                    this.promiseVisitDate = res
                })
            },
            getCommunicationType(){
                getCustomerInformationConfigList({type:"PromiseVisitType"}).then(res=>{
                    this.list = res.data;
                })
            },
            submit(){
                let currentTime = new Date().getTime();
                if (currentTime < 1000) {
                    return;
                }
                this.isLoading = true;//避免多次的点击提交多次
                if(this.promiseVisitType.id==''){
                    app.toast('info','请选择诺到访类型');
                    this.isLoading = false;
                    return
                }
                if(this.promiseVisitDate==''){
                    app.toast('info','请选择诺到访日');
                    this.isLoading = false;
                    return
                }
                let params = {
                    isinvite:1,
                    optype:1,
                    customerid:'',
                   
                    promisevisittime:"",//承诺到访日期
                    promisevisittype:"",//诺到访类型
                   
                }
                params.customerid = this.$route.params.id;
               
                params.promisevisittime = this.promiseVisitDate;
                params.promisevisittype = this.promiseVisitType.id;
                this.send(params);
            },
            send(params){
                getOpCustomerCommunicateRecordInfo(params).then(res=>{
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 300);
                    if(res.result.code == app.errok){
                        app.toast('success', '提交成功');
                        this.$router.back();
                        app.eventDefine.emit('commonDetailInvRefresh');
                    }else{
                        app.toast('error', res.result.msg);
                    }
                })
            }
        },
        created() {
            this.getCommunicationType();
        },
        components: {StateActionsheet}
    }
</script>

