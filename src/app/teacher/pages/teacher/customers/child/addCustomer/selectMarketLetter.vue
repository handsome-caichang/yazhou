<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        // font-size: $fs-normal-x;
        z-index: 10;
        .item {
            display: flex;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid $color-assist-1;
            padding: 0 12px;
            .item-left {
                flex: 1;
            }
            .item-right {
                width: 20px;
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
        v-if="opened" 
        @close="close">
        <div class="item" v-for="item in list" @click="select(item)">
            <div class="item-left">
                {{item.Value}}
            </div>
            <div class="item-right">
                <svg class="icon" aria-hidden="true">
                   <use :xlink:href="item.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
               </svg>
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
            
            campusid: {
                type: String
            },
            marketInfo: {
                type: [Object, Array]
            }
        },
        data() {
            return {
                list: [],
                isRefresh: false,
                scrollerConfig:{
                    tag: 'base'
                },
                num: 0,
                
            }
        },
        computed: {
            
        },
        methods: {
            select(obj) {
                obj.isSelect = true
                this.list.forEach(item => {
                    if (item.ID !== obj.ID) item.isSelect = false
                })
                this.$emit('selectMarketInfo', obj)

            },
            bindSelect() {
                this.list.forEach(obj => {
                    if (this.marketInfo.ID == obj.ID) {
                        this.$set(obj, 'isSelect', true)    
                    } else {
                        this.$set(obj, 'isSelect', false)
                    }
                })
            }
        },
        created() {
           
        },
        watch: {
            opened(val) {
                if (val) {
                    getCustomers({pname: 'getmarketinfo', campusid: this.campusid}).then(res => {
                       if (res.errcode === app.errok) {
                            this.list = res.data
                            this.bindSelect()
                       }
                    })
                }
            }
        },
        components: {
            
        }
    }
</script>