//班级和课程公用的mixin
import {
    addFavorites,
    deleteFavorites
} from 'api/yy'
export const detail = {
    computed: {
        isShowQuestion() {
            let info = this.getInforName()
            if (info && info.TopTeachers) {
                if (info.TopTeachers.length == 0 && this.details.activeIndex == 2) {
                    return true
                } else if (info.TopTeachers.length > 0 && this.details.activeIndex == 3) {
                    return true
                } else {
                    return false
                }
            }
            return false
        },
        classPayMoney() {
            let info = this.getInforName()
            let arr = this.classSelectObj.selectSpecs.filter(obj => obj.isSelect)
            if (arr.length) {
                return arr[0].Price
            } else {
                return info.Money
            }
            /*if (info && (info.PayType == 2 || this.classSelectObj.selectPayType == 2)) {
                return info.PreMoney
            } else {
            }*/
        },
        classIsPreMoney() {
            let info = this.getInforName()
            if (info && (info.PayType == 2 || this.classSelectObj.selectPayType == 2)) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        emitLoadDataComplete(args) {
            this.$emit("loadDataComplete", args)
        },
        sendQuestion() { //去提问
            if (this.checkIsPreview()) {
                return
            }
            if (app.control.loginCheck(this)) {
                this.openQuestion = true;
            }
        },
        //检查是否预览
        checkIsPreview() {
            if (this.$route.query.isPreview == 'true') {
                app.toast('info', '该商品处于预览状态');
                return true
            } else {
                return false
            }
        },
        gotoCart() {
            if (this.checkIsPreview()) {
                return
            }
            if (app.control.loginCheck(this)) {
                this.$router.push({
                    path: '/cart'
                });
            }
        },
        closeIssue(param) {
            app.tool.setDocTitle("商品详情");
            this.issueFlag = false;
            this.refeshStr = param.text;
        },
        closeEvaluate(param) {
            app.tool.setDocTitle("商品详情");
            this.evaluateFlag = false;
            this.refeshStr = param.text;
        },
        closeQuestion(param) {
            this.openQuestion = false;
            this.refeshStr = param.text;
        },
        collectAction() {
            if (this.checkIsPreview()) {
                return
            }
            if (!this.clickTime('collect', 2000)) {
                app.toast('info', '点太快了哦。');
                return
            }
            if (app.control.loginCheck(this)) {
                if (!this.isFavorite.value) {
                    /*addFavorites({ID: this.$route.params.ID, type: 1}).then(res =>{
                        if (res.ErrorCode === app.errok) {
                            app.toast('success','已收藏到我喜欢。');
                            this.isFavorite.value = true;
                        }
                    })*/
                    addFavorites({
                        ID: this.$route.params.ID,
                        type: this.$route.params.type
                    }).then(res => {
                        if (res.ErrorCode === app.errok) {
                            app.toast('success', '已收藏到我喜欢。');
                            this.isFavorite.value = true;
                        }
                    })
                } else {
                    deleteFavorites({
                        IDs: [this.$route.params.ID]
                    }).then(res => {
                        if (res.ErrorCode === app.errok) {
                            app.toast('success', '取消收藏成功。');
                            this.isFavorite.value = false;
                        }
                    })
                }
            }
        },
        getInforName() {
            // let info = parseInt(this.$route.params.type) === 1 ? this.classInfo : this.courseInfo
            let info
            if (parseInt(this.$route.params.type) === 1) info = this.classInfo
            if (parseInt(this.$route.params.type) === 3) info = this.courseInfo
            return info
        },
        hasSelectSeat(obj) {
            this.openSeat = false
            /*console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            console.log(obj)*/
            if (obj.isAddCar === 'addCar') {
                if (parseInt(this.$route.params.type) === 3) {
                    if (this.classObj.CurrentSeat === null) {
                        this.classObj.CurrentSeat = {
                            SeatName: obj.SeatName,
                            Row: obj.row,
                            Column: obj.coloum
                        }
                    }
                    this.applyAddCart(this.classObj)
                }
                if (parseInt(this.$route.params.type) === 1) {
                    this.applyAddCart(obj)
                }
            } else if (obj.isAddCar === 'nowShop') {
                if (parseInt(this.$route.params.type) === 3) {
                    this.applyNowBuy(this.classObj, obj)
                }
                if (parseInt(this.$route.params.type) === 1) {
                    this.applyNowBuy(obj)
                }
            }
        },
        selectSeat(obj) { //监听选座位信息
            console.log(obj)
            this.openSeat = false;
            this.seatObj = obj;
        },
        computedShowMoney(list) {
            let money
            let arr = list.filter(obj => obj.isSelect)
            if (arr.length) money = arr[0].Price
            return money
        }

    },
    watch: {
        $route(to, from) {
            if (from.name == 'login' && this.userInfo.Name) {
                this.renderPage()
            }
        }
    }
}