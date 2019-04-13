<!-- 我的分享奖励 -->
<style lang="scss" scoped>
    
    .share-award-container{
        background-color: $color-assist-1;
        .scroller{
            @include position-absolute(0,0,0,0);
            background-color: $color-assist-1;
            .header{
                height: 122px;
                // padding: 16px 12px;
                text-align: center;
                background-image: url("./imgs/background.jpg");
                @include background-img(false,cover);
                .reward-detail{
                    font-size: 11px;
                    padding: 10px 10px 0 0;
                    text-align: right;
                    color:#8FCAF8;
                    text-decoration:underline;
                }
                .title{
                    font-size:11px;
                    color:#8FCAF8;
                }
                .today-award{
                    color: $color-white;
                    font-size: 25px;
                    margin-top: 5px;
                    margin-bottom: 15px;
                    .coin{
                        font-size: 13px;
                    }
                }
                .total-award{
                    color:#EBF5FE;
                    font-size: 12px;
                }
                
            }
            .mark{
                height: 26px;
                line-height: 26px;
                color:$color-6;
                text-align: center;
                // background-color: $color-assist-1;
                font-size: 12px;
            }
            .item{
                background-color: $color-white;
                margin-bottom: 1px;
                padding: 16px 12px 12px 12px; 
                .item-top{
                    @include flex-between();
                    margin-bottom: 16px;
                    .name{
                        font-size: 16px;
                        color:$color-3;
                        flex: 2;
                        @include ellipsis-single;
                    }
                    
                    .share-area{
                        .share{
                            font-size: 11px;
                            padding: 0px 5px;
                            text-align: center;
                            color:#C2CBD9;
                            height: 18px;
                            line-height: 17px;
                            border: 1px solid #C2CBD9;
                            border-radius: 18px;
                        }
                    }
                }
                .item-bottom{
                    font-size: 11px;
                    display: flex;
                    .term{
                        flex: 1;
                    }
                    .key{
                        color:$color-9;
                    }
                    .count{
                        color:$color-3;
                    }
                    .money{
                        color:#1E88F5;
                    }
                    .ct{
                        text-align: center;
                    }
                    .rt{
                        text-align: right;
                    }
                }
            }
        }
        .noData-temp{
            @include position-absolute(148px,0,0,0);
        }
    }
</style>

<template>
    <div class="share-award-container">
        
        <!-- 订单列表 -->
        <scroller-base
            class="scroller"
            :data="renderData">
            <!-- 统计概况 -->
            <div class="header">
                <div class="reward-detail" @click="goToCoupon">奖励明细</div>
                <div class="title">今日获得分享奖励</div>
                <div class="today-award">
                    <span class="coin">￥</span>{{todayRewardAmount}}
                </div>
                <div class="total-award">累计获得奖励 {{totalRewardAmount}} 元优惠券</div>
            </div>
            <div class="mark" v-if="list.length !== 0">累计领取明细</div>
            <div class="item" v-for="item in list" :key="item.ID">
                <div class="item-top">
                    <div class="name">{{item.Name}}</div>
                    <div class="share-area" @click="toShareCard(item)">
                        <div class="share">
                            <svg aria-hidden="true" class="icon">
                                <use xlink:href="#icon-fenxiang1"></use>
                            </svg>
                            继续分享
                        </div>
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="term">
                        <div class="key">浏览</div>
                        <div class="count">{{item.ScanCount}}次</div>
                    </div>
                    <div class="term ct">
                        <div class="keyt">领取</div>
                        <div class="count">{{item.UseCount}}人</div>
                    </div>
                    <div class="term ct">
                        <div class="key ">报名</div>
                        <div class="count">{{item.ApplyCount}}人</div>
                    </div>
                    <div class="term rt">
                        <div class="key">奖励</div>
                        <div class="money count">{{item.RewardAmount}}元</div>
                    </div>
                </div>
            </div>
        </scroller-base>
        <empty-page class="noData-temp" :type="15" v-if="list.length == 0"></empty-page>
        <!-- 加载中... -->
        <loading class="loading" v-show="isLoading"></loading>
       
    </div>
</template>

<script>
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
    import { processGet } from 'parent/api/common.js';

    export default {
        name: 'share-award',
        data() {
            return {
                wxTitle: '我的分享奖励',
                isLoading:true,
                list: [],
                todayRewardAmount:"",
                totalRewardAmount:"",
                starttime:"",//从推送进来可能有时间
                endtime:"",//从推送进来可能有时间
            }
        },
        computed: {
        	renderData(){
                return {
                    list:this.list
                }
            }
        },
        methods: {
            goToCoupon(){
                this.$router.push("/coupon");
            },
            getData(){
                processGet({
                    starttime:this.starttime,
                    endtime:this.endtime,
                    pname:"recommendCardReceiveDetails"
                }).then(res=>{
                    this.isLoading = false;
                    if (res.errcode == app.errok) {
						this.todayRewardAmount = res.data.TodayRewardAmount;
						this.totalRewardAmount = res.data.TotalRewardAmount;
                        this.list = res.data.ReceiveDetails;
					}
                })
            },
            toShareCard(item) {
                let href =`${location.protocol}//${location.host}/weixin/parent/share.html#/card?recommendcardId=${item.ID}&companyID=${app.sysInfo.companyID}&cardId=${item.RecommendCardSendID}`
                location.href = href;
            },
        },
        created() {
            this.starttime = this.$route.query.starttime?this.$route.query.starttime:""
            this.endtime = this.$route.query.endtime?this.$route.query.endtime:""
            this.getData();
        },
        components: {
            EmptyPage
        },
        watch: {
		    
		}
    }
</script>