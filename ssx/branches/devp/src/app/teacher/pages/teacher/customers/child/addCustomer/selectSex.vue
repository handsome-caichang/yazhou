<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .actionsheet-hd {
            text-align: center;
            height: 44px;
            line-height: 44px;
        }
        .wrapper {
            .actionsheet-item {
                // padding: 15px;
                color: $color-3;
                margin-bottom: 5px;
                @include flex-center;
                .icon {
                    font-size: 28px;
                }
                .color {
                    color: $color-primary
                }
                .text {
                    text-align: center;
                }
                // &:not(:last-child){
                //     border: 1px solid $color-assist-1;
                // }
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
        :position="'center'"
        v-show="opened" 
        :data="list" 
        @close="close">
        <div slot="header" class="actionsheet-hd">性别选择</div>
            <!-- :class="{'active':item.Id==app.sysInfo.currole.Id}" -->
        <div class="wrapper">
            <div class="actionsheet-item"
                v-for="(item, index) in list"
                :class="{'active':sexObj.sex==item.sex}"
                @click="select(item)">
                <div>
                    <div>
                        <svg class="icon" aria-hidden="true" :class="{'color':sexObj.sex==item.sex}">
                            <use :xlink:href="'#'+item.icon"></use>
                        </svg>
                    </div>
                    <div class="text"> {{item.text}}</div>
                </div>
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
            sexObj: {
                type: Object
            }
        },
        computed: {
            ...Vuex.mapState(['customConfigInfo'])
        },
        data() {
            return {
                list: [],
                scrollerConfig: {
                    tag: 'base'
                }
            }
        },
        methods: {
            select(item) {
                this.$emit('selectSexObj', item)
                this.close()
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.list = [{
                        sex: 1,
                        text: '男',
                        icon: 'icon-nan1'
                    },{
                        sex: 2,
                        text: '女',
                        icon: 'icon-nv1'
                    }]
                }
            }
        },
        components: {
            
        }
    }
</script>