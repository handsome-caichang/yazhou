<!-- 购物车的共用组件 -->
<style lang="scss" scoped>
    
    

    .cart {
        @include position-absolute;
        overflow: hidden;
        background-color: $color-white;
        .body{
        	position: absolute;
        	top: 0;
        	left: 0;
        	width: 100%;
        	bottom: 50px;
    	    .scroller {
		        @include position-absolute;
		        overflow: hidden;
                bottom: 0px;

		    }
        	.campus-tips{
        		height: $h-3;
        		line-height: $h-3;
        		padding-left: 16px;
        		@include flex-between;
        		@include border-bottom;
        		color: $color-assist-2;
        		background: #FFFCEE;
        		.campus-tips-icon{
        			padding: 0 10px;
        			font-size: $fs-big;
        		}
        	}
        	&.full{
        		bottom: 0;
        	}
        }
        .footer{
        	position: absolute !important;
        	bottom: 0;
        	left: 0;
        	width: 100%;
        	height: 50px;
        	line-height: 50px;
        	@include border-top;
        	background-color: $color-white;
        	.account-wrap{
        		display: flex;
				.account-wrap-l{
					flex: 1;
					padding-left: 10px;
					@include flex-between;
					.edit{
						padding-right: 10px;
						color: $color-9;
						font-size: $fs-small-x;
					}
					.count{
						padding-right: 15px;
						color: $color-3;
						font-size: $fs-normal-x;
						.total{
							color: $color-assist;
							font-size: $fs-big-s;
						}
					}
				}
				.account-wrap-r{
					width: 130px;
					@include flex-center;
					color: $color-white;
					font-size: $fs-big;
					background: $color-primary;
					.num{
						font-size: $fs-small-x;
					}
				}
        	}
        }
    }
</style>

<template>
    <div class="cart">
        <div class="body" :class="{'full':vaildCartList.length==0}">
        	<scroller-super class="scroller"
                :type="1"
                :api="apiPromise"
                :data="renderData" 
                ref="cartScrollfer">
    			<!-- 提示语 -->
		        <div class="campus-tips" v-if="vaildCartList.length>0&&ctips">
		        	不同{{config.TitleCampus}}的商品不可一起购买
		        	<span class="campus-tips-icon" @click="colseCampusTips">
			        	<svg class="icon" aria-hidden="true">
			        		<use xlink:href="#icon-guanbi"></use>
			        	</svg>
		        	</span>
		        </div>
		        
		        <!-- 购物车为空-->
	        	<empty-cart v-if="vaildCartList.length==0"></empty-cart>
	        	
		        <!-- 有效商品 -->
	        	<shop-list 
	        		v-if="vaildCartList.length>0" 
	        		:campusList="vaildCartList" 
	        		ref="ShopList"
	        		@openScheme="openScheme"
	        		@refreshScroll="refreshScroll"
	        		></shop-list>
	        		
		        <!-- 失效商品 -->
	        	<invalidshop-list 
	        		v-if="expiredCartList.length>0" 
	        		:campusList="expiredCartList"
	        		@emptyInvalid="emptyInvalid"
	        	></invalidshop-list>
	        	
		        <!-- 您喜欢的：喜欢的商品大于0 -->
	        	<section-grid 
	        		v-if="userInfo.Name&&(appFavorite.length>0)" 
	        		:data="appFavorite" 
	        		:title="'我喜欢的'"
	        	></section-grid>
        	</scroller-super>
        </div>
        <div class="footer" v-if="vaildCartList.length>0">
        	<div class="account-wrap">
        		<div class="account-wrap-l">
        			<div class="count">合计:<span class="total">&#165;{{cartTotalMoney|formatNumber}}</span></div>
        		</div>
        		<div class="account-wrap-r" @click="payOrder">去结算<span class="num">({{totalCount}})</span></div>
        	</div>
        </div>
        
        <loading v-if="isLoading" :bgType='1'></loading>
        
		<!-- 选择单科优惠 -->
		<cart-scheme 
			ref="cartScheme"
			:opened.sync="openedScheme"
			:campusId="selectSchemeCid"
			:product="selectSchemePro"
			@selectScheme="selectScheme">
		</cart-scheme>
    </div>
</template>

