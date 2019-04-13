<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .heard {
            padding: 0 12px;
            height: 44px;
            line-height: 44px;
            text-align: center;
            background-color: $color-white;
            font-size: 14px;
            color: $color-3;
        }
        .container {
            .item {
                padding: 8px 12px;
                border-bottom: 1px solid $color-9;
                .item-top, .item-bottom {
                    display: flex;
                    font-size: 12px;
                    color: $color-9;
                    .item-left, .item-right {
                        flex: 1;
                    }
                    .item-right {
                        text-align: right;
                    }
                }       
            }
        }
        .bottom {
            display: flex;
            height: 44px;
            line-height: 44px;
            text-align: center;
            .bottom-left {
                flex: 1;
                border-right: 1px solid $color-9;
                color: $color-3;
            }
            .bottom-right {
                flex: 1;
                color: $color-primary;
            }
        }
        
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="'center'"
        v-show="opened" 
        :data="list" 
        @close="close">
        <div class="heard" slot="header">发现同名学员</div>
        <div class="container">
            <div v-for="item in list" class="item">
                <div class="item-top">
                    <div class="item-left">
                        {{item.Name}}
                    </div>
                    <div class="item-right">
                        {{item.CampusName}}
                    </div>
                </div>
                <div class="item-bottom">
                    <div class="item-left">
                        {{item.Tel}}
                    </div>
                    <div class="item-right">
                        {{item.Grade}}
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <div class="bottom-left" @click="emit(false)">
                否，不是同一人
            </div>
            <div class="bottom-right" @click="emit(true)">
                是，重复信息
            </div>
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
            list: {
                type: Array
            },
            type: {
                type: String
            }
        },
        methods: {
           emit(isSamePeople) {
                if (isSamePeople) {
                    this.$emit('selectSamePeople', true)
                } else {
                    this.$emit('selectSamePeople', false)
                }
           }
        }
    }
</script>