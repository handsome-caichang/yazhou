<style scoped lang="scss">


    .card {
        height: 44px;
        line-height: 44px;
        padding: 0 12px;
        color: $color-3-s;
        @include ellipsis-single;
        @include flex-between;
        &.lighHeight {
            color: $color-primary;
        }
    }
</style>

<template>
    <action-sheet
            v-show="opened"
            @close="close"
            :position="bottom"
            :data="list">
        <div class="card"
             v-for="(item,index) in list"
             :class="item.name == current?'lighHeight':''"
             :key="index"
             @click="changeAction(item)">
            <span>{{item.name}}</span>
            <svg v-if="item.name == current" class="icon" aria-hidden="true">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: "xyx-common",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            list: {}
        },
        data() {
            return {
                wxTitle: "",
                current:''
            }
        },
        computed: {},
        methods: {
            changeAction(item){
                this.current = item.name;
                this.$emit('informationCommon', item.name);
                this.close();
            }
        }
    }
</script>

