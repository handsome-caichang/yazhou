<style lang="scss" scoped>
    .sel-item {
        height: 44px;
        line-height: 44px;
        padding-left: 10px;
        padding-right: 10px;
        color: $color-3-s;
        .name{
            @include ellipsis-single;
        }
        &.between {
            @include flex-between;
        }
        &.active {
            color: $color-primary;
        }
    }
</style>

<template>
    <action-sheet
            :data="renderData"
            :scrollerClick="true"
            v-show="opened"
            @close="close">

            <div class="sel-item between" v-for="item in data" @click="emitEvent(item)" :key="item.ID"
                :class="{active:item.ID===id||item.ID===CurrentId}">
                <div class="name">{{item.Name}}</div>
                <div><svg v-if="item.ID===id||item.ID===CurrentId" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanzhong"></use>
                </svg></div>

            </div>

    </action-sheet>
</template>

<script>

    export default {
        name: 'actionsheet-school',
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: null
            },
            id: '',
        },
        data() {
            return {
                clickNum: 0,
                CurrentId:null
            }
        },
        computed: {
            renderData() {
                return {
                    data: this.data,
                    clickNum: this.clickNum
                }
            },
        },
        methods: {
            emitEvent(item){
                this.CurrentId = item.ID;
                this.$emit('selected',item);
                this.close();
            },
            close(){
                this.$emit('update:opened', false);
            },
            refreshScroll(){
                this.clickNum++;
            }
        },
    }
</script>