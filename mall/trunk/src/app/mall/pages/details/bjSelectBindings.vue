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
    				height: 20px;
    				font-size: 20px;
    				color: $color-black;
    				margin-bottom: $fs-big-s;
    			}
    			.apply-num{
    				font-size: $fs-normal;
    				height: $fs-normal;
    				color: $color-black;
    			}
    		}
    	}    	
    }
    .course{
		
		.select-seat{
			padding: 20px;
			@include flex-between;
			@include border-bottom;
			.select-seat-left{
				color: $color-6;
				font-size: $fs-small-x;
			}
			.select-seat-right{
				color: $color-primary;
				font-size: $fs-normal-s;
				.icon{
					color: $color-9;
				}
			}
		}
		.select-goods{
			padding: 20px $fs-big 20px 20px;
			@include border-bottom;
			// .select-goods-heard{
			// 	font-size: $fs-small-x;
			// 	color: $color-9;
			// }
			// .select-goods-content{
			// 	// margin-top: $fs-normal-x;
			// 	height: 35px;
			// 	@include flex-between;
			// 	font-size: $fs-normal;
			// 	color: $color-3;
			// 	.icon {
			// 		font-size: 18px;
			// 	}
			// }
			.select-goods-heard{
				font-size: $fs-small-x;
				color: $color-9;
				margin-bottom: 5px;
			}
			.select-goods-content{
				font-size: $fs-normal;
				color: $color-3;
				display: flex;
				margin-bottom: 10px;
				.select-goods-content-left {
					flex: 1;
					word-break: break-word;
					display: flex;
					margin-right: 15px;
					line-height: 18px;
					.icon-wrapper {
						font-size: 18px;
						margin-right: 5px;
					}
				}
				.select-goods-content-right {
					text-align: right;
					width: 100px;
				}
			}
			.active{
				color: $color-primary;
			}
		}
		.select-pay{
			padding: 20px;
			.select-pay-heard{
				font-size: $fs-small-x;
				color: $color-9;
			}
			.pay{
				@include flex-between;
				margin-top: 5px;
				height: 25px;
				font-size: $fs-normal;
				color: $color-3;
				.icon {
					font-size: 18px;
				}
			}
			.colorPrimary{
				color: $color-primary;
			}
			.colorAssist{
				color: $color-assist;
			}
		}
    }
    .bottom{
    	height: $h-1;
    	line-height: $h-1;
    	text-align: center;
    	font-size: $fs-big-s;
    	background: $color-assist;
    	color: $color-white;
    }
</style>

<template>
	<action-sheet
		@close="close"
		v-show="opened"
		:data="scrollerData">
		<!-- 课程商品 -->
		<div class="heard"  slot="header">
			<div class="heard-left">
				<div class="avatar" v-if="classInfo.Images" :style= '{"backgroundImage": `url(${classInfo.Images[0]})` }'></div>
			</div>
			<div class="heard-right">
				<span class="close" @click="close">
					<svg class="icon" aria-hidden="true">
                		<use xlink:href="#icon-guanbi"></use>
            		</svg>
				</span>
				<div class="right-bottom">
					<div class="price">&#165;{{classInfo.Money|formatNumber}}</div>
					<div class="apply-num">可报名额{{classInfo.Stock}}人</div>
				</div>
			</div>
		</div>
		<div class="course">
			<div class="select-goods" v-if="classInfo.Bindings&&!classInfo.IsMustBuyBindings&&classInfo.Bindings.length>=1">
				<div class="select-goods-heard">
					物品
				</div>
				<div class="select-goods-content" 
						v-for="(item,index) in classInfo.Bindings" 
						@click="selectBangdings(item,index)"
						:class="{active:selectBingsTemp[index]}">	
					<div class="select-goods-content-left">
						<div class="icon-wrapper">
							<svg class="icon" aria-hidden="true" v-if="!selectBingsTemp[index]">
		                		<use xlink:href="#icon-duoxuanweixuanzhong"></use>
		            		</svg>
							<svg class="icon" aria-hidden="true" v-else>
		                		<use xlink:href="#icon-duoxuanxuanzhong"></use>
		            		</svg>
						</div>
	            		{{item.Name}}
					</div>
					<div class="select-goods-content-right">&#165;{{item.Price|formatNumber}}</div>
				</div>
			</div>
			<div class="select-pay" v-if="classInfo.PayType==3">
				<div class="select-pay-heard">
					支付方式
				</div>
				<div class="pay" v-for='item in payList' @click="choicePay(item.ID)">
					<div class="select-goods-content-left">
						<span :class="{colorPrimary:item.ID === selectPayTypeTemp}">
							<svg class="icon" aria-hidden="true" >
		                		<use :xlink:href="item.ID===selectPayTypeTemp?item.value2:item.value1"></use>
		            		</svg>
						</span>
	            		{{item.text}}
					</div>
					<div class="select-goods-content-right" :class="{colorAssist:item.ID===selectPayTypeTemp}">&#165;{{item.Money|formatNumber}}</div>
				</div>
				
			</div>
		</div>
		<div class="bottom" @click="closeSelect" slot="footer">确定</div>
	</action-sheet>
</template>

<script>
	 
	export default{
		mixins: [app.mixin.popupWindowRouteMixin],
		components: {
		},
		props:{
			opened: {
				type: Boolean
			},
			classSelectObj: {
				type: Object
			},
			classInfo: {
				type: Object,
				default: () =>{
					return {}
				}
			},
			comeFrom: {
				type: Number,
				default: null
			},			
		},
		data() {
			return {
				showSelect: false,
				payType: null, //1为定金 2为全额
				payList:[
					{
						ID: 1,
						value1: '#icon-danxuanweizhong',
						value2: '#icon-danxuanxuanzhong1',
						text: '全额支付',
						isChoice: false,
						Money: this.classInfo.Money
					},
					{
						ID: 2,
						value1: '#icon-danxuanweizhong',
						value2: '#icon-danxuanxuanzhong1',
						text: '定金支付',
						isChoice: false,
						Money: this.classInfo.PreMoney
					}
				],
				selectBingsTemp: [],
				selectPayTypeTemp: null,
			}
		},
		computed: {
			scrollerData() {
				return {
					poened: this.opened,
					classInfo: this.classInfo
				}
			},
		},
		methods: {
			getSelectParam() {//根据主组件传进来的selectObj获取班级的选取信息
				if (this.classSelectObj.selectBings) {
					this.selectBingsTemp = app.tool.clone(this.classSelectObj.selectBings);
				} else {
					this.selectBingsTemp = []
				}
				this.selectPayTypeTemp = this.classSelectObj.selectPayType
			},
			close() {
				this.getSelectParam()
			    this.$emit('update:opened', false);
			},
	    	selectBangdings(item, index) {
	    		// let flag = this.selectBingsTemp.indexOf(item) > -1;
	    		let flag = app.tool.isObjectEqual(this.selectBingsTemp[index], item)
	    		if (!flag) {
	    			this.selectBingsTemp.splice(index, 1, item);
	    		} else {
	    			this.selectBingsTemp.splice(index, 1, "");
	    		}
	    	},
	    	
	    	choicePay(id) {
	    		this.selectPayTypeTemp = id;
	    	},
	    	//点击确定按钮
	    	closeSelect() {
	    		this.$emit('bjSelectBindingsOK', {
	    			selectBings: this.selectBingsTemp,
	    			selectPayType: this.selectPayTypeTemp
	    		})
	    		this.$emit('update:opened', false);
	    	},
	    	cancel() {
	    		this.getSelectParam();
	    		this._cancel();
	    	}
		},
		watch: {
			opened(val,oldVal) {
				if (val) {
					if (this.classSelectObj.selectPayType) this.selectPayTypeTemp = this.classSelectObj.selectPayType
					if (!this.selectBingsTemp.length) {
						for (let i = 0; i < this.classInfo.Bindings.length; i++) {
							this.selectBingsTemp.push('');
						}
					}
				}
			},
			classInfo(val,oldVal) {
				if (val) {
					this.payList[0].Money = this.classInfo.Money;
					this.payList[1].Money = this.classInfo.PreMoney;
					this.classInfo.Bindings.forEach(obj =>{
						this.selectBingsTemp.push("");
					})
				}
			},
			classSelectObj(val) {
				this.selectBingsTemp = app.tool.clone(val.selectBings);
			}

		}


	}
</script>