<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .actionsheet-hd {
            @include flex-center;
            height: 50px;
            color: $color-9;
        }
        .wrapper {
            .actionsheet-item {
                padding: 15px;
                color: $color-3;
                @include flex-between;
                &:not(:last-child){
                    @include border-bottom;
                }
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
        v-show="opened" 
        :data="list" 
        @close="close">
        <div slot="header" class="actionsheet-hd">客户状态筛选</div>
            <!-- :class="{'active':item.Id==app.sysInfo.currole.id}" -->
        <div class="wrapper">
            <div class="actionsheet-item"
                v-for="(item, index) in list"
                :class="{'active':customState.ID==item.ID}"
                @click="select(item, index)"
                >
                {{item.Value}}
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
            customState: {
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
                },
                tagIndex: null
            }
        },
        methods: {
            select(item, index) {
                this.tagIndex = index
                this.$emit('selectCustomStatus', item)
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.list = app.customConfigInfo.CustomerStatus
                }
            }
        }
    }
</script>