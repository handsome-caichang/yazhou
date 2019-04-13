<style lang="scss" scoped>
    .sel-item {
        height: 44px;
        line-height: 44px;
        padding-left: 10px;
        padding-right: 10px;
        color: $color-3-s;
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
        <div>
            <div class="sel-item between" v-for="(item,key) in data" @click="emitEvent(item,key)" :key="key"
                :class="{active:item===current}"
            >
                {{item}}
                <svg v-if="item===current" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanzhong"></use>
                </svg>
            </div>
        </div>
    </action-sheet>
</template>

<script>

    export default {
        name: 'actionsheet-grade',
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                default: null
            },
            id: '',
        },
        data() {
            return {
                refreshNum: 0,
                current:''
            }
        },
        computed: {
            renderData() {
                return {
                    data: this.data,
                    refreshNum: this.refreshNum
                }
            },
        },
        methods: {
            emitEvent(item,key){
                this.current = item;
                this.$emit('selected',{Name:item,Key:key});
                this.close();
            },
            close(){
                this.$emit('update:opened', false);
            }
        },
        watch:{
            opened(newVal,oldVal){
                if(newVal) this.refreshNum++
            }
        }
    }
</script>