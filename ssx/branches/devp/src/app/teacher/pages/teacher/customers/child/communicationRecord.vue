<style scoped lang="scss">
    .container {
        width: 100%;
        .heard {
            background-color: $color-white;
            padding: 8px 12px;
            margin-bottom: 10px;
            height: 44px;
            line-height: 28px;
            @include flex-between;
            @include border-bottom;
            .date-filter {
                display: flex;
                .date-btn {
                    width: 112px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 50px;
                    border: 1px solid $color-assist-1;
                }
            }
            .date-search {
                width: 48px;
                text-align: center;
                border-radius: 50px;
                background-color: $color-assist-1;
            }
        }
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .list-body {
            @include position-absolute(44px, 0, 49px, 0);
            .scroller {
                overflow: hidden;
                background-color: $color-white;
                @include position-absolute;
                .card {
                    padding: 15px 12px 0 12px;
                    background-color: $color-white;
                    border-bottom: 5px solid $color-assist-1;
                    .card-heard {
                        display: flex;
                        .heard-left {
                            flex: 1;
                            display: flex;
                            .icon {
                                height: 40px;
                                width: 40px;
                                background-color: $color-assist-1;
                                border-radius: 50%;
                                margin-right: 8px;
                                @include background-img(false, cover);
                            }
                            .info-wrapper {
                                flex: 1;
                                .name {
                                    font-size: 16px;
                                    color: $color-3;
                                }
                                .info {
                                    font-size: 12px;
                                    color: $color-6;
                                    .today {
                                        color: $color-primary;
                                    }
                                    .some {
                                        word-break: break-word;
                                    }
                                }
                            }
                        }
                        .heard-right {
                            width: 80px;
                            text-align: right;
                            font-size: 12px;
                            color: #8b572a;
                        }
                        .icon-wrapper {
                            margin-left: 10px;
                        }
                    }
                    .card-body {
                        padding-left: 50px;
                        margin-top: 8px;
                        .body-content {
                            word-break: break-word;
                            font-size: 15px;
                            color: $color-3;
                            margin-bottom: 12px;
                        }
                        .body-info {
                            font-size: 12px;
                            color: $color-6;
                            margin-bottom: 8px;
                            position: relative;
                            word-break: break-word;
                            .spec {
                                position: absolute;
                                right: 0;
                                color: $color-primary;
                            }
                        }
                    }
                    .card-bottom-wrapper {
                        border-top: 1px solid $color-assist-1;
                    }
                    .card-bottom {
                        // border-top: 1px solid $color-assist-1;
                        padding-left: 50px;
                        height: 44px;
                        line-height: 44px;
                        display: flex;
                        font-size: 12px;
                        color: $color-6;
                        .bottom-left {
                            /*width: 120px;*/
                            @include flex-between;
                            .switch-wrapper {
                                flex: 1;
                                padding-left: 10px;
                                .switch {
                                    width: 30px;
                                    height: 17px;
                                    // background-color: $color-assist-1;
                                    border-radius: 17px;
                                    background-color: #cacfcb;
                                    position: relative;
                                    transition-duration: .1s;
                                    transition-timing-function: ease-in;
                                    .cycle {
                                        width: 15px;
                                        height: 15px;
                                        background-color: #fff;
                                        border-radius: 15px;
                                        margin-top: 1px;
                                        position: absolute;
                                        transition-property: margin-left;
                                        transition-duration: .2s;
                                        transition-timing-function: ease-in;
                                        margin-left: 2px;
                                    }
                                    .on {
                                        left: 12px;
                                    }
                                }
                                .on {
                                    background-color: $color-primary;
                                }
                            }
                        }
                        .bottom-right {
                            flex: 1;
                            text-align: right;
                        }
                    }
                    .examine{
                        /*height: 26px;*/
                        line-height: 18px;
                        display: flex;
                        text-align: right;
                        font-size: 12px;
                        justify-content: flex-end;
                        .item{
                            height: 26px;
                        }
                        .waiting{
                            color:$color-primary;
                        }
                        .pass{
                            color:#2BB8AA;
                        }
                        .failed{
                            color: #FF5F53;
                        }
                        .icon{
                            margin-left: 9px;
                            font-size: 13px;
                            &.pass{
                                margin-right: 8px;
                                color:#2BB8AA;
                            }
                        }
                    }
                    .will-time {
                        height: 44px;
                        line-height: 44px;
                        display: flex;
                        border-top: 1px solid $color-assist-1;
                        font-size: 12px;
                        color: $color-6;
                        padding-left: 48px;
                    }
                    .will-time-right {
                        flex: 1;
                        text-align: right;
                    }
                }
            }
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            background-color: $color-primary;
            font-size: 16px;
            text-align: center;
            color: $color-white;
        }
        .empty-page {
            @include position-absolute(44px, 0, 49px, 0);
            z-index: 20;
        }
    }
