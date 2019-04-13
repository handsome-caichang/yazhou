<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .header {
            padding: 0 12px;
            height: 44px;
            line-height: 44px;
            background-color: $color-assist-1;
        }
        .wrapper {
            .item {
                padding: 15px;
                height: 44px;
                color: $color-3;
                @include flex-between;
                .icon-wrapper {
                    width: 25px;
                }
                .name {
                    flex: 1;
                }
                &:not(:last-child){
                    // @include border-bottom;
                    border-bottom: 1px solid $color-assist-1;
                }
                &.active {
                    color: $color-primary;
                }
            }
        }
        .bottom {
            display: flex;
            height: 44px;
            line-height: 44px;
            .cancle, .sure {
                text-align: center;
                font-size: 15px;
                flex: 1;
            }
            .cancle {
                border-top: 1px solid $color-assist-1;
            }
            .sure {
                background-color: $color-primary;
                color: $color-white;
            }
        }
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :scrollerConfig="scrollerConfig"
        :position="'sideRight'"
        v-show="opened" 
        :data="scrollData" 
        @close="close">
        <div slot="header" class="header" @click="close">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuobianjiantou"></use>
            </svg>
            {{text}}
        </div>
        <div class="wrapper">
            <div class="item"
                v-for="(item,index) in list"
                @click="select(item,index)">
                <div class="icon-wrapper">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                </div>
                <div class="name">
                    {{item.Name || item.Value.Name}}
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <div class="cancle" @click="resetting">重置</div>
            <div class="sure" @click="emit">{{"确定("+selectNum+"/"+changeList.length+")"}}</div>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            changeList: {
                type: Array
            },
            openStr: {
                type: String
            }
        },
        computed: {
            text() {
                return this.openStr == 'campus' ? '选择校区' : '添加对比项'
            },
            selectNum() {
                let num = 0
                this.list.forEach(obj => {
                    if (obj.isSelect) num++
                })
                return num
            },
            scrollData() {
                return {
                    opened: this.opened,
                    list: this.list
                }
            }
        },
        data() {
            return {
                list: [],
                scrollerConfig: {
                    tag: 'base'
                },
                num: 0,
            }
        },
        methods: {
            select(obj, index) {
                obj.isSelect = !obj.isSelect
                // this.$emit('selectType', obj, index)
            },
            resetting() {
                this.list.forEach(obj => {
                    obj.isSelect = false
                })
                // this.$emit('clearData')
            },
            emit() {
                this.$emit('selectArr', this.list)
            }
        },
        watch: {
            opened(val) {
                this.list = app.tool.clone(this.changeList)
            }
        },
        components: {
            
        }
    }
</script>