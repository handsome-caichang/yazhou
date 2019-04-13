<style scoped lang="scss">
	
    
    .heard{
    	padding: $fs-normal-x;
    	display: flex;
    	// justify-content: space-between;
    	// @include border-bottom;
    	.heard-left {
    		width: 39%;
    		.avatar{
    			width: 100%;
    			height: 0;
    			padding-top: 75%;
    			@include background-img(false, cover);
				background-color: $color-assist-1;
    		}
    	}
    	.heard-right{	
    		width: 61%;
    		position: relative;
    		.close{
    			position: absolute;
    			display: inline-block;
    			top: 3px;
    			right: 0;
    			font-size: 20px;
    			border: 1px solid $color-9;
    			border-radius: 100%;
    			text-align: center;
    			line-height: 20px;
    		}
    		.right-bottom{
    			padding-left: $fs-normal-x;
    			position: absolute;
    			left: 0;
    			bottom: 0;
    			.price{
    				color: $color-assist;
    				height: 20px;
    				font-size: 20px;
    				margin-bottom: $fs-big-s;
    			}
    			.apply-num{
    				font-size: $fs-normal;
    				height: $fs-normal;
    				color: $color-6;
    			}
    		}
    	}
    	
    }
    .goods{
		padding: 0 20px 10px 20px;
		@include border-bottom;
		.classify{
			@include border-bottom;
			.classify-content{
				padding: 20px 0 10px 0;
				.title{
					font-size: $fs-small-x;
					color: $color-6;
				}
				.content{
					margin-top: $fs-small-x;
					display: flex;
					flex-wrap: wrap;
					.name{
						margin-bottom: 10px;
						display: inline-block;
						height: 30px;
						line-height: 30px;
						border: 1px solid $color-assist-1;
						font-size: $fs-normal;
						text-align: center;
						margin-right: $fs-normal;
						color: $color-3;
						border-radius: 4px;
						padding-right: 12px;
						padding-left: 12px;
						background: $color-assist-1;
					}
					.active{
						/* color: $color-primary;
						border: 1px solid $color-primary; */
						color: $color-white;
						background: $color-primary;
						border: 1px solid $color-primary;
					}
				}
			}
		}
		.num{
			padding: 20px 0;
			.num-heard{
				font-size: $fs-small-x;
				color: $color-6;
			}
			.num-content{
				margin-top: 17px;
				.self-width{
					width: 34px;
				}
				.add{
					display: inline-block;
					background-color: $color-assist-3;
					height: 34px;
					line-height: 34px;
					text-align: center;
				}
				.value{
					padding-left: 20px;
					padding-right: 20px;
				}

			}
		}

    }
    .bottom-2 {
    	height: $h-1;
    	line-height: $h-1;
    	text-align: center;
    	font-size: $fs-big-s;
    	background: $color-assist;
    	color: $color-white;
    }
    .bottom-1 {
		height: $h-1;
    	line-height: $h-1;
    	text-align: center;
    	font-size: $fs-big-s;
    	color: $color-white;
		@include flex-between;
		.bottom-cart {
			flex: 1;
			background-color: $color-assist;
		}
		.bottom-buy {
			flex: 1;
			background-color: $color-primary;			
		}

	}
</style>

<template>
	<!-- v-if="strArrTemp.length > 0" -->
	<action-sheet 
		:data="scrollerData"
		@close="closeSelect"
		v-show="opened">	
		<div class="heard" slot="header">
			<div class="heard-left">
				<div class="avatar" v-if="goodsInfo.Images" :style= '{"backgroundImage": `url(${goodsInfo.Images[0]})` }'></div>
			</div>
			<div class="heard-right">
				<span class="close" @click="closeSelect">
					<svg class="icon" aria-hidden="true">
                		<use xlink:href="#icon-guanbi"></use>
            		</svg>
				</span>
				<div class="right-bottom">
					<div class="price">&#165;{{nowPrice|formatNumber}}</div>
					<div class="apply-num">库存{{goodsStock}}件</div>
				</div>
			</div>
		</div>
		
		<!-- 物品商品 -->
		<div class="goods">			
			<div class="classify" v-if="goodsInfo.Specs">
				<div class="classify-content" v-for="(item,i) in goodsInfo.Specs">
					<div class="title">{{item.Name}}</div>
					<div class="content">
						<span class="name" v-for="str in item.Values" 
							:class="{active:str===strArrTemp[i].Value}"
							@click="selectSpec(i,str)" >
							{{str}}
						</span>
					</div>
				</div>
			</div>
			<div class="num">
				<div class="num-heard">数量</div>
				<div class="num-content">
					<span class="add self-width" @click="changeNum(-1)">
						<svg class="icon" aria-hidden="true">
                    		<use xlink:href="#icon-jianshaoicon"></use>
                		</svg>
					</span>
					<span class="add value">{{goodsNum}}</span>
					<span class="add self-width" @click="changeNum(1)">
							<svg class="icon" aria-hidden="true">
	                    		<use xlink:href="#icon-iconzengjia"></use>
	                		</svg>
					</span>
				</div>
			</div>
		</div>

		<div v-if="tag===1" slot="footer" class="bottom-1">
			<div class="bottom-cart" @click="jumpOrder('cart')">加入购物车</div>
			<div class="bottom-buy" @click="jumpOrder('buy')" v-if="config.EnableBuyNow">立即购买</div>
		</div>
		<div v-if="tag!==1" slot="footer" class="bottom-2" @click="jumpOrder">确定</div>
	</action-sheet>
