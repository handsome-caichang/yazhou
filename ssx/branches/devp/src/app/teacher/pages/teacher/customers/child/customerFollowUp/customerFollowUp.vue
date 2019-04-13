<style scoped lang="scss">
    
    
    .wrapper {
        .heard-top {
            height: 49px;
            @include flex-between;
            padding: 0 15px;
            border-bottom: 1px solid $color-assist-1;
            .heard-item {
                flex: 1;
                height: 29px;
                line-height: 29px;
                font-size: 15px;
                color: $color-primary;
                text-align: center;
                border: 1px solid $color-primary;
            }
            .no-border {
                border-right: none;
            }
            .active {
                background-color: $color-primary;
                color: $color-white;
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="heard-top">
            <div class="heard-item no-border" :class="{active:activeIndex==1}" @click="changeContent(1)">沟通统计</div>
            <div class="heard-item" :class="{active:activeIndex==2}" @click="changeContent(2)">转化统计</div>
        </div>
        <component 
                :is="activeIndex==1?coms.CommCount:coms.ChangeCount" 
                :campusObj="campusObj"
                @openSelectCamp="showSelectCampus=true">
                    
        </component>
        <select-campus
            :opened.sync="showSelectCampus"
            :campusObj="campusObj"
            @selectCampusObj="selectCampusObj">
        </select-campus>
    </div>
</template>

<script>
    import CommCount from './commCount'
    import ChangeCount from './changeCount'
    import SelectCampus from '../selectCampus'
    export default {
        data() {
            return {
                activeIndex: 1,
                coms: {
                    CommCount,
                    ChangeCount
                },
                showSelectCampus: false,
                page1CampusObj: {},
                page2CampusObj: {}
            }
        },
        computed: {
            campusObj() {
                return this.activeIndex == 1 ? this.page1CampusObj : this.page2CampusObj
            }
        },
        methods: {
            changeContent(num) {
                if (this.activeIndex == num) return
                this.activeIndex = num
            },
            selectCampusObj(obj) {
                this.showSelectCampus = false
                if (this.activeIndex == 1) {
                    this.page1CampusObj = obj
                } else {
                    this.page2CampusObj = obj
                }
            },
        },
        created() {
            this.page1CampusObj = this.page2CampusObj = app.customConfigInfo.CampusList[0]
        },
        components: {
            CommCount,
            ChangeCount,
            SelectCampus
        }
    }

</script>