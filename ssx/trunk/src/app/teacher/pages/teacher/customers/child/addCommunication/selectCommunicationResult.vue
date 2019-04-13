<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute(0, 0, 0, 0);
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
                word-break: break-word;
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
    <div  v-show="opened">
        <action-sheet
            class="role-actionsheet"
            v-show="selectOne"
            :scrollerConfig="scrollerConfig"
            :position="'bottom'"
            :data="list" 
            @close="close">
            <div slot="header" class="actionsheet-hd">沟通结果</div>
            <div class="wrapper">
                <div class="actionsheet-item" @click="selectValidResult">
                    有效沟通
                </div>
                <div class="actionsheet-item" @click="changeContent">
                    无效沟通
                </div>
            </div>
        </action-sheet>
        <action-sheet
            class="role-actionsheet"
            :scrollerConfig="scrollerConfig"
            v-if="selectTwo" 
            :data="list" 
            @close="close">
            <div slot="header" class="actionsheet-hd">客户状态筛选</div>
            <div class="wrapper">
                <div class="actionsheet-item"
                    :class="{'active':tagIndex==index}"
                    @click="selectNotvalidResult(item, index)"
                    v-for="(item, index) in list">
                    {{item.Value}}
                </div>
            </div>
        </action-sheet>
    </div>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...Vuex.mapState(['customConfigInfo'])
        },
        data() {
            return {
                list: [],
                selectOne: true,
                selectTwo: false,
                scrollerConfig: {
                    tag: 'base'
                },
                tagIndex: null
            }
        },
        methods: {
            selectNotvalidResult(item, index) {
                this.$emit('selectNotvalidResult', item) 
                this.tagIndex = index 
            },
            selectValidResult() {
                this.$emit('selectValidResult')
            },
            changeContent() {
                this.selectOne = false
                this.selectTwo = true
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.selectOne = true
                    this.selectTwo = false
                    this.list = app.customConfigInfo.NoCommMode
                }
            }
        }
    }
</script>