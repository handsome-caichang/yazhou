<!-- 优惠券列表界面 -->

<style lang="scss" scoped>
    .coupon-list{
        @include position-absolute;
		background-color: $color-assist-1;
		.header{
        	position: absolute !important;
        	top: 0;
			left: 0;
			width: 100%;
			text-align: center;
			background-color: $color-white;
			display: flex;
        	.header-item-wrap{
        		flex: 1;
        		.header-item{
        			display: inline-block;
        			height: $h-3;
        			line-height: $h-3;
        			&.active{
        				color: $color-primary;
        				border-bottom: 2px solid $color-primary;
        			}
        		}
        	}
        }
		/* .body{
                    position: absolute;
                    top: $h-3;
                    left: 0;
                    bottom: 0;
                    width: 100%;
            .item{
                position: relative;
                padding: 28px 0;
                margin: 15px;
                line-height: 1;
                border-radius: 5px;
                background-color: $color-white;
                .item-l-wrap{
                    display: inline-block;
                    width: 37%;
                    vertical-align: top;
                    .item-l{
                        height: 65px;
                        text-align: center;
                        .price{
                            font-size: 36px;
                            line-height: 1;
                            color: $color-primary;
                            margin-bottom: 8px;
                        }
                        .tag{
                            color: $color-primary;
                        }
                    }
                }
                .item-r-wrap{
                    display: inline-block;
                    width: 63%;
                    padding: 0 6.6%;
                    height: 65px;
                    border-left: 1px dashed #999;
                    .r-title{
                        font-size: $fs-big;
                        color: $color-3;
                        margin-bottom: 12px;
                        @include ellipsis-single;
                    }
                    .r-desc{
                        margin-bottom: 7px;
                        color: $color-6;
                        font-size: $fs-small-x;
                    }
                }
                &:before{
                    content: "";
                    position: absolute;
                    top: -10px;
                    left: 37%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: translatex(-10px);
                    background-color: $color-assist-1;
                }
                &:after{
                    content: "";
                    position: absolute;
                    bottom: -10px;
                    left: 37%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: translatex(-10px);
                    background-color: $color-assist-1;
                }
                &.unused{
                    background-color: #E5E5E5;
                    .item-l{
                        .price{
                            color: $color-3;
                        }
                        .tag{
                            color: $color-6;
                        }
                    }
                }
            }
            .noData_temp {
                @include position-absolute;
                background-color: $color-assist-1;
            }
            .edge{
                height: 10px;
            }
                } */
        .scroll {
            @include position-absolute(40px, 0, 0, 0);
            padding: 0 15px;
            .text {
                height: 15px;
                line-height: 35px;
                font-size: 12px;
                color: $color-9;
                padding-left: 3px;
                .icon {
                    color: $color-9;
                }
            }
            .card {
                height: 120px;
                background-color: $color-white;
                position: relative;
                margin-bottom: 16px;
                display: flex;
                border-radius: 5px;
                overflow: hidden;
                .card-left {
                    width: 37%;
                    color: $color-white;
                    background-color: $color-primary;
                    // padding: 28px;
                    padding: 0 8px;
                    @include flex-center(column);
                    &.active1 {
                        background-color: #C8E1AE;
                    }
                    &.active2 {
                        background-color: #C2CCDC;
                    }
                    .price {
                        font-size: 34px;
                        position: relative;
                        .yuan {
                            font-size: 22px;
                        }
                    }
                    .tag {
                        margin-top: 5px;
                        font-size: 13px;
                        @include ellipsis-multi(2);
                    }
                }
                .card-right {
                    flex: 1;
                    border-left: 1px dashed $color-primary;
                    &.active4 {
                        border-left: 1px dashed #C8E1AE;
                    }
                    &.active5 {
                        border-left: 1px dashed #C2CCDC;
                    }
                    padding-left: 10px;
                    display: flex;
                    .left {
                        flex: 1;
                        width: 0;
                        position: relative;
                        z-index: 2;
                        @include flex-between;
                        flex-direction: column;
                        text-align: left;
                        justify-content: center;
                        align-items: center;
                        .electronic{
                            width: 100%;
                            .icon {
                                width: 40px;
                            }
                        }
                        .title {
                            width: 100%;
                            font-size: 18px;
                            color: $color-3;
                            font-weight: bold;
                            @include ellipsis-multi;
                            &.active3 {
                                color: $color-6;
                            }
                        }
                        .text1 {
                            // margin-top: 13px;
                            // height: 30px;
                        }
                        .describe{
                            width: 100%;
                            .text1, .time {
                                width: 100%;
                                line-height: 13px;
                                margin-top: 5px;
                                font-size: 11px;
                                color: $color-9;
                            }
                        }
                    }
                    .right {
                        width: 20px;
                        position: relative;
                        z-index: 1;
                        .icon-wrapper {
                            @include position-absolute(false, -15px, -30px, false);
                            font-size: 100px;
                        }
                    }
                }
                &:before{
                    content: "";
                    position: absolute;
                    top: -10px;
                    left: 37%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: translatex(-10px);
                    background-color: $color-assist-1;
                }
                &:after{
                    content: "";
                    position: absolute;
                    bottom: -10px;
                    left: 37%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: translatex(-10px);
                    background-color: $color-assist-1;
                }
            }
            .void{
                height: 1px;
            }
        }
        .noData_temp {
            @include position-absolute(40px, 0, 0, 0);
            background-color: $color-assist-1;
        }
    }
    /* .scroller {
        @include position-absolute;
        overflow: hidden;
    } */
