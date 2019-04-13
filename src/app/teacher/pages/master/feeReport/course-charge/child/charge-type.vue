<!-- 收费类型弹框 -->
<style scoped lang="scss">
    .iconfont_xz{
        width: 1em;
        height: 1em;
        vertical-align: -.15em;
        fill: currentColor;
        overflow: hidden;
    }
    .as-body {
        @include position-absolute;
        font-size: 15px;
        .header {
            height: 50px;
            line-height: 50px;
            color: $color-9;
            text-align: center;
        }
        .item {
            @include flex-between;
            @include border-top;
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            &.active {
                color: $color-primary;
            }
        }
    }
</style>

<template>
    <action-sheet class="as-body" v-show="opened" @close="close" :data="stateData">

        <div class="item" v-for="(item,index) in list" :key="index" @click="changeChargeType(item)">
            <div class="name">
                {{item.Value}}
            </div>
            <div>
                <svg class="icon" aria-hidden="true" v-show="item.ID==currentId">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    import {getChargeType} from 'teacher/api/feeReport'

    export default {
        name: "state-actionsheet",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
        },
        data() {
            return {
                currentId:'',
                list: [],
                refreshNum:0
            }
        },
        computed: {
            stateData() {
                return {
                    opened: this.opened,
                    refreshNum:this.refreshNum
                }
            }
        },
        methods: {
            changeChargeType(item) {
                this.currentId = item.ID;
                this.$emit("changeChargeType",{
                    custTypeid: item.ID,
                    typeName: item.Value,
                });
                this.close();
            },
            getList() {
                getChargeType({
                    flag: 2,
                    type: 'FeeCustType'
                }).then((res) => {
                    res.Data.unshift({Value:'课程收费汇总',ID:''});
                    this.list=(res.Data);
                    this.refreshNum++
                })
            }
        },

        components: {},
        watch: {
            opened(newVal, oldVal) {
                if (newVal && this.list.length < 1) {
                    this.getList()
                }
            }
        }
    }
</script>
