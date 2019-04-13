<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: $fs-normal-x;
        z-index: 10;
        .header {
            padding: 0 12px;
            height: 44px;
            line-height: 44px;
            background-color: $color-assist-1;
        }
        .wrapper {
            .item {
                padding: 15px;
                height: 44px;
                color: $color-3;
                @include flex-between;
                .icon-wrapper {
                    width: 25px;
                }
                .name {
                    flex: 1;
                }
                &:not(:last-child){
                    // @include border-bottom;
                    border-bottom: 1px solid $color-assist-1;
                }
                &.active {
                    color: $color-primary;
                }
            }
        }
        .bottom {
            display: flex;
            height: 44px;
            line-height: 44px;
            .cancle, .sure {
                text-align: center;
                font-size: 15px;
                flex: 1;
            }
            .cancle {
                border-top: 1px solid $color-assist-1;
            }
            .sure {
                background-color: $color-primary;
                color: $color-white;
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
        <div slot="header" class="header" @click="close">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuobianjiantou"></use>
            </svg>
            校区选择
        </div>
            <!-- :class="{'active':item.Id==app.sysInfo.currole.id}" -->
                <!-- :class="{'active':campusObj.Key==item.Key}" -->
        <div class="wrapper">
            <div class="item"
                v-for="(item, index) in list"
                @click="select(item)">
                <div class="icon-wrapper">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.isSelect?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                    </svg>
                </div>
                <div class="name">
                    {{item.Value.Name}}
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <div class="cancle" @click="close">取消</div>
            <div class="sure" @click="selectCampus">{{"确定("+selectNum+"/"+num+")"}}</div>
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
            campusList: {
                type: Array
            }
        },
        computed: {
            ...Vuex.mapState(['customConfigInfo']),
            selectNum() {
                let num = 0
                this.list.forEach(obj => {
                    if (obj.isSelect) num++
                })
                return num
            }
        },
        data() {
            return {
                list: [],
                scrollerConfig: {
                    tag: 'base'
                },
                num: 0,
            }
        },
        methods: {
            select(obj) {
                obj.isSelect = !obj.isSelect
            },
            selectCampus() {
                let arr = []
                this.list.forEach(obj => {
                    if (obj.isSelect) arr.push({
                        Key: obj.Key,
                        Name: obj.Value.Name
                    })
                })
                this.$emit('selectCampus', arr)
            }
        },
        watch: {
            opened(val) {
                let arr = this.campusList.map(obj => {
                    return obj.Key
                })
                if (val) {
                    this.list = app.customConfigInfo.CampusList
                    this.num = 0
                    this.list.forEach(obj => {
                        this.num ++
                        if (arr.indexOf(obj.Key) > -1) {
                            this.$set(obj, 'isSelect', true)
                        } else {
                            this.$set(obj, 'isSelect', false)
                        }
                    })
                }
            }
        }
    }
</script>