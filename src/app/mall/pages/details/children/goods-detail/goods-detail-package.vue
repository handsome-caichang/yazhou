<style lang="scss" scoped>
	
		
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
	        .sign-up{
	            @include border-right;
	            // @include border-left;
	            &.none {
	                display: none;
	            }
	        }
	        .sign-up, .join-car, .show-wrapper{
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
            .xyx-none {
                background-color: #b2b2b2;
                color: #fff;
            }
            .show-wrapper {
                background-color: rgba(178,178,178,1);
                color: $color-white;
            }
            .qrcode {
                flex: 1;
                text-align: center;
                line-height: 49px;
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
	        z-index: 2;
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
		<tc :info="packageInfo"
			:tcMoney="tcMoney"
			@tcSelectBindings="tcSelectBindings"
            @tcSelectSeat="tcSelectSeat"
            @tcSelectSeatBindings="tcSelectSeatBindings"
            @tcSelectSpecs="tcSelectSpecs"
            @tcSelectCourse="tcSelectCourse">	
        </tc>

        <div class="xyx-info" v-if="packageInfo.AllowType==1">
            {{packageInfo.PromptMsg}}
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
		    <div class="join-car" 
                 @click="shopGoods" 
                 v-if="timeTag==''&& !userInfo.IsEmployee"
                 :class="{'xyx-none':packageInfo.AllowType==1||packageInfo.AllowType==2}"
            >立即购买</div>
            <div v-if="timeTag!==''&&!userInfo.IsEmployee" class="show-wrapper">
                <div class="not-sell" v-if="remainingTime!=''">{{remainingTime|formatSeconds(':')}}&nbsp&nbsp&nbsp后开售</div>
                <div class="not-sell" v-if="timeText!=''&&remainingTime==''">{{timeText}}</div>
            </div>
            <div class="qrcode" v-if="userInfo.IsEmployee" @click="showQrCode=!showQrCode">点击生成二维码</div>
		</div>
        <qr-code class="qrcode-wrapper" :opened.sync="showQrCode"></qr-code>
		<!-- 选择座位插件（套餐和班级公用） -->
		<select-seat
            :tcObj="tcObj"
		    :ClassID="ClassID"
		    :opened.sync="openSeat"
		    :productsIsSelectArr="productsIsSelectArr"
		    :tcIndex="tcIndex"
		    :openSelectSeatTag="openSelectSeatTag"
		    @selectSeat="selectSeat">
		</select-seat>

		<!-- 套餐系列 -->
		    <!-- :selectBings="classBingds"             -->
		<tc-select-bindings
		    :classInfo="tcObj"
            :courseInfo="tcObj"
		    :opened.sync="showTcSelectBindings"
		    :productsIsSelectArr="productsIsSelectArr"
		    :tcIndex="tcIndex"
		    :openSelectSeatTag="openSelectSeatTag"
		    @tcSelectBingingsOK="tcSelectBingingsOK"
		    @openSelectSeat="openSelectSeat"
            @getCourseInfo="getCourseInfo"
            ref="selectBingsDom"
		    class="select">
		</tc-select-bindings>

		<tc-select-specs
		    :goodsInfo="tcObj"
		    :opened.sync="showTcSelectSpecs"
		    :productsIsSelectArr="productsIsSelectArr"
		    :tcIndex="tcIndex"
		    :packageInfo="packageInfo"
		    @tcSelectSpecOK="tcSelectSpecOK"
		    class="select">
		</tc-select-specs>

            <!-- :courseInfo="courseInfo" -->
        <select-class
            ref="selectClassDom"
            :courseInfo="tcObj"
            :tcCourseInfo="tcCourseInfo"
            :courseSelectSeat="courseSelectSeat"
            :productsIsSelectArr="productsIsSelectArr"
            :tcIndex="tcIndex"
            @openSelectSeat="tcCourseSelectSeat"
            @tcSelectClassDone="tcSelectClassDone"
            :opened.sync="showTcSelectClass">
            
        </select-class>

        <loading v-show="showLoading" class="loading" style="z-index:999"></loading>
		<empty-page :type="10" v-show="showEmptyPage" class="empty-page"></empty-page>
	</div>
</template>

<script>
	 
	import Tc from './tc.vue'
	import {getShopCarNum,addFavorites,deleteFavorites,getPackage,getmoneyInfo} from 'api/yy'
	import SelectSeat from '../../SelectSeat'
	import TcSelectBindings from '../../tcSelectBindings'
	import TcSelectSpecs from '../../tcSelectSpecs'
	import EmptyPage from 'common/empty-page/empty-page'
    import SelectClass from '../../selectClass'
    import {commonDetail} from './common-detail'
    import QrCode from './qrcode'
	export default {
        mixins: [commonDetail],
		data() {
			return {
				packageInfo: {},
				num: 0,
				isFavorite: {
				    value: false,
				    icon: '#icon-xihuan',
				    iconAction: '#icon-xihuan1'
				},
				
				showLoading: true,
				showEmptyPage: false,
				openSeat: false,
				
				tcMoney: null,
				moneyInfo: {},
				tcObj: {},
				tcOpenSeat: false,
				productsIsSelectArr: [],
				tcIndex: null,//接收套餐项目的index
				showTcSelectBindings: false,
				showTcSelectSpecs: false,
                showTcSelectClass: false,
				openSelectSeatTag: 1,
                tcCourseInfo: {},
                classObj: {},
                courseSelectSeat: {},

                timeTag: '',
                timeText: '',
                remainingTime: '',
                setInt: '',//计时器

                showQrCode: false
			}
		},
		computed: {
			...Vuex.mapState(['userInfo','config','curCampus','companySuffix']),
			ClassID() {
                let ID = null
                if (this.tcObj.ClassInfo || this.tcObj.ShiftInfo) {
                    ID = this.tcObj.Type === 1 ?  this.tcObj.ClassInfo.ClassID :  this.classObj.ID
                }
                return ID
			}
		},
		methods: {
			...Vuex.mapMutations(['set_goodsDetailCampus']),
            emitLoadDataComplete(args) {
                this.$emit("loadDataComplete", args)
            },
			renderPage() {
				Promise.all([
				    getPackage({ID: this.$route.params.ID}),
				    getShopCarNum()
				]).then((res) =>{
				    if (res[0].ErrorCode == 400) {
				        this.showLoading = false;
				        this.showEmptyPage = true;
				    }
				    if (res[0].ErrorCode == app.errok) {
                        this.packageInfo = res[0].Data;
                        // 针对于ios webp格式的图片处理
						if (this.packageInfo.DetailText && app.isWKWebview) {
							this.packageInfo.DetailText = this.packageInfo.DetailText.replace(/\/webp/g, '/jpg');
						}
                        // this.packageInfo.ApplyStartTime = '2018/01/5 15:28:00+0800'
                        // this.packageInfo.ApplyEndTime = '2019/01/5 10:19:00+0800'
                        // this.packageInfo.AllowType = 1
                        // this.packageInfo.PromptMsg = 'aaaaaaaaaaaaaaaaaaaaa'
                        if (this.packageInfo.ApplyStartTime && this.packageInfo.ApplyEndTime) {
                            this.showTimeTag(this.packageInfo.ApplyStartTime, this.packageInfo.ApplyEndTime)
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
				        this.isFavorite.value = this.packageInfo.IsFavorite;
				        this.packageInfo.Products.forEach((obj, num) =>{
				            if (obj.Type == 1) {
                                if (obj.ClassInfo.IsMustSelectSeat || obj.ClassInfo.Bindings.length || obj.ClassInfo.ShiftSpecsList.length) {
                                    obj.text = '选择规格参数'
                                }
                                let objTemp = {
                                    shiftSpecList: obj.ClassInfo.ShiftSpecsList,
                                    bindingsSeatObj: ''
                                }
                                if (obj.ClassInfo.CurrentSeat) {//已经在这门课程选了座位
                                    obj['selectText'] = `${obj.ClassInfo.CurrentSeat.Name}`
                                    objTemp.bindingsSeatObj = {
                                        row: obj.ClassInfo.CurrentSeat.Row,
                                        coloum: obj.ClassInfo.CurrentSeat.Column,
                                        SeatName: obj.ClassInfo.CurrentSeat.Name
                                    }
                                }
                                obj.ClassInfo.ShiftSpecsList.sort(app.tool.compare('Price'))
                                obj.ClassInfo.ShiftSpecsList.forEach((obj, index) => {
                                    if (index == 0) {
                                        this.$set(obj, 'isSelect', true)
                                    } else {
                                        this.$set(obj, 'isSelect', false)
                                    }
                                    
                                })
                                this.productsIsSelectArr.splice(num, 1, objTemp)
				            }
				            if (obj.Type == 2 || obj.Type == 4) {
				                if (obj.GoodsInfo.Specs.length == 0) {
				                    obj.text = ''
				                } else {
				                    obj.text = '选择规格'
				                }
                                this.productsIsSelectArr.splice(num, 1, '')
				            }
                            if (obj.Type == 3) {
                                if (obj.ShiftInfo.Bindings.length || obj.ShiftInfo.IsMustSelectClass || obj.ShiftInfo.Specs.length) {
                                    obj.text = '选择规格参数'
                                }
                                obj.ShiftInfo.Specs.sort(app.tool.compare('Price'))
                                obj.ShiftInfo.Specs.forEach((obj, index) => {
                                    if (index == 0) {
                                        this.$set(obj, 'isSelect', true)
                                    } else {
                                        this.$set(obj, 'isSelect', false)
                                    }
                                })
                                let objTemp = {
                                    shiftSpecList: obj.ShiftInfo.Specs
                                }
                                this.productsIsSelectArr.splice(num, 1, objTemp)
                            }
			                // obj.selectText = '';
				        })
				        this.num = res[1].Data;
				        this.showLoading = false;
				        this.tcMoney = Number(this.packageInfo.Money);
                        // this.emitLoadDataComplete(this.packageInfo.Name);
                        this.emitLoadDataComplete({
                            name: this.packageInfo.Name,
                            desc: this.packageInfo.Summary
                        })
				    } 
				})
			},
			gotoCart() {
                if (app.control.loginCheck(this)) {
                    this.$router.push({path:'/cart'});
                }
            },
            shopGoods() {
            	if (app.control.loginCheck(this)) {
                    if (this.packageInfo.AllowType == 1 || this.packageInfo.AllowType == 2) return
                    if (this.packageInfo.Stock === 0) {
                        app.toast('info','此套餐无库存')
                        return
                    }
        		    for (let i = 0; i < this.packageInfo.Products.length; i++) {
        		        if (this.packageInfo.Products[i].Type == 1 && this.packageInfo.Products[i].ClassInfo.IsMustSelectSeat) {
        		            if (!this.productsIsSelectArr[i].bindingsSeatObj || !this.productsIsSelectArr[i].bindingsSeatObj.row) {
        		                app.toast('info','请选择班级座位。')
        		                return 
        		            }
        		        }
        		        if (this.packageInfo.Products[i].Type == 2 && this.packageInfo.Products[i].GoodsInfo.Specs.length) {
        		            if (this.productsIsSelectArr[i] == '') {
        		                app.toast('info','请选择物品规格。');
        		                return
        		            }
        		        }
                        if (this.packageInfo.Products[i].Type === 3 && this.packageInfo.Products[i].ShiftInfo.IsMustSelectClass) {
                            /*if (!this.productsIsSelectArr[i].classObj || (this.productsIsSelectArr[i].classObj && !this.productsIsSelectArr[i].classObj.ID)) {
                                app.toast('info','请选择课程规格。')
                                return 
                            }*/
                            if (!this.productsIsSelectArr[i].classObj || !this.productsIsSelectArr[i].classObj.ID) {
                                 app.toast('info','请选择课程下的班级。')
                                return 
                            }
                            
                        }
                        if (this.packageInfo.Products[i].Type === 3 && this.packageInfo.Products[i].ShiftInfo.IsMustSelectSeat) {
                            if (!this.productsIsSelectArr[i].classObj.CurrentSeat) {
                                app.toast('info','请选择课程班级的座位。')
                                return 
                            }
                        }
        		    }
        		    this.set_goodsDetailCampus({
        		        'ID': this.curCampus.id,
        		        'Name': this.curCampus.name,
        		        'PackageID': this.packageInfo.ID,
        		        'PackageName': this.packageInfo.Name,
        		        'Image': this.packageInfo.Image,
        		        'Price': this.tcMoney,
        		        'Products': this.getTcArr(),
        		        'moneyInfo': this.moneyInfo
        		    })
        		       
        		
        		this.$router.push({path:'/order',query:{type:2}});
            	}
            },
            collectAction() {
            	if (!this.clickTime('collect', 2000)) {
            	    app.toast('info','点太快了哦。');
            	    return 
            	}
            	if (app.control.loginCheck(this)) {
            	    if (!this.isFavorite.value) {
            	        addFavorites({ID: this.$route.params.ID, type: 100}).then(res =>{
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
            // 套餐监听事件系列
            selectSeat(obj) { //主组件监听选座组件的选座事件
               /* if (this.openSelectSeatTag == 1) {
                    this.productsIsSelectArr.splice(this.tcIndex, 1, obj);
                }
                console.log(this.productsIsSelectArr);
                if (this.openSelectSeatTag == 2) {
                    this.productsIsSelectArr.splice(this.tcIndex, 1, {bindingsSeatObj: {
                        row: obj.row,
                        coloum: obj.coloum
                    }});
                }*/
                //班级

                if (this.tcObj.Type === 1) { //班级
                    // this.courseSelectSeat = obj
                    this.productsIsSelectArr.splice(this.tcIndex, 1, {bindingsSeatObj: {
                        row: obj.row,
                        coloum: obj.coloum,
                        SeatName: obj.SeatName
                    }});
                    this.tcObj.selectText = obj.SeatName
                    this.packageInfo.Products.splice(this.tcIndex, 1, this.tcObj);
                }
                
                if (this.tcObj.Type === 3) {  //课程
                    this.courseSelectSeat = obj
                    this.productsIsSelectArr.splice(this.tcIndex, 1, {bindingsSeatObj: {
                        row: obj.row,
                        coloum: obj.coloum,
                        // SeatName: obj.SeatName
                        Name: obj.SeatName
                    }});

                    this.$nextTick(() => {
                        this.tcObj.selectText = obj.SeatName
                        this.packageInfo.Products.splice(this.tcIndex, 1, this.tcObj);
                        this.$refs.selectClassDom.tcSelectClassDone()//触发选择班级确定按钮事件函数
                    })

                    // console.log(obj)
                    // this.tcObj.selectText = {}
                    // this.$refs.selectClassDom.tcSelectClassDone()//触发选择班级确定按钮事件函数
                    // this.tcObj.selectText = obj.SeatName
                    // this.$refs.selectBingsDom.closeSelect()
                    // setTimeout(() =>{
                    //     if (this.tcObj.ShiftInfo.Bindings.length) {
                    //         this.showTcSelectClass = false
                    //         this.openSeat = false
                    //     }
                    // }, 10)
                }

            },
            tcSelectSpecOK(obj) {//主组件监听物品选规格确定按钮事件
                if (JSON.stringify(obj) === JSON.stringify(this.productsIsSelectArr[this.tcIndex])) {
                    return
                }
                // if (app.tool.isObjectEqual(obj, this.productsIsSelectArr[this.tcIndex])) {
                //     return
                // }
                let str = ''
                let arr = obj.strArrTemp
                arr.forEach(obj =>{
                    str = str + " " + obj.Value;
                })
                this.tcObj.selectText = str;
                this.packageInfo.Products.splice(this.tcIndex, 1, this.tcObj);
                this.productsIsSelectArr.splice(this.tcIndex, 1, obj);
                getmoneyInfo({
                    PackageID: this.packageInfo.ID,
                    // Products: this.getTcArr('flag'),
                    Products: this.getTcArr(),
                    UsePoint: false,
                    Remark: '',
                    ReceiveAddressID: ''
                }).then(res =>{
                    if (res.ErrorCode == app.errok) {
                        this.tcMoney = Number(res.Data.TotalMoney)
                        this.moneyInfo = res.Data
                    }
                })

            },
            tcSelectBingingsOK(obj) {//主组件监听选择绑定物品确定按钮事件
                let arrTemp = obj.selectBingsTemp.filter(obj =>{
                    return obj != "";
                })
                let shiftSpec = ''
                let unit
                if (this.tcObj.Type == 1) unit = this.tcObj.ClassInfo.Unit
                if (this.tcObj.Type == 3) unit = this.tcObj.ShiftInfo.Unit
                if (obj.shiftSpecList.length) {
                    shiftSpec = obj.shiftSpecList.filter(item => item.isSelect)[0].Amount + unit + '课程'
                }
                //班级物品
                if (this.tcObj.Type === 1) {
                    if (obj.selectBingsTemp.length == 0 && !obj.shiftSpecList.length) {
                        return
                    }
                    
                    if (this.tcObj.ClassInfo.IsMustSelectSeat) {
                        if (arrTemp.length && obj.bindingsSeatObj && !obj.bindingsSeatObj.row) { 
                            this.tcObj.selectText = `${arrTemp.length}件物品`
                        } else if (!arrTemp.length && obj.bindingsSeatObj && obj.bindingsSeatObj.row) {
                            // this.tcObj.selectText = `${obj.bindingsSeatObj.row}排${obj.bindingsSeatObj.coloum}座`
                            this.tcObj.selectText = obj.bindingsSeatObj.SeatName
                        } else if (arrTemp.length && obj.bindingsSeatObj && obj.bindingsSeatObj.row){
                            // this.tcObj.selectText = `${obj.bindingsSeatObj.row}排${obj.bindingsSeatObj.coloum}座 ${arrTemp.length}件物品`;
                            this.tcObj.selectText = `${obj.bindingsSeatObj.SeatName} ${arrTemp.length}件物品`;
                        } else {
                            this.tcObj.selectText = '';
                        }
                    } else{
                        if (arrTemp.length > 0) { 
                            this.tcObj.selectText = `${arrTemp.length}件物品`
                        } else {
                            this.tcObj.selectText = ''
                        }
                    }
                    let str = obj.shiftSpecList.filter(item => item.isSelect)[0].Amount + unit + '课程'
                    this.tcObj.selectText = this.tcObj.selectText + '&nbsp&nbsp' + str
                    
                    this.packageInfo.Products.splice(this.tcIndex, 1, this.tcObj);
                    this.productsIsSelectArr.splice(this.tcIndex, 1, obj);
                    this.openSelectSeatTag = 1;  //重置tag标记
                    getmoneyInfo({
                        PackageID: this.packageInfo.ID,
                        Products: this.getTcArr(),
                        UsePoint: false,
                        Remark: '',
                        IsUseReserveMoney: this.config.ReserveMoneyReduce==1,
                        ReceiveAddressID: ''
                    }).then(res =>{
                        if (res.ErrorCode == app.errok) {
                            this.tcMoney = Number(res.Data.TotalMoney)
                            this.moneyInfo = res.Data
                        }
                    })
                    /*if (arrTemp.length > 0) {*/
                    /*}*/
                }

                //课程物品
                if (this.tcObj.Type === 3) {
                    this.productsIsSelectArr.splice(this.tcIndex, 1, obj);
                    let selectObj = {}, bindingsText = arrTemp.length > 0 ? `${arrTemp.length}件物品` : ' '
                    this.$set(selectObj, 'name', obj.classObj.Name)
                    this.$set(selectObj, 'currentSeat', obj.classObj.CurrentSeat)
                    this.$set(selectObj, 'bindingsText', bindingsText)
                    this.$set(selectObj, 'shiftSpec', shiftSpec)
                    this.$set(this.tcObj, 'selectText', selectObj)
                   /* if ( obj.classObj.CurrentSeat) {//课程有选择座位
                        selectObj = {
                            name: obj.classObj.Name,
                            currentSeat: obj.classObj.CurrentSeat,
                            bindingsText: `${arrTemp.length}件物品`,
                            shiftSpec: shiftSpec
                        }
                        this.$set(this.tcObj, 'selectText', selectObj)
                    }
                    if (obj.classObj) {//课程有绑定物品
                        selectObj = {
                            name: obj.classObj.Name,
                            currentSeat: obj.classObj.CurrentSeat,
                            bindingsText: `${arrTemp.length}件物品`,
                            shiftSpec: shiftSpec
                        }
                        this.$set(this.tcObj, 'selectText', selectObj)
                    }
                    if (arrTemp.length == 0 && obj.classObj) {
                        selectObj = {
                            name: obj.classObj.Name || null,
                            currentSeat: obj.classObj.CurrentSeat || null,
                            shiftSpec: shiftSpec
                        }
                        this.$set(this.tcObj, 'selectText', selectObj)
                    }*/
                    this.packageInfo.Products.splice(this.tcIndex, 1, this.tcObj)
                    getmoneyInfo({
                        PackageID: this.packageInfo.ID,
                        // Products: this.getTcArr('flag'),
                        Products: this.getTcArr(),
                        UsePoint: false,
                        Remark: '',
                        'IsUseReserveMoney': this.config.ReserveMoneyReduce==1,
                        ReceiveAddressID: ''
                    }).then(res =>{
                        if (res.ErrorCode == app.errok) {
                            this.tcMoney = Number(res.Data.TotalMoney)
                            this.moneyInfo = res.Data
                        }
                    })
                    
                }
            },
            openSelectSeat(tag) {
                this.openSeat = true;
                this.openSelectSeatTag = tag;
            },
            //套餐打开弹窗系列
            clearData(obj, index) {
                if (JSON.stringify(this.tcObj) != '{}' ) {
                    this.tcObj = {}
                }
                if (this.tcIndex != null) {
                    this.tcIndex = null
                }
                this.tcObj = obj;
                this.tcIndex = index;
            },
            tcSelectBindings(obj, index) {
                this.clearData(obj, index);
                this.showTcSelectBindings = true;
            },
            tcSelectSeat(obj, index) {
                this.openSeat = true;
                this.clearData(obj, index);
            },
            tcSelectSeatBindings(obj, index) {
                this.clearData(obj, index);
                this.showTcSelectBindings = true;
            },
            tcSelectSpecs(obj, index) {
                this.clearData(obj, index);
                this.showTcSelectSpecs = true;
            },
            tcSelectCourse(obj, index) {
                this.clearData(obj, index)
                if (obj.ShiftInfo.Bindings.length > 0 || obj.ShiftInfo.Specs.length) {
                    this.showTcSelectBindings = true
                } else {
                    this.showTcSelectClass = true                    
                }
                // this.showTcSelectBindings = true
            },
            getBindings(obj) {
                if (!obj.selectBingsTemp) return
                return  obj.selectBingsTemp.map(oob =>{
                        if (oob != '') {
                            let robj = {}
                            robj['ProductID'] = oob.ID
                            robj['ProductName'] = oob.Name
                            return robj
                        }
                        
                    }).filter(filObj =>{
                        return filObj != undefined
                    }) || null
            },
            getSpecID(index, key) {
                let id, Amount, i = 0, len = this.productsIsSelectArr.length
                for (i; i < len; i++) {
                    if (i == index && this.productsIsSelectArr[i].shiftSpecList) {
                        let arr = this.productsIsSelectArr[i].shiftSpecList.filter(obj => obj.isSelect)
                        if (arr.length) {
                            id = arr[0].ID   
                            Amount = arr[0].Amount
                            break
                        }
                    }
                }
                if (key == 'id') {
                    return id
                } else {
                    return Amount
                }
            },
            getTcArr() {
                let arr = [],
                    arr1 = this.productsIsSelectArr
                this.packageInfo.Products.forEach((obj, index) =>{
                    let pro = {
                        'ProductID': obj.ID,
                        'ProductName': obj.Name,
                        'Type': obj.Type, //商品类型 1-班级 2-物品
                        'ClassInfo': null, //班级信息
                        'GoodsInfo': null, //物品信息
                        'ShiftInfo': null, //课程商品
                    }
                    if (obj.Type === 1) {
                        pro.ClassInfo = {
                            SeatRow: arr1[index].bindingsSeatObj && arr1[index].bindingsSeatObj.row || null,
                            SeatColumn: arr1[index].bindingsSeatObj && arr1[index].bindingsSeatObj.coloum || null,
                            SeatName: arr1[index].bindingsSeatObj && arr1[index].bindingsSeatObj.SeatName || null,
                            Bindings: this.getBindings(arr1[index]),
                            ShiftSpecID: this.getSpecID(index, 'id'),
                            Amount: this.getSpecID(index, 'Amount'),
                            Unit: obj.ClassInfo.Unit
                        }
                    } else if(obj.Type === 2 || obj.Type === 4) {
                        pro.GoodsInfo = {
                            SpecID: arr1[index].SpecID || null,
                            SpecName: arr1[index].strArrTemp && arr1[index].strArrTemp.map(oob =>{
                                return oob.Value
                            }).join(' ') || null
                        }
                    } else if (obj.Type === 3) {
                        let seatName, row, column, classID, className
                        if (arr1[index] !== '' && arr1[index].classObj && arr1[index].classObj.CurrentSeat) {
                            seatName = arr1[index].classObj.CurrentSeat.SeatName || arr1[index].classObj.CurrentSeat.Name || null
                            row = arr1[index].classObj.CurrentSeat.row || arr1[index].classObj.CurrentSeat.Row || null
                            column = arr1[index].classObj.CurrentSeat.coloum || arr1[index].classObj.CurrentSeat.Column || null
                            classID = arr1[index].classObj && arr1[index].classObj.ID
                            className = arr1[index].classObj && arr1[index].classObj.Name
                        } else {
                            seatName = null
                            row = null
                            column = null
                            classID = arr1[index].classObj && arr1[index].classObj.ID
                            className = arr1[index].classObj && arr1[index].classObj.Name
                        }
                        pro.ShiftInfo = {
                            ClassID: classID,
                            ClassName: className,
                            SeatName: seatName,
                            Row: row,
                            Column: column,
                            Bindings: this.getBindings(arr1[index]),
                            ShiftSpecID: this.getSpecID(index, 'id'),
                            Amount: this.getSpecID(index, 'Amount'),
                            Unit: obj.ShiftInfo.Unit
                        }
                    }
                    arr.push(pro)
                })
                return arr
            },

            //获取套餐下面课程id
            getCourseInfo(courseInfo) {
                this.showTcSelectClass = true
                this.tcCourseInfo = courseInfo
            },

            //套餐监听课程选择班级事件
            tcCourseSelectSeat(classObj) {
                this.classObj = classObj
                this.openSeat = true
            },

            //监听套餐选完座位点击确定按钮事件
            tcSelectClassDone(classObj) {
                // console.log('--------------------------------------')
                // console.log(classObj)
                if (this.productsIsSelectArr[this.tcIndex] == '') this.productsIsSelectArr[this.tcIndex] = {}
                this.$set(this.productsIsSelectArr[this.tcIndex], 'classObj', classObj)
                if (this.tcObj.ShiftInfo.Bindings.length == 0) {//无绑定物品
                    this.showTcSelectClass = false
                    let selectObj
                    selectObj = {
                        name: classObj.Name,
                        currentSeat: classObj.CurrentSeat
                    }
                    this.$set(this.tcObj, 'selectText', selectObj)
                    this.packageInfo.Products.splice(this.tcIndex, 1, this.tcObj);
                } else {//有绑定物品
                    this.$refs.selectBingsDom.closeSelect()
                    this.showTcSelectClass = false
                    this.showTcSelectBindings = false
                }
            }
		},
		created() {
			this.renderPage()
			this.clickTime = app.tool.timeControl()
            window.a = this
		},
        watch: {
            $route(to, from) {
                if (from.name == 'login' && this.userInfo.Name) {
                   /* this.renderPage()
                    this.productsIsSelectArr.splice(0, this.productsIsSelectArr.length)*/
                    setTimeout(() => {
                        history.go(0)
                    }, 300)
                } 
            }
        },
		components: {
			Tc,
			SelectSeat,
			TcSelectSpecs,
			TcSelectBindings,
			EmptyPage,
            SelectClass,
            QrCode
		}
	}
</script>