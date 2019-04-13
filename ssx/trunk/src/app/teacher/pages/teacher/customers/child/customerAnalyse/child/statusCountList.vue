<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
        background-color: $color-white;
        .scroller {
            @include position-absolute(0, 0, 49px, 0);
            .card {
                height: 64px;
                border-bottom: 1px solid $color-assist-1;
                padding: 0 15px;
                @include flex-between;
                font-size: 15px;
                color: $color-3;
                background-color: $color-white;
                .card-wrapper {
                    width: 100%;
                    .info {
                        display: flex;
                        margin-bottom: 15px;
                        .campus-name {
                            flex: 1;
                        }
                        .num {
                            width: 100px;
                            text-align: right;
                        }
                    }
                    .gray {
                        width: 100%;
                        height: 7px;
                        border-radius: 50px;
                        position: relative;
                        background-color: #E1E8F4;
                        .blue {
                            @include position-absolute(0, false, 0, 0);
                            height: 7px;
                            border-radius: 50px;
                            // width: 20px;
                            background-color: $color-primary;
                        }
                    }
                }
            }
            
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            background-color: $color-primary;
            text-align: center;
            color: $color-white;
            font-size: 16px;
        }
    }
</style>

<template>
    <div class="wrapper">
        <scroller-super class="scroller"
                        ref="scroll"
                        :type="2"
                        :data="list"
                        :pagingOption="pagingOption"
                        @loadData="loadData">
            <div>
                <div class="card" v-for="card in list">
                    <div class="card-wrapper">
                        <div class="info">
                            <div class="campus-name">{{card.CampusName}}</div>
                            <div class="number">{{card.Sum}}人</div>
                        </div>
                        <div class="gray" ref="gray">
                            <div class="blue" :style="{width: `${Math.ceil(card.Sum/maxSum*maxWidth)}px`}"></div>
                        </div>
                    </div>
                </div>
            </div>
        </scroller-super>
        <router-link class="bottom" tag="div" to="/campusCompare">
            对比
        </router-link>
        <loading class="loading" v-show="isLoading"></loading>
    </div>
</template>

<script>
    import {queryCustomer} from 'teacher/api/customers'
    export default {
        data() {
            return {
                wxTitle: "客户分析报表",
                list: [],
                pagingOption: {
                    api: queryCustomer,
                    params: {
                        pname:"countbycustomerstatus",
                        sdate: '',
                        edate: '',
                        campusids: ''
                    },
                    pageOpt: {
                        // 分页初始页码的'key'、'value'
                        indexKey: "page",
                        indexVal: 1,
                        // 每页请求数据长度的'key'、'value'
                        sizeKey: "pageSize",
                        sizeVal: 20,
                        // 后端返回的总页数'key'
                        countKey: "pageCount"
                    }
                },
                isLoading: true,
                maxWidth: ''
            }
        },
        computed: {
            maxSum() {
                let max = 1
                let tempArr = this.list.map(obj => {
                    return obj.Sum
                })
                max = Math.max.apply(null, tempArr)
                return max
            }
        },
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    this.isLoading = false
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.data.Values)
                        if (this.list.length) {
                            this.$nextTick(() => {
                                this.maxWidth = this.$refs.gray[0].offsetWidth
                            })
                        }
                    }
                })
            },
        },
        created() {
            let str = '', params = app.ls.getStorage('params')
            this.pagingOption.params.sdate = params.sdate
            this.pagingOption.params.edate = params.edate
            if (params.campusids.length == 0) {
                str = app.customConfigInfo.CampusList.map(obj => {
                    return obj.Key
                }).join()
            } else {
                str = params.campusids.join()
            }
            this.pagingOption.params.campusids = str
        }
    }
</script>