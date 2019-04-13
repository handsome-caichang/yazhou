<!--沟通记录详情-->
<style scoped lang="scss">
    .communication-detail-container {
        background-color: $color-white;
        .scroller {
            @include position-absolute;
            .main-msg{
                padding: 16px;
                .top{
                    padding-left: 50px;
                    position: relative;
                    height: 40px;
                    .head-img{
                        width: 40px;
                        height: 40px;
                        border-radius: 40px;
                        border: 1px solid $color-assist-1;
                        background-color: $color-assist-1;
                        position: absolute;
                        top: 0;
                        left: 0;
                        @include background-img(false, cover);
                    }
                    .name-des{
                        .name-date{
                            display: inline-block;
                            width: 50%;
                            .name{
                                color: $color-3;
                                font-size: 15px;
                                width: 100%;
                                @include ellipsis-single;
                            }
                            .date{
                                color: #AAAAAA;
                                font-size: 12px;
                                margin-top: 6px;
                            }
                        }
                        .type{
                            width: 50%;
                            display: inline-block;
                            text-align: right;
                            @include ellipsis-single;
                            font-size: 15px;
                            color: $color-3;
                            height: 36px;
                            .icon{
                                font-size: 16px;
                                margin-right: 6px;
                            }
                        }
                    }
                }
                .content{
                    margin-top: 16px;
                    padding: 12px;
                    border: 1px solid #E0E5EE;
                    background-color: #F3F9FF;
                    border-radius: 4px;
                    font-size: 16px;
                    color: $color-3;
                    position: relative;
                    z-index: 2;
                    .triangle{
                        width:14px;
                        height:14px;
                        transform:rotate(45deg);
                        border-top: 1px solid #E0E5EE;
                        border-left: 1px solid #E0E5EE;
                        background-color: #F3F9FF;
                        position: absolute;
                        top: -7px;
                        left: 12px;
                        // @include triangle($color:#F3F9FF);
                    }
                }
                .img-area {
                    margin-top: 16px;
                }
                /*.voice{*/
                    /*margin-top: 16px;*/
                /*}*/
            }
            .state-msg{
                .item{
                    height: 49px;
                    line-height: 49px;
                    padding: 0 16px;
                    @include flex-between;
                    border-bottom: 1px solid $color-assist-1;
                    .attr{
                        font-size: 13px;
                        color: $color-9;
                    }
                    .val{
                        font-size: 15px;
                        color: $color-3;
                        .icon.star{
                            margin-left: 10px;
                            color:#E7E7E6;
                            &.active{
                                color:#FFD427;
                            }
                        }
                    }
                }
            }
        }
        .void{
            background-color: $color-assist-1;
            width: 100%;
            height: 10px;
        }
    }
</style>

<template>
    <div class="communication-detail-container">
        <scroller-base class="scroller" :data="list">
            <div class="main-msg">
                <div class="top">
                    <div class="head-box" v-if="list.customermanagerinfo">
                        <div class="head-img" :style="'background-image:url('+list.customermanagerinfo.photourl+')'"></div>
                    </div>
                    <div class="name-des">
                        <div class="name-date">
                            <div class="name">{{list.customermanagerinfo&&list.customermanagerinfo.name}}</div>
                            <div class="date">{{list.followtime&&list.followtime.substring(0,10)}}</div>
                        </div>
                        <div class="type">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-goutongfangshi"></use>
                            </svg>
                            {{list.communicatetypename}}
                        </div>
                    </div>
                </div>

                <!--文本内容 （转义）必填项必存在-->
                <div class="content">
                    <div class="triangle"></div>
                    {{list.content}}
                </div>

                <!-- 图片 -->
                <crm-img-area
                    class="img-area"
                    v-if="list.filelist&&list.filelist.length > 0"
                    :edit="false"
                    :fileList="list.filelist">
                </crm-img-area>

                <!-- 语音 -->
                <!--<div class="voice">-->
                    <!--<voice-recording-->
                            <!--:edit="false"-->
                            <!--:audioFileList="listVoiceFile">-->
                    <!--</voice-recording>-->
                <!--</div>-->

            </div>
            <div class="void"></div>
            <div class="state-msg">
                <div class="item">
                    <div class="attr">客户状态</div>
                    <div class="val">{{list.customerstatusname}}</div>
                </div>
                <div class="item">
                    <div class="attr">意向级别</div>
                    <div class="val">
                        <svg class="icon star" :class="{'active':list.intentionlevel>=num}" aria-hidden="true" v-for="num in 5">
                            <use xlink:href="#icon-wuxing"></use>
                        </svg>
                    </div>
                </div>
                <div class="item">
                    <div class="attr">承诺到访</div>
                    <div class="val">{{list.promisevisittime&&list.promisevisittime.substring(0,16)}}</div>
                </div>
                <div class="item">
                    <div class="attr">诺到访类型</div>
                    <div class="val">{{list.promisevisittypename}}</div>
                </div>
                <div class="item">
                    <div class="attr">下次跟进时间</div>
                    <div class="val">{{list.nextfollowtime&&list.nextfollowtime.substring(0,10)}}</div>
                </div>
                <div class="item">
                    <div class="attr">下次跟进类型</div>
                    <div class="val">{{list.nextcommunicatetypename}}</div>
                </div>
            </div>
        </scroller-base>
        <loading class="loading" v-show="isLoading"></loading>
    </div>

</template>

<script>
    import {getCommunicateRecordDetail} from 'crm/api/ldj.js'

    import CrmImgArea from 'crm/components/crm-img-area/crm-img-area.vue'

    export default {
        name: "communication-detail",
        data() {
            return {
                wxTitle: "沟通记录详情",
                isLoading:true,
                list: {}
            }
        },
        computed: {},
        methods: {
            getData(id){
                getCommunicateRecordDetail({communicateid:id}).then(res=>{
                    this.isLoading = false;
                    if(res.result.code ==app.errok){
                        this.list = res.data;
                    }else{
                        app.toast('error',res.msg)
                    }
                })
                
            }
        },
        created() {
            console.log(this.$route.params.id)
            this.getData(this.$route.params.id);
        },
        components: {
            CrmImgArea
        }
    }
</script>