</style>

<template>
	<div class="coupon-list">
		<div class="header">
			<div class="header-item-wrap" v-for="(item, index) in headerList">
				<span class="header-item" 
                     :class="{active:curIndex==index}" 
                     @click="changeType(index)">
                      {{item.name}}{{"("+item.num+")"}}
                </span>
			</div>
		</div>
		<!-- <div class="body">
                    <scroller-base class="scroller" :data="renderCoupons">
                        <div>
                            <div class="item" v-for="item in renderCoupons" :class="{unused:(curIndex==1||curIndex==2)}">
                                <div class="item-l-wrap">
                                    <div class="item-l">
                                        <div class="price">&yen;{{item.Money}}</div>
                                        <div class="tag">{{curIndex==0?('可使用'):(curIndex==1?'已使用':'已过期')}}</div>
                                    </div>
                                </div><div class="item-r-wrap">
                                    <div class="r-title">{{item.Name}}</div>
                                    <div class="r-desc">适用范围：
                                        {{item.IsAllCampus==1?'不限校区':(item.IsAllCampus==0?'指定校区可用':'指定校区不可用')}}；
                                        {{item.IsAllGoods==1?'不限商品':(item.IsAllGoods==0?'指定商品可用':'指定商品不可用')}}；
                                        {{item.IsAllShift==1?'不限课程':(item.IsAllShift==0?'指定课程可用':'指定课程不可用')}}；
                                        {{item.IsAllSubject==1?'不限科目':(item.IsAllSubject==0?'指定科目可用':'指定科目不可用')}}；
                                                {{item.IsAllCampus==0?'指定校区可用;':item.IsAllCampus==-1?'指定校区不可用;':''}}
                                                {{item.IsAllGoods==0?'指定商品可用;':item.IsAllGoods==-1?'指定商品不可用;':''}}
                                                {{item.IsAllShift==0?'指定课程可用;':item.IsAllShift==-1?'指定课程不可用;':''}}
                                                {{item.IsAllSubject==0?'指定科目可用;':item.IsAllSubject==-1?'指定科目不可用;':''}}
                                    </div>
                                </div>
                            </div>
                            <div class="edge"></div>
                        </div>
                    </scroller-base>
                    
                    <empty-page class="noData_temp" :type="6" v-if="renderCoupons.length === 0"></empty-page>
                    
                    <loading v-if="isLoading"></loading>
                </div> -->
        <scroller-base :data="renderCoupons" class="scroll">
            <div class="text">
                <!-- <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-quanjutishijinggao"></use>
                </svg> -->
                <!-- 当前最多使用一种优惠券 -->
            </div>
            <div class="card" v-for="card in renderCoupons">
                <div class="card-left" :class="{active1:curIndex==1,active2:curIndex==2}">
                    <!-- <div class="price"><span class="tag">&yen;</span>{{card.Money}}</div> -->
                    <div class="price" ref="cardLeft"><span class="yuan">&yen;</span>{{card.Money}}</div>
                    <div class="tag" v-if="card.Condition">{{`满${card.Condition}元可用`}}</div>
                </div>
                <div class="card-right" :class="{active4:curIndex==1,active5:curIndex==2}">
                    <div class="left">
                        <div class="title" :class="{active3:curIndex==1||curIndex==2}" ref="title">{{card.Name}}</div>
                        <div class="electronic" v-if="card.ComeType == 4">
                            <svg class="icon"  aria-hidden="true">
                                <use xlink:href="#icon-dianziqiaquanbiaoqian"></use>
                            </svg>
                        </div>
                        <div class="describe">
                            <div class="text1">
                                {{card.IsAllCampus==1?'':'指定校区可用;'}}
                                {{card.IsAllGoods==1?'':'指定商品可用;'}}
                                {{card.isAllSpecialGoods==1?'':'指定特殊商品可用;'}}
                                {{card.IsAllShift==1?'':'指定课程可用。'}}
                            </div>
                            <!--有效时间-->
                            <div class="time" v-if='!card.Unlimited'>
                                {{card.StartDateTime|formatDatetime('yyyy.MM.dd')}} - {{card.EndDateTime|formatDatetime('yyyy.MM.dd')}}
                            </div>
                            <!--有效时间-->
                            <div class="time"  v-if='card.Unlimited'>
                                永久有效
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="icon-wrapper">
                            <svg class="icon" aria-hidden="true" v-if="curIndex==1">
                                <use xlink:href="#icon-yishiyong"></use>
                            </svg>
                            <svg class="icon" aria-hidden="true" v-if="curIndex==2">
                                <use xlink:href="#icon-yiguoqi"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="void"></div>
        </scroller-base>
        <loading v-if="isLoading"></loading>
        <empty-page class="noData_temp" :type="6" v-if="headerList[curIndex].num === 0"></empty-page>
	</div>