</style>

<template>
    <div class="container">
        <div class="heard">
            <div class="date-filter">
                <date-bar
                        :sdate='dateObj.sdate'
                        :edate='dateObj.edate'
                        :index="quickDateIndex"
                        @changeDate="changeDate">
                </date-bar>
            </div>
        </div>
        <div class="void"></div>
        <div class="list-body" ref="listBody">
            <scroller-super class="scroller"
                            ref="scroll"
                            :type="2"
                            :data="scrollData"
                            :pagingOption="pagingOption"
                            @loadData="loadData">
                <div>
                    <div class="card" v-for="(card,index) in list">
                        <div class="card-heard">
                            <div class="heard-left">
                                <div class="icon" :style="'background-image:url('+card.Photo+')'"></div>
                                <div class="info-wrapper">
                                    <div class="name">{{card.UserName}}</div>
                                    <div class="info">
                                        <span class="today" v-if="isShowToday(card.CreateTime)">今天</span>
                                        <span class="day" v-if="isShowToday(card.CreateTime)">{{card.CreateTime.slice(card.CreateTime.indexOf(' '), card.CreateTime.length)}}</span>
                                        <span class="day"
                                              v-if="!isShowToday(card.CreateTime)">{{card.CreateTime}}</span>
                                        <!-- <span class="time">13:38:29</span> -->
                                        <span class="some">{{card.Mode}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="heard-right" v-if="card.IsValid==0">无效沟通
                            </div>
                            <div class="icon-wrapper" v-if="index===0" @click="editCommRec(card)">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-goutongxiugai"></use>
                                </svg>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="body-content">{{card.Content.length>80?card.longContent:card.Content}}</div>
                            <div class="body-info">
                                下次跟进：{{card.NextDate}}&nbsp{{card.NextMode}}
                                <span class="spec" v-if="isShowAll(card.Content)" @click="changeContent(card,index)">{{card.longContentFlag?'全文':'收起'}}</span>
                            </div>
                            <div class="body-info">
                                到访日期：{{card.InviteDate}}&nbsp{{card.VisitTypeName}}
                            </div>
                        </div>

                        <div class="" v-show="card.IsInvite==1">
                            <div class="card-bottom-wrapper">
                                <div class="card-bottom" v-if="selectCampusRights">
                                    <div class="bottom-left">
                                        <div>到访校区:</div>
                                        <div class="switch-wrapper">
                                            {{card.DistributionCampusName}}
                                        </div>
                                    </div>
                                </div>
                                <div class="card-bottom">
                                    <div class="bottom-left">
                                        <div>是否到访</div>
                                        <div class="switch-wrapper">
                                            <div class="switch" @click="changeStatus(index,card)"
                                                 :class="{'on': card.IsVisit==1}">
                                                <div class="cycle" ref="cycle"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bottom-right" v-show="card.IsVisit">
                                        实到访日：{{card.VisitedDate}}
                                    </div>
                                </div>
                            </div>


                            <!--审核部分-->
                            <!--AuditStatus: 0待审核 1通过 2未通过-->
                            <div class="examine" v-if="EnableVisitAudit==1" @click="goToExamine(card,index)">
                                <div v-show="card.AuditStatus==1&&card.IsVisit==1">
                                    <svg class="icon pass" aria-hidden="true">
                                        <use xlink:href="#icon-wanchengxinshouzhiyinzhi"></use>
                                    </svg>
                                </div>

                                <div class="waiting item" v-show="card.AuditStatus==0&&card.IsVisit==1">待审核</div>
                                <div class="pass item" v-show="card.AuditStatus==1&&card.IsVisit==1">审核通过</div>
                                <div class="failed item" v-show="card.AuditStatus==2">审核未通过</div>

                                <!--有权限&&（待审核||未通过）  -->
                                <div v-show="(VisitAudit&&card.AuditStatus==0&&card.IsVisit==1)||(VisitAudit&&card.AuditStatus==2)||(!VisitAudit&&card.AuditStatus!=0)">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-jiantou"></use>
                                    </svg>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </scroller-super>
        </div>
        <router-link
                v-if="app.tool.op('CustomerCommunication')"
                tag="div"
                :to="`/addCommunication/${$route.params.id}/add/${$route.params.salePersonId}`"
                class="bottom">添加沟通记录
        </router-link>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <empty-page :type="5" :text="'还没有沟通记录哦~'" class="empty-page" v-if="!list.length" ref="emptyPage"></empty-page>
    </div>
</template>

<script>
    import {queryCustomer, saveData} from 'teacher/api/customers'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'

    export default {
        data() {
            return {
                wxTitle: "沟通记录",
                isLoading: true,
                bgType: 0,
                list: [],
                scrollNum: 0,
                longContentFlag: [],
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname: "querycommunication",
                        customerID: this.$route.params.id,
                        sdate: app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                        edatedate: app.tool.getDatesByIndex(0, app.localTimeToServer).sdate
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'page',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'pageSize',
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: 'pageCount'
                    }
                },
                dateObj: {
                    sdate: app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                    edate: app.tool.getDatesByIndex(0, app.localTimeToServer).sdate
                },
                quickDateIndex: -1,
                EnableVisitAudit:null, // 配置项  是否在意向客户新增到访审核流程，0表示否（默认），1表示是（现代教育）
                VisitAudit:null,       // 权限
                selectCampusRights: false
            }
        },
        methods: {
            isShowToday(time) {
                if (!time) {
                    return false
                } else {
                    let nowYear = new Date().getFullYear(),
                        nowMonth = new Date().getMonth(),
                        nowDay = new Date().getDay(),
                        giveYear = new Date(time).getFullYear(),
                        giveMonth = new Date(time).getMonth(),
                        giveDay = new Date(time).getDay()
                    if (giveYear === nowYear && giveMonth === nowMonth && giveDay === nowDay) {
                        return true
                    } else {
                        return false
                    }
                }

            },
            isShowAll(str) {
                return str.length > 80 ? true : false
            },
            changeContent(obj, index) {
                this.scrollNum++
                obj.longContentFlag = !obj.longContentFlag
                if (!obj.longContentFlag) {
                    obj.longContent = obj.Content
                } else {
                    obj.longContent = obj.Content.substr(0, 80) + '...'
                }
            },
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        res.data.forEach((obj, index) => {
                            if (obj.Content.length > 80) {
                                this.$set(obj, 'longContentFlag', true)
                                obj['longContent'] = obj.Content.substr(0, 80) + '...'
                            }
                            if (obj.IsVisit === 1) {
                                this.$nextTick(() => {
                                    this.$refs.cycle[index].style.transform = `translate3d(${'12px'}, 0, 0)`
                                })
                            }else {
                                this.$nextTick(() => {
                                    this.$refs.cycle[index].style.transform = `translate3d(0, 0, 0)`
                                })
                            }
                        })
                        this.list = this.list.concat(res.data)
                    }
                })
            },
            changeDate(obj) {
                this.dateObj.sdate = obj.sdate;
                this.dateObj.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.isLoading = true;
                this.$refs.scroll.refresh(this.dateObj)
            },
            editCommRec(obj) {
                this.$router.push({path: `/addCommunication/${obj.ID}/edit/${this.$route.params.salePersonId}`})
            },
            sendData(obj, index) {
                let cycle = this.$refs.cycle[index],
                    item = this.list[index]
                saveData({
                    saveFlag: 'putvisitstatus',
                    status: obj.status,
                    id: obj.id,
                    VisitedDate: obj.date
                }).then(res => {
                    if (res.errcode === app.errok) {
                        if (obj.status === 1) {
                            cycle.style.transform = `translate3d(${'12px'}, 0, 0)`
                            item.IsVisit = 1
                            item.VisitedDate = obj.date
                        } else {
                            item.IsVisit = 0
                            cycle.style.transform = `translate3d(0, 0, 0)`
                            item.VisitedDate = ''
                        }
                        if(this.EnableVisitAudit==1&&item.IsVisit == 1){
                            app.event.emit('addCommunication');
                            app.toast('success', '填写意向客户到访需要审核，请等待。')

                        }else{
                            app.toast('success', '修改到访状态成功。')
                        }

                    }else{
                        app.toast('error', res.errmsg)
                    }


                })
            },
            changeListDate(item, index) {
                app.datetimePicker({format: 'YYYY-MM-DD HH:mm'}).then(res => {
                    item.InviteDate = res
                    let params = {
                        status: 1,
                        id: item.ID,
                        date: res
                    }
                    this.sendData(params, index)
                })
            },
            changeStatus(i,card) {
                if(this.EnableVisitAudit==1&&card.AuditStatus==1){
                    // 审核通过不能修改是否到访
                    return
                }
                let cycle = this.$refs.cycle[i],
                    obj = this.list[i]
                if (obj.IsVisit === 0) {
                    if (!app.tool.op('customerInviteEdit_HasVisit')) {
                        app.alert({
                            'title': '权限不足',
                            'text': '未授权。此操作需要以下权限：招生管理>邀约查询>修改到访状态为已到访。',
                            btn: {
                                'text': '知道了',
                                'style': {},
                                'action': true
                            }
                        });
                        return;
                    }
                    this.changeListDate(obj, i)
                } else {
                    if (!app.tool.op('customerInviteEdit_NotVisit')) {
                        app.alert({
                            'title': '权限不足',
                            'text': '未授权。此操作需要以下权限：招生管理>邀约查询>修改到访状态为未到访。',
                            btn: {
                                'text': '知道了',
                                'style': {},
                                'action': true
                            }
                        });
                        return;
                    }
                    this.sendData({
                        status: 0,
                        id: obj.ID,
                        VisitedDate: ''
                    }, i)
                }

            },
            // 审核
            goToExamine(obj,index){
                // 有权限&&已通过 =>不能点击
                // 无权限&&待审核=>不能点击
                if(this.VisitAudit&&obj.AuditStatus==1){
                    return
                }else if((!this.VisitAudit)&&obj.AuditStatus==0){
                    return
                }

                app.ls.setStorage('customerExamineCard',obj)
                this.currentIndex = index;
                this.$router.push({path: `/examine/${obj.ID}`})
            },

        },
        computed: {
            scrollData() {
                return {
                    list: this.list,
                    scrollNum: this.scrollNum
                }
            }
        },
        created() {
            this.EnableVisitAudit = app.sysInfo.EnableVisitAudit; //配置项
            this.VisitAudit = app.tool.op('VisitAudit');          //权限
            if (app.sysInfo.ID == this.$route.params.salePersonId && app.tool.op('UpdateCustomerCampus')) this.selectCampusRights = true
            app.event.on('addCommunication', () => {
                this.$refs.scroll.refresh()
            })
        },
        mounted() {
            this.$nextTick(() => {
                if (!app.tool.op('CustomerCommunication')) {
                    this.$refs.listBody.style.bottom = 0
                    this.$refs.emptyPage.$el.style.bottom = 0
                }
            })
        },
        destroyed() {
            app.event.off('addCommunication');
            app.ls.remove('customerExamineCard');
        },
        components: {
            EmptyPage
        }
    }
</script>