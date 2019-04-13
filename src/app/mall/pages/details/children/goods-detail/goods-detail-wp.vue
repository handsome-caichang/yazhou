<style lang="scss" scoped>
	
	
	.app-details-nav {
		@include position-absolute(0, 0, false, 0);
		@include border-bottom($color-border-1);
		display: flex;
		position: absolute !important;
		z-index: 11;
		background-color: $color-white;
		.app-details-nav-item {
		    flex: 1;
		    font-size: $fs-normal;
		    @include flex-center(column);
		    .text {
		        height: $h-2;
		        line-height: $h-2;
		        padding: 0 10px;
		    }
		    &.active {
		        color: $color-primary;
		        .text {
		            border-bottom: 2px solid $color-primary;
		        }
		    }
		}
	}
	.qrcode-wrapper {
	    @include position-absolute(0,0,49px,0);
	    // background-color: $color-white;
	    z-index: 20;
	}

    .bottom{
        @include position-absolute(false, false, 0, false);
        border-top: 1px solid $color-border;
        display: flex;
        width: 100%;
        height: $h-1;
        // margin-top: 20px;
        background-color: $color-white;
        .shop-car, .collect, .not-sell{
            width: 19%;
            line-height: $h-1;
            text-align: center;
            font-size: 20px;
            @include border-right;
        }
        .not-sell {
            width: 100%;
            background-color: rgba(178,178,178,1);
            color: $color-white;
        }
        .click-wrapper {
            flex: 1;
            display: flex;
        }
        .show-wrapper {
            flex: 1;
        }
        .qrcode {
            flex: 1;
            text-align: center;
            line-height: 49px;
        }
        .sign-up{
            @include border-right;
            // @include border-left;
            &.none {
                display: none;
            }
        }
        .sign-up, .join-car{
            flex: 1;
            line-height: $h-1;
            text-align: center;
            font-size: $fs-big-s;
            color: $color-primary;
        }
        .join-car{
            background-color: $color-primary;
            color: $color-white;
        }
        .shop-car{
            position: relative;
            .circle{
		        min-width: 16px;
			    height: 16px;
			    color: $color-white;
			    line-height: 16px;
			    padding: 0 4px;
			    font-size: $fs-small-s;
			    border-radius: 8px;
			    background-color: $color-assist;
			    text-align: center;
                @include position-absolute(6px,12px,false,false);
            }
        }
    }

    .select{
        @include position-absolute(0,0,0,0);
        z-index: 20;
    }
    .loading {
        z-index: 999;
    }
	.empty-page {
		@include position-absolute(0, 0, 0, 0);
        z-index: 20;
	}
</style>


