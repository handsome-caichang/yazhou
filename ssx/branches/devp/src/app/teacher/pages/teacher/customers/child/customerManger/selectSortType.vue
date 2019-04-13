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
        :data="scrollData" 
        @close="close">
        <div slot="header" class="actionsheet-hd">意向客户排序</div>
        <div class="wrapper">

            <div class="actionsheet-item"
                v-for="(item, index) in list"
                :class="{'active':sortType==item}"
                @click="select(item, index)"
                >
                {{item}}
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
            sortType: {
                type: String
            }
        },
        computed: {
            ...Vuex.mapState(['customConfigInfo']),
            scrollData() {
                return {
                    opened: this.opened,
                    list: this.list
                }
            }
        },
        data() {
            return {
                list: ['按姓名','按录入时间','按跟进时间','按沟通时间','按姓名','按录入时间','按跟进时间','按沟通时间'],
                scrollerConfig: {
                    tag: 'base'
                },
            }
        },
        methods: {
            select(item, index) {
                this.$emit('selectSortType', item)
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    // console.log(this.sortType)
                    // this.list = app.customConfigInfo.CustomerStatus
                }
            },
        }
    }
</script>