<!-- 简单的状态筛选 -->
<style scoped lang="scss">
    .state-actionsheet {
        @include position-absolute;
        z-index: 9999990;

        .header {
            height: 44px;
            line-height: 44px;
            font-size: 13px;
            text-align: center;
        }
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
</style>

<template>
    <action-sheet class="state-actionsheet" v-if="opened" @close="close" :data="list">
        <div class="header" slot="header">
            {{title}}
        </div>
            <div class="item"
                 v-for="(item,index) in list"
                 :key="index"
                 @click="clickItem(item)"
                 :class="{active:current.id==item.id}">
                <div class="name">{{item.value}}</div>
                <div class="icon-box">
                    <svg aria-hidden="true" class="icon" v-show="current.id==item.id">
                        <use xlink:href="#icon-fuchuangxuanzhong"></use>
                    </svg>
                </div>
            </div>
    </action-sheet>
</template>

<script>
    export default {
        name: "state-actionsheet",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            current:{
            	type:Object
            },
            list:{
            	type: Array
            },
            title:{
            	type:String
            }
        },
        data() {
            return {
                
            }
        },
        computed: {
            
        },
        methods: {
            clickItem(item) {
                // this.current = item;  //高亮指向选择项
                this.$emit('stateItem', item);
                this.close();
            },
        },
        components: {
            
        }
    }
</script>
