<style lang="scss" scoped>
    .wrapper {
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
        .date-wrapper {
            padding: 0 12px;
            height: 44px;
            @include flex-between;
            background-color: $color-white;
            .time-dution {
                width: 200px;
                display: flex;
                justify-content: flex-end;
            }
            .active {
                color: $color-primary;
            }
            .time-text {
                margin-left: 5px;
                font-size: 12px;
            }
            .mid-left {
                flex: 1;
            }
            .mid-right {
                width: 48px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                background-color: #EEF1F6;
                border-radius: 50px;
                color: $color-6;
                font-size: 13px;
            }
            .campus-left {
                width: 100px;
            }
            .campus-right {
                flex: 1;
                text-align: right;
                color: $color-9;
            }
        }
        .scroller {
            @include position-absolute(172px, 0, 0, 0);
            .item {
                background-color: $color-white;
                border-bottom: 15px solid $color-assist-1;
                .item-top {
                    height: 44px;
                    border-bottom: 1px solid $color-assist-1;
                    @include flex-between;
                    padding: 0 12px;
                    .name {
                        color: $color-3;
                        flex: 1;
                    }
                    .router-comm {
                        width: 100px;
                        text-align: right
                    }
                }
                .item-content {
                    padding: 0 12px;
                    .content-item {
                        height: 30px;
                        @include flex-between;
                        .item-text {
                            flex: 1;
                        }
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
                        .active {
                            color: $color-primary;
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
                    }
                }
            }
        }
        .empty-page {
            @include position-absolute(172px, 0, 0, 0);
            z-index: 20;
        }
        .loading {
            z-index: 100;
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="void"></div>
        <div class="date-wrapper">
            <date-bar
                    :sdate='dateObj.sdate'
                    :edate='dateObj.edate'
                    :index="quickDateIndex"
                    @changeDate="changeDate">
            </date-bar>
            <div class="time-dution">
                <div class="time-text" :class="{active:timeDution===0}" @click="changeTimeDution(0)">全天</div>
                <div class="time-text" :class="{active:timeDution===1}" @click="changeTimeDution(1)">上午</div>
                <div class="time-text" :class="{active:timeDution===2}" @click="changeTimeDution(2)">下午</div>
            </div>
        </div>
        <div class="void"></div>
        <div class="date-wrapper">
            <div class="mid-left" @click="changeVisit">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="isVisit===1?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                </svg>
                是否到访
            </div>
            <div class="mid-right" @click="showSelectMore=true">
                筛选
            </div>
        </div>
        <div class="void"></div>
        <div class="date-wrapper">
            <div class="campus-left">选择校区</div>
            <div class="campus-right" @click="showSelectCampus=true">
                {{campusObj.Value.Name}}
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
        </div>
        <div class="void"></div>
        <scroller-super
            class="scroller"
            ref="scroll"
            :type="2"
            :data="list"
            :pagingOption="pagingOption"
            @loadData="loadData">
            <div>
                <div class="item" v-for="(item, index) in list">
                    <div class="item-top">
                        
                        <div class="name">{{item.Name}}</div>
                        <div class="router-comm" @click="addComm(item)">沟通记录
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-youjiantou"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="item-content">
                        <div class="content-item">
                            <div class="text">手机号码：</div>
                            <div class="item-text">{{item.SMSTel}}</div>
                        </div>
                        <div class="content-item">
                            <div class="text">主责任人：</div>
                            <div class="item-text">{{item.SalePersonName}}</div>
                        </div>
                        <div class="content-item">
                            <div class="text">副责任人：</div>
                            <div class="item-text">{{item.DeputySalePersonName}}</div>
                        </div>
                        <div class="content-item">
                            <div class="text">诺到访日：</div>
                            <div class="item-text">{{item.InviteDate}}</div>
                        </div>
                        <div class="content-item">
                            <div class="text">客户状态：</div>
                            <div class="item-text">{{item.CustomerStatusName}}</div>
                        </div>
                        <div class="content-item">
                            <div class="text">是否到访：</div>
                            <!-- <div class="item-text"> -->
                                <div class="switch-wrapper">
                                    <div class="switch" @click="changeStatus(item, index)"
                                         :class="{'on': item.IsVisit==1}">
                                        <div class="cycle" ref="cycle"></div>
                                    </div>
                                </div>
                            <!-- </div> -->
                        </div>
                        <div class="content-item">
                            <div class="text">实到访日：</div>
                            <div class="item-text">{{item.VisitDate}}</div>
                            <div class="shenghe" v-if="EnableVisitAudit==1" @click="goToExamine(item,index)">
                                <svg class="icon pass" aria-hidden="true" v-show="item.AuditStatus==1&&item.IsVisit==1">
                                    <use xlink:href="#icon-wanchengxinshouzhiyinzhi"></use>
                                </svg>
                                <span class="waiting" v-show="item.AuditStatus==0&&item.IsVisit==1">待审核</span>
                                <span class="pass" v-show="item.AuditStatus==1&&item.IsVisit==1">审核通过</span>
                                <span class="failed" v-show="item.AuditStatus==2">审核未通过</span>
                                <svg class="icon" aria-hidden="true" v-show="VisitAudit&&item.IsVisit">
                                    <use xlink:href="#icon-jiantou"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </scroller-super>
        <loading class="loading" v-show="isLoading" :bgType='0'></loading>
        <empty-page :type="5" :text="'还没有邀约查询记录哦~'" class="empty-page" v-if="!list.length" ref="emptyPage"></empty-page>
        <select-more
           :opened.sync="showSelectMore"
           @selectMore="selectMore">
           
       </select-more>
       <select-campus
           :opened.sync="showSelectCampus"
           :campusObj="campusObj"
           @selectCampusObj="selectCampusObj">
       </select-campus>
    </div>
</template>

<script>
    import {getCustomers, putVisitStatus} from 'teacher/api/customers.js'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'
    import SelectMore from './selectMore.vue'
    import SelectCampus from '../selectCampus.vue'
    export default {
        data() {
            return {
                wxTitle: '邀约查询',
                isLoading: true,
                dateObj:{
                    sdate:app.tool.getDatesByIndex(0, app.localTimeToServer).sdate,
                    edate:app.tool.getDatesByIndex(0, app.localTimeToServer).sdate
                },
                quickDateIndex: 0,
                isVisit: 0,
                list: [],
                pagingOption: {
                    api: getCustomers,
                    params: {
                        pname: 'QueryInvite',
                        sdate: app.tool.getDatesByIndex(0, app.localTimeToServer).sdate,
                        edate: app.tool.getDatesByIndex(0, app.localTimeToServer).sdate,
                        visitSdate: '',
                        visitEdate: '',
                        tel: '',
                        campusids: '',
                        IsVisit: 0,
                        AuditStatus: -1,
                        Status: 'AllWithoutSuccess',
                        mainSalePersonid: '',
                        mainSalePersonName: '',
                        nextSalePersonid: '',
                        nextSalePersonName: '',
                        SourceIds: '',
                        IsFirstVisit: 0,
                        CreateUserNameId: '',
                        CreateUserName: '',
                        desc: 1,
                        sort: 'Name',
                        TimePeriodType: 0
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: 'page',
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: 'pageSize',
                        sizeVal: 10,
                        // 后端返回的总页数'key'
                        countKey: 'pageCount'
                    }
                },
                timeDution: 0,
                showSelectMore: false,
                showSelectCampus: false,
                campusObj: {},

                EnableVisitAudit:null, // 配置项  是否在意向客户新增到访审核流程，0表示否（默认），1表示是（现代教育）
                VisitAudit:null,       // 权限
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.data)
                        this.list.forEach((obj, index) => {
                            this.$nextTick(() => {
                                obj.IsVisit === 1 ? 
                                    this.$refs.cycle[index].style.transform = `translate3d(${'12px'}, 0, 0)` :
                                    this.$refs.cycle[index].style.transform = `translate3d(0, 0, 0)`
                            })
                        })
                    }
                })
            },
            initPage(params) {
                this.isLoading = true
                if (!this.list.length) this.list.push({})
                params ? 
                    this.$refs.scroll.refresh(params) :
                    this.$refs.scroll.refresh()
            },
            changeDate(obj){
                this.dateObj.sdate = obj.sdate
                this.dateObj.edate = obj.edate
                this.quickDateIndex = obj.index
                this.initPage({
                    sdate: obj.sdate,
                    edate: obj.edate
                })
            },
            changeVisit() {
                this.isVisit = this.isVisit == 0 ? 1 : 0
                this.initPage({IsVisit: this.isVisit})
            },
            selectMore(obj) {
                this.showSelectMore = false
                this.initPage(obj)
                // this.$refs.scroll.refresh(obj)
            },
            selectCampusObj(obj) {
                this.campusObj = obj
                app.ls.set('invite-campusObj', obj)
                this.showSelectCampus = false
                this.initPage({campusids: obj.Key})
            },
            changeStatus(item, index) {
                let params = {
                    status: item.IsVisit ? 0 : 1,
                    id: item.ID,
                    VisitedDate: '',
                    type: 1
                }
                if (item.IsVisit == 1 && this.EnableVisitAudit == 1) {
                    putVisitStatus(params).then(res => {
                        if (res.ErrorCode == app.errok) {
                            app.toast('info', '填写意向客户到访需要审核，请稍后。')
                            this.initPage()
                        }
                    })
                } else {
                    // 没有权限时默认当天
                    if(app.tool.op("AllowUpdateVisitTime")){
                        app.datetimePicker({format: 'YYYY-MM-DD HH:mm'}).then(res => {
                            params.VisitedDate = res
                            putVisitStatus(params).then(res => {
                                if (res.ErrorCode == app.errok) {
                                    app.toast('info', '修改到访状态成功')
                                    this.initPage()
                                }
                            })
                        })
                    }else{
                        params.VisitedDate = app.filters.formatDatetime(new Date(),'yyyy-MM-dd hh:mm');
                        putVisitStatus(params).then(res => {
                            if (res.ErrorCode == app.errok) {
                                app.toast('info', '修改到访状态成功')
                                this.initPage()
                            }
                        })
                    }
                    
                }
            },
            changeTimeDution(i) {
                if (this.timeDution === i) return
                this.timeDution = i
                this.initPage({TimePeriodType: this.timeDution})
            },
            // 审核
            goToExamine(obj, index){
                // 有权限&&已通过 =>不能点击
                // 无权限&&待审核=>不能点击
                /*if((!this.VisitAudit)&&obj.AuditStatus==0){
                    return
                }*/
                if (!this.VisitAudit || obj.IsVisit == 0) return

                app.ls.setStorage('customerExamineCard',obj)
                // this.currentIndex = index;
                this.$router.push({path: `/examine/${obj.ID}`})
            },
            addComm(card) {
                /*this.set_cunstomInfo({
                    CustomerStatusName: card.CustomerStatusName,
                    CustomerStatus: card.CustomerStatus,
                    WillLevel: card.WillLevel
                })*/
                this.$router.push({
                    path: `/communicationRecords/${card.CustomerID}/${card.SalePersonID}`
                })
            },
        },
        created() {
            this.campusObj = app.ls.get('invite-campusObj') ? app.ls.get('invite-campusObj') : app.customConfigInfo.CampusList[0]
            this.$set(this.pagingOption.params, 'campusids', this.campusObj.Key)
            this.EnableVisitAudit = app.sysInfo.EnableVisitAudit; //配置项
            this.VisitAudit = app.tool.op('VisitAudit');          //权限
            app.event.on('addCommunication', () => {
                this.$refs.scroll.refresh()
            })
        },
        destroyed() {
            app.event.off('addCommunication')
            app.ls.remove('customerExamineCard')
        },
        components: {
            SelectMore,
            SelectCampus,
            EmptyPage
        }
    }
</script>