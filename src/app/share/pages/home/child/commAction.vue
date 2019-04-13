<style scoped lang="scss">
    
    
    .comm-action {
        @include position-absolute;
        z-index: 9999990;

        .header {
            height: 44px;
            line-height: 44px;
            font-size: 13px;
            text-align: center;
        }
        .content {
            .item {
                height: 49px;
                line-height: 49px;
                font-size: 14px;
                @include flex-between;
                border-top: 1px solid $color-assist-1;
                padding: 0 15px;
                color: $color-6;
                &.active {
                    color: $color-primary;
                }
                .name{
                    max-width: 80%;
                    @include ellipsis-single;
                }
            }
        }
    }
</style>

<template>
    <action-sheet 
        class="comm-action" v-if="opened" @close="close" :data="list">
        <div class="header" slot="header">
            {{title}}
        </div>
        <div class="content" v-if="list.length">
            <div class="item"
                 v-for="(item,index) in list"
                 :key="index"
                 :class="{active:item.isSelect}"
                 @click="clickItem(item)">
                <div class="name">{{item.describe}}</div>
                <div class="icon-box">
                    <svg aria-hidden="true" class="icon" v-show="item.isSelect">
                        <use xlink:href="#icon-gouxuan"></use>
                    </svg>
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
                type: Boolean
            },
        },
        data() {
            return {
                _resolve: null,
                title: '',
                list: [],
            }
        },
        methods: {
            clickItem(item) {
                this._resolve(item);
                // this.opened = false
                this.close()
            },
            show(options) { //弹出

                //this.opened = true //开关打开
                this.title = options.title      //头部标题渲染
                this.list = options.list        //选项列表渲染

                return new Promise((resolve) => {
                    this._resolve = resolve
                });
            },
        }
    }
</script>