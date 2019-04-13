<!-- 个人信息-选择 -->
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
            :position="position"
            :data="renderData">
        <div class="card"
             v-for="(name,key) in list"
             :class="curGradeName == name?'lighHeight':''"
             :key="key"
             @click="changeAction(name,key)">
            <span>{{name}}</span>
            <svg v-if="curGradeName == name" class="icon" aria-hidden="true">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
        </div>
    </action-sheet>
</template>

<script>
    import {savePost} from "parent/api/common";

    export default {
        name: "select-actionsheet",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            position: {
                default: 'bottom',
            },
            header: {
                type: Boolean,
                default: false
            },
            footer: {
                type: Boolean,
                default: false
            },
            list: {}
        },
        data() {
            return {
                curGradeName: null
            }
        },
        computed: {
            renderData() {
                return {
                    opened: this.opened
                }
            }
        },
        methods: {
            changeAction(card, key) {
                //注意：smart 次数返回的是数组对象，次数返回的是对象。所以对应html处的v-if的判断会不同
                this.curGradeName = card;// 因为不是每次点击的时候都请求数据，所以这里要赋值
                savePost({
                    saveFlag: "modifiedPersonalInfo",
                    Grade: key
                }).then(res => {
                    if (res.errcode == app.errok) {
                        app.toast('success','修改成功')
                        this.$emit('informationGrade', card);
                        this.close();
                    } else {
                        app.toast('error', res.errmsg)
                    }
                })

            }
        }
    }
</script>