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
                &.active {
                    color: $color-primary;
                }
            }
        }
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :scrollerConfig="scrollerConfig"
        :position="'sideRight'"
        v-show="opened" 
        :data="list" 
        @close="close">
        <!-- <div slot="header" class="actionsheet-hd">客户状态筛选</div> -->
            <!-- :class="{'active':item.Id==app.sysInfo.currole.id}" -->
                <!-- :class="{'active':campusObj.Key==item.Key}" -->
        <div class="wrapper">
            <div class="actionsheet-item"
                v-for="(item, index) in list"
                @click="select(item)"
                >
                {{item}}
            </div>
        </div>
    </action-sheet>
</template>

<script>
    import {getCustomers} from 'teacher/api/customers';
    
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            courseObj: {
                type: Object
            }

        },
        computed: {
            ...Vuex.mapState(['customConfigInfo'])
        },
        data() {
            return {
                list: [],
                scrollerConfig: {
                    tag: 'base'
                }
            }
        },
        methods: {
            select(item) {
                this.$emit('selectWillClass', item)
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    let params = {
                        shift: this.courseObj.shift,
                        campus: this.courseObj.campus,
                        pname: 'queryclasspro',
                        page: 1
                    }
                    getCustomers(params).then(res => {
                        if (res.errcode == app.errok) {
                            this.list = res.data
                        }
                    })
                }
            }
        }
    }
</script>