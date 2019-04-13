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

                    .item-left, .item-center, .item-right {
                        flex: 1;
                    }
                    .item-right {
                        text-align: right;
                    }
                    .item-center{
                        text-align: center;
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
            }
            .bottom-right {
                flex: 1;
                color: $color-primary;
                &:first-child {
                    border-right: 1px solid $color-9;
                    color: $color-3;
                }
            }
        }
        
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="'center'"
        v-if="opened" 
        :data="list" >
        <div class="heard" slot="header">发现相同学员</div>
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
                    <div :class="item.SalePersonName ? 'item-center' : 'item-right'">
                        {{item.Grade}}
                    </div>
                    <div class="item-right" v-if="item.SalePersonName">
                        主责任人: {{item.SalePersonName}}
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <!-- <div class="bottom-left" @click="emit(false)">
                否，不是同一人
            </div>
            <div class="bottom-right" @click="emit(true)">
                是，重复信息
            </div> -->
            <div class="bottom-right" v-for="(btn,index) in btns" @click="_triggerBtn(btn)">
                {{btn.text}}
            </div>
        </div>
    </action-sheet>
</template>

<script>
    
    
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            /*opened: {
                type: Boolean,
                default: false
            },*/
            list: {
                type: Array
            }
        },
        data() {
            return {
                opened: false,
                btns: [
                        {
                            text: '否，不是同一人',
                            action: false
                        },{
                            text: '是，重复信息',
                            action: true
                        }
                    ],
                _rsv: null
            }
        },
        methods: {
            /*emit(isSamePeople) {
                if (isSamePeople) {
                    this.$emit('selectSamePeople', true)
                } else {
                    this.$emit('selectSamePeople', false)
                }
            },*/
            _triggerBtn(btn) {
                this._rsv(btn.action)
                this.close()
            },
            open() {
                this.opened = true
                this.promise = new Promise(rsv => {
                    this._rsv = rsv
                })
                return this.promise
            }
        },
        watch: {
            
        },
        components: {
            
        }
    }
</script>