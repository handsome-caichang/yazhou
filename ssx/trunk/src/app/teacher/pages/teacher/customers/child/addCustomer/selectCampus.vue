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
        <div class="wrapper">
            <div class="actionsheet-item"
                :class="{'active':campusObj.Key==item.Key}"
                v-for="(item, index) in list"
                @click="select(item)"
                >
                {{item.Value.Name}}
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
            campusObj: {
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
                this.$emit('selectCampusObj', item)
                this.close()
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.list = app.customConfigInfo.CampusList
                }
            }
        },
        components: {
            
        }
    }
</script>