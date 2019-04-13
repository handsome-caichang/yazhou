<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .wrapper {
            .actionsheet-item {
                padding: 15px;
                color: $color-3;
                @include flex-between;
                &:not(:last-child){
                    @include border-bottom;
                }
            }
        }
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :data="list"
        v-if="opened" 
        @close="close">
         <div class="wrapper">
            <div class="actionsheet-item"
                v-for="(item, index) in list"
                @click="selectRol(item)"
                >
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
            }
        },
        data() {
            return {
                list: [],
            }
        },
        methods: {
            selectRol(obj) {
                this.$emit('selectRol', obj)
            },
        },
        created() {
            this.list = app.customConfigInfo.SaleRole
        }
    }
</script>