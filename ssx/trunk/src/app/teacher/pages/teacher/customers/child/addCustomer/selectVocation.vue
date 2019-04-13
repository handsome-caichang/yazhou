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
        <div class="wrapper">
            <div class="actionsheet-item"
                @click="select(item)"
                v-for="(item, index) in list">
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
            whosVocation: {
                type: String
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
            }
        },
        methods: {
            select(str) {
                this.$emit('selectVocation', {
                    vocation: str,
                    whosVocation: this.whosVocation
                })
                this.close()
            }
        },
        created() {
        },
        watch: {
            opened(val) {
                if (val) {
                    this.list = app.customConfigInfo.Vocation
                }
            }
        },
        components: {
            
        }
    }
</script>