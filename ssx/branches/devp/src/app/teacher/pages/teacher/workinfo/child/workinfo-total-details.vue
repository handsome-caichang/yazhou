<style scoped lang="scss">
    .body {
        .title {
            height: 49px;
            line-height: 49px;
            text-align: center;
            font-size: 18px;
            color: $color-3;
        }
        .content-box {
            padding: 12px 32px;
            @include flex-between;
            color: $color-3;
            font-size: 15px;
            text-align: right;
            .box-lf,.box-rt{
                max-width: 49%;
                .type{
                    margin-bottom: 16px;
                }
            }
            .box-lf {
                span {
                    color: #1B70F2;
                }
            }
            .box-rt {
                span {
                    color: #FC5B4A;
                }
            }
        }
    }
</style>

<template>
    <action-sheet
        class="body"
        v-show="opened"
        @close="close"
        :position="position"
        :data="footerData">
        <div class="title">合计详情</div>
        <div class="content-box">
            <!--app.sysInfo.Title_CourseUnit_2-->
            <div class="box-lf">
                <div class="type">计费</div>
                 <!--<div><span>{{footerData.totalunitcost}}</span>人{{app.sysInfo.Title_CourseUnit_2}}</div>-->
                <div><span>{{footerData.totalhourcost}}</span>人时</div>
                <div><span>{{footerData.totaldaycost}}</span>人天</div>
            </div>
            <div class="box-rt">
                <div class="type">欠费</div>
                 <!--<div><span>{{footerData.totalunitless}}</span>人{{app.sysInfo.Title_CourseUnit_2}}</div>-->
                <div><span>{{footerData.totalhourless}}</span>人时</div>
                <div><span>{{footerData.totaldayless}}</span>人天</div>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: "workinfo-total-details",
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
            footerData: {}
        }
    }
</script>