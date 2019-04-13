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
        <div class="wrapper">
            <div class="actionsheet-item"
                :class="{'active':item.value==gradeObj.value}"
                v-for="(item, index) in list"
                @click="select(item)"
                >
                {{item.name}}
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
            },
            gradeObj: {
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
                this.$emit('selectGradeObj', item)
                this.close()
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    // this.list = app.customConfigInfo.Grade
                    if (this.list.length) return
                    for (let key in app.customConfigInfo.Grade) {
                        let obj = {
                            value: key,
                            name: app.customConfigInfo.Grade[key]
                        }
                        this.list.push(obj)
                    }
                }
            }
        },
        components: {
            
        }
    }
</script>