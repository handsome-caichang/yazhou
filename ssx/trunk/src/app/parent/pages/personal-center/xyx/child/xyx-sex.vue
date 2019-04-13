<!-- 个人信息-选择性别 -->
<style scoped lang="scss">


    .sex {
        background-color: $color-white;
        .title {
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 13px;
            color: $color-9;
        }
        .item {
            @include border-top;
            height: 80px;
            line-height: 80px;
            font-size: 22px;
            color: $color-3;
            @include flex-center;
            .item-nan, .item-nv {
                width: 44px;
                height: 44px;
                line-height: 44px;
                border-radius: 50%;
                font-size: 28px;
                text-align: center;
                margin-right: 25px;
                color: $color-white;
            }
            .item-nan {
                background-color: #46BEEE;
            }
            .item-nv {
                background-color: #FF9595;
            }
        }
    }
</style>

<template>
    <action-sheet
            v-show="opened"
            @close="close"
            :position="bottom">
        <div class="sex">
            <div class="title">选择性别</div>
            <div class="item" @click="changeSex(1)">
                <div class="item-nan">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-nan1"></use>
                    </svg>
                </div>
                <div class="class-text">男</div>
            </div>
            <div class="item" @click="changeSex(2)">
                <div class="item-nv">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-nv1"></use>
                    </svg>
                </div>
                <div class="class-text">女</div>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: "xyx-sex",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {}
        },
        methods: {
            changeSex(sex) {
                let paraSex = sex == 1 ? '男' : '女';
                this.$emit('informationSex', paraSex);
                this.close();
            }
        }
    }
</script>