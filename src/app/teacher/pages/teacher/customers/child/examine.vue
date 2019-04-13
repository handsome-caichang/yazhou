<!--审核操作页面-->
<style scoped lang="scss">

    .examine-container{
        .scroller{
            @include position-absolute(0,0,49px,0);
            background-color: $color-assist-1;
            padding: 0 15px;
            .header{
                height: 44px;
                line-height: 44px;
                background-color: $color-white;
                padding: 0 15px;
                font-size: 15px;
                color: $color-3;
                display: flex;
                .item{
                    flex: 1;
                }
                .icon{
                    font-size: 18px;
                }
                .describe{
                    color: $color-6;
                    .icon{
                        font-size: 12px;
                        color: #FF3433;
                        transform: scale(0.6);
                        vertical-align: baseline;
                    }
                }
            }
            .remark{
                @include position-absolute(64px,0,10px,0);
                padding: 15px;
                background-color: $color-white;
                .title{
                    height: 15px;
                    line-height: 15px;
                    color: $color-6;
                    margin-bottom: 15px;
                }
                .remark-box{
                    .remark-text{
                        color: $color-3;
                        border: 1px solid $color-border;
                        border-radius: 2px;
                        padding: 12px;
                        word-break: break-word;
                        -webkit-user-select: text;
                        -moz-user-select: text;
                        -ms-user-select: text;
                        user-select: text;
                        font-family: inherit;
                        height: 360px;
                        box-shadow: none;
                        margin-top: 0px;
                        resize: none;
                    }
                }

            }
            .void{
                height: 10px;
            }
        }
        .footer{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 49px;
            line-height: 49px;
            text-align: center;
            font-size: 16px;
            color: $color-white;
            background-color: #CCCCCC;
            &.active{
                background-color: $color-primary;
            }
        }

    }

</style>

<template>
    <div class="examine-container">
        <scroller-base :data="renderData" class="scroller">
            <div class="void"></div>
            <div class="header">
                <div class="item describe">
                    审核 <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-bitianxing"></use>
                </svg>
                </div>
                <div class="item pass" @click="selectIsPass(1)">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="currentActive==1?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
                    </svg> 通过
                </div>
                <div class="item failed" @click="selectIsPass(2)">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="currentActive==2?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
                    </svg> 未通过
                </div>
            </div>
            <!--<div class="void"></div>-->
            <div class="remark">
                <div class="title">备注</div>
                <div class="remark-box">
                    <textarea
                            v-if="VisitAudit"
                            class="remark-text"
                            maxlength="300"
                            v-model="contentMsgModel"
                            placeholder="请输入审核备注（限300字）"
                            @touchstart="app.area.start($event)"
                            @touchmove="app.area.move($event)"
                            @touchend="app.area.end($event)">
                    </textarea>
                    <div class="remark-text" v-html="contentMsgModel" v-else>
                    </div>
                </div>
            </div>
            <!--<div class="void"></div>-->
        </scroller-base>
        <div class="footer" :class="{'active':VisitAudit&&currentActive!=0}" @click="submit">提交</div>
    </div>
</template>

<script>
    import {processPost} from "teacher/api/common";

    export default {
        name: "examine",
        data() {
            return {
                wxTitle: "意向客户到访审核",
                currentActive:0,//默认都不显示
                contentMsgModel:'',//备注内容  arrowFilter  parseDom
                EnableVisitAudit:null, // 配置项  是否在意向客户新增到访审核流程，0表示否（默认），1表示是（现代教育）
                VisitAudit:null,       // 权限
            }
        },
        computed: {
            renderData(){
                return{

                }
            }
        },
        methods: {
            selectIsPass(flag){
                if(!this.VisitAudit){
                    return
                }
                this.currentActive = flag;
            },
            submit(){
                if(!this.VisitAudit){
                    return
                }
                if(this.currentActive==0){return}
                let  params={
                    pname:'PostInviteAudit',
                    id:'',//沟通记录ID
                    auditStatus:'',//审核状态 1：审核通过，2：审核不通过
                    auditRemark:''//审核备注
                };
                params.id = this.$route.params.id;
                params.auditStatus = this.currentActive;
                params.auditRemark = app.tool.arrowFilter(this.contentMsgModel);

                this.send(params)
            },
            send(para){
                processPost(para).then(res=>{
                    if(res.errcode == app.errok){
                        app.toast('success','提交成功');
                        app.event.emit('addCommunication'); //刷新沟通记录列表页
                        this.$router.back()
                    }else{
                        app.toast(res.errmsg)
                    }
                })
            },
            init(){
                let obj = app.ls.getStorage('customerExamineCard');

                if(obj.AuditStatus!=0){
                    if(obj.AuditRemark!=''){
                        this.contentMsgModel = app.dom.parseDom(obj.AuditRemark)
                    }
                    this.currentActive = obj.AuditStatus;
                }

            }
        },
        created() {
            this.EnableVisitAudit = app.sysInfo.EnableVisitAudit; //配置项
            this.VisitAudit = app.tool.op('VisitAudit');          //权限

            this.init();
        },
        components: {}
    }
</script>

