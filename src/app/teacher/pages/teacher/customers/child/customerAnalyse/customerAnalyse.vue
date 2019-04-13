<style scoped lang="scss">
    
    
    .wrapper {
        background-color: $color-assist-1;
        .heard {
            background-color: $color-white;
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
                border-left: none;
            }
            .active {
                background-color: $color-primary;
                color: $color-white;
            }
            
        }
        .bottom {
            @include position-absolute(false, 0, 0, 0);
            height: 49px;
            line-height: 49px;
            background-color: $color-primary;
            text-align: center;
            color: $color-white;
            font-size: 16px;
        }
    }
</style>

<template>
    <div class="wrapper" >
        <div class="heard">
            <div class="heard-item" :class="{active:activeIndex==1}" @click="channgeContent(1)">招生来源</div>
            <div class="heard-item no-border" :class="{active:activeIndex==2}" @click="channgeContent(2)">意向级别</div>
            <div class="heard-item no-border" :class="{active:activeIndex==3}" @click="channgeContent(3)" v-if="app.tool.op('CustomerSalesFunnelQuery')">销售漏斗</div>
        </div>
        <component :is="activeIndex==1?comps.CustomerSource:activeIndex==2?comps.WillLevel:comps.SaleMode"
                   :campusList="campusList"
                   :campusListOld="campusListOld"
                   :saleModesArr="saleModesArr"
                   :type="type"
                   @openSelectCampus="showSelectCampus=true"
                   @openSelectMode="showSelectItem=true"
                   @setStorage="setStorageMethod"
                   ref="saleMode">
            
        </component>
        <div class="bottom" v-if="activeIndex!==2" @click="goToDetail">查看详情</div>
        <!-- 选择校区 -->
        <select-campus
            :opened.sync="showSelectCampus"
            :campusList="campusList"
            @selectCampus="selectCampus">
        </select-campus>
        <!-- 筛选类别 -->
        <select-item
            :opened.sync="showSelectItem"
            :saleModesArr="saleModesArr"
            @selectSaleModes="selectSaleModes">
                
        </select-item>
    </div>
</template>

<script>
    import CustomerSource from './child/customerSource'
    import WillLevel from './child/willLevel'
    import SaleMode from './child/saleMode'
    import SelectCampus from './selectCampus'
    import SelectItem from './selectItem'
    
    export default {
        data() {
            return {
                wxTitle: "客户分析",
                activeIndex: 1,
                comps: {
                    CustomerSource,
                    WillLevel,
                    SaleMode
                },
                page1List: [],
                page1ListOld: [],
                page2List: [],
                page2ListOld: [],
                page3List: [],
                page3ListOld: [],
                showSelectCampus: false,

                showSelectItem: false,
                saleModesArr: [],
                type: 0
            }
        },
        computed: {
            campusList() {
                return this.activeIndex == 1 ? this.page1List : this.activeIndex == 2 ? this.page2List : this.page3List
            },
            campusListOld() {
                return this.activeIndex == 1 ? this.page1ListOld : this.activeIndex == 2 ? this.page2ListOld : this.page3ListOld
            }
        },
        methods: {
            ...Vuex.mapMutations(['set_saleModeInfo']),
            channgeContent(num) {
                this.activeIndex = num
            },
            //选择校区回掉
            selectCampus(arr) {
                this.showSelectCampus = false
                if (this.activeIndex == 1) {
                    this.page1List = arr
                    if (!arr.length) {
                        this.page1ListOld = app.customConfigInfo.CampusList.map(obj => {
                            return obj.Key
                        })
                    } else {
                        this.page1ListOld = arr.map(obj => {
                            return obj.Key
                        })
                    }
                }
                if (this.activeIndex == 2) {
                    this.page2List = arr
                    if (!arr.length) {
                        this.page2ListOld = app.customConfigInfo.CampusList.map(obj => {
                            return obj.Key
                        })
                    } else {
                        this.page2ListOld = arr.map(obj => {
                            return obj.Key
                        })
                    }
                }
                if (this.activeIndex == 3) {
                    this.page3List = arr
                    if (!arr.length) {
                        this.page3ListOld = app.customConfigInfo.CampusList.map(obj => {
                            return obj.Key
                        })
                    } else {
                        this.page3ListOld = arr.map(obj => {
                            return obj.Key
                        })
                    }
                }
            },
            //选择类目回掉
            selectSaleModes(arr, type) {
                console.log(type)
                this.type = type
                this.saleModesArr = arr
                this.showSelectItem = false
            },
            setStorageMain() {
                let list = app.customConfigInfo.CampusList, listTemp = []
                if (!(list.length > 0 && list.length === this.campusListOld.length)) listTemp = this.campusListOld
                app.ls.setStorage('params', {
                    edate: this.$refs.saleMode.dateObj.edate,
                    sdate: this.$refs.saleMode.dateObj.sdate,
                    campusids: listTemp
                })
            },
            goToDetail() {
                if (this.activeIndex == 1) {
                    this.setStorageMain()
                    this.$router.push({path:"/customerSourceDetail/no"})
                }
                if (this.activeIndex == 3) {
                    this.setStorageMain()
                    this.$router.push('/statusCountList')
                }
            },
            setStorageMethod(obj) {
                this.setStorageMain()
                this.$router.push({path:`/customerSourceDetail/${obj.id}`})
            }
        },
        created() {
            this.page1ListOld = app.customConfigInfo.CampusList.map(obj => {
                return obj.Key
            })
            this.page2ListOld = this.page3ListOld = this.page1ListOld
        },
        destroyed() {
            app.ls.removeStorage('params')
        },
        components: {
            CustomerSource,
            WillLevel,
            SaleMode,
            SelectCampus,
            SelectItem
        }
    }
</script>