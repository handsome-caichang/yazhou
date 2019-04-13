<!-- 到校离校页面 -->
<style scoped lang="scss">
.checkin-container {
    background-color: $color-assist-1;
    .top-search {
        background-color: $color-white;
        padding: 8px 15px;
        height: 44px;
        line-height: 28px;
        @include flex-between;
        margin-bottom: 6px;
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
    }
    .body {
        .card {
            @include border-bottom;
            height: 64px;
            padding: 14px 15px;
            display: flex;
            background-color: $color-white;
            .logo {
                padding: 4px 0;
                margin-right: 10px;
                .icon {
                    font-size: 28px;
                }
            }
            .card-rt {
                flex: 1;
                height: 40px;
                .describe {
                    font-size: 16px;
                    color: $color-3;
                    margin-bottom: 4px;
                }
                .date {
                    font-size: 12px;
                    color: $color-9;
                }
            }
        }
    }
    .scroller {
        @include position-absolute(50px, 0, 0, 0);
        overflow: hidden;
    }
    .noData-temp {
        @include position-absolute;
    }
}
</style>

<template>
    <div class="checkin-container">
        <div class="top-search">
            <date-bar class="date-filter" :sdate='pagingOption.params.starttime' :edate='pagingOption.params.endtime' :index="quickDateIndex" @changeDate="changeDate">
            </date-bar>
        </div>

        <div class="body">
            <scroller-super class="scroller" :type="2" :data="list" :pagingOption="pagingOption" @loadData="loadData" ref="checkinListScroller">
                <!--flag 1签到 0签退-->
                <div class="card" v-for="(item,index) in list" :key="index">
                    <div class="logo">
                        <svg class="icon" aria-hidden="true">
                            <use :xlink:href="item.flag==1?'#icon-daoxiaoqiandao':'#icon-lixiaoqiantui'"></use>
                        </svg>
                    </div>
                    <div class="card-rt">
                        <div class="describe">{{item.describe}}</div>
                        <div class="date">{{item.time.replace(/-/g,'.')}}</div>
                    </div>
                </div>

                <empty-page class="noData-temp" :type="5" v-if="list.length == 0"></empty-page>
            </scroller-super>
            <loading class="loading" v-show="isLoading"></loading>
        </div>
    </div>
</template>

<script>
import EmptyPage from "parent/components/common/empty-page/empty-page";
import { getstudentsignrecordinfos } from "parent/api/common";

export default {
    name: "checkin-list",
    data() {
        return {
            wxTitle: "到校离校",
            list: [],
            isLoading: true,
            quickDateIndex: -1,
            pagingOption: {
                api: getstudentsignrecordinfos,
                params: {
                    starttime: "",
                    endtime: ""
                },
                pageOpt: {
                    sortfield: "",
                    isdesc: "",
                    indexKey: "pageindex", //分页初始页码的'key'、'value'
                    indexVal: 1,
                    sizeKey: "pagesize", //每页请求数据长度的'key'、'value'
                    sizeVal: 20,
                    countKey: "totalpage" //后端返回的总页数'key'
                }
            }
        };
    },
    methods: {
        changeDate(obj) {
            this.pagingOption.params.starttime = obj.sdate;
            this.pagingOption.params.endtime = obj.edate;
            this.quickDateIndex = obj.index;
            this.reload();
        },
        reload() {
            this.$refs.checkinListScroller.refresh(this.pagingOption.params);
        },
        loadData(ajaxPromise) {
            ajaxPromise.then(res => {
                this.isLoading = false;

                

                console.log(res, this.isLoading);
                if (res.result.code == app.errok) {
                    if (res.page.pageindex === 1) {
                        this.list = [];
                    }
                    this.list = this.list.concat(res.data);
                }
            });
        }
    },
    created() {
        //推送在此判断 处理日期即可
        this.pagingOption.params.starttime = app.tool.getDatesByIndex(
            3,
            app.localTimeToServer
        ).sdate;
        this.pagingOption.params.endtime = app.tool.getDatesByIndex(
            3,
            app.localTimeToServer
        ).edate;
    },
    components: {
        EmptyPage
    }
};
</script>