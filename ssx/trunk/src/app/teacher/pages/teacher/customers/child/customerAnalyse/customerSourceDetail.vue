<style scoped lang="scss">
    
    
    .scroll {
        @include position-absolute;
        background-color: $color-white;
        .item {
            .item-top {
                // height: 44px;
                min-height: 44px;
                // line-height: 44px;
                @include flex-between;
                padding: 0 12px;
                font-size: 16px;
                color: $color-3;
                border-bottom: 1px solid $color-assist-1;
                
            }
            .item-bottom {
                // height: 60px;
                padding: 12px;
                .item-bottom-content {
                    display: flex;
                    .left, .right {
                        flex: 1;
                        font-size: 12px;
                    }
                    .right {
                        text-align: right;
                    }
                    .spec {
                        margin-left: 10px;
                        color: $color-3;
                    }
                }
                .mar-top {
                    margin-top: 6px;
                }
            }
            .void {
                height: 10px;
                background-color: $color-assist-1;
            }
        }
        .empty-page {
            @include position-absolute;
        }
    }
</style>

<template>
    <scroller-base class="scroll" :data="list">
        <div class="item" v-for="item in list">
            <div class="item-top">
                {{item.name}}
            </div>
            <div class="item-bottom">
                <div class="item-bottom-content">
                    <div class="left">
                        客户数量:<span class="spec">{{item.value}}</span>
                    </div>
                    <div class="right">
                        比例:<span class="spec">{{item.Rate}}</span>
                    </div>
                </div>
                <div class="item-bottom-content mar-top">
                    <div class="left">
                        转化成功:<span class="spec">{{item.transum}}</span>
                    </div>
                    <div class="right">
                        转化率:<span class="spec">{{item.tranRate}}</span>
                    </div>
                </div>
                <div class="item-bottom-content mar-top" v-if="app.sysInfo.EnableVisitCount=='1'">
                    <div class="left">
                        到访客户量:<span class="spec">{{item.VisitCount}}</span>
                    </div>
                    <div class="right">
                        到访转化率:<span class="spec">{{item.VisitRate}}</span>
                    </div>
                </div>
            </div>
            <div class="void"></div>
        </div>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        <empty-page :type="1001" class="empty-page" v-if="!list.length"></empty-page>
    </scroller-base>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'
    export default {
        data() {
            return {
                wxTitle: "招生来源统计表",
                list: [],
                isLoading: true,
                bgType: 0
            }
        },
        methods: {
            initPage(obj = {}) {
                let params = {
                    pname: 'countbysalemode',
                    salemodes: '',
                    page: 1
                }
                params = Object.assign(params, obj)
                getCustomers(params).then(res => {
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        this.list = res.data
                    }
                })
            }
        },
        created() {
            let str = '', 
            params = app.ls.getStorage('params'), 
            obj = {}, 
            id = this.$route.params.id
            obj.sdate = params.sdate
            obj.edate = params.edate
            if (params.campusids.length == 0) {
                str = app.customConfigInfo.CampusList.map(obj => {
                    return obj.Key
                }).join()
            } else {
                str = params.campusids.join()
            }
            obj.campusids = str
            obj.type = id === 'no' ? 0 : 1
            obj.parentid = id === 'no' ? '' : id
            this.initPage(obj)
        },
        components: {
            EmptyPage
        }
    }
</script>