</template>

<script>
	import {getSpecInfo} from 'api/yy'
	 
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		components: {
		},
		props:{
			opened: {
				type: Boolean
			},
			selectSpecs: {
				type: Array
			},
			goodsInfo: {
				type: Object,
				
			},
			goodsNum: {
				type: Number,
				default: 1
			},
			tag: {
				type: Number,
				default: 1 //1表示从选择规格弹出,2表示加入购物车弹出
			}
			
		},
		data() {
			return {
				strArrTemp: [],
				specsObj: {}, //物品sku信息

				isGetSKU: false,

				nowPrice: null,
				goodsStock: 0//物品库存
					
			}
		},
		computed: {
			...Vuex.mapState(['config']),
			scrollerData() {
				return {
					poened: this.opened,
					goodsInfo: this.goodsInfo
				}
			}
		},
		methods: {
			/*close() {
			    this.$emit('update:opened', false);
			},*/
			changeNum(num) {
				if (num > 0 && this.goodsNum < this.goodsStock) {
					this.$emit('changeNum', num)
				}
				if (num < 0 && this.goodsNum + num > 0) {
					this.$emit('changeNum', num)
				}
			},
	    	selectSpec(i, str) {
	    		let isAllSelected = true, arr = [];

	    		this.strArrTemp.splice(i, 1, {
	    			Name: this.goodsInfo.Specs[i].Name,
	    			Value: str
	    		});

	    		this.strArrTemp.forEach(item => {
	    			if (!item) {
	    				isAllSelected = false;
	    			}
	    		})
	    		if(isAllSelected) {
	    			this.strArrTemp.forEach((item, index) =>{
	    				arr.push({
	    					ID: this.goodsInfo.Specs[index].ID,
	    					Value: item.Value
	    				})
	    			})
	    			this.isGetSKU = false;
		    		getSpecInfo({
	    				ProductID: this.goodsInfo.ID,
		    			Specs: arr
		    		}).then(res =>{
		    			if (res.ErrorCode == app.errok) {
		    				this.isGetSKU = true;
		    				this.specsObj = res.Data;
		    				this.goodsStock = this.specsObj.Stock;
		    				this.nowPrice = res.Data.Price;
		    			}	
		    		})
	    		}
	    	},
	    	//点击关闭按钮
	    	closeSelect() {
	    		if  (this.isGetSKU) {
		    		this.$emit('selectSpecsObj', {
		    			goodsSpecs: this.strArrTemp,
		    			goodsSkuObj: this.specsObj,
		    		})
	    		}
				this.close();
	    	},
	    	cancel() {
	    		// this.set_detailGoodsNum(this.goodsNumTemp);
	    		// if  (this.isGetSKU) {
		    	// 		this.set_detailGoodsSpec(app.tool.clone(this.strArrTemp));
		    	// 		this.set_detailSpecsObj(this.specsObj);
	    		// }
	    	    this._cancel();
	    	},
	    	jumpOrder(str) {
	    		if (this.goodsInfo.Specs.length == 0) {
	    			this.emitEvent(str);
	    		}else {
		    		if (this.isGetSKU) {
		    			
		    			if (this.specsObj.Stock <= 0) {
		    				app.toast('info','该商品缺货。');
							return ;
		    			}
		    			if (this.specsObj.Stock < this.goodsNum) {
		    				app.toast('info','购买数量不能大于库存');
							return ;
		    			}
		    			
		    			/*this.set_detailGoodsSpec(app.tool.clone(this.strArrTemp));
		    			this.set_detailSpecsObj(this.specsObj);*/
		    			this.$emit('selectSpecsObj', {
		    				goodsSpecs: this.strArrTemp,
		    				goodsSkuObj: this.specsObj,
		    			})
						this.emitEvent(str);
		    		} else {
		    			app.toast('info','请选择规格。');
		    		}
	    		}
	    	},
	    	emitEvent(str) {
	    		this.close();
	    		setTimeout(() => {
	    			if (str === 'cart' || this.tag == 2) {
	    				this.$emit('addCart',  {
		    				goodsSpecs: this.strArrTemp,
		    				goodsSkuObj: this.specsObj,
		    			});
	    			}
	    			if (str === 'buy' || this.tag == 3) {
	    				this.$emit('nowBuy', {
		    				goodsSpecs: this.strArrTemp,
		    				goodsSkuObj: this.specsObj,
		    			});
	    			}
	    		}, 100)
	    	},

		},
		watch: {
			opened(val,oldVal) {
				if (val) {
					/*this.goodsNumTemp = this.goodsNum || 1;*/
					if (this.selectSpecs.length > 0) {
						this.strArrTemp = app.tool.clone(this.selectSpecs);
					}
				}
			},
			goodsInfo(val, oldVal) {
				this.goodsStock = this.goodsInfo.Stock;
				this.nowPrice = this.goodsInfo.Money;
				this.goodsInfo.Specs.forEach( item => {
					this.strArrTemp.push("");
				})
			}
		}
	}
</script>