<template>
	<div>
		<div class="app-details-nav" :style="{opacity: opacity}">
		    <div class="app-details-nav-item"
		        v-for="(item, index) in details.list"
                :key="index"
		        :class="{active: index === details.activeIndex}"
		        @click="scrollIndex(index)">
		        <div class="text">{{item.text}}</div>
		    </div>
		</div>
		<keep-alive>
			<GoodsDetailWp  
				 ref="GoodsDetailWp"
				:info="goodsInfo"
                :goodsSkuObj="goodsSkuObj"
				:selectSpecs="detailGoodsSpec"
				:refeshStr="refeshStr"
				:timeTag="timeTag"
                :details="details"
                :opacity="opacity"
                :evaluateObj="evaluateObj"
                :issueObj="issueObj"
				@openIssue="openIssue"
                @goEvaluate="goEvaluate"
				@changeSpec="showSelectSpecs"
                @sendQuestion="sendQuestion"
                @scrollOpacity="scrollOpacity"
				>
			</GoodsDetailWp>
		</keep-alive>

		<div class="bottom">
		    <div @click="gotoCart" class="shop-car" v-if="!userInfo.IsEmployee">
		        <div class="circle" v-if="num>0">{{num>99?'99+':num}} </div>
		        <svg class="icon" aria-hidden="true">
		            <use xlink:href="#icon-gouwuche1"></use>
		        </svg>
		    </div>
		    <div class="collect" @click="collectAction">
		        <svg class="icon" aria-hidden="true">
		            <use :xlink:href="isFavorite.value ? isFavorite.iconAction : isFavorite.icon"></use>
		        </svg>
		    </div>
		    <div class="click-wrapper" v-if="timeTag==''&& !userInfo.IsEmployee">
		        <div class="sign-up" 
		            @click="addCart">
		            加入购物车
		        </div>
		        <!-- <div class="sign-up"
		             v-show="isShowQuestion" 
		             @click="sendQuestion">
		            去提问
		        </div> -->
		        <div class="join-car" @click="shopGoods" v-if="config.EnableBuyNow">立即购买</div>
		    </div>
		    <div v-if="timeTag!==''&&!userInfo.IsEmployee" class="show-wrapper">
		        <div class="not-sell" v-if="remainingTime!=''">{{remainingTime|formatSeconds(':')}}&nbsp;&nbsp;&nbsp;后开售</div>
		        <div class="not-sell" v-if="timeText!=''&&remainingTime==''">{{timeText}}</div>
		    </div>
		    <div class="qrcode" v-if="userInfo.IsEmployee" @click="showQrCode=!showQrCode">点击生成二维码</div>
		</div>
		<qr-code class="qrcode-wrapper" :opened.sync="showQrCode"></qr-code>
		<wp-select-specs class="select"  
		    @addCart="addCart"
		    @nowBuy="shopGoods"
		    @selectSpecsObj="getSelectInfo"
		    @changeNum="changeNum"
		    :selectSpecs="detailGoodsSpec"
		    :tag="tag"
		    :goodsNum="goodsNum"
		    :opened.sync="openedSpec"
		    :goodsInfo="goodsInfo">
		</wp-select-specs>

		<question 
			v-show="openQuestion"
			:opened.sync="openQuestion"
		    :goodsInfo="goodsInfo"
		    @closeQuestion="closeQuestion">
		</question>

		 <GoodsEvaluate 
			:refeshStr="refeshStr"
        	v-show="evaluateFlag"
        	:opened.sync="evaluateFlag"
            @closeEvaluate="closeEvaluate"
            >
        </GoodsEvaluate>

        <GoodsIssue 
			:refeshStr="refeshStr"
        	v-show="issueFlag"
        	:opened.sync="issueFlag"
            @closeIssue="closeIssue"
            @sendQuestion="sendQuestion"
            >
        </GoodsIssue>

        <loading v-show="showLoading" class="loading" style="z-index:999"></loading>
		<empty-page :type="10" v-show="showEmptyPage" class="empty-page"></empty-page>
	</div>
</template>

