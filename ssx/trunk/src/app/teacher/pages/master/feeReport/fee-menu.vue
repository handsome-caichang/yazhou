<!--收费报表-目录-->
<style scoped lang="scss">
    .scroller{
        @include position-absolute;
        background-color: #f0f0f0;
        .title{
            height: 40px;
            padding-left: 12px;
            background-color: #f0f0f0;
            line-height: 40px;
            color: $color-6;
        }
        .item{
            background-color: $color-white;
            padding: 12px;
            margin-bottom: 1px;
            height: 60px;
            line-height: 60px;
            @include flex-between;
            .nav-icon{
                color: $color-primary;
                width: 32px;
                height: 32px;
            }
            .name{
                flex: 1;
                padding-left: 22px;
                color: $color-3;
            }
            .next-icon{
                color: $color-3;
                width: 14px;
                height: 14px;
            }
        }
    }
</style>

<template>
    <scroller-base ref="scroller"
                   class="scroller"
                   :data="menuList">
        <div class="title">收费报表</div>
        <div class="menu">
            <div class="item" v-for="(item,index) in menuList" :key="index" @click="goTo(item)">
                <svg class="iconfont_xz nav-icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                </svg>
                <span class="name">{{item.name}}</span>
                <svg class="iconfont_xz next-icon" aria-hidden="true">
                    <use xlink:href="#ixz-xiangyou"></use>
                </svg>
            </div>
        </div>
    </scroller-base>

</template>

<script>
    let EnableDeptAddArea = app.sysInfo.EnableDeptAddArea=='1';
    export default {
        name: "fee-menu",
        data() {
            return {
                wxTitle: "收费报表",
                menuList: [
                    {
                        icon: '#ixz-shoufeihuizongbiao',
                        name: '收费汇总表',
                        href: 'feeReportCharge/shoufei/' + (EnableDeptAddArea ? 0 : 1),
                        show:true
                    },
                    {
                        icon: '#ixz-tuifeihuizongbiao',
                        name: '退费汇总表',
                        href: 'feeReportCharge/tuifei/' + (EnableDeptAddArea ? 0 : 1),
                        show:true
                    },
                    {
                        icon: '#ixz-kechengshoufeihuizong',
                        name: '课程收费汇总表',
                        href: EnableDeptAddArea?'courseChargeArea':'courseChargeCampus',
                        show:true
                    },
                    {
                        icon: '#ixz-jingshouru',
                        name: '净收汇总表',
                        href: 'netEarning',
                        show:true
                    }
                ]
            }
        },
        computed: {},
        methods: {
            goTo(item){
                this.$router.push(`/${item.href}`);
            }
        },
        created() {
        },
        components: {}
    }
</script>

