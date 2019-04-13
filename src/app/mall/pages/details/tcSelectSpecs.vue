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
		.classify{
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
						color: $color-white;
						background: $color-primary;
						border: 1px solid $color-primary;
					}
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
    
</style>

<template>
	<!-- v-if="strArrTemp.length > 0" -->
	<action-sheet 
	:scrollerStyle="scrollerStyle"
	:data="scrollerData"
	@close="myClose"
	v-show="opened"
	>	
		<div class="heard" slot="header" v-if="goodsInfo">
			<div class="heard-left">
				<div class="avatar" v-if="goodsInfo.Image" :style= '{"backgroundImage": `url(${goodsInfo.Image})` }'></div>
			</div>
			<div class="heard-right">
				<span class="close" @click="myClose">
					<svg class="icon" aria-hidden="true">
                		<use xlink:href="#icon-guanbi"></use>
            		</svg>
				</span>
				<div class="right-bottom">
					<div class="price">&#165;{{goodsPrice|formatNumber}}</div>
					<div class="apply-num">库存{{goodsStock}}件</div>
				</div>
			</div>
		</div>
		
		<!-- 物品商品 -->
		<div class="goods" v-if="goodsInfo.GoodsInfo">
			<div class="classify" v-if="goodsInfo.GoodsInfo.Specs">
				<div class="classify-content" v-for="(item,i) in goodsInfo.GoodsInfo.Specs">
					<div class="title">{{item.Name}}</div>
					<div class="content">
							<!-- v-if="strArrTemp&&strArrTemp.length" -->
						<span class="name" v-for="str in item.Values" 
							:class="{active:str===strArrTemp[i].Value}"
							@click="selectSpec(i,str)" >
							{{str}}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div slot="footer" class="bottom-2" @click="jumpOrder">确定</div>
	</action-sheet>
</template>

<script>
	import {getPackageSpecInfo} from 'api/yy'
	 
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		components: {
		},
		props:{
			opened: {
				type: Boolean
			},
			goodsInfo: {
				type: Object,
				
			},
			packageInfo: {
				type: Object
			},
			productsIsSelectArr: {
				type: Array,
			},
			tcIndex: {
				type: Number
			}
		},
		data() {
			return {
				// showSelect: false,
				scrollerStyle: {
					// "max-height": "90vh"
				},
				strArrTemp: [],
				specsObj: {}, //物品sku信息

				isGetSKU: false,

				goodsStock: 0,//物品库存
				goodsPrice: 0,
				SpecID: null	
			}
		},
		computed: {
			lastPrice() {
				let price = this.specsObj.Price ? this.specsObj.Price : this.goodsInfo.Money;
				return price;
			},
			scrollerData() {
				return {
					poened: this.opened,
					goodsInfo: this.goodsInfo
				}
			},
		},
		methods: {
			getStrTemp() {
				let index = this.tcIndex,
					obj = app.tool.clone(this.productsIsSelectArr[this.tcIndex])
				if (!obj) {
						this.isGetSKU = false;
						/*this.goodsStock = 0;*/
						this.goodsPrice = this.goodsInfo.Money;
						this.strArrTemp = [];
						this.goodsInfo.GoodsInfo.Specs.forEach(obj =>{
						this.strArrTemp.push('');
					})
				} else {
					this.isGetSKU = true;
					this.goodsStock = obj.Stock;
					this.goodsPrice = obj.Price;
					this.strArrTemp = obj.strArrTemp;
				}
			},
	    	selectSpec(i, str) {
	    		let isAllSelected = true, arr = [];
    			this.strArrTemp.splice(i, 1, {
	    			Name: this.goodsInfo.GoodsInfo.Specs[i].Name,
	    			Value: str
	    		});
	    		this.strArrTemp.forEach(item => {
	    			if (!item) {
	    				isAllSelected = false;
	    			}
	    		})
	    		// debugger
	    		// isAllSelected = this.strArrTemp.includes('');
	    		if(isAllSelected) {
	    			this.strArrTemp.forEach((item, index) =>{
	    				arr.push({
	    					ID: this.goodsInfo.GoodsInfo.Specs[index].ID,
	    					Value: item.Value
	    				})
	    			})
	    			this.isGetSKU = false;
		    		getPackageSpecInfo({
	    				ProductID: this.goodsInfo.ID,
	    				PackageID: this.packageInfo.ID,
		    			Specs: arr
		    		}).then(res =>{
		    			if (res.ErrorCode == app.errok) {
		    				this.isGetSKU = true;
		    				// this.specsObj = res.Data;
		    				this.goodsPrice =  res.Data.Price;
		    				this.goodsStock = res.Data.Stock;
		    				this.SpecID = res.Data.ID
		    			}	
		    		})
	    		}
	    	},
	    	jumpOrder(str) {
	    		let obj = {
	    			strArrTemp: this.strArrTemp,
	    			Stock: this.goodsStock,
	    			Price: this.goodsPrice,
	    			SpecID: this.SpecID
	    		}
	    		if (!this.isGetSKU) {
	    			app.toast('info','请选择规格。');
	    			return
	    		}
	    		if (this.goodsStock <= 0) {
	    			app.toast('info','此规格无库存');
	    			return
	    		}
    			this.$emit('tcSelectSpecOK', obj);
    			this.close();
	    	},
            myClose() {
                this.isGetSKU = false
                this.close()
            }
		},
		created() {
			window.a = this;
			// this.goodsStock = this.goodsInfo.Stock;
			if (this.goodsInfo.GoodsInfo && this.goodsInfo.GoodsInfo.Specs.length) {
				this.getStrTemp();
			}
		},
		watch: {
            goodsInfo(val) {
                if (val && !this.isGetSKU) {
                    this.goodsPrice = this.goodsInfo.Money;
                    this.goodsStock = this.goodsInfo.Stock;
                }
            },
			opened(val,oldVal) {
				if (val) {
					this.getStrTemp();
				}
                if (!this.isGetSKU) {
                    this.goodsPrice = this.goodsInfo.Money;
                    this.goodsStock = this.goodsInfo.Stock;
                }
			}
		}
	}
</script>