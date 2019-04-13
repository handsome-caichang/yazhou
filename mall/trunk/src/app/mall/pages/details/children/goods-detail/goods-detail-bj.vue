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
    .xyx-info {
        @include position-absolute(false, 0, 49px, 0);
        z-index: 20;
        font-size: 11px;
        color: $color-white;
        text-align: center;
        padding: 4px 10px;
        word-break: break-word;
        background-color: rgba(0, 0, 0, .8);
    }
    .bottom{
        @include position-absolute(false, false, 0, false);
        border-top: 1px solid $color-border;
        display: flex;
        width: 100%;
        height: $h-1;
        // margin-top: 20px;
        background-color: $color-white;
        .shop-car, .collect{
            width: 19%;
            line-height: $h-1;
            text-align: center;
            font-size: 20px;
            @include border-right;
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
        .sign-up, .join-car, .not-sell{
            flex: 1;
            line-height: $h-1;
            text-align: center;
            font-size: $fs-big-s;
            color: $color-primary;
        }
        .not-sell {
            background-color: rgba(178,178,178,1);
            color: $color-white;
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
        .xyx-none {
            background-color: #b2b2b2;
            color: #fff;
        }
        .xgn-none {
            display: none;
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
        z-index: 30;
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
        <GoodsDetailBj  
            ref="GoodsDetailBj"
			:info="classInfo"
			:classSelectObj="classSelectObj"
			:outLine="outLine"
			:teacherList="teacherList"
			:seatObj="seatObj"
            :seatInfo="seatInfo"
			:refeshStr="refeshStr"
            :details="details"
            :evaluateObj="evaluateObj"
            :issueObj="issueObj"
            @openIssue="openIssue"
            @goEvaluate="goEvaluate"
            @sendQuestion="sendQuestion"
            @scrollOpacity="scrollOpacity"
			@changeBings="boolean => {openedBings = boolean}"
			@changeSeat="boolean => {openSeat = boolean}">
		</GoodsDetailBj>

        <div class="xyx-info" v-if="classInfo.AllowType==1">
            {{classInfo.PromptMsg}}
        </div>
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
		        <!-- :class="{none:classInfo.PayType==2||detailChoicePayType==2||type==100}" -->
            <div class="click-wrapper" v-if="timeTag==''&& !userInfo.IsEmployee">
    		    <div class="sign-up" 
    		        @click="addCart"
                    :class="{none:classInfo.PayType==2||classSelectObj.selectPayType==2,
                             'xyx-none':classInfo.AllowType==1||classInfo.AllowType==2,
                             'xgn-none':config.EnableHideShoppingCart_Online==1}"
    		        >
    		        加入购物车
    		    </div>
    		    <!-- <div class="sign-up"
    		         v-show="isShowQuestion" 
    		         @click="sendQuestion">
    		        去提问
    		    </div> -->
                     <!-- v-if="config.EnableBuyNow" -->
                <div class="join-car"
                     v-if="config.EnableBuyNow"
                     @click="shopGoods" 
                     :class="{'xyx-none':classInfo.AllowType==1||classInfo.AllowType==2}">
                 立即报名</div>
            </div>
            <div v-if="timeTag!==''&&!userInfo.IsEmployee" class="show-wrapper" >
                <div class="not-sell" v-if="remainingTime!=''">{{remainingTime|formatSeconds(':')}}&nbsp&nbsp&nbsp后开售</div>
                <div class="not-sell" v-if="timeText!=''&&remainingTime==''">{{timeText}}</div>
            </div>
            <div class="qrcode" v-if="userInfo.IsEmployee" @click="showQrCode=!showQrCode">点击生成二维码</div>
		</div>
        <qr-code class="qrcode-wrapper" :opened.sync="showQrCode"></qr-code>
		<select-bindings class="select"
            :classInfo="classInfo"
            :classSelectObj="classSelectObj"
            @bjSelectBindingsOK="bjSelectBindingsOK"
            :opened.sync="openedBings">
        </select-bindings>

        <select-seat
            :ClassID="classInfo.ClassID"
            :opened.sync="openSeat"
            :seatObj="seatObj"
            :isAddCar="isAddCar"
            @selectSeat="selectSeat"
            @hasSelectSeat="hasSelectSeat">
        </select-seat>

            <!-- v-show="showQuestion" -->
        <question 
        	v-show="openQuestion"
        	:opened.sync="openQuestion"
            :classInfo="classInfo"
            @closeQuestion="closeQuestion">
        </question>

          
        <GoodsEvaluate 
			:classSelectObj="classSelectObj"
			:outLine="outLine"
			:seatObj="seatObj"
            :seatInfo="seatInfo"
			:refeshStr="refeshStr"
        	v-show="evaluateFlag"
        	:opened.sync="evaluateFlag"
            @closeEvaluate="closeEvaluate"
            >
        </GoodsEvaluate>

        <GoodsIssue 
			:classSelectObj="classSelectObj"
			:outLine="outLine"
			:seatObj="seatObj"
            :seatInfo="seatInfo"
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
	import {getClassInfo,getOutline,getShopCarNum,classAddShopCar,addFavorites,deleteFavorites,getRatings,getQuestions} from 'api/yy'
	 
	import GoodsDetailBj from './bj.vue'
	import GoodsEvaluate from '../goods-evaluate/goods-evaluate.vue'
    import GoodsIssue from '../goods-issue/goods-issue.vue'
    import GoodsTeacher from '../goods-teacher/goods-teacher.vue'
    import SelectBindings from '../../selectBindings'
    import SelectSeat from '../../SelectSeat'
    import Question from '../../question'
    import EmptyPage from 'common/empty-page/empty-page'
    import QrCode from './qrcode'
    import {commonDetail} from './common-detail'
    import {detail} from './detail'
    
	export default {
        mixins: [detail, commonDetail],
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
				    list:  []
				},
				isFavorite: {
				    value: false,
				    icon: '#icon-xihuan',
				    iconAction: '#icon-xihuan1'
				},
				classInfo: {},//班级详情
				outLine: [],//课程大纲
				num: 0,
				classSelectObj: {},
				teacherList: [],

				openedBings: false,
				openSeat: false,
                isAddCar: null,
				openQuestion: false,
				seatObj: {},
                seatInfo: '',//选座信息
				refeshStr: '',//更新提问界面刷新

				showLoading: true,
				showEmptyPage: false,

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
            shiftSpecID() {
                let id, arr 
                if (this.classSelectObj.selectSpecs) {
                    arr = this.classSelectObj.selectSpecs.filter(obj =>obj.isSelect)
                    if(arr.length) id = arr[0].ID
                }
                return id
            }
		},
		methods: {
			...Vuex.mapMutations([
            	'set_seatPosition',
            	'set_goodsDetailCampus',
            	'set_cartListRefreshFlag',
            	'set',
            ]),
			renderPage() {
				this.details.list =  [
				    {
				        text: '详情',
				        component: GoodsDetailBj
				    },{
				        text: '老师',
				        component: GoodsTeacher
				    },{
				        text: '评价',
				        component: GoodsEvaluate
				    },{
				        text: '提问',
				        component: GoodsIssue
				    }
				];
                if (this.config.EnableDisplayTeacher == 0) {
                    this.details.list.splice(1, 1)
                }
				Promise.all([
				    getClassInfo({ProductID: this.$route.params.ID, IsPreview: this.$route.query.isPreview}),
				    getOutline({ProductID: this.$route.params.ID}),
                    getShopCarNum(),
                    getRatings({ProductID: this.$route.params.ID,PageIndex: 1,PageSize: 20}),
                    getQuestions({ProductID: this.$route.params.ID,PageIndex: 1,PageSize: 20})
				]).then((res) =>{
				    if (res[0].ErrorCode == app.errok && res[1].ErrorCode == app.errok) {
                        this.classInfo = res[0].Data;
                        // 针对于ios webp格式的图片处理
						if (this.classInfo.DetailText && app.isWKWebview) {
							this.classInfo.DetailText = this.classInfo.DetailText.replace(/\/webp/g, '/jpg');
						}
                        //初始化价格以及规格参数
                        this.classInfo.ShiftSpecList.sort(app.tool.compare('Price'))
                        this.classInfo.ShiftSpecList.forEach((obj, index) => {
                            if (index == 0) {
                                this.$set(obj, 'isSelect', true)
                            } else {
                                this.$set(obj, 'isSelect', false)
                            }
                        })
                        this.classInfo.Details.forEach(obj => {
                            if (obj.Name == '上课次数' && this.classInfo.ShiftSpecList.length) {
                                obj.Value = this.classInfo.ShiftSpecList[0].Amount + this.classInfo.Unit
                            }
                        })
                        //新概念教育定制
                        if (this.config.EnableHideCourseCount_Online === 1) {
                            this.classInfo.Details = this.classInfo.Details.filter(obj => obj.Name !== '上课次数')
                        }
                        if (this.classInfo.ShiftSpecList.length) {
                            this.classInfo.Money = this.computedShowMoney(this.classInfo.ShiftSpecList)
                        }
                        this.classSelectObj.selectSpecs = this.classInfo.ShiftSpecList
                        //初始化购买方式
                        if (this.classInfo.Bindings.length) {
                            this.classSelectObj['selectBings'] = []
                        }
                        if (this.classInfo.PayType === 3) {
                            this.classSelectObj['selectPayType'] = 1
                        }
				        if (res[0].Data.TopTeachers.length == 0) {
				            this.details.list.splice(1, 1);
				        } else {
				            this.teacherList = this.classInfo.TopTeachers;
				        }
                        if (this.classInfo.ApplyStartTime && this.classInfo.ApplyEndTime) {
                            // this.classInfo.ApplyStartTime = '2018/01/5 13:59:00+0800'
                            // this.classInfo.ApplyEndTime = '2018/01/14 17:19:00+0800'
                            this.showTimeTag(this.classInfo.ApplyStartTime, this.classInfo.ApplyEndTime)
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
				        this.outLine = res[1].Data;
                        
				        this.num = res[2].Data;
                        if (this.classInfo.CurrentSeat) {
                            this.seatObj = {
                                coloum: this.classInfo.CurrentSeat.Column,
                                row: this.classInfo.CurrentSeat.Row,
                                SeatName: this.classInfo.CurrentSeat.Name
                            }
                        }
				        this.isFavorite.value = this.classInfo.IsFavorite;
                        // this.emitLoadDataComplete(this.classInfo.Name);
                        this.emitLoadDataComplete({
                            name: this.classInfo.Name,
                            desc: this.classInfo.Descrite
                        })
				    } else if(res[0].ErrorCode == 400){
                        //找不到班级 后台返回400错误码
				    	this.showEmptyPage = true;
                    }
                    this.evaluateObj = res[3];
                    this.issueObj = res[4];
			        this.showLoading = false;
				})
			},
			bjSelectBindingsOK(obj) {//监听选购买方式和绑定物品
                this.classSelectObj = obj;
                let arr = obj.selectSpecs.filter(item => item.isSelect)
                let arr1 = obj.selectBings.filter(item => item)
                let num, money, price
                if (arr.length) {
                    num = arr[0].Amount
                    if (arr1.length) {
                        let price = 0
                        arr1.forEach(item => {
                            price = price + item.Price
                        })
                        money = arr[0].Price + price
                    } else {
                        money = arr[0].Price
                    }
                }
                num && this.classInfo.Details.forEach(obj => {
                    if (obj.Name == '上课次数') {
                        obj.Value = num + this.classInfo.Unit
                    }
                })
                if (money) this.classInfo.Money = money
            },
            applyAddCart(seatObj) {
                let params = {
                        ProductID: this.classInfo.ID,
                        SeatRow: seatObj && seatObj.row,
                        SeatColumn: seatObj && seatObj.coloum,
                        // Bindings: this.computedBings,
                        IsPreMoney: false, //现在固定为false
                        Bindings: this.classSelectObj.selectBings && this.classSelectObj.selectBings.filter(obj =>{
                            return obj != ''
                        }).map(obj =>{
                            return obj.ID
                        }) || [],
                        ShiftSpecID: this.shiftSpecID
                    }
                classAddShopCar(params).then(res =>{
                    if (res.ErrorCode != 200) {
                         app.toast('error',res.ErrorMsg);
                    }else{
                        this.set_cartListRefreshFlag();
                        this.num = res.Data;
                        app.toast('success','加入购物车成功。');
                    }
                })
            },
            addCart() {//加入购物车
                //小赢星定制需求
                if (this.classInfo.AllowType === 1 || this.classInfo.AllowType === 2) return
            	//预览状态
                if(this.checkIsPreview()) {
                    return
                }
            	if (app.control.loginCheck(this)) {
	            	if (this.classInfo.IsStockOut) {
	            	    app.toast('info','该班级已满员。');
	            	    return;
	            	}
                    if (this.classInfo.IsMustSelectSeat && !this.seatObj.coloum) {
                        // app.toast('info','您还没有选座位。');
                        this.isAddCar = 'addCar'
                        this.openSeat = true;
                    } else {
                        this.applyAddCart(this.seatObj)
                    }
	            	
            	}
            },
            applyNowBuy(seatObj) {
                // if (this.classInfo.IsMustSelectSeat && !this.seatObj.coloum) {
                //     app.toast('info','您还没有选座位。');
                //     return;
                // }
                //所报班级满员
                
                let Teachers,stratDate,CourseTime;
                this.classInfo.Details.forEach(obj =>{
                    if (obj.Name == '上课时间') {
                        CourseTime = obj.Value
                    }
                });
                let arr = [], arr2 = [];
                arr = app.tool.clone(this.classSelectObj.selectBings) || [];
                    
                if (arr.length > 0) {
                    arr2 = arr.filter(obj =>{
                        return obj != "";
                    })
                    arr2.forEach(obj =>{
                        obj.Amount = 1;
                        obj.ProductID = obj.ID;
                        obj.ID = null;
                    })
                }
                this.set_goodsDetailCampus({
                    /*"ID": this.curCampus.id,
                    "Name": this.curCampus.name,*/
                    "ID": this.classInfo.CampusID,
                    "Name": this.classInfo.CampusName, 
                    "Products": [{
                        ID: null,
                        ProductID: this.classInfo.ID,
                        Name: this.classInfo.Name,
                        Image: this.classInfo.Image,
                        Type: this.classInfo.Type,
                        ClassInfo: {
                            Teachers: this.classInfo.Teachers,
                            ClassRoom: this.classInfo.ClassRoomName,
                            // Date: stratDate,
                            SeatRow: seatObj && seatObj.row,
                            SeatColumn: seatObj && seatObj.coloum,
                            SeatName: seatObj && seatObj.SeatName,
                            CourseTime: CourseTime,
                            ShiftSpecID: this.shiftSpecID,
                            ShiftSpecList: this.classSelectObj.selectSpecs
                        },
                        GoodsInfo: null,
                        Amount: this.classInfo.Amount,
                        Unit: this.classInfo.Unit,
                        IsExpired: false, //后端没返回此字段
                        ExpiredReason: null,
                        PreMoney: this.classInfo.PreMoney,
                        Price: this.classPayMoney,
                        IsPreMoney: this.classIsPreMoney,
                        Bindings: arr2,
                    }]
                });
                setTimeout(() => {
                    this.$router.push({path:'/order',query:{type:2}});
                }, 300)
            },
            shopGoods() {//立即报名
                //小赢星定制需求
                if (this.classInfo.AllowType === 1 || this.classInfo.AllowType === 2) return
                if(this.checkIsPreview()) {
                    return
                }
                if (app.control.loginCheck(this)) {
                    if (this.classInfo.IsStockOut) {
                        app.toast('info','该班级已满员。');
                        return;
                    }
                    if (this.classInfo.IsMustSelectSeat && !this.seatObj.coloum) {
                        this.isAddCar = 'nowShop'
                        this.openSeat = true
                    } else {
                        this.applyNowBuy(this.seatObj)
                    }
                    
            	}
            },
            scrollIndex(index) {
                this.$refs.GoodsDetailBj.scrollTo(index);
            },
           scrollOpacity(opacity) {
                this.opacity = opacity;
            },
            openIssue() {
                this.issueFlag = true;
            },
            goEvaluate() {
                this.evaluateFlag = true;
            }
		},
		created() {
			this.renderPage()
			this.clickTime = app.tool.timeControl()
            window.a = this
		},
		components: {
			SelectBindings,
			SelectSeat,
			Question,
			EmptyPage,
            QrCode,
            GoodsDetailBj,
            GoodsEvaluate,
            GoodsIssue
		}
	}
</script>