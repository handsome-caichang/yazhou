<style scoped lang="scss">
    
    
    .wrapper {
        background-color: $color-assist-1;
        .heard {
            background-color: $color-white;
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
            .heard-mid {
                padding: 0 12px;
                height: 44px;
                border-bottom: 1px solid $color-assist-1;
                @include flex-between;
                .mid-left {
                    flex: 1;
                }
                .mid-right {
                    width: 48px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    background-color: #EEF1F6;
                    border-radius: 50px;
                    color: $color-6;
                    font-size: 13px;
                }
            }
            .heard-bottom {
                padding: 0 12px;
                height: 44px;
                line-height: 44px;
                font-size: 15px;
                display: flex;
                border-bottom: 1px solid $color-assist-1;
                .heard-bottom-left {
                    width: 90px;
                    font-size: 15px;
                    color: $color-6;
                }
                .heard-bottom-mid {
                    padding-left: 10px;
                    flex: 1;
                    text-align: right;
                    @include ellipsis-single;
                    color: $color-3;
                }
                .heard-bottom-right {
                    width: 20px;
                    text-align: right;
                }
            }
        }
        .page1 {
            @include position-absolute(139px, 0, 49px, 0);
            background-color: $color-white;
            .item-wrapper {
                .void {
                    height: 10px;
                    background-color: $color-assist-1;
                }
                .item {
                    // border-top: 10px solid $color-assist-1;
                    @include flex-between;
                    font-size: 15px;
                    padding: 0 12px;
                    height: 44px;
                    background-color: $color-white;
                    .item-one {
                        height: 44px;
                        line-height: 44px;
                        width: 75px;
                        color: $color-6;
                        @include ellipsis-multi;
                    }
                    .item-two {
                        font-size: 15px;
                        margin-left: 10px;
                        width: 60px;
                        color: $color-3;
                    }
                    .item-three {
                        margin-left: 10px;
                        flex: 1;
                        height: 5px;
                        position: relative;
                        background-color: $color-assist-1;
                        border-radius: 50px;
                        .rate {
                            @include position-absolute(0, false, 0, 0);
                            height: 5px;
                            border-radius: 50px;
                            background-color: $color-primary;
                        }
                    }
                    .item-four {
                        margin-left: 10px;
                        width: 10px;
                    }
                }
                .echarts {
                    // height: 190px;
                    padding: 12px;
                }
                .echarts1 {
                    // height: 370px;
                    padding: 12px;
                }
                .analyse {
                    height: 40px;
                    line-height: 40px;
                    display: flex;
                    font-size: 13px;
                    color: $color-6;
                    border-bottom: 1px solid $color-assist-1;
                    .analyse-left {
                        flex: 1;
                        padding: 0 12px;
                    }
                    .analyse-mid, .analyse-right {
                        width: 90px;
                        padding: 0 12px;
                    }
                    .analyse-right {
                        text-align: right;
                    }
                }
                .list {
                    height: 44px;
                    padding: 0 12px;
                    @include flex-between;
                    border-bottom: 1px solid $color-assist-1;
                    .list-left {
                        flex: 1;
                        display: flex;
                        .left-icon {
                            width: 15px;
                            height: 15px;
                            margin-right: 15px;
                        }
                        .zise {
                            background-color: #9999FF;
                        }
                        .qingse {
                            background-color: #BBDBFC;
                        }
                        .lanse {
                            background-color: #1E88F5;
                        }
                        .huangse {
                            background-color: #FFAC00;
                        }
                        .lvse {
                            background-color: #A6DA6D;
                        }
                    }
                    .list-mid, .list-right {
                        width: 90px;
                    }
                    .list-mid {
                        padding-left: 24px;
                    }
                    .list-right {
                        // padding: 0 12px;
                        text-align: right;
                    }
                }
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
            <div class="heard-top">
                <div class="heard-item no-border" :class="{active:activeIndex==1}" @click="channgeContent(1)">招生来源</div>
                <div class="heard-item no-border" :class="{active:activeIndex==2}" @click="channgeContent(2)">意向级别</div>
                <div class="heard-item" :class="{active:activeIndex==3}" @click="channgeContent(3)">销售漏斗</div>
            </div>
            <div class="heard-mid">
                <div class="mid-left">
                    <date-bar
                            :sdate='dateObj.sdate'
                            :edate='dateObj.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
                <div class="mid-right" @click="showSelectItem=true" v-if="activeIndex==1">
                    筛选
                </div>
            </div>
            <div class="heard-bottom">
                <div class="heard-bottom-left">
                    选择校区
                </div>
                <div class="heard-bottom-mid" @click="showSelectCampus=true">
                    {{campusText}}
                </div>
                <div class="heard-bottom-right" @click="showSelectCampus=true">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
        </div>
        <scroller-base class="page1" :data="scrollData" ref="scroll">
            <div class="item-wrapper" v-for="item in list1" v-if="activeIndex==1">
                <div class="void"></div>
                <div class="item">
                    <div class="item-one">
                        {{item.name}}
                    </div>
                    <div class="item-two">
                        {{item.Rate+"%"}}
                    </div>
                    <div class="item-three">
                        <div class="rate" :style="{width:item.Rate + '%'}"></div>
                    </div>
                    <div class="item-four">
                        <!-- <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg> -->
                    </div>
                </div>
            </div>
            <div class="item-wrapper a2" v-if="activeIndex==2">
                <div class="echarts" >
                    <Echarts ref="echarts" :key="1" v-if="setOption" :setOption="setOption" :cssStyle="'height:190px'"></Echarts>
                </div>
                <div class="void"></div>
                <div class="analyse">
                    <div class="analyse-left">意向级别</div>
                    <div class="analyse-mid">客户数量</div>
                    <div class="analyse-right">比例</div>
                </div>
                <div class="list" v-for="item in list2">
                    <div class="list-left">
                        <div class="left-icon zise" v-if="item.name=='5'"></div>
                        <div class="left-icon qingse" v-if="item.name=='4'"></div>
                        <div class="left-icon lanse" v-if="item.name=='3'"></div>
                        <div class="left-icon huangse" v-if="item.name=='2'"></div>
                        <div class="left-icon lvse" v-if="item.name=='1'"></div>
                        <svg class="icon" aria-hidden="true" v-for="i in parseInt(item.name)">
                            <use xlink:href="#icon-xingxingxuanzhong"></use>
                        </svg>
                    </div>
                    <div class="list-mid">{{item.value}}</div>
                    <div class="list-right">{{((item.value/item.sum)*100).toFixed(2)+'%'}}</div>
                </div>
                <div class="void"> </div>
            </div>
            <div class="item-wrapper a3" v-if="activeIndex==3">
                <div class="echarts1" >
                    <Echarts ref="echarts1" :key="2" v-if="setOption1" :setOption="setOption1" :cssStyle="'height:370px'"></Echarts>
                </div>
                <div class="void"></div>
            </div>
        </scroller-base>
        <router-link tag="div" to="/customerSourceDetail" class="bottom" v-if="activeIndex!==2">详情</router-link>
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
    import {getCustomers} from 'teacher/api/customers'
    import SelectCampus from './selectCampus'
    import SelectItem from './selectItem'
    import Echarts from 'teacher/components/common/echarts/echarts'
    let opt1 = {
        backgroundColor: "#FFF",
        series: [{
            name: "评价维度详情",
            type: "pie",
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: true,
                    position: 'center',
                    formatter: function () {
                        return '意向级别'
                    },
                    textStyle: {
                        fontSize: '32px',
                        color: '#666666'
                    }

                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
            // labelLine: {
            //     normal: {
            //         show: false
            //     }
            // },
            color:['#9999FF','#BBDBFC','#1E88F5','#FFAC00','#A6DA6D'],  
            data: []
                
            }]
        }
    let opt2 = {
        title: {
                text: '单位(人)',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: []
        },
        color: ['#1E88F5'],
        series: [
            {
                name: '2012年',
                type: 'bar',
                data: []
            }
        ]
    }
    export default {
        data() {
            return {
                dateObj:{
                    // sdate:'2017-12-26',
                    // edate:'2017-12-26'
                },
                // dateObj:{
                //     sdate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                //     edate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                // },
                quickDateIndex:-1,
                activeIndex: 1,
                list1: [],
                list2: [],
                list3: [],

                showSelectCampus: false,
                campusList: [],
                campusListOld: [],

                showSelectItem: false,
                saleModesArr: [],
                setOption: null,
                setOption1: null,
            }
        },
        computed: {
            scrollData() {
                return {
                    list: this.list,
                    activeIndex: this.activeIndex
                }
            },
            campusText() {
                let str = ''
                if (this.campusList.length == 0) {
                    str = ''
                }
                if (this.campusList.length == 1) {
                    str = this.campusList[0].Name
                }
                if (this.campusList.length > 1) {
                    str = this.campusList[0].Name + '等' + this.campusList.length + '个学校'
                }
                return str
            },
            pname() {
                let pname = this.activeIndex == 1 ? 'countbysalemode' : this.activeIndex == 2 ? 'countbywilllevel' : 'countbycustomerstatus'
                return pname
            }
        },
        methods: {
            changeDate(obj){
                this.dateObj.sdate = obj.sdate;
                this.dateObj.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.initPage({
                    pname: this.pname,
                    sdate: this.dateObj.sdate,
                    edate: this.dateObj.edate,
                    campusids: this.campusListOld.join(),
                    salemodes: this.saleModesArr.join()
                })
            },
            initPage(obj) {
                getCustomers(obj).then(res => {
                    if (res.errcode == app.errok) {
                        if (this.activeIndex == 1) {
                            this.list1 = res.data
                        }
                        if (this.activeIndex == 2) {
                            this.list2 = res.data
                            this.list2 = this.list2.Values.sort((a, b) => {
                                if (b.name > 5) return 
                                return b.name - a.name
                            })
                            let arr = this.list2.map(obj => {
                                return {
                                    value: obj.value,
                                    name: obj.name
                                }
                            })
                            opt1.series[0].data = arr
                            this.setOption = Object.assign({}, opt1)

                        }
                        if (this.activeIndex == 3) {
                            this.list3 = res.data
                            let arr1 = this.list3.Count.map(obj => {
                                return obj.Name
                            })
                            let arr2 = this.list3.Count.map(obj => {
                                return obj.Value
                            })
                            opt2.yAxis.data = arr1
                            opt2.series[0].data = arr2
                            this.setOption1 = Object.assign({}, opt2)
                            
                        }
                    }
                })
            },
            //选择校区回掉
            selectCampus(arr) {
                if (!arr.length) return
                this.campusList = arr
                this.campusListOld = arr.map(obj => {
                    return obj.Key
                })
                this.initPage({
                    pname: this.pname,
                    sdate: this.dateObj.sdate,
                    edate: this.dateObj.edate,
                    campusids: this.campusListOld.join(),
                    salemodes: this.saleModesArr.join()
                })
                this.showSelectCampus = false
            },

            selectSaleModes(arr) {
                this.saleModesArr = arr
                this.showSelectItem = false
                this.initPage({
                    pname: this.pname,
                    sdate: this.dateObj.sdate,
                    edate: this.dateObj.edate,
                    campusids: this.campusListOld.join(),
                    salemodes: this.saleModesArr.join()
                })
            },
            channgeContent(num) {
                if (this.activeIndex == num) return
                this.activeIndex = num
                if (num == 1) {
                    this.initPage({
                        pname: this.pname,
                        sdate: this.dateObj.sdate,
                        edate: this.dateObj.edate,
                        campusids: this.campusListOld.join(),
                        salemodes: this.saleModesArr.join()
                    })

                    this.$refs.scroll.$el.style.bottom = '44px'
                } else if (num == 2) {
                    // if (this.$refs.echarts1) this.$refs.echarts1.dispose()
                    this.initPage({
                        pname: this.pname,
                        sdate: this.dateObj.sdate,
                        edate: this.dateObj.edate,
                        campusids: this.campusListOld.join(),
                        salemodes: this.saleModesArr.join()
                    })
                    this.$refs.scroll.$el.style.bottom = 0
                } else if (num == 3) {
                    // if (this.$refs.echarts) this.$refs.echarts.dispose()
                    this.initPage({
                        pname: this.pname,
                        sdate: this.dateObj.sdate,
                        edate: this.dateObj.edate,
                        campusids: this.campusListOld.join(),
                        salemodes: this.saleModesArr.join()
                    })
                    this.$refs.scroll.$el.style.bottom = '44px'
                }
            }
        },
        created() {
            this.campusListOld = app.customConfigInfo.CampusList.map(obj => {
                return obj.Key
            })
            // this.initPage('countbysalemode')
            this.initPage({
                pname: 'countbysalemode',
                campusids: this.campusListOld.join(),
                sdate: this.dateObj.sdate,
                edate: this.dateObj.edate
            })
            window.a = this
        },
        components: {
            SelectCampus,
            SelectItem,
            Echarts
        }
    }
</script>