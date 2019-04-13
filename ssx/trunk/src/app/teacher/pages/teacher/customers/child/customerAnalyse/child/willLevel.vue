<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute(49px, 0, 0, 0);
        background-color: $color-white;
        .heard-mid {
            padding: 0 12px;
            height: 44px;
            border-bottom: 1px solid $color-assist-1;
            @include flex-between;
            background-color: $color-white;
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
            background-color: $color-white;
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
        .item-wrapper {
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
                height: 190px;
                // padding: 12px;
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
        .void {
            height: 10px;
            background-color: $color-assist-1;
        }
    }

</style>

<template>
    <scroller-base class="wrapper" :data="list" ref="scroll">
        <div>
            <div class="heard-mid">
                <div class="mid-left">
                    <date-bar
                            :sdate='dateObj.sdate'
                            :edate='dateObj.edate'
                            :index="quickDateIndex"
                            @changeDate="changeDate">
                    </date-bar>
                </div>
            </div>
            <div class="heard-bottom">
                <div class="heard-bottom-left">
                    选择校区
                </div>
                <div class="heard-bottom-mid" @click="emit">
                    {{campusText}}
                </div>
                <div class="heard-bottom-right" @click="emit">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
            </div>
            <div class="void"></div>
            <div class="item-wrapper">
                <div class="echarts" >
                    <Echarts ref="echarts" v-if="setOption" :setOption="setOption" :cssStyle="'height:190px'"></Echarts>
                </div>
                <div class="void"></div>
                <div class="analyse">
                    <div class="analyse-left">意向级别</div>
                    <div class="analyse-mid">客户数量</div>
                    <div class="analyse-right">比例</div>
                </div>
                <div class="list" v-for="item in list">
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
        </div>
    </scroller-base>
</template>

<script>
    import Echarts from 'teacher/components/common/echarts/echarts'
    import {getCustomers} from 'teacher/api/customers'
    let opt = {
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
            color:['#9999FF','#BBDBFC','#1E88F5','#FFAC00','#A6DA6D'],  
            data: []
                
            }]
        }
    export default {
        props: {
            campusListOld: {
                type: Array
            },
            campusList: {
                type: Array
            }
        },
        computed: {
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
            }
        },
        data() {
            return {
                dateObj:{
                    // sdate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                    // edate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                },
                quickDateIndex:-1,
                list: [],
                setOption: null
            }
        },
        methods: {
            initPage(params) {
                getCustomers(params).then(res => {
                    if (res.errcode == app.errok) {
                        this.list = res.data.Values.sort((a, b) => {
                            if (b.name > 5) return 
                            return b.name - a.name
                        })
                        let arr = this.list.map(obj => {
                            return {
                                value: obj.value,
                                name: obj.name
                            }
                        })
                        if (arr.length == 0) {
                            opt.series[0].data = [{value:25,name:''},{value:25,name:''},{value:25,name:''},{value:25,name:''},{value:25,name:''}]
                            opt.series.color = ['#999999','#333333','#999999','#333333','#999999']
                        } else  {
                            opt.series[0].data = arr
                        }
                        this.setOption = Object.assign({}, opt)
                    }
                })
            },
            changeDate(obj){
                this.dateObj.sdate = obj.sdate;
                this.dateObj.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.initPage({
                    pname: 'countbywilllevel',
                    sdate: this.dateObj.sdate,
                    edate: this.dateObj.edate,
                    campusids: this.campusListOld.join(),
                })
            },
            emit() {
                this.$emit('openSelectCampus')
            }
        },
        created() {
            this.initPage({
                pname: 'countbywilllevel',
                campusids: this.campusListOld.join(),
                sdate: this.dateObj.sdate,
                edate: this.dateObj.edate
            })
        },
        watch: {
            campusListOld(val) {
                if (val) {
                    this.initPage({
                        pname: 'countbywilllevel',
                        sdate: this.dateObj.sdate,
                        edate: this.dateObj.edate,
                        campusids: this.campusListOld.join(),
                    })
                }
            }
        },
        components: {
            Echarts
        }
    }
</script>