<style scoped lang="scss">
    
    
    .scroller {
        @include position-absolute(59px, 0, 0, 0);
        
    }
    .empty-page {
        @include position-absolute(59px, 0, 0, 0);
        z-index: 20;
    }

</style>

<template>
    <div>
        <scroller-super 
            class="scroller"
            ref="scroll"
            :type="2"
            :data="list"
            :pagingOption="pagingOption"
            @loadData="loadData">
                <div>
                    <comm-card v-for="(card, index) in list" :card="card" :key="index"></comm-card>
                </div>
                <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
        </scroller-super>
        <empty-page :type="5" class="empty-page" :text="'暂无已沟通客户'" v-if="!list.length" ref="emptyPage"></empty-page>
    </div>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers'
    import CommCard from '../commCard'
    import EmptyPage from 'teacher/components/common/empty-page/empty-page'
    export default {
        data() {
            return {
                isLoading: true,
                bgType: 0,
                list: [],
                pagingOption: {
                    api: getCustomers,
                    params: {
                        pname: 'querycustomer',
                        isWaitComm: 0,
                        NextDate1: '',
                        NextDate2: '',
                        CreateTime1: '',
                        CreateTime2: '',
                        Query: '',
                        sort: 'CreateTime',
                        employeeid: '',
                        employeename: '',
                        desc: 1,
                        Status: ''
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
                    }

                })
            },
            
        },
        created() {
            let date = new Date(), str = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            this.$set(this.pagingOption.params, 'LastDate1', str)
            this.$set(this.pagingOption.params, 'LastDate2', str)
        },
        components: {
            CommCard,
            EmptyPage
        },
    }
</script>