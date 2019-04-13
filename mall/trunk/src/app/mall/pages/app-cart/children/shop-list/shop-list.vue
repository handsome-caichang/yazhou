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
								color: $color-primary;
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
									color: $color-primary;
								}
							}
						}
						.body-right{
							flex: 1;
							padding: 15px 15px 15px 0;
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
								padding-bottom: 15px;
								.name{
									// padding-bottom: 10px;
									font-size: $fs-normal-x;
									color: $color-3;
									line-height: $fs-big-s;
									@include ellipsis-multi;
									// word-break: break-all;
								}
								.quantity{
									display: flex;
								    padding-bottom: 10px;
									color: $color-9;
									.minus,
									.add{
										width: 38px;
										height: 34px;
										@include flex-center;
										background-color: $color-assist-3;
									}
									.num{
										width: 44px;
										height: 34px;
										margin: 0 2px;
										color: $color-3;
										font-size: $fs-big-s;
										@include flex-center;
										background-color: $color-assist-3;
									}
								}
								.content{
									div{
										color: $color-6;
										padding-bottom: 5px;
										font-size: $fs-small-x;
										label{
											color: $color-9;
										}
										&:last-child{
											padding-bottom: 0;
										}
									}
									margin-bottom: 8px;
								}
								.detail{
									position: absolute;
								    left: 0px;
								    right: 0;
								    bottom: 0;
									height: 15px;
									line-height: 15px;
									@include flex-between;
									.icon{
										font-size: 27px;
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
					}
					.row-bd{
						padding: 0 18px 0 50px;
						background-color: #FFFCEE;
						font-size: $fs-small;
						.row-bd-title{
							padding: 4px 0;
							position: absolute;
						}
						.row-bd-content{
							padding-left: 60px;
							.item{
								color: $color-9;
								padding: 4px 0;
								@include flex-between;
								.item-name{
									max-width: 70%;
									@include ellipsis-single;
								}
							}
						}
					}
					.row-ft{
						display: flex;
						font-size: $fs-normal-s;
						padding: 13px 28px 13px 15px;
						@include border-top($color-assist-4);
						.row-ft-content{
							flex: 1;
							padding-left: 10px;
							text-align: right;
							color: $color-3;
						}
						.icon{
							color: $color-border-2;
						    position: absolute;
						    top: 0;
						    bottom: 0;
						    right: 10px;
						    margin: auto;
						}
					}
					.row-delete{
						position: absolute;
					    right: 0;
					    top: 0;
					    bottom: 0;
					    width: 55px;
					    @include flex-center;
					    color: $color-white;
					    font-size: $fs-big-s;
					    background-color: $color-assist;
					}
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
	        	<span class="edit" @click="editSingleCampus(item)">{{item.EDIT?"完成":"编辑"}}</span>
			</div>
			<!-- 商品区域 -->
			<div class="list-body">
				<!-- 商品列表 -->
				<div class="row" v-for="(product, index) in item.Products">
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
							<span class="goods-img" :style="'background-image:url('+product.Image+')'"></span>
							<div class="goods-info">
								<!-- 物品数量编辑 -->
								<div class="quantity" v-if="((product.Type==2||product.Type==4)&&item.EDIT)">
									<div class="minus" @click="changeAmount(item.ID,product,-1)">
										<svg class="icon" aria-hidden="true">
											<use xlink:href="#icon-jianshaoicon"></use>
										</svg>
									</div>
									<div class="num">{{product.GoodsInfo.Amount}}</div>
									<div class="add" @click="changeAmount(item.ID,product,1)">
										<svg class="icon" aria-hidden="true">
											<use xlink:href="#icon-iconzengjia"></use>
										</svg>
									</div>
								</div>
								<!-- 名称 -->
								<div class="name" v-if="!((product.Type==2||product.Type==4)&&item.EDIT)">{{product.Name}}</div>
								<!-- 班级详情 -->
								<div v-if="product.Type==1&&product.ClassInfo" class="content">
									<div v-if="product.ClassInfo.Date"><label>开班日期：</label>{{product.ClassInfo.Date}}</div>
									<div v-if="product.ClassInfo.CourseTime"><label>上课时间：</label>{{product.ClassInfo.CourseTime}}</div>
									<div v-if="(product.ClassInfo.SeatRow>0)&&(product.ClassInfo.SeatColumn>0)"><label>已选座位：</label><!-- {{product.ClassInfo.SeatRow}}排{{product.ClassInfo.SeatColumn}}座 -->
										{{product.ClassInfo.SeatName}}
									</div>
									<div v-if="product.ClassInfo.PackageAmount">
										<label>课程数量：</label>{{product.ClassInfo.PackageAmount}}{{product.ClassInfo.Unit}}
									</div>
								</div>
								<!-- 课程详情 -->
								<div v-if="product.Type==3&&product.ShiftInfo" class="content">
									<div v-if="product.ShiftInfo.ClassName"><label>所选班级：</label>{{product.ShiftInfo.ClassName}}</div>
									<div v-if="product.ShiftInfo.Date"><label>开班日期：</label>{{product.ShiftInfo.Date}}</div>
									<div v-if="product.ShiftInfo.CourseTime"><label>上课时间：</label>{{product.ShiftInfo.CourseTime}}</div>
									<div v-if="(product.ShiftInfo.SeatRow>0)&&(product.ShiftInfo.SeatColumn>0)"><label>已选座位：</label><!-- {{product.ShiftInfo.SeatRow}}排{{product.ShiftInfo.SeatColumn}}座 -->
										{{product.ShiftInfo.SeatName}}
									</div>
									<div v-if="product.ShiftInfo.PackageAmount">
										<label>课程数量：</label>{{product.ShiftInfo.PackageAmount}}{{product.ShiftInfo.Unit}}
									</div>
								</div>
								<!-- 物品详情 -->
								<div v-if="(product.Type==2||product.Type==4)&&(product.GoodsInfo.Specs.length>0)" class="content">
									<div v-for="Spec in product.GoodsInfo.Specs">
										<label>{{Spec.Name}}：</label>{{Spec.Value}}
									</div>
								</div>
								<!-- 价格数量 -->
								<div class="detail">
									<span class="price">&#165;{{product.Price|formatNumber}}</span>
									<span v-if="product.Type==2||product.Type==4" class="count">x{{product.GoodsInfo.Amount}}</span>
								</div>
							</div>
						</div>
					</div>
					<!-- 班级绑定物品区域 -->
					<div class="row-bd" @click="gotoDetail(product,item.EDIT)" v-if="(product.Type==1||product.Type==3)&&(product.Bindings.length>0)">
						<div class="row-bd-title">已选物品：</div>
						<div class="row-bd-content">
							<div class="item" v-for="binding in product.Bindings">
								<div class="item-name">{{binding.Name}}</div>
								<div>&#165;{{binding.Price|formatNumber}}</div>
							</div>
						</div>
					</div>
					<!-- 单科优惠区域 -->
					<div class="row-ft" 
						v-if="product.Schemes.length>0" 
						@click="openScheme(item.ID,product,item.EDIT)">
						<span>优惠活动</span>
						<div class="row-ft-content">
							{{product.ChooseScheme?product.ChooseScheme.Name:'不使用优惠'}}
						</div>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-xiangxia"></use>
						</svg>
					</div>
					<!-- 删除区域  -->
					<div class="row-delete" v-show="item.EDIT" @click="deleteProduct(item.ID,product)">删除</div>
				</div>
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
			editSingleCampus(cam){ //校区编辑：修改vuex里面的vaildCartList
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
			},
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
			openScheme(cid,pro,flag){ //选择单科优惠
				if(!flag){
					this.$emit('openScheme',cid,pro);
				}
			},
			updateScheme(cid,pro,obj){ //修改单科优惠
				let cindex = this.getIDs(this.vaildCart).indexOf(cid),
					pindex = -1,
					products = [];
				
				//修改vuex里面的vaildCartList
				if(cindex !== -1){
					products = this.vaildCart[cindex].Products;
					pindex = this.getIDs(products).indexOf(pro.ID);
					if(pindex !== -1){
						products[pindex].ChooseScheme = obj;
					}
				}
				this.set_vaildCartList(this.vaildCart);
				
				//已选商品=>需要修改vuex数据
				if(this.appCartCampus.ID === cid){
					let index = this.cartIDs.indexOf(pro.ID),
						newProducts = app.tool.clone(this.appCartCampus.Products);
						
					if (index !== -1) {
						let product = newProducts[index];
						
						product.ChooseScheme = obj;
						
						this.set_appCartCampus({
				    		"ID": this.appCartCampus.ID,
					    	"Name": this.appCartCampus.Name,
					    	"Products": newProducts
						});
					}
				}
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
			}
		}
	}
</script>