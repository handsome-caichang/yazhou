<!-- 待分配客户通知 -->
<style scoped lang="scss">

    .customer-to-be-allocated-container{
        .tip{
            height: 30px;
            line-height: 30px;
            color: $color-3;
            font-size: 12px;
            background-color: #FFF8A6;
            padding: 0 15px;
            .title{
                color: $color-6;
            }
        }
        .scroller{
            @include position-absolute(30px,0,0,0);
            .top{
                margin: 15px;
                padding: 19px;
                height: 100px;
                display: flex;
                border: 1px solid #EEEEEE;
                border-radius: 11px;
                box-shadow: 0px 12px 12px rgba(64,85,196,0.06);
                .campus-area,.students-area{
                    flex: 1;
                    text-align: center;
                    color: #3B4859;
                    font-size: 12px;
                    .count{
                        font-size: 32px;
                    }
                    .describe{
                        margin-top: 6px;
                        color:$color-9;
                        font-size: 12px;
                    }
                }
                .campus-area{
                    .count{
                        color: $color-primary;
                    }
                }
                .students-area{
                    border-left: 1px solid #E2E2E2;
                    .count{
                        color: #F5A623;
                    }
                }
            }
            .item{
                height: 49px;
                line-height: 49px;
                @include flex-between;
                font-size: 15px;
                color: $color-3;
                margin: 0 15px;
                border-bottom: 1px solid #E2E2E2;
                .name{
                    max-width: 80%;
                    @include ellipsis-single;
                }
            }
            .void{
                height: 12px;
            }
        }
    }
</style>

<template>
    <div class="customer-to-be-allocated-container">
        <div class="tip">
            <span class="title">提示：</span>请前往校管家后台，进行意向客户分配操作。
        </div>
        <scroller-load
            class="scroller"
            :data="list"
            @loadData="loadData"
            :pagingOption="pagingOption"
            :type="1">
            <div class="top">
                    <div class="campus-area">
                        <div>
                            <span  class="count">{{total.TotalCount}}</span>个
                        </div>
                        <div class="describe">
                            待分配校区数
                        </div>
                    </div>
                    <div class="students-area">
                        <div>
                            <span class="count">{{total.totalAttIdCount}}</span>人
                        </div>
                        <div class="describe">
                            待分配意向客户数
                        </div>
                    </div>
            </div>
            <div class="item" v-for="item in list" :key="item.cID">
                <div class="name">{{item.deptName}}</div>
                <div class="count">{{item.AttIdCount}}人</div>
            </div>
            <div class="void"></div>
        </scroller-load>
    </div>
</template>

<script>
    import { getCustomerToBeAllocated } from 'teacher/api/customers'
    export default {
        name: "customer-to-be-allocated",
        data() {
            return {
                wxTitle: "汇总详情",
                list:[],
                total:{
                    TotalCount: '',
                    totalAttIdCount: ''
                },
                pagingOption: {
                    api: getCustomerToBeAllocated,
                    params: {
                        teacherid:this.$route.params.teacherid,
                    },
                    pageOpt: {
                        indexKey: 'page', // 分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pageSize', // 每页请求数据长度的'key'、'value'
                        sizeVal: 20,
                        countKey: 'pageCount', // 后端返回的总页数'key'
                    }
                },
            }
        },
        computed: {},
        methods: {
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    if (res.ErrorCode === app.errok) {
                        if (res.PageIndex === 0) {
                            this.list = []
                        }
                        this.total = res.TotalData;
                        this.list = this.list.concat(res.Data);
                    }
                })
            },
        },
        created() {
        },
        components: {}
    }
</script>

