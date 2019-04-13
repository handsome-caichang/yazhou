<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        // font-size: $fs-normal-x;
        z-index: 10;
        .container {
            // padding: 12px;
            background-color: $color-white;
            .card-wrapper {
                .heard {
                    color: $color-9;
                    padding: 0 12px;
                    background-color: $color-assist-1;
                }
                .item {
                    padding: 0 12px;
                    width: 100%;
                    background-color: $color-white;
                    line-height: 34px;
                    @include flex-center;
                    border-bottom: 1px solid $color-assist-1;
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
                        font-size: 15px;
                        color: $color-3;
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
            <div class="card-wrapper" v-for="heard in list">
                
                <div class="heard" >
                    {{heard.Name}}
                </div>
                <div v-for="item in heard.List" class="item" @click="select(item)">
                    <div class="item-left">
                       <svg class="icon" aria-hidden="true">
                           <use :xlink:href="item.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                       </svg>
                    </div>
                    <div class="item-right">
                        <div class="title">
                           {{item.Name}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer" @click="selectSource">{{"确定("+selectNum+"/"+num+")"}}</div>
    </action-sheet>
</template>

<script>
    import {getCommunicationMode} from 'teacher/api/customers';
    
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
                isRefresh: false,
                scrollerConfig:{
                    tag: 'base'
                },
                num: 0
            }
        },
        computed: {
            selectNum() {
                let num = 0
                this.list.forEach(obj => {
                    obj.List.forEach(oobj => {
                        if (oobj.isSelect) num++
                    })
                })
                return num
            }
        },
        methods: {
            select(obj) {
                obj.isSelect = !obj.isSelect
            },
            selectSource() {
                let arr = []
                this.list.forEach(obj => {
                    obj.List.forEach(oobj => {
                        if (oobj.isSelect) arr.push({
                            ID: oobj.ID,
                            Name: oobj.Name
                        })
                    })
                })
                this.$emit('selectSource', arr)
            },
        },
        watch: {
            opened(val) {
                this.list = app.customConfigInfo.SaleMode
                let arr = this.sourceArr.map(obj => {
                    return obj.ID
                })
                if (val) {
                    this.num = 0
                    this.list.forEach(obj => {
                        obj.List.length && obj.List.forEach(oobj => {
                            this.num ++
                            if (arr.indexOf(oobj.ID) > -1) {
                                this.$set(oobj, 'isSelect', true)
                            } else {
                                this.$set(oobj, 'isSelect', false)
                            }
                        })
                    })
                }
            }
        }
    }
</script>