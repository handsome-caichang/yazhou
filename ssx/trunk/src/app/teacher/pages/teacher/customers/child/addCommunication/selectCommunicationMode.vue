<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        // font-size: $fs-normal-x;
        z-index: 10;
        .container {
            padding: 12px;
            background-color: $color-white;
            .item {
                margin-bottom: 10px;
                display: flex;
                .item-left {
                    .icon {
                        margin-top: 2px;
                    }
                    color: $color-3;
                    width: 20px;
                    font-size: 15px;
                }
                .item-right {
                    flex: 1;
                    .title {
                        font-size: 15px;
                        color: $color-3;
                    }
                    .desc {
                        font-size: 12px;
                        color: $color-6;
                        word-break: break-word;
                    }
                }
            }
            
        }
        .bottom {
            height: 49px;
            line-height: 49px;
            background-color: $color-primary;
            color: $color-white;
            font-size: 15px;
            text-align: center;
        }
        
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="'sideRight'"
        :scrollerConfig="scrollerConfig"
        :data="list" 
        v-show="opened" 
        @close="close">
        <div class="container">
           <div v-for="item in list" class="item" @click="select(item)">
                <div class="item-left">
                   <svg class="icon" aria-hidden="true">
                       <use :xlink:href="item.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                   </svg>
                </div>
                <div class="item-right">
                    <div class="title">
                       {{item.Value}}
                    </div>
                    <div class="desc">{{item.Describe}}</div>
                </div>
           </div>
        </div>
        <div class="bottom" slot="footer" @click="selectMode">确定</div>
    </action-sheet>
</template>

<script>
    
    
    import {getCommunicationMode} from 'teacher/api/customers'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                list: [],
                scrollerConfig:{
                    tag: 'base'
                },
                
            }
        },
        methods: {
            select(obj) {
                obj.isSelect = !obj.isSelect
                // this.$emit('selectMode', obj)
            },
            selectMode() {
                let str = ''
                this.list.forEach(obj => {
                    if (obj.isSelect) {
                        str = obj.Describe + ' ' + str
                    }
                })
                this.$emit('selectMode', str)
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    getCommunicationMode({type: 'COMM_COTENTTPL'}).then(res => {
                        if (res.ErrorCode === app.errok) {
                            this.list = res.Data
                        }
                        this.list.forEach(obj => {
                            this.$set(obj, 'isSelect', false)
                        })
                    })
                }
            }
        },
        components: {
            
        }
    }
</script>