</template>

<script>
	import EmptyPage from 'common/empty-page/empty-page.vue'
	import { getCouponList } from 'api/lc';
	
	export default{
		name:'coupon-list',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
            	isLoading: true,
            	// headerList: ['可使用','已使用','已过期'],
                headerList: [{
                    name: '可使用',
                }, {
                    name: '已使用',
                }, {
                    name: '已过期',
                }],
            	list:[], //所有的优惠券
            	renderCoupons:[], //渲染的优惠券
            	curIndex: 0,
               	wxTitle:"优惠券"
            }
        },
        methods: {
        	renderPage(){
        		if (this.curIndex==0) {
        			this.renderCoupons=this.list.CanUse;
        		}else if(this.curIndex==1){
        			this.renderCoupons=this.list.Used;
        		}else if(this.curIndex==2){
        			this.renderCoupons=this.list.Expired;
        		}
                this.setFontSize()
        	},
        	changeType(index){
        		this.curIndex = index;
        	},
            setFontSize() {
                this.$nextTick(() => {
                    this.renderCoupons.forEach((obj, index) => {
                        if (String(obj.Money).length > 5) {
                            this.$refs.cardLeft[index].style.fontSize = '24px'
                        } else {
                            this.$refs.cardLeft[index].style.fontSize = '34px'
                        }
                        if (obj.Name.length > 7) {
                            this.$refs.title[index].style.fontSize = '13px'
                        } else {
                            this.$refs.title[index].style.fontSize = '18px'
                        }
                    })
                })
            },
            setTime(list) {
                if (list instanceof Array) {
                    list.forEach(item => {
                        if (app.filters.formatDatetime(item.EndDateTime, 'yyyy-MM-dd') == '2099-01-01') {
                            item.Unlimited = true;
                        }else {
                            item.Unlimited = false;
                        }
                    })
                }
            }
        },
        created(){
    		this.isLoading = true;
        	getCouponList().then(res => {
    			this.isLoading = false;
    			if (res.ErrorCode == app.errok) {
                    this.list = res.Data;
                    this.setTime(this.list.CanUse);
                    this.setTime(this.list.Used);
                    this.setTime(this.list.Expired);
                    this.headerList.forEach(obj => {
                        if (obj.name === '可使用') this.$set(obj, 'num', this.list.CanUse.length)
                        if (obj.name === '已使用') this.$set(obj, 'num', this.list.Used.length)
                        if (obj.name === '已过期') this.$set(obj, 'num', this.list.Expired.length)
                    })
			      	this.renderPage();
    			}
    		});
        },
        watch: {
        	curIndex(newVal,oldVal){
        		if (newVal === oldVal) {
        			return;
        		}
        		this.renderPage();
        	}
        },
        components:{
        	EmptyPage
        }
	}
</script>