<script>
	import ShopList from '../shop-list/shop-list.vue';
	import EmptyCart from '../empty-cart/empty-cart.vue';
	import SectionGrid from '../section-grid/section-grid.vue';
	import CartScheme from '../cart-scheme/cart-scheme.vue';
	import invalidshopList from '../invalidshop-list/invalidshop-list.vue';
	import { getAppCart,clearDisabledProducts,getFavorites } from 'api/lc';
     
	
    /**
     * 很好的数据逻辑放到'router-bus'路由总线中去处理了
     * 详见'router-bus'
    **/

	// 后期完善：批量编辑功能
 	export default {
        name: 'cart',
        data() {
            return {
				ctips: true, //是否关闭提示
				isLoading: false,
				openedScheme: false,
				selectSchemeCid: '', //选择单科优惠的商品所在校区
				selectSchemePro: null, //选择单科优惠的商品
				clickNum: 0,
				num: 0
            }
        },
        computed: {
        	...Vuex.mapState([
        		'appCart',
        		'userInfo',
        		'appCartCampus',
        		'cartTotalMoney',
        		'appCartLoadingFlag',
        		'appFavorite',
        		'vaildCartList',
        		'expiredCartList',
                'config'
        	]),
        	renderData() {
                return {
                	ctips: this.ctips,
                	userInfo: this.userInfo,
                	num: this.num,
                    appCart: this.appCart,
                    expiredCartList: this.expiredCartList,
                    appFavorite: this.appFavorite,
                    clickNum: this.clickNum
                }
           	},
           	totalCount(){ //合计商品数量
           		let	count = 0;
           		
				this.appCartCampus.Products.forEach((p)=>{
					if (p.Type == 1 || p.Type == 3) { //班级
						count = count+1;
					}else if(p.Type == 2 || p.Type == 4){ //物品
						count = count + p.GoodsInfo.Amount;
					}
				});
				
				return count;
          	}
        },
        methods: {
        	...Vuex.mapMutations([
				'set_appCartCampus',
        		'set_appCart',
				'set_appFavorite',
                'set_expiredCartList'
			]),
            apiPromise() {
                let promise = Promise.all([
                        getAppCart(), 
                        getFavorites({
                            PageIndex:1,
                            PageSize:4
                        })
                    ]);

                promise.then(res => {
                    this.isLoading = false;
                    if ((res[0].ErrorCode==app.errok)&&(res[1].ErrorCode==app.errok)) {
						console.log(res[0].Data);
						res[0].Data.forEach((v,i)=> {
							v.Products.forEach((t, y)=> {
								if (t.hasOwnProperty('isSelect')) {
									t.isSelect = false;
								}
							})
						})
                        this.set_appCart(res[0].Data);
                        this.set_appFavorite(res[1].Data.slice(0,4));
                        this.set_appCartCampus({
                            "ID": "",
                            "Name": "",
                            "Products": []
                        });
                    }
                });
                return promise;
            },
        	renderPage(){
        		this.isLoading = true;
        		
        		this.apiPromise();
        	},
			colseCampusTips(){ //关闭"不同校区的商品不可一起购买"提示
				this.ctips = false;
			},
			emptyInvalid() { //清空失效商品
				this.isLoading = true;
				clearDisabledProducts().then(res => {
					this.isLoading = false;
					if (res.ErrorCode == app.errok) {
						this.set_expiredCartList([]);
					}else{
						app.toast('error', res.ErrorMsg);
					}
				})
			},
			payOrder(){ //去结算
				if (this.appCartCampus.Products.length == 0) {
					app.toast('info','请选择商品。');
					return;
				}
				this.$router.push({path:'/order',query:{type:1}});
			},
			openScheme(cid,pro){ //选择单科优惠
				this.selectSchemeCid = cid;
				this.selectSchemePro = pro;
				console.log(cid);
				console.log(pro);
				pro.isSelect = true;
				this.$refs.cartScheme.setDefaultScheme(pro.ChooseScheme);
				this.openedScheme = true;
			},
			selectScheme(cid,pro,obj){
				console.log(pro);
				// obj.isSelect = true;
				this.$refs.ShopList.updateScheme(cid,pro,obj);
			},
			refreshScroll(){
				this.clickNum++;
			}
        },
        created() {
        	if (this.appCart == -1) {
        		this.renderPage();
        	}
        },
        mounted() {
        	this.$on('scrollToTop', () => {
        	    this.$refs.cartScrollfer.scroller.scrollTo(0, 0);
        	})
        },
        watch: {
        	openedScheme(newVal) {
                this.$emit('openActionsheet', newVal);
            },
        	appCartLoadingFlag(newVal,oldVal){
        		this.isLoading = newVal;
			},
			vaildCartList(newVal, oldVal) {
				if (newVal.length != oldVal.length) {
					this.num++;
				}else {
					for (let index = 0; index < newVal.length; index++) {
						const element = newVal[index];
						if (element.Products.length != oldVal[index].Products.length) {
							this.num++;
							break;
						}
					}
				}
			}
        },
        components: {
        	ShopList,
        	EmptyCart,
        	SectionGrid,
        	CartScheme,
        	invalidshopList
        }
    };
</script>