<script>
	import {getGoodsDetail,goodsAddShopCar,getOutline,getShopCarNum,classAddShopCar,addFavorites,deleteFavorites,getRatings,getQuestions} from 'api/yy'
	 
	import GoodsDetailWp from './wp.vue'
	import GoodsEvaluate from '../goods-evaluate/goods-evaluate.vue'
    import GoodsIssue from '../goods-issue/goods-issue.vue'
    import WpSelectSpecs from '../../wpSelectSpecs'
    import Question from '../../question'
    import EmptyPage from 'common/empty-page/empty-page'
    import {commonDetail} from './common-detail'
    import QrCode from './qrcode'
	export default {
		mixins: [commonDetail],
		data() {
			return {
				evaluateObj: {
					Data: []
				},
                issueObj: {
					Data: []
				},
                opacity: 0,
				details: {
				    activeIndex: 0,
				    list: [{
				        text: '详情', 
				        component: GoodsDetailWp
				    },{
				        text: '评价',
				        component: GoodsEvaluate
				    },{
				        text: '提问',
				        component: GoodsIssue
				    }]
				},

				isFavorite: {
				    value: false,
				    icon: '#icon-xihuan',
				    iconAction: '#icon-xihuan1'
				},

				goodsInfo: {},
				num: 0,
				isShowQuestion: false,

				openedSpec: false,
				tag: 1,
				detailGoodsSpec: [],
				goodsSkuObj: {},
				goodsNum: 1,
				openQuestion: false,
				showLoading: true,
				showEmptyPage: false,
				refeshStr: '',

				timeTag: '',
				timeText: '',
				remainingTime: '',
				setInt: '',//计时器
				
				showQrCode: false,
				issueFlag: false,
                evaluateFlag: false
			}
		},
		computed: {
			...Vuex.mapState(['userInfo','orderCampus','curCampus','config','companySuffix']),
		},
		methods: {
			...Vuex.mapMutations([
            	'set_goodsDetailCampus',
            	'set_cartListRefreshFlag',
            ]),
            emitLoadDataComplete(args) {
            	this.$emit("loadDataComplete", args)
            },
			renderPage() {
				Promise.all([
				    getGoodsDetail({ProductID:this.$route.params.ID, IsPreview: this.$route.query.isPreview}),
				    getShopCarNum(),
                    getRatings({ProductID: this.$route.params.ID,PageIndex: 1,PageSize: 20}),
                    getQuestions({ProductID: this.$route.params.ID,PageIndex: 1,PageSize: 20})
				]).then((res) =>{
				    if (res[0].ErrorCode == app.errok) {
				        this.goodsInfo = res[0].Data;
				        if (this.goodsInfo.ApplyStartTime && this.goodsInfo.ApplyEndTime) {
				            // this.goodsInfo.ApplyStartTime = '2018/01/5 14:38:00+0800'
				            // this.goodsInfo.ApplyEndTime = '2018/01/15 17:19:00+0800'
				            this.showTimeTag(this.goodsInfo.ApplyStartTime, this.goodsInfo.ApplyEndTime)
				            if (this.remainingTime >0) {
				                this.setInt = setInterval(() =>{
				                    this.remainingTime --
				                    if (this.remainingTime == 0) {
				                        clearInterval(this.setInt)
				                        this.timeTag = ''
				                        this.renderPage()
				                    }
				                }, 1000)
				            }
				        }
				        this.num = res[1].Data;
				        this.isFavorite.value = this.goodsInfo.IsFavorite;
						// this.emitLoadDataComplete(this.goodsInfo.Name);
						// 针对于ios webp格式的图片处理
						if (this.goodsInfo.DetailText && app.isWKWebview) {
							this.goodsInfo.DetailText = this.goodsInfo.DetailText.replace(/\/webp/g, '/jpg');
						}
                        this.emitLoadDataComplete({
                            name: this.goodsInfo.Name,
                            desc: this.goodsInfo.Descrite
                        })
				    } else if(res[0].ErrorCode == 400) {
				    	this.showEmptyPage = true
					} 
					this.evaluateObj = res[2];
                    this.issueObj = res[3];
		    		this.showLoading = false;
				})
			},
			sendQuestion() {//去提问
				if(this.checkIsPreview()) {
                    return
                }
			    if (app.control.loginCheck(this)) {
			        this.openQuestion = true;
			    }
			},
			checkIsPreview() {
				if(this.$route.query.isPreview == 'true') {
					app.toast('info','该商品处于预览状态');
                    return true
                } else {
                    return false
                }
			},
			gotoCart() {
				if(this.checkIsPreview()) {
                    return
                }
			    if (app.control.loginCheck(this)) {
			        this.$router.push({path:'/cart'});
			    }
			},
			closeQuestion(param) {
			    this.openQuestion = false;
			    this.refeshStr = param.text;
			},
			collectAction() {
				if(this.checkIsPreview()) {
                    return
                }
				if (!this.clickTime('collect', 2000)) {
				    app.toast('info','点太快了哦。');
				    return 
				}
				if (app.control.loginCheck(this)) {
				    if (!this.isFavorite.value) {
				        addFavorites({ID: this.$route.params.ID, type: parseInt(this.$route.params.type)}).then(res =>{
				            if (res.ErrorCode === app.errok) {
				                app.toast('success','已收藏到我喜欢。');
				                this.isFavorite.value = true;
				            }
				        })
				    } else {
				        deleteFavorites({IDs: [this.$route.params.ID]}).then(res =>{
				            if (res.ErrorCode === app.errok) {
				                app.toast('success','取消收藏成功。');
				                this.isFavorite.value = false;
				            }
				        })
				    }
				}
			},
			showSelectSpecs(boolean) {
				this.openedSpec = boolean;
				this.tag = 1;
			},
			getSelectInfo(obj) {//获取到wpselectSpecs组件发送过来的选取信息
				this.detailGoodsSpec = obj.goodsSpecs
				this.goodsSkuObj = obj.goodsSkuObj
			},
			addCart(obj) {
				if(this.checkIsPreview()) {
                    return
                }
				if (app.control.loginCheck(this)) {
					if (this.goodsInfo.Specs.length && !obj.goodsSkuObj) {
					    this.tag = 2;
					    this.openedSpec = true;
					    return;
					}
					if (this.goodsSkuObj.Stock < this.goodsNum) {
						app.toast('info', '您购买的数量大于库存')
						return
					}
					if ((this.goodsInfo.Specs.length && this.goodsSkuObj.Stock) || (!this.goodsInfo.Specs.length && this.goodsInfo.Stock)) {
					    let params = {
					        ProductID: this.goodsInfo.ID,
					        SpecID:  obj.goodsSkuObj && obj.goodsSkuObj.ID,
					        Amount: this.goodsNum
					    }
					    goodsAddShopCar(params).then(res =>{
					        if (res.ErrorCode != 200) {
					            app.toast('error',res.ErrorMsg);
					        }else{
					            this.set_cartListRefreshFlag();
					            this.num = res.Data;
					            app.toast('success','加入购物车成功。');
					        }
					    });
					} else {
					    app.toast('info','该商品此规格无库存。');
					}
				}
			},
			shopGoods(obj) {
				if(this.checkIsPreview()) {
                    return
                }
				if (app.control.loginCheck(this)) {
					//如果物品存在spc,但是用户却没选,弹出选择框
					if (this.goodsInfo.Specs.length && !this.goodsSkuObj.ID) {
					    this.tag = 3;
					    this.openedSpec = true;
					    return;
					}
					/*if (this.goodsSkuObj.ID && !this.goodsSkuObj.Stock) {
						app.toast('info', '此规格无库存')
						return
					}*/
					if (this.goodsSkuObj.Stock < this.goodsNum) {
						app.toast('info', '您购买的数量大于库存')
						return
					}
					//如果用户选择的spc的库存为0
					if ((this.goodsInfo.Specs.length && this.goodsSkuObj.Stock) || (!this.goodsInfo.Specs.length && this.goodsInfo.Stock)) {
					    this.set_goodsDetailCampus({
					        /*"ID": this.curCampus.id,
					        "Name": this.curCampus.name,*/
					        "ID": this.goodsInfo.CampusID,
					        "Name": this.goodsInfo.CampusName,
					        "Products": [{
					            ID: null,
					            ProductID: this.goodsInfo.ID,
					            Name: this.goodsInfo.Name,
					            Image: this.goodsInfo.Image,
					            Type: this.goodsInfo.Type,
					            ClassInfo: null,
					            GoodsInfo: {
					                ProductSpecID: (obj.goodsSkuObj && obj.goodsSkuObj.ID) || this.goodsSkuObj.ID || '',
					                Specs: obj.goodsSpecs || this.detailGoodsSpec,
					                Unit: this.goodsInfo.Unit,
					                Amount: this.goodsNum || 1
					            },
					            IsExpired: false, //后端没返回此字段
					            ExpiredReason: null,
					            Price: this.goodsSkuObj.Price ? this.goodsSkuObj.Price : this.goodsInfo.Money,
					            // Money: this.goodsInfo.Money,
					            IsPreMoney: false,
					            Bindings: []
					        }]
					    })
					} else {
					    app.toast('info','该商品此规格无库存。');
					    return;
					}
					this.$router.push({path:'/order',query:{type:2}});
				}
			},
			changeNum(num) {
				this.goodsNum = this.goodsNum + num;
			},
            scrollIndex(index) {
                this.$refs.GoodsDetailWp.scrollTo(index);
            },
            scrollOpacity(opacity) {
                this.opacity = opacity;
			},
			openIssue() {
                this.issueFlag = true;
            },
            goEvaluate() {
                this.evaluateFlag = true;
            },
			closeIssue() {
				this.issueFlag = false;
			},
			closeEvaluate() {
				this.evaluateFlag = false;
			},
		},
		created() {
            window.a = this
			this.renderPage()
			this.clickTime = app.tool.timeControl()
		},
		components: {
			WpSelectSpecs,
			Question,
			EmptyPage,
			QrCode,
			GoodsDetailWp,
			GoodsEvaluate,
            GoodsIssue
		}
	}
</script>