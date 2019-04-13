<!-- 购物车有效商品列表界面  -->

<style lang="scss" scoped>
	.shop-list{
		background-color: $color-assist-1;
		.list-wrap{
			margin-bottom: 9px;
			background-color: $color-white;
			.list-header{
				height: $h-3;
				line-height: $h-3;
				@include flex-between;
				@include border-bottom;
				font-size: $fs-normal-x;
				.cname{
					max-width: 80%;
					@include ellipsis-single;
					.cname-icon{
						display: inline-block;
						text-align: center;
						@include dynamic-wh(50px, 0.8,true);
						.icon{
							color: $color-9;
							font-size: 20px;
							&.active{
								color: #F03232;
							}
						}
					}
				}
				.edit{
					padding: 0px 18px;
				}
			}
			.list-body{
				line-height: 1;
				.row{
					@include border-bottom;
					position: relative;
					.void {
					    height: 2px;
						background-color: $color-assist-1;
					}
					.row-hd{
						display: flex;
						position: relative;
						.body-left{
							@include flex-center;
							margin-top: 15px;
							@include dynamic-wh(50px, 1.5,true);
							.icon{
								font-size: 20px;
								color: $color-9;
								&.active{
									color: #F03232;
								}
							}
						}
						.body-right{
							flex: 1;
							padding: 15px 15px 15px 0;
							.body-right-content {
								display: flex;
								.goods-img{
									@include dynamic-wh(100px, 0.75,true);
									@include background-img(false,cover);
									background-color: $color-assist-1;
								}
								.goods-info{
									position: relative;
									flex: 1;
									margin-left: 8px;
									.name{
										font-size: $fs-normal-x;
										color: $color-3;
										line-height: $fs-big-s;
										@include ellipsis-multi;
										.package-tag {
											display: inline-block;
											height: 100%;
											width: 27px;
											text-align: center;
											border: 1px solid #F66B68;
											color: #F03232;
											font-size: 10px;
											margin-right: 5px;
										}
									}
									.quantity{
										display: flex;
									    padding-bottom: 10px;
									    margin-top: 10px;
										color: $color-9;
										.minus,
										.add{
											width: 38px;
											height: 24px;
											@include flex-center;
											background-color: $color-assist-3;
										}
										.num{
											width: 44px;
											height: 24px;
											margin: 0 2px;
											color: $color-3;
											font-size: $fs-big-s;
											@include flex-center;
											background-color: $color-assist-3;
										}
									}
									.detail{
										height: 15px;
										line-height: 15px;
										@include flex-between;
										.icon{
											font-size: 12px;
											padding-right: 6px;
											vertical-align: middle;
										}
										.price{
											color: $color-assist;
											font-size: $fs-big-s;
										}
										.count{
											color: $color-9;
											font-size: $fs-small-x;										
										}
									}
								}
							}
							.package {
							    padding: 0 12px;
							    .package-info {
							        padding: 13px 10px;
							        font-size: 12px;
							        .heard {
							            color: $color-3;
							        }
							        .item {
							            display: flex;
							            margin-top: 13px;
							            color: $color-6;
							            .item-left {
							                flex: 1;
							            }
							            .item-right {
							                flex: 1;
							                text-align: right;
							            }
							        }
							    }
							}
						}
					}
				}
				.row-left {
					background: #E84E3C;
					color: $color-white;
					letter-spacing: 3px;
					position: absolute;
					right: -100px;
					top: 0;
					width: 74px;
					height: 100%;
					text-align: center;
					@include flex-center;
				}
			}
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
</style>

<template>
	<div class="shop-list">
		<div v-for="item in campusList" class="list-wrap" v-if="item.Products.length>0">
			<!-- 校区名称区域 -->
			<div class="list-header">
	        	<span class="cname" @click="selectAllProduct(item)">
	        		<span class="cname-icon">
	        			<svg class="icon" aria-hidden="true" :class="{active:judgeSelectAll(item)}">
		        			<use :xlink:href="judgeSelectAll(item)?'#icon-danxuanxuanzhong':'#icon-danxuanweixuanzhong'"></use>
		        		</svg>
	        		</span>{{item.Name}}
	        	</span>
	        	<!-- <span class="edit" @click="editSingleCampus(item)">{{item.EDIT?"完成":"编辑"}}</span> -->
			</div>
			<!-- 商品区域 -->
			<div class="list-body">
				<!-- 商品列表 -->
				<slide-left class="row" v-for="(product, index) in item.Products" :key="index">
					<div v-if="index!==0" class="void"></div>
					<div class="row-hd">
						<!-- 单选区域 -->
						<div class="body-left" @click="selectProduct(product,item)">
							<svg class="icon" aria-hidden="true" :class="{active:judgeSelect(product,item.ID)}">
				        		<use :xlink:href="judgeSelect(product,item.ID)?'#icon-danxuanxuanzhong':'#icon-danxuanweixuanzhong'"></use>
				        	</svg>
						</div>
						<!-- 详情区域展示 -->
						<div class="body-right" @click="gotoDetail(product,item.EDIT)">
							<div class="body-right-content">
								<span class="goods-img" :style="'background-image:url('+product.Image+')'"></span>
								<div class="goods-info">
									<!-- 物品数量编辑 -->
									
									<!-- 名称 -->
									<div class="name">
										<span class="package-tag">套餐</span>
										<span>{{product.Name}}</span>
									</div>
									<div class="quantity" v-if="product.Type==2||product.Type==4">
										<div class="minus" @click.stop="changeAmount(item.ID,product,-1)">
											<svg class="icon" aria-hidden="true">
												<use xlink:href="#icon-jianshaoicon"></use>
											</svg>
										</div>
										<div class="num">{{product.GoodsInfo.Amount}}</div>
										<div class="add" @click.stop="changeAmount(item.ID,product,1)">
											<svg class="icon" aria-hidden="true">
												<use xlink:href="#icon-iconzengjia"></use>
											</svg>
										</div>
									</div>
									<div v-else class="quantity"><label>规格：</label>10课时</div>
									
									
									<!-- 价格数量 -->
									<div class="detail">
										<span class="price">&#165;{{product.Price|formatNumber}}</span>
										<span @click.stop="showPackageDetail">共4件
											<svg class="icon" aria-hidden="true">
												<use xlink:href="#icon-slideDown"></use>
											</svg>
										</span>
									</div>
								</div>
							</div>
							<div class="package" v-if="Math.random()>0.5">
				                <div class="package-info">
				                    <div class="heard">套餐项目</div>
				                    <div class="item" v-for="item in packageArr">
				                        <div class="item-left">{{item.name}}</div>
				                        <div class="item-right">{{item.spec}}</div>
				                    </div>
				                </div>
				            </div>
						</div>
					</div>
					<div class="row-left" @click="deleteProduct(item.ID,product)" data-enableClick="true">
						删除
					</div>
				</slide-left>
			</div>
		</div>
	</div>
</template>

<script>
     
    import { removeShoppingCart,updateamount } from 'api/lc';
	
	export default {
		name: 'shop-list',
		props: {
			campusList: { //接收当前购物车有效商品的校区数组
				type: Array,
				default: []
			}
		},
		data() {
			return {
				packageArr: [{
				    name: '19春吉他初级班',
				    spec: '20课时'
				}, {
				    name: '19春架子鼓初级班',
				    spec: '30课时'
				}, {
				    name: '王牌木吉他',
				    spec: '1把'
				}]
			}
		},
        computed: {
        	...Vuex.mapState([
        		'appCartCampus',
        		'appCart',
				'vaildCartList',
				'config',
        	]),
        	cartIDs(){ //获取创建订单的商品购物车ID数组
        		return this.appCartCampus.Products.map(pro => {
					return pro.ID
				})
        	},
        	vaildCart(){
        		return app.tool.clone(this.vaildCartList);
        	}
		},
		created(){
			if (this.campusList.length > 0) {
				if (this.config.EnableSelectAllProductInShoppingCart == '1') {
					this.set_appCartCampus(this.campusList[0]);
				}
			}
		},
		methods:{
			...Vuex.mapMutations([
				'set_appCartCampus',
				'set_appCartLoadingFlag',
				'set_vaildCartList'
			]),
			gotoDetail(pro,flag){ //查看商品详情
				if(!flag){
					this.$router.push({path:`/details/${pro.Type}/${pro.ProductID}`});
				}
			},
			getIDs(params){ //获取ID数组
				return params.map(param => {
					return param.ID
				})
			},
			judgeSelect(pro,cid){ //判断单选
				if ((cid===this.appCartCampus.ID)&&(this.cartIDs.indexOf(pro.ID)!==-1)) { //同一个校区
					return true;
				}
				return false;
        	},
			judgeSelectAll(cam){ //判断全选
				if ((cam.ID===this.appCartCampus.ID)&&(cam.Products.length===this.appCartCampus.Products.length)) {
					return true;
				}
				return false;
			},
			selectProduct(pro,cam){ //单选商品
				let newPro = app.tool.clone(pro);
				
				if (this.appCartCampus.ID !== cam.ID) { //当前校区无选中商品
					this.set_appCartCampus({
			    		"ID": cam.ID,
				    	"Name": cam.Name,
				    	"Products": [newPro]
					});
				}else{ //当前校区已有选中商品
					let index = this.cartIDs.indexOf(newPro.ID),
						newProducts = app.tool.clone(this.appCartCampus.Products);
					
					//判断当前商品是否选中：已选->splice，未选->push
					if (index == -1) {
						newProducts.push(newPro);
					}else{
						newProducts.splice(index,1);
					}
					
					this.set_appCartCampus({
			    		"ID": cam.ID,
				    	"Name": cam.Name,
				    	"Products": newProducts
					});
				}
			},
			selectAllProduct(cam){ //校区全选商品
				let newCampus = app.tool.clone(cam);
				if ((this.appCartCampus.ID===cam.ID)&&(this.appCartCampus.Products.length===cam.Products.length)) {
					this.set_appCartCampus({
			    		"ID": "",
				    	"Name": "",
				    	"Products": []
					});
				}else{
					this.set_appCartCampus(newCampus);
				}
			},
			/*editSingleCampus(cam){ //校区编辑：修改vuex里面的vaildCartList
				let cindex = this.getIDs(this.vaildCart).indexOf(cam.ID),
					newCampus = this.vaildCart[cindex];
					
				if(typeof newCampus.EDIT == 'undefined'){//判断是否未定义，如果没点击过编辑按钮，则需要先注册EDIT属性
					this.$set(newCampus,"EDIT",true);
				}else{
					newCampus.EDIT = !newCampus.EDIT;
				}
				//修改vuex里面的vaildCartList
				this.set_vaildCartList(this.vaildCart);
				this.$emit('refreshScroll');
			},*/
			changeAmount(cid,pro,way){ //修改物品数量
				let amount = pro.GoodsInfo.Amount;
				
				if(way>0){
					amount = amount+1;
					this.set_appCartLoadingFlag(true);
					this._updateamount(cid,pro,amount);
				}else{
					if(amount>1){ //当数量少于1个时,保持1不变
						amount = amount-1;
	  					this.set_appCartLoadingFlag(true);
						this._updateamount(cid,pro,amount);
					}else{
						app.toast('info','数量不能再减少啦。');
					}
				}
			},
			deleteProduct(cid,pro){ //删除商品
				app.confirm('确定删除该商品吗？').then(res => {
	  				if (res === true) {
	  					this.set_appCartLoadingFlag(true);
	  					
						removeShoppingCart({
							IDs: [pro.ID]
						}).then(res => {
	  						this.set_appCartLoadingFlag(false);
							if(res.ErrorCode == app.errok){
								//修改vuex里面的vaildCartList
								let cindex = this.getIDs(this.vaildCart).indexOf(cid),
									pindex = -1,
									products = [];
								
								if(cindex !== -1){
									products = this.vaildCart[cindex].Products;
									pindex = this.getIDs(products).indexOf(pro.ID);
									if(pindex !== -1){
										products.splice(pindex,1);
										if(products.length === 0){
											this.vaildCart.splice(cindex,1);
										}
									}
								}
								this.set_vaildCartList(this.vaildCart);
								
								//已选商品=>需要修改vuex数据
								if(this.appCartCampus.ID === cid){
									let index = this.cartIDs.indexOf(pro.ID),
										newProducts = app.tool.clone(this.appCartCampus.Products);
								
									if (index !== -1) { //当前点击为已选商品
										newProducts.splice(index,1);
									}
									
									this.set_appCartCampus({
										"ID": this.appCartCampus.ID,
										"Name": this.appCartCampus.Name,
										"Products": newProducts
									});
								}
							}else{
								app.toast('error', res.ErrorMsg);
							}
						});
	  				}
	  			})
			},
			
			_updateamount(cid,pro,amount){ //更新购物车商品数量
				updateamount({
					'ID': pro.ID,
					'Amount': amount
				}).then(res => {
  					this.set_appCartLoadingFlag(false);
					
					if(res.ErrorCode == app.errok){
						let cindex = this.getIDs(this.vaildCart).indexOf(cid),
							pindex = -1,
							products = [];
						
						//修改vuex里面的vaildCartList
						if(cindex !== -1){
							products = this.vaildCart[cindex].Products;
							pindex = this.getIDs(products).indexOf(pro.ID);
							if(pindex !== -1){
								products[pindex].GoodsInfo.Amount = amount;
								products[pindex].Schemes = res.Data.Schemes;
								
								//设置最优单科优惠
								let bestIndex = -1;
								if (products[pindex].Schemes.length>0) {
									products[pindex].Schemes.forEach((scheme,sIndex)=>{
										if (scheme.IsBest) {
											bestIndex = sIndex;
										}
									});
									products[pindex].ChooseScheme = bestIndex == -1 ? '' : products[pindex].Schemes[bestIndex];
								}else{
									products[pindex].ChooseScheme = null;
								}
							}
						}
						this.set_vaildCartList(this.vaildCart);
						
						//当前校区为已选中，需要修改vuex数据
						if(this.appCartCampus.ID === cid){
							let index = this.cartIDs.indexOf(pro.ID),
								newProducts = app.tool.clone(this.appCartCampus.Products);
								
							if (index !== -1) { //当前点击为已选商品
								let product = newProducts[index],
									schemeIndex = -1;
								
								product.GoodsInfo.Amount = amount;
								product.Schemes = res.Data.Schemes;
								
								// 设置最优单科优惠
								if (product.Schemes.length>0) {
									product.Schemes.forEach((scheme,sIndex)=>{
										if (scheme.IsBest) {
											schemeIndex = sIndex;
										}
									});
									product.ChooseScheme = schemeIndex == -1 ? '' : product.Schemes[schemeIndex];
								}else{
									product.ChooseScheme = null;
								}
								
								this.set_appCartCampus({
						    		"ID": this.appCartCampus.ID,
							    	"Name": this.appCartCampus.Name,
							    	"Products": newProducts
								});
							}
						}
					}else{
						app.toast('error', res.ErrorMsg);
					}
				});
			},

			showPackageDetail() {
				console.log('1111111111');
			}
		}
	}
</script>