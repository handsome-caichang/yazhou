<style lang="scss" scoped>
    .action-sheet {
        @include position-absolute;
        z-index: 222;
        .header {
            border-bottom: 1px solid $color-assist-1;
        }
        .header, .item {
            // height: 49px;
            line-height: 49px;
            padding: 0 15px;
            color: rgba(102,102,102,1);
            word-break: break-all;
        }
        .active {
            color: #1E88F5;
        }
        
    }
</style>

<template>
    <action-sheet 
        class="action-sheet" 
        :position="'bottom'"
        :data="_list"
        @close="close" 
        v-if="opened"
        >
        
        <div slot="header" class="header">沟通方式</div>
        <div class="item" v-for="item in list" @click="selectItem(item)" :class="{active:item.isSelect}">
            {{item.Value}}
        </div>
    </action-sheet>
</template>

<script>
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            list: {
                type: Array
            }
        },
        data() {
            return {
                opened: false,
            }
        },
        methods: {
            selectItem(obj) {
                this._resolve(obj)
                this.opened = false
            },
            open() {
                this.opened = true
                return new Promise(rsv => {
                    this._resolve = rsv
                })
            }
        }
    }
</script>