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
            @include border-right;
            // border: 1px solid $color-assist-1;
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
        <!-- <component  
			:is="details.list[details.activeIndex].component"
			:info="courseInfo"
			:classSelectObj="classSelectObj"
			:outLine="outLine"
			:teacherList="teacherList"
			:seatObj="seatObj"
            :seatInfo="seatInfo"
			:refeshStr="refeshStr"
            @showSelectClass="boolean => {openSelectClass = boolean}"
			@changeBings="boolean => {openedBings = boolean}"> -->

			<!-- @changeSeat="boolean => {openSeat = boolean}"> -->
		<!-- </component> -->
        <div>
            <GoodsDetailKc 
                 ref="goodsDetailKc"
                :info="courseInfo"
                :classSelectObj="classSelectObj"
                :outLine="outLine"
                :seatObj="seatObj"
                :seatInfo="seatInfo"
                :refeshStr="refeshStr"
                :teacherList="teacherList"
                :details="details"
                :opacity="opacity"
                :evaluateObj="evaluateObj"
                :issueObj="issueObj"
                @sendQuestion="sendQuestion"
                @openIssue="openIssue"
                @goEvaluate="goEvaluate"
                @scrollOpacity="scrollOpacity"
                @changeSeat="boolean => {openSeat = boolean}"
                @showSelectClass="boolean => {openSelectClass = boolean}"
                @changeBings="boolean => {openedBings = boolean}"
            >
            </GoodsDetailKc>
        </div>
        <div class="xyx-info" v-if="courseInfo.AllowType==1">
            {{courseInfo.PromptMsg}}
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
            <div class="click-wrapper" v-if="timeTag==''&& !userInfo.IsEmployee">
                <div class="sign-up" 
                    @click="addCart"
                    :class="{none:courseInfo.PayType==2||classSelectObj.selectPayType==2,
                             'xyx-none':courseInfo.AllowType==1||courseInfo.AllowType==2,
                             'xgn-none':config.EnableHideShoppingCart_Online==1}"
                    >
                    加入购物车
                </div>
                <!--  v-show="!isShowQuestion" <div class="sign-up"
                     v-show="isShowQuestion" 
                     @click="sendQuestion">
                    去提问
                </div> -->
                <div class="join-car" 
                     v-if="config.EnableBuyNow"
                     @click="shopGoods" 
                     :class="{'xyx-none':courseInfo.AllowType==1||courseInfo.AllowType==2}">
                立即报名</div>
            </div>
            <div v-if="timeTag!==''&&!userInfo.IsEmployee" class="show-wrapper">
                <div class="not-sell" v-if="remainingTime!=''">{{remainingTime|formatSeconds(':')}}&nbsp;&nbsp;&nbsp;后开售</div>
                <div class="not-sell" v-if="timeText!=''&&remainingTime==''">{{timeText}}</div>
            </div>
            <div class="qrcode" v-if="userInfo.IsEmployee" @click="showQrCode=!showQrCode">点击生成二维码</div>
		</div>
        <qr-code class="qrcode-wrapper" :opened.sync="showQrCode"></qr-code>
        <!-- 选择绑定物品和购买方式 -->
        <select-bindings
            class="select"
            :classInfo="courseInfo"
            :classSelectObj="classSelectObj"
            @bjSelectBindingsOK="bjSelectBindingsOK"
            :opened.sync="openedBings">
            
        </select-bindings>

        <select-seat
            :ClassID="classID"
            :opened.sync="openSeat"
            :seatObj="seatObj"
            :isAddCar="isAddCar"
            @hasSelectSeat="hasSelectSeat"
            @selectSeat="selectSeat">
        </select-seat>

        <select-class
            @getClassIDtoNowBuy="applyNowBuy"
            @getClassIDtoAddShop="applyAddCart"
            @openSelectSeat="openSelectSeat"
            :courseInfo="courseInfo"
            :isAddCar="isAddCar"
            :opened.sync="openSelectClass"
            :courseSelectObj="courseSelectObj">
            
        </select-class>

            <!-- v-show="showQuestion" -->
        <question 
        	v-show="openQuestion"
        	:opened.sync="openQuestion"
            :courseInfo="courseInfo"
            @closeQuestion="closeQuestion">
        </question>
        
        <GoodsEvaluate 
            :info="courseInfo"
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
            :info="courseInfo"
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
	import {getshiftdetail,getOutline,getShopCarNum,courseAddShopCar,addFavorites,deleteFavorites,getRatings,getQuestions} from 'api/yy'
	 
	import GoodsDetailKc from './kc.vue'
	import GoodsEvaluate from '../goods-evaluate/goods-evaluate.vue'
    import GoodsIssue from '../goods-issue/goods-issue.vue'
    import GoodsTeacher from '../goods-teacher/goods-teacher.vue'
    import SelectBindings from '../../selectBindings'
    import SelectSeat from '../../SelectSeat'
    import Question from '../../question'
    import EmptyPage from 'common/empty-page/empty-page'
    import SelectClass from '../../selectClass'
    import {detail} from './detail'
    import {commonDetail} from './common-detail'
    import QrCode from './qrcode'
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
				details: {
				    activeIndex: 0,
				    list:  []
				},
                opacity: 0,
				isFavorite: {
				    value: false,
				    icon: '#icon-xihuan',
				    iconAction: '#icon-xihuan1'
				},
				// courseInfo: {},//班级详情
                courseInfo: {},//课程详情
				outLine: [],//课程大纲
				num: 0,
				classSelectObj: {},
                //购买方式对象{
                //     selectBings: []
                //     selectPayType: 2
                // }
                courseSelectObj: {},
                classObj: {}, //选择班级的班级对象

				teacherList: [],

				openedBings: false,
                classID: null,
				openSeat: false,
                openSelectClass: false,
                isAddCar: '',
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
                evaluateFlag: false,

                showMoney: ''
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
            	// 'set',
            ]),
			renderPage() {
				this.details.list =  [
				    {
				        text: '详情',
				        component: GoodsDetailKc
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
				    getshiftdetail({ProductID: this.$route.params.ID, IsPreview: this.$route.query.isPreview}),
				    getOutline({ProductID: this.$route.params.ID}),
                    getShopCarNum(),
                    getRatings({ProductID: this.$route.params.ID,PageIndex: 1,PageSize: 20}),
                    getQuestions({ProductID: this.$route.params.ID,PageIndex: 1,PageSize: 20})
				]).then((res) =>{
				    if (res[0].ErrorCode == app.errok && res[1].ErrorCode == app.errok) {
				        this.courseInfo = res[0].Data;
                        // 针对于ios webp格式的图片处理
						if (this.courseInfo.DetailText && app.isWKWebview) {
							this.courseInfo.DetailText = this.courseInfo.DetailText.replace(/\/webp/g, '/jpg');
						}
                        //初始化金额以及课程规格
                        this.courseInfo.ShiftSpecList.sort(app.tool.compare('Price'))
                        this.courseInfo.ShiftSpecList.forEach((obj, index) => {
                            if (index == 0) {
                                this.$set(obj, 'isSelect', true)
                            } else {
                                this.$set(obj, 'isSelect', false)
                            }
                        })
                        this.courseInfo.Details.forEach(obj => {
                            if (obj.Name == '上课次数' && this.courseInfo.ShiftSpecList.length) {
                                obj.Value = this.courseInfo.ShiftSpecList[0].Amount + this.courseInfo.Unit
                            }
                        })
                        if (this.config.EnableHideCourseCount_Online === 1) {
                            this.courseInfo.Details = this.courseInfo.Details.filter(obj => obj.Name !== '上课次数')
                        }
                        if (this.courseInfo.ShiftSpecList.length) {
                            this.courseInfo.Money = this.computedShowMoney(this.courseInfo.ShiftSpecList)
                            // this.showMoney = this.computedShowMoney(this.courseInfo.ShiftSpecList)
                        }
                        this.classSelectObj['selectSpecs'] = this.courseInfo.ShiftSpecList
                        //初始化购买方式
                        if (this.courseInfo.Bindings.length) {
                            this.classSelectObj['selectBings'] = []
                        }
                        if (this.courseInfo.PayType === 3) {
                            this.classSelectObj['selectPayType'] = 1
                        }
				        if (res[0].Data.TopTeachers.length == 0) {
				            this.details.list.splice(1, 1);
				        } else {
				            this.teacherList = this.courseInfo.TopTeachers;
				        }
                        if (this.courseInfo.ApplyStartTime && this.courseInfo.ApplyEndTime) {
                            // this.courseInfo.ApplyStartTime = '2018/01/9 16:16:00+0800'
                            // this.courseInfo.ApplyEndTime = '2019/02/20 17:19:00+0800'
                            this.showTimeTag(this.courseInfo.ApplyStartTime, this.courseInfo.ApplyEndTime)
                            if (this.remainingTime > 0) {
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
				        this.isFavorite.value = this.courseInfo.IsFavorite;
                        // this.emitLoadDataComplete(this.courseInfo.Name);
                        this.emitLoadDataComplete({
                            name: this.courseInfo.Name,
                            desc: this.courseInfo.Descrite
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
                let num, money
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
                num && this.courseInfo.Details.forEach(obj => {
                    if (obj.Name == '上课次数') {
                        obj.Value = num + this.courseInfo.Unit
                    }
                })
                if(money) this.courseInfo.Money = money
            },
            openSelectSeat(classObj) {
                this.classID = classObj.ID
                this.classObj = classObj
                this.openSeat = true
            },
            applyAddCart(classObj) {
                let params = {
                    ProductID: this.courseInfo.ID,
                    ClassID: classObj && classObj.ID,
                    SeatRow: classObj && classObj.CurrentSeat && classObj.CurrentSeat.Row,
                    SeatColumn: classObj && classObj.CurrentSeat && classObj.CurrentSeat.Column,
                    // SeatRow: row,
                    // SeatColumn: column,
                    Bindings: this.classSelectObj.selectBings && this.classSelectObj.selectBings.filter(obj =>{
                        return obj != ''
                    }).map(obj =>{
                        return obj.ID
                    }) || [],
                    IsPreMoney: false,
                    ShiftSpecID: this.shiftSpecID
                }
                courseAddShopCar(params).then(res => {
                    this.openSelectClass = false
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
                if (this.courseInfo.AllowType === 1 || this.courseInfo.AllowType === 2) return
            	//预览状态
                if(this.checkIsPreview()) {
                    return
                }
                if (app.control.loginCheck(this)) {
                    if (this.courseInfo.IsStockOut) {
                        app.toast('info','该班级已满员。');
                        return;
                    }
                    if (this.courseInfo.IsMustSelectClass) {
                        this.isAddCar = 'addCar'
                        this.openSelectClass = true
                    } else {
                        this.applyAddCart()
                    }
                }
            },
            applyNowBuy(classObj, seatObj) {
                let arr = [], arr2 = [];
                arr = app.tool.clone(this.classSelectObj.selectBings) || [];
                let row, column, seatName
                if (classObj && classObj.CurrentSeat) {
                    column = classObj.CurrentSeat.Column
                    row = classObj.CurrentSeat.Row
                    seatName = classObj.CurrentSeat.Name
                } else if (seatObj) {
                    row = seatObj.row
                    column = seatObj.coloum
                    seatName = seatObj.SeatName
                } 
                    
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
                    "ID": this.courseInfo.CampusID,
                    "Name": this.courseInfo.CampusName, 
                    "Products": [{
                        ID: null,
                        ProductID: this.courseInfo.ID,
                        Name: this.courseInfo.Name,
                        Image: this.courseInfo.Image,
                        Type: 3,
                        ShiftInfo: {
                            ClassID: classObj && classObj.ID,
                            ClassName: classObj && classObj.Name,
                            StartDate: classObj && classObj.StartDate,
                            CourseTime: classObj && classObj.CourseTime,
                            // SeatRow: seatObj && seatObj.row,
                            // SeatColumn: seatObj && seatObj.coloum,
                            // SeatName: seatObj && seatObj.SeatName,
                            SeatRow: row,
                            SeatColumn: column,
                            SeatName: seatName,
                            Bindings: [{
                                ShoppingCartID: null,
                                ProductID: null
                            }],
                            ShiftSpecID: this.shiftSpecID,
                            ShiftSpecList: this.classSelectObj.selectSpecs,
                            Unit: this.courseInfo.Unit
                        },
                        GoodsInfo: null,
                        ClassInfo: {},
                        Amount: this.courseInfo.Amount,
                        Unit: this.courseInfo.Unit,
                        IsExpired: false, //后端没返回此字段
                        ExpiredReason: null,
                        Price: this.classPayMoney,
                        PreMoney: this.courseInfo.PreMoney,
                        IsPreMoney: this.classIsPreMoney,
                        Bindings: arr2
                    }]
                });
                this.openSeat = false
                this.openSelectClass = false
                // this.$router.push({path:'/order', query: {type: 2}})

                setTimeout(() =>{
                    this.$router.push({path:'/order', query: {type: 2}});
                }, 300)
                // this.$nextTick(() => {
                //     this.$router.push({path:'/order', query: {type: 2}});
                // })
            },
            shopGoods() {//立即报名
                //小赢星定制需求
                if (this.courseInfo.AllowType === 1 || this.courseInfo.AllowType === 2) return
                if(this.checkIsPreview()) {
                    return
                }
                if (app.control.loginCheck(this)) {
                    if (this.courseInfo.IsStockOut) {
                        app.toast('info','该班级已满员。');
                        return;
                    }
                    if (this.courseInfo.IsMustSelectClass) {
                        this.isAddCar = 'nowShop'
                        this.openSelectClass = true
                    } else {
                        this.applyNowBuy()
                    }
                    
            	}
            },
            scrollIndex(index) {
                this.$refs.goodsDetailKc.scrollTo(index);
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
            window.a = this
			this.renderPage()
			this.clickTime = app.tool.timeControl()
		},
		components: {
			SelectBindings,
			SelectSeat,
			Question,
            SelectClass,
			EmptyPage,
            QrCode,
            GoodsDetailKc,
            GoodsEvaluate,
            GoodsIssue
		}
	}
</script>