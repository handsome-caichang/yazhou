<style scoped lang="scss">
    
    
    .wrapper {
        background-color: $color-white;
        .item {
            height: $h-2;
            @include flex-center;
            .text {
                height: $h-5;
                line-height: $h-5;
                padding: 0 25px;
                border-radius: $h-5;
                &.active {
                    color: $color-white;
                    background-color: $color-primary;
                }
            }
        }
    }

</style>

<template>
   <action-sheet
        v-show="opened"
        @close="close"
        :position="'top'"
        :data="itemList">

        <div class="wrapper">
            <div>
                <div class="item"
                    @click="changeSelect({ID:''})">
                    <div class="text" :class="{active:isActive()}">不限</div>        
                </div>
                <div class="item"
                    v-for="(item, index) in itemList"
                    @click="changeSelect(item, index)">
                    <div class="text" :class="{active:item.isSelect}">{{item.Value}}</div>        
                </div>
            </div>
        </div>
   </action-sheet>
</template>

<script>
    import {getShiftType, getCustomers} from 'teacher/api/customers';
    
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: true
            },
            itemList: {
                type: Array
            }
        },
        computed: {
            scrollData() {
                return {
                    list: this.select,
                    type: this.curFilterType
                }
            },
        },
        methods: {
            isActive() {
                let flag = true
                this.itemList && this.itemList.forEach(obj => {
                    if (obj.isSelect) flag = false
                })
                return flag
            },
            changeSelect(item, index) {
                let obj = {}
                if (item.ID !== '') {
                    obj = {
                        item: item,
                        index: index
                    }
                }
                this.$emit('selectItem', obj)
            }
        }
    }
</script>