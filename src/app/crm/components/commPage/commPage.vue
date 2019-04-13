<!-- 客户列表公共模块 -->
<style scoped lang="scss">
    .wrapper {
        .all-page {
            @include position-absolute;
            background-color: $color-assist-1;
            padding: 0 12px;
            .card {
                margin-top: 8px;
            }
            .void {
                height: 16px;
                background-color: $color-assist-1;
            }
        }
        .empty-page {
            @include position-absolute;
        }
        .loading {
            @include position-absolute;
        }
        .add {
            width: 55px;
            height: 55px;
            z-index: 9999;
            border-radius: 50%;
            line-height: 55px;
            text-align: center;
            font-size: 55px;
            @include position-absolute(false, 23px, 24px, false);
            box-shadow: -1px 5px 5px rgba(89, 145, 255, 0.3);
        }
    }
</style>

<template>
    <div class="wrapper">
        <scroller-super 
            class="all-page"  
            :data="list"
            :pagingOption="pagingOption"
            :type="2"
            ref="scroll"
            @loadData="loadData">
            <card v-for="(card, index) in list" :key="index" :cardInfo="card" :routeName="$route.name" class="card"></card>
            <div class="void"></div>
        </scroller-super>
        <empty-page v-if="!list.length" class="empty-page"></empty-page>

        <loading class="loading" v-if="isLoading"></loading>
        <router-link tag="div" to="/addCustomer/1" class="add" v-if="params.scope==2&&params.sourcetype==1">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-kuaisutianjiaxiansuo"></use>
            </svg>
        </router-link>
    </div>
</template>

<script>
    import {getCustomerList, getPlanCustomerList} from 'crm/api/yy.js'
    import Card from 'crm/components/commCard/commCard.vue'
    import EmptyPage from 'crm/components/empty-page/empty-page.vue'
    export default {
        props: {
            params: {
                type: Object
                /*{
                    scope: 2, //1 公海 2线索  3私海
                   .sourcetype: 1, // 1自己添加 2 公司分配 3 公海 4 我的推广
                    keyWords: '', //关键字
                    status: '', //3跟进中  4试听中 5转化成功
                }*/
            },
            apiType: {
                type: Number,
                default: 1
            },
            autoLoadFirst: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            pagingOption() {
                return {
                    api: this.apiType == 1 ? getCustomerList : getPlanCustomerList,
                    params: {
                        ...this.params
                    },
                    autoLoadFirst: this.autoLoadFirst,
                    pageOpt: {
                        indexKey: 'pageindex', // 分页初始页码的'key'、'value'
                        indexVal: 1,
                        sizeKey: 'pagesize', // 每页请求数据长度的'key'、'value'
                        sizeVal: 10,
                        countKey: 'totalpage', 
                    }
                }
            }
        },
        data() {
            return {
                list: [],
                isLoading: this.autoLoadFirst 
            }
        },
        methods: {
            loadData(ajaxPromise){
                ajaxPromise.then(res => {
                    this.isLoading = false;
                    if (res.result.code == app.errok) {
                        if (res.page.pageindex === 1) {
                            this.list = [];
                        }
                        this.list = this.list.concat(res.data);
                    }
                })
            }
        },
        created() {
            this.$nextTick(()=> {
                app.event.on('refreshList', () => {
                    this.$refs.scroll.refresh()
                })
            })
        },
        destroyed() {
            app.event.off('refreshList')
        },
        watch: {
           /* params(val) {
                console.log(val);
                this.isLoading = true
                this.$refs.scroll.refresh(this.params)
            }*/
            params: {
                handler: function(val, oldVal) {
                    // console.log(val.sourcetype)
                    // console.log(oldVal.sourcetype)
                    this.isLoading = true
                    this.$refs.scroll.refresh(this.params)
                },
                deep: true
            }
        },
        components: {
            Card,
            EmptyPage
        }
    }
</script>