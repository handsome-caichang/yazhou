<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .actionsheet-hd {
            height: 44px;
            padding: 0 15px;
            line-height: 44px;
            font-size: 13px;
            color: $color-6;
            background-color: #f0f0f0;
        }
        .wrapper {
            .actionsheet-item {
                padding: 15px;
                color: $color-3;
                @include flex-between;
                border-bottom: 1px solid $color-assist-1;
                background-color: $color-white;
                &.active {
                    color: $color-primary;
                }
            }
        }
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :scrollerConfig="scrollerConfig"
        :position="'sideRight'"
        ref="action"
        v-show="opened" 
        :data="list" 
        @close="close"
        @loadData="loadData">
        <div slot="header" class="actionsheet-hd">选择意向班级</div>
            <!-- :class="{'active':item.Id==app.sysInfo.currole.Id}" -->
                <!-- :class="{'active':campusObj.Key==item.Key}" -->
        <div class="wrapper">
            <div class="actionsheet-item"
                v-for="(item, index) in list"
                @click="select(item)"
                >
                {{item.Name}}
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
            courseObj: {
                type: Object
            }

        },
        computed: {
            ...Vuex.mapState(['customConfigInfo'])
        },
        data() {
            return {
                list: [],
                /*scrollerConfig: {
                    tag: 'base'
                }*/
                scrollerConfig:{
                    tag: 'super',
                    type: 2,
                    pagingOption: {
                        api: getCustomers,
                        autoLoadFirst: false,
                        params: {
                            pname: 'queryclasspro',
                            shift: this.courseObj.shift,
                            campus: this.courseObj.campus,
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
            }
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
            select(item) {
                this.$emit('selectWillClass', item)
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.$refs.action.$refs.scroller.refresh({
                        shift: this.courseObj.shift,
                        campus: this.courseObj.campus
                    })
                }
            },
            courseObj: {
                handler: function(val) {
                    // this.$set(this.scrollerConfig.pagingOption.params, 'shift', val.shift)
                    // this.$set(this.scrollerConfig.pagingOption.params, 'campus', val.campus)
                },
                deep: true
            }
        },
        mounted() {
            window.a = this
        },
        components: {
           
        }
    }
</script>