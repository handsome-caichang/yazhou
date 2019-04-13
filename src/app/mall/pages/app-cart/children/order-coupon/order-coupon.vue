<!-- 订单结算->选中优惠券界面 -->
<style lang="scss" scoped>
    
    
    
    .order-coupon{
        @include position-absolute;
        background-color: $color-assist-1;
        z-index: 9999;
        overflow: hidden;
		.body{
        	position: absolute;
        	top: 0;
        	left: 0;
        	bottom: $h-2;
        	width: 100%;
			/* .item{
                position: relative;
                padding: 28px 0;
                margin: 15px;
                line-height: 1;
                border-radius: 5px;
                background-color: $color-white;
                .item-l-wrap{
                    display: inline-block;
                    width: 37%;
                    height: 65px;
                    vertical-align: top;
                    border-right: 1px dashed #999;
                    text-align: center;
                    color: $color-primary;
                    .price{
                        font-size: 36px;
                        line-height: 1;
                        margin-bottom: 8px;
                    }
                    .tag{
                        font-size: $fs-normal-x;
                    }
                }
                .item-c-wrap{
                    display: inline-block;
                    width: 63%;
                    padding: 0 44px 0 25px;
                    height: 65px;
                    position: relative;
                    .item-r-l{
                        .r-title{
                            font-size: $fs-big;
                            color: $color-3;
                            margin-bottom: 12px;
                            @include ellipsis-single;
                        }
                        .r-desc{
                            margin-bottom: 7px;
                            font-size: $fs-small-x;
                        }
                    }
                    .item-r-r{
                        position: absolute;
                        width: 44px;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        font-size: 20px;
                        @include flex-center;
                        .icon{
                            &.active{
                                color: $color-primary;
                            }
                        }
                        .unused{
                            color: $color-9;
                        }
                    }
                }
                &:before,
                &:after{
                    content: "";
                    position: absolute;
                    left: 37%;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    transform: translatex(-10px);
                    background-color: $color-assist-1;
                }
                &:before{
                    top: -10px;
                }
                &:after{
                    bottom: -10px;
                }
                &.unused{
                    color: $color-9;
                    .item-l-wrap{
                        .price,
                        .tag{
                            color: $color-9;
                        }
                    }
                    .item-c-wrap{
                        .r-title,
                        .r-desc{
                            color: $color-9;
                        }
                    }
                }
            } */
            .scroll {
                @include position-absolute;
                padding: 0 15px;
                .text {
                    height: 30px;
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
                            font-size: 36px;
                            position: relative;
                            .yuan {
                                font-size: 22px;
                            }
                        }
                        .tag {
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
                        padding: 20px 10px 20px 16px;
                        display: flex;
                        .left {
                            flex: 1;
                            width: 0;
                            .electronic{
                                width: 100%;
                                .icon {
                                    width: 40px;
                                }
                            }
                            .title {
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
                            .text1, .time {
                                padding-top: 8px;
                                font-size: 11px;
                                color: $color-9;
                            }
                        }
                        .right {
                            width: 20px;
                            @include flex-between;
                            .icon-wrapper {
                                font-size: 20px;
                                color: $color-primary;
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
                .void {
                    height: 1px;
                    background-color: $color-assist-1;
                }
            }
			/* .edge{
                height: 10px;
            } */
			.noData_temp {
				@include position-absolute;
				background-color: $color-assist-1;
			}
        }
        .footer{
        	position: absolute;
        	bottom: 0;
        	left: 0;
        	right: 0;
        	height: $h-2;
        	font-size: $fs-big-s;
        	@include flex-center;
        	color: $color-white;
        	background-color: $color-primary;
        }
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
	.as-slide-enter-active, .as-slide-leave-active {
		transition: all $duration $timing;
	}
	.as-slide-enter, .as-slide-leave-active {
		transform: translatex(100%);
	}
</style>

<template>
	<transition name="as-slide">
		<div class="order-coupon" v-show="opened">
			<div class="body">
				<!-- <scroller-base class="scroller" :data="coupons">
                    <div>
                        <div class="item" @click="selectCoupon(item)" v-for="item in coupons" :class="{'unused':!item.IsCanUse}">
                            <div class="item-l-wrap">
                                <div class="price">&yen;{{item.Money}}</div>
                                <div class="tag">优惠券</div>
                            </div>
                                            <div class="item-c-wrap">
                                <div class="item-r-l">
                                    <div class="r-title">{{item.Name}}</div>
                                    <div class="r-desc">适用范围：
                                        {{item.IsAllCampus==1?'不限校区':(item.IsAllCampus==0?'指定校区可用':'指定校区不可用')}}；
                                        {{item.IsAllGoods==1?'不限商品':(item.IsAllGoods==0?'指定商品可用':'指定商品不可用')}}；
                                        {{item.IsAllShift==1?'不限课程':(item.IsAllShift==0?'指定课程可用':'指定课程不可用')}}；
                                    </div>
                                </div>
                                                <div class="item-r-r" :class="{unused:!item.IsCanUse}">
                                    <svg class="icon" aria-hidden="true" :class="{active:(curCoupon&&(item.ID==curCoupon.ID))}">
                                        <use :xlink:href="(curCoupon&&(item.ID==curCoupon.ID))?'#icon-danxuanxuanzhong':'#icon-danxuanweixuanzhong'"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="edge"></div>
                    </div>
                </scroller-base> -->
                <scroller-base :data="coupons" class="scroll">
                    <div class="text">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-quanjutishijinggao"></use>
                        </svg>
                        当前最多使用一种优惠券（电子卡券类型可叠加使用）
                    </div>
                    <div class="card" v-for="card in coupons" @click="selectCoupon(card)">
                        <div class="card-left" :class="{active2:!card.IsCanUse}">
                            <div class="price" ref="cardLeft"><span class="yuan">&yen;</span>{{card.Money}}</div>
                            <div class="tag">{{card.Condition?`满${card.Condition}元可用`:'不限'}}</div>
                        </div>
                        <div class="card-right" :class="{active5:!card.IsCanUse}">
                            <div class="left">
                                <div class="title" ref="title" :class="{active3:!card.IsCanUse}">{{card.Name}}</div>
                                <div class="electronic" v-if="card.ComeType == '4'">
                                    <svg class="icon"  aria-hidden="true">
                                        <use xlink:href="#icon-dianziqiaquanbiaoqian"></use>
                                    </svg>
                                </div>
                                <div class="text1">
                                    {{card.IsAllCampus==0?'指定校区可用;':card.IsAllCampus==-1?'指定校区不可用;':''}}
                                    {{card.IsAllGoods==0?'指定商品可用;':card.IsAllGoods==-1?'指定商品不可用;':''}}
                                    {{card.isAllSpecialGoods==0?'指定特殊商品可用;':card.isAllSpecialGoods==-1?'指定特殊商品不可用;':''}}
                                    {{card.IsAllShift==0?'指定课程可用;':card.IsAllShift==-1?'指定课程不可用;':''}}
                                </div>
                        
                        
                                <div class="time" v-if="app.filters.formatDatetime(card.EndDateTime, 'yyyy-MM-dd') != '2099-01-01'">
                                {{card.StartDateTime|formatDatetime('yyyy.MM.dd')}} - {{card.EndDateTime|formatDatetime('yyyy.MM.dd')}}</div>
                                <div class="time" v-if="app.filters.formatDatetime(card.EndDateTime, 'yyyy-MM-dd') == '2099-01-01'">永久有效</div>
                            </div>
                            <div class="right">
                                <div class="icon-wrapper">
                                    <svg class="icon" aria-hidden="true" v-if="card.IsCanUse && card.ComeType != '4'">
                                        <use 
                                            :xlink:href="card.IsSelected  ?'#icon-danxuanxuanzhong2':'#icon-danxuanweixuanzhong1'">
                                        </use>
                                    </svg>
                                    <svg class="icon" aria-hidden="true"  v-if="card.IsCanUse && card.ComeType == '4' && card.EnableMultiple == '0'" >
                                        <use 
                                            :xlink:href="card.IsSelected  ?'#icon-danxuanxuanzhong2':'#icon-danxuanweixuanzhong1'">
                                        </use>
                                    </svg>
                                    <svg class="icon" aria-hidden="true" v-if="card.IsCanUse && card.ComeType == '4' && card.EnableMultiple == '1'">
                                        <use 
                                            :xlink:href="card.IsSelected ?'#icon-duoxuanxuanzhong1':'#icon-duoxuanweixuanzhong1'">
                                        </use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="void"></div>
                </scroller-base>
				<empty-page class="noData_temp" :type="6" v-if="coupons.length === 0"></empty-page>
			</div>
			<div class="footer" @click="confirmCoupon">确定</div>
		</div>
	</transition>
</template>

<script>
	import EmptyPage from 'common/empty-page/empty-page.vue';
	
	export default{
		name:'order-coupon',
		mixins: [app.mixin.popupWindowRouteMixin],
		props:{
			opened: {}
		},
        data() {
            return {
            	coupons: [],
            	curCoupon: [],
            }
        },
        computed: {
        },
        methods: {
            selectCoupon(coupon){ //选择优惠券
                console.log(coupon);
        		if (!coupon.IsCanUse) { //不可用
        			return;
                }
                if (coupon.ComeType == '4') {
                    coupon.IsSelected = !coupon.IsSelected;
                    if (coupon.EnableMultiple == '0') { // 如果不可以叠加
                        this.coupons.forEach(item => {
                            if (item.ComeType != '4') {
                                item.IsSelected = false;
                            }
                        })
                    }
                }else {
                    let flag = coupon.IsSelected;
                    this.coupons.forEach(item => {
                        if (item.ComeType != '4') {
                            item.IsSelected = false;
                        }else if(item.ComeType == '4') {
                            if (item.EnableMultiple == '0') { 
                                item.IsSelected = false;
                            }
                        }
                    })
                    coupon.IsSelected = !flag;
                }
        	},
        	confirmCoupon(){ //确定
                this.close();
                //  验证电子推荐卡优惠卷是否相同
                let flag = false;  // true 代表有不同的
                const selectCradList = this.coupons.filter(item => item.IsSelected); 
                if (this.curCoupon.length == selectCradList.length ) {
                    for (let y = 0; y < this.curCoupon.length; y++) {
                        const item = this.curCoupon[y];
                        let flag1 = false;
                        for (let index = 0; index < selectCradList.length; index++) {
                            const element = selectCradList[index];
                            if (item.ID == element.ID) {
                                break;
                            }else {
                                if (index == selectCradList.length -1) {
                                    flag1 = true;
                                    flag = true;
                                }
                            }
                        }
                        if (flag1) {
                            break;
                        }
                    }
                }else {
                    flag = true;
                }
                console.log(flag);
        		//处理选择相同优惠券的情况
                if (!flag) {
                    return;
                }
				this.$emit('closeCoupon', selectCradList);
        	},
			close(){
				this.$emit('update:opened', false);
			},
			setCoupon(coupon, couponArr){ //设置优惠券
				this.coupons = couponArr; // 原来选中的优惠卷列表
	        	this.curCoupon = coupon;  // 现在选中的
                this.$nextTick(() => {
                    this.coupons.forEach((obj, index) => {
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

            }
        },
        mounted() {
            
        },
        components:{
        	EmptyPage
        }
	}
</script>