<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute(49px, 0, 49px, 0);
        // background-color: $color-white;
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
        .void {
            background-color: $color-assist-1;
            height: 10px;
        }
        .echarts {
            height: 370px;
            background-color: $color-white;
        }
        .item {
            height: 44px;
            line-height: 44px;
            font-size: 15px;
            display: flex;
            padding: 0 12px;
            background-color: $color-white;
            border-bottom: 1px solid $color-assist-1;
            .item-left {
                flex: 1;
                color: $color-6;
            }
            .item-right {
                flex: 1;
                text-align: right;
                color: $color-3;
            }
        }
        .loading {
            @include position-absolute;
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
                    选择{{app.sysInfo.Title_Campus}}
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
            <div class="echarts" >
                <Echarts ref="echarts" :key="1" v-if="setOption" :setOption="setOption" :cssStyle="'height:370px'"></Echarts>
            </div>
            <div class="void"></div>
            <div class="item" v-for="item in list">
                <div class="item-left">{{item.Name}}</div>
                <div class="item-right">{{item.Value}}</div>
            </div>
            
        </div>
        <loading class="loading" v-show="isLoading" :bgType='bgType'></loading>
    </scroller-base>
</template>

<script>
    import Echarts from 'teacher/components/common/echarts/echarts'
    import {getCustomers} from 'teacher/api/customers'
    let opt = {
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
                    sdate:app.tool.getDatesByIndex(3, app.localTimeToServer).sdate,
                    edate:app.tool.getDatesByIndex(0, app.localTimeToServer).sdate,
                },
                quickDateIndex:-1,
                list: [],
                setOption: null,
                isLoading: true,
                bgType: 0
            }
        },
        methods: {
            initPage(params) {
                getCustomers(params).then(res => {
                    this.isLoading = false
                    if (res.errcode == app.errok) {
                        this.list = res.data.Count
                        let arr1 = this.list.map(obj => {
                            return obj.Name
                        })
                        let arr2 = this.list.map(obj => {
                            return obj.Value
                        })
                        opt.yAxis.data = arr1
                        opt.series[0].data = arr2
                        this.setOption = Object.assign({}, opt)
                        this.list = this.list.reverse()
                    }
                })
            },
            changeDate(obj){
                this.dateObj.sdate = obj.sdate;
                this.dateObj.edate = obj.edate;
                this.quickDateIndex = obj.index;
                this.initPage({
                    pname: 'countbycustomerstatus',
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
                pname: 'countbycustomerstatus',
                campusids: this.campusListOld.join(),
                sdate: this.dateObj.sdate,
                edate: this.dateObj.edate
            })
        },
        watch: {
            campusListOld(val) {
                if (val) {
                    this.initPage({
                        pname: 'countbycustomerstatus',
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