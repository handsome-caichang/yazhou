<!-- 时间间隔选择 -->
<style scoped lang="scss">
    .as-actionsheet {
        @include position-absolute(0, 0, 0, 0);
        font-size: 15px;
        color: $color-3;
    }
    .class-name {
        padding: 0 20px;
        height: 44px;
        line-height: 44px;
        background-color: #F2F2F2;
        border-bottom: 1px solid #DFDFDF;
    }
    .actionsheet-item {
        padding: 0 20px;
        height: 44px;
        line-height: 44px;
        @include flex-between;
        &:not(:last-child){
            @include border-bottom;
        }
        &.active {
            color: $color-primary;
        }
    }
</style>

<template>
    <action-sheet
        class="as-actionsheet"
        v-show="opened"
        @close="close">
        <div slot="header" class="class-name">请选择时间间隔</div>
        <div class="actionsheet-item"
            @click="select(item)"
            :class="{'active':item.id==id}"
            v-for="item in timeArr">{{item.name}}
            <svg class="icon" aria-hidden="true" v-show="item.id==id">
                <use xlink:href="#icon-gouxuan"></use>
            </svg>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: 'timeFilter',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                timeArr: [{
                    id: 'day',
                    name: '日'
                },{
                    id: 'week',
                    name: '周'
                },{
                    id: 'month',
                    name: '月'
                }],
                id: 'week'
            }
        },
        methods: {
            select(obj) {
                this.id = obj.id;
                this.close();
            }
        }
    }
</script>