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
        <div slot="header" class="actionsheet-hd">沟通方式选择</div>
            <!-- :class="{'active':item.Id==app.sysInfo.currole.id}" -->
        <div class="wrapper">
            <div class="actionsheet-item"
                v-for="(item, index) in list"
                :class="{'active':next?nextCommType.ID===item.ID:commType.ID===item.ID}"
                @click="select(item, index)">
                
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
            next: {
                type: Boolean,
                default: false
            },
            commType: {
                type: Object
            },
            nextCommType: {
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
            showActive(index) {
                console.log(this.commType)
                if (this.commType.index===index||this.nextCommType.index===index) {
                    return true
                } else {
                    return false
                }
            },  
            select(item, index) {
                // this.tagIndex = index
                if (!this.next) {
                    this.$emit('selectCommType', item)
                } else {
                    this.$emit('selectNextCommType', item)
                }
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.list = app.customConfigInfo.CommMode
                }
            }
        }
    }
</script>