<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        .header {
            .search-wrapper {
                padding: 0 12px;
                height: 44px;
                @include flex-center;
                position: relative;
                border-bottom: 5px solid $color-assist-1;
                .input {
                    padding: 0 10px;
                    flex: 1;
                    height: 28px;
                    border: 1px solid #EEF1F6;
                    font-size: 12px;
                    color: #BBBBBB;
                    border-radius: 50px;
                }
                .search-button {
                    position: absolute;
                    right: 12px;
                    width: 50px;
                    height: 28px;
                    text-align: center;
                    border-radius: 50px;
                    line-height: 28px;
                    background-color: #BBBBBB;
                    color: $color-6;
                }
            }
            .heard-bottom {
                height: 44px;
                line-height: 44px;
                padding: 0 12px;
                display: flex;
                .text {
                    flex: 1;
                    &:last-child {
                        text-align: right;
                    }
                    &:nth-child(2) {
                        text-align: center;
                    }
                }
            }
        }
        .container {
            border-top: 1px solid $color-assist-1;
            .item {
                height: 44px;
                line-height: 44px;
                padding: 0 12px;
                background-color: $color-white;
                display: flex;
                font-size: 15px;
                border-bottom: 1px solid $color-assist-1;
                .item-left {
                    flex: 1;
                    color: $color-3;
                }
                .item-mid {
                    flex: 1;
                    color: $color-6;
                    text-align: center;
                }
                .item-right {
                    flex: 1;
                    color: $color-6;
                    text-align: right;
                }
            }
        }
        
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="'sideRight'"
        :scrollerConfig="scrollerConfig"
        :data="list" 
        :fullParent="true"
        v-if="opened" 
        @close="close"
        @loadData="loadData">
        <div class="header" slot="header">
            <div class="search-wrapper">
                <input type="input" placeholder="请输入介绍人姓名/学号/手机号" class="input" v-model="text">
                <div class="search-button" @click="searchIntroducePerson">搜索</div>
            </div>
            <div class="heard-bottom">
                <div class="text">姓名</div>
                <div class="text">学号</div>
                <div class="text">手机号</div>
            </div>
        </div>
        <div class="container">
            <div class="item" v-for="item in list" @click="selectIntroducePerson(item)">
                <div class="item-left">{{item.Name}}</div>
                <div class="item-mid">{{item.Serial}}</div>
                <div class="item-right">{{item.SMSTel}}</div>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    
    
    import {getCustomers} from 'teacher/api/customers'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            sourceArr: {
                type: Array
            }
        },
        data() {
            return {
                list: [],
                scrollerConfig:{
                    tag: 'super',
                    type: 2,
                    pagingOption: {
                        api: getCustomers,
                        params: {
                            pname: 'querystudent',
                            Query: this.text,
                            campusFlag: 0,
                            status: 1,
                            signStatus: -1,
                            isSingle: 0,
                            desc: 0
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
                        
                    }
                },
                text: ''
                
            }
        },
        computed: {
           
        },
        methods: {
            loadData(promise) {
                promise.then(res => {
                    if (res.errcode == app.errok) {
                        if (res.pageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.data)
                    }
                })
            },
            searchIntroducePerson() {
                let params = {
                                pname: 'querystudent',
                                Query: this.text,
                                campusFlag: 0,
                                status: 1,
                                signStatus: -1,
                                isSingle: 0,
                                desc: 0
                            }
                getCustomers(params).then(res => {
                    if (res.errcode == app.errok) {
                        this.list = res.data
                    }
                })
            },
            selectIntroducePerson(item) {
                this.$emit('selectIntroducePerson', {
                    name: item.Name,
                    id: item.ID
                })
            }
        },
        created() {
        },
        watch: {
            opened(val) {
                
            }
        },
        components: {
            
        }
    }
</script>