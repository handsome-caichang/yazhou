<!-- 订单评价界面 -->
<style lang="scss" scoped>
    .order-comment {
        @include position-absolute;
		background-color: $color-white;
		.body{
			position: absolute !important;
			top: 0;
		    left: 0;
		    bottom: $h-2;
		    width: 100%;
		    .card{
				.card-hd{
					display: flex;
					padding: 12px;
					background-color: $color-assist-4;
					.img{
						display: inline-block;
						width: 100px;
						height: 75px;
						@include background-img(false,cover);
						background-color: $color-assist-1;
					}
					.info{
						flex: 1;
						margin-left: 15px;
						position: relative;
						.name{
						    position: absolute;
						    display: flex;
						    top: 0;
						    bottom: 0;
						    color: $color-3;
						    align-items: center;
						}
					}
				}
				.card-bd{
					position: relative;
					height: 200px;
					padding: 10px 15px;
					background-color: $color-white;
					textarea{
						resize: none;
						padding: 0;
						height: 180px;
						color: $color-9;
						font-size: $fs-normal-x;
						line-height: 21px;
						background-color: $color-white;
					}
					.num{
						position: absolute;
						bottom: 9px;
						right: 15px;
						font-size: $fs-normal;
						color: $color-9;
					}
				}
				.card-ft{
					@include border-top;
					background-color: $color-white;
					padding: $edge $edge 29px $edge;
					.level-hd{
						font-size: $fs-normal-x;
					}
					.level-bd{
						margin-top: $edge-x;
						@include flex-center();
						font-size: $fs-small-x;
						.level-bd-item{
							flex: 1;
							text-align: center;
							margin-right: 18px;
							background-color: #F5F5F5;
							border-radius: 50px;
							height: 25px;
							line-height: 25px;
							&:last-child{
								margin-right: 0;
							}
							&.active{
								background-color: $color-primary;
								color: $color-white;
							}
							svg{
								letter-spacing: 0;
								font-size: $fs-normal;
								margin-right: $void-s;
							}
						}
					}
				}
			}
		    .void{
		    	height: 9px;
		    	background-color: $color-assist-1;
		    }
		}
		.footer{
		    position: absolute !important;
		    left: 0;
		    bottom: 0;
		    width: 100%;
		    height: $h-2;
		    line-height: $h-2;
		    text-align: center;
		    color: $color-white;
		    font-size: $fs-big-s;
		    background-color: $color-primary;
		}
    }
    .scroller {
        @include position-absolute;
        overflow: hidden;
    }
</style>

<template>
	<div class="order-comment">
		<div class="body">
			<scroller-base class="scroller" :data="products">
				<div v-for="pro in products">
					<div class="card">
						<div class="card-hd">
							<span class="img" :style="'background-image:url('+pro.Image+')'"></span>
							<div class="info"><div class="name">{{pro.Name}}</div></div>
						</div>
						<div class="card-bd">
							<textarea placeholder="是否对孩子有帮助，教学是否认真负责，还有什么改进的建议和好点子，写点您真实的使用感受吧！" v-model="pro.Content" @input="inputEvent(pro)"></textarea>
							<span class="num">{{pro.Content.length}}/150</span>
						</div>
						<div class="card-ft">
							<div class="level-hd">本次消费整体体验如何？</div>
							<div class="level-bd">
								<div v-for="(item,index) in levelList" class="level-bd-item" :class="{'active':pro.Level==(index+1)}" @click="chooseLevel(pro,index)">
									<svg class="icon" aria-hidden="true">
										<use :xlink:href="item.icon"></use>
									</svg>{{item.text}}
								</div>
							</div>
						</div>
					</div>
					<div class="void"></div>
				</div>
			</scroller-base>
		</div>
		<div class="footer" @click="submitComment">发布</div>
		<loading v-if="isLoading"></loading>
		<loading v-if="submitLoading" :bgType='1'></loading>
	</div>
</template>

<script>
	 
	import { getOrderDetail,commentOrder } from 'api/lc';
	
	export default{
		name:'order-comment',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
				isLoading: true,
				submitLoading: false,
               	wxTitle:"订单评价",
               	products: [],
               	queryPara: null,
               	levelList:[{
		  			text: '一般',
		  			icon: '#icon-yiban'
		  		},{
		  			text: '满意',
		  			icon: '#icon-manyi'
		  		},{
		  			text: '非常满意',
		  			icon: '#icon-feichangmanyi'
		  		}]
            }
        },
		computed: {
			productIDs(){
				return this.products.map(pro => {
					return pro.ItemID
				})
			}
        },
        methods: {
        	...Vuex.mapMutations([
        		'set_orderListRefreshFlag',
        		'set_orderDetailRefreshFlag'
        	]),
        	inputEvent(item){
        		if (item.Content.length >= 150) {
        			item.Content = item.Content.substring(0,150);
        		}
        	},
        	chooseLevel(pro,level){ //选择评价等级
        		let index = this.productIDs.indexOf(pro.ItemID);
        		this.products[index].Level = (level+1);
        	},
        	submitComment(){ //提交评价
        		let flag = false,
        			submitProduct = [];
        		
        		this.products.forEach((pro)=>{
        			pro.Content = pro.Content.trim();
        			
        			submitProduct.push({
						ItemID: pro.ItemID,
						Content: pro.Content,
						Level: pro.Level,
        				Image1: '',
						Image2: '',
						Image3: '',
						Image4: ''
        			});
        			
        			if (!pro.Content) {
        				flag = true;
        			}
        		});
        		
        		if (flag) {
        			app.toast('info','评价内容不能为空。');
        			return;
        		}
        		
        		this.submitLoading = true;
        		commentOrder({
        			OrderID: this.queryPara.orderId,
        			Comments: submitProduct
        		}).then(res => {
        			this.submitLoading = false;
        			if (res.ErrorCode == app.errok) {
        				app.toast('success', '评价成功。');
        				if (this.queryPara.type == 1) { //从订单列表页进入
        					this.set_orderListRefreshFlag();
        				}else if (this.queryPara.type == 2) { //从订单详情页进入
        					this.set_orderDetailRefreshFlag();
        					this.set_orderListRefreshFlag();
        				}
        				this.$router.back();
        			}else{
        				app.toast('error', res.ErrorMsg);
        			}
        		})
        	}
        },
        created() {
        	this.queryPara = this.$route.query;
        	
        	getOrderDetail({
        		ID: this.queryPara.orderId
        	}).then(res => {
        		this.isLoading = false;
        		
        		if (res.ErrorCode == app.errok) {
        			this.products = [];
        			
					res.Data.Items.forEach((pro)=>{
						this.products.push({
							ItemID: pro.ID,
							Name: pro.Name,
							Image: pro.Image,
		        			Content: '',
							Level: 2
			        	})
					});
        		}else{
        			app.toast('error', res.ErrorMsg);
        		}
        	});
        }
	}
</script>