<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
        .scroll {
            // @include position-absolute(0, 0, 49px, 0);
            background-color: $color-assist-1;
            .card {
                height: 99px;
                .top {
                    height: 45px;
                    padding: 0 22px 0 12px;
                    background-color: $color-white;
                    @include flex-between;
                    border-bottom: 1px solid $color-assist-1;
                    .top-left {
                        height: 44px;
                        flex: 1;
                        @include flex-between;
                        .avatar {
                            width: 30px;
                            height: 30px;
                            background-color: $color-assist-1;
                            border-radius: 1px solid $color-assist-1;
                            border-radius: 50%;
                            @include background-img(false, cover);
                        }
                        .name {
                            flex: 1;
                            font-size: 16px;
                            color: $color-3;
                            margin-left: 5px;
                        }
                    }
                    .top-right {
                        height: 44px;
                        line-height: 44px;
                        text-align: right;
                        width: 30px;
                    }
                }
                .card-bottom {
                    height: 44px;
                    padding: 0 16px;
                    background-color: $color-white;
                    @include flex-between;
                    .text {
                        font-size: 15px;
                        color: $color-6;
                        width: 80px;
                    }
                    .card-bottom-mid {
                        flex: 1;
                        text-align: right;
                        height: 20px;
                    }
                    .card-bottom-right {
                        width: 30px;
                        text-align: right;
                    }
                }
            }
        }
        .bottom {
            // @include position-absolute(false, 0, 0, 0);
            height: 49px;
            @include flex-between;
            justify-content: flex-end;
            padding: 0 12px;
            border-top: 1px solid $color-assist-1;
            .shangyibu, .next {
                width: 93px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-size: 15px;
                border: 1px solid $color-primary;
                border-radius: 50px;
            }
            .shangyibu {
                color: $color-primary;
                margin-right: 15px;
            }
            .next {
                color: $color-white;
                background-color: $color-primary;
            }
        }
    }
</style>

<template>
    <action-sheet class="wrapper" 
        :data="list" 
        v-if="opened" 
        @close="close" 
        :position="'sideRight'"
        :fullParent="true">
        <div class="scroll">
            <div class="card" v-for="item in list">
                <div class="top">
                    <div class="top-left">
                        <span class="avatar" :style="'background-image: url(' + item.Photo + ')'"></span>
                        <span class="name">{{item.Name}}</span>
                    </div>
                    <div class="top-right" @click="delItem(item)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shanchu2"></use>
                        </svg>
                    </div>
                </div>
                <div class="card-bottom"  @click="selectRole(item)">
                    <div class="text">角色选择</div>
                    <div class="card-bottom-mid">{{item.SaleRoleName}}</div>
                    <div class="card-bottom-right">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <div class="shangyibu" @click="$router.go(-1)">上一步</div>
            <div class="next" @click="submit">确定</div>
        </div>
       <!--  <open-role ref="openRole" :opened.sync="showRole" :cusId="cusId" @selectRol="hasSelectRole"></open-role> -->
    </action-sheet>
</template>

<script>
    // import OpenRole from './openRole.vue'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            list: {
                type: Array
            },
            opened: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
            }
        },
        methods: {
            delItem(obj) {
                this.$emit('delCus', obj.UserID)
            },
            selectRole(obj) {
               this.$emit('openSelectRole', obj)
            },
            submit() {
                let isAllSelect = true
                this.list.some(obj => {
                    if (!obj.SaleRole) {
                        isAllSelect = false
                        app.toast('info', '请选择角色')
                        return 
                    }
                })
                isAllSelect && this.$emit('selectRoleDone')
            }
        },
        created() {
        },
        components: {
            
        }
    }
</script>