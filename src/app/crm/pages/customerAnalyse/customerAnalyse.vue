<style scoped lang="scss">
    .wrapper {
        @include position-absolute;
        background:#F7F8FA;
        .card-like{
            margin:10px 12px 0;
            background:#fff;
            .header-like{
                padding-left:16px;
                height:50px;
                border-bottom:1px solid #DCDCDC;
                color:#666666;
                font-size:14px;
                font-weight: 600;
                @include flex-center;
                justify-content: flex-start;
                .icon{
                    margin-right:6px;
                }
            }
            .scroll-x {
                overflow-x: scroll;
            }
            .canvas{
                min-width:100%;
                margin-top:10px;
            }
            .no-data {
                height: 220px;
                @include flex-center;
                .img {
                    // margin: 50px auto;
                    width: 87px;
                    height: 104px;
                }
                .text {
                    margin-top: 12px;
                    width: 100%;
                    font-size: 14px;
                    color: $color-6;
                    text-align: center;
                }
            }
        }
    }
</style>

<template>
    <scroller-base class="wrapper" :data="scrollData">
        <div class="card-like">
            <div class="header-like">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-qudaolaiyuan"></use>
                </svg>
                <span>渠道来源&转化</span>
            </div>
            <echarts class="canvas"  
                style="height:260px"
                v-if="!showTopNoData"
                :options="optionBar">
            </echarts>
            <div class="no-data" v-if="showTopNoData">
                <div>
                    <img src="./img/1.png" class="img">
                    <div class="text">暂时没有数据哦~</div>
                </div>
            </div>
        </div>

        <div class="card-like">
            <div class="header-like">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kehuzhuangtai"></use>
                </svg>
                <span>客户状态</span>
            </div>
            <echarts class="canvas"
                style="height:300px" 
                v-if="!showMidNoData"
                :options="optionPie">
            </echarts>
            <div class="no-data" v-if="showMidNoData">
                <div>
                    <img src="./img/1.png" class="img">
                    <div class="text">暂时没有数据哦~</div>
                </div>
            </div>
        </div>

        <div class="card-like">
            <div class="header-like">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yixiangkehujibie"></use>
                </svg>
                <span>意向客户级别</span>
            </div>
            <echarts class="canvas"
                style="height: 300px" 
                v-if="!showBottomNoData"
                :options="optionPie2" >
            </echarts>
            <div class="no-data" v-if="showBottomNoData">
                <div>
                    <img src="./img/1.png" class="img">
                    <div class="text">暂时没有数据哦~</div>
                </div>
            </div>
        </div>

        <div style="height:20px"> </div>
    </scroller-base>
</template>

<script>
    import {getCustomerLevelReport, getCustsrctranReport, getCustomerStatusReport} from 'crm/api/yy.js'
    import Echarts from 'crm/components/echarts/echarts'

    export default {
        data() {
            return {
                wxTitle: '数据分析',
                optionBar: null,
                optionPie: null,
                optionPie2: null,
                showTopNoData: false,
                showMidNoData: false,
                showBottomNoData: false
            }
        },
        computed: {
            ...Vuex.mapState(['myInfo']),
            scrollData() {
                return this.showTopNoData && this.showMidNoData && this.showBottomNoData
            }
        },
        methods: {
            getDataZoomEnd(len) {
                let clientWidth = document.body.clientWidth,
                    validWidth = clientWidth - 30,
                    num = parseInt(validWidth / 70)

                return len > num ? parseInt(num/len*100) : 100 
            },
            getData() {
                getCustsrctranReport({
                    companyid: this.myInfo.companyid,
                    customermanagerid: this.myInfo.id,
                }).then(res => {
                    if (res.result.code === app.errok) {
                        let data = res.data, 
                            len = data.length, 
                            xData = [], 
                            awaitData = [], 
                            finishData = []

                        if (!len) {
                            return this.showTopNoData = true
                        }

                        data.forEach(item => {
                            xData.push(item.value)
                            awaitData.push(item.hastransformedcustomercount || null)
                            finishData.push(item.nottransformedcustomercount || null)
                        })

                        optionBar.xAxis.data = xData
                        optionBar.series[0].data = awaitData
                        optionBar.series[1].data = finishData
                        
                        optionBar.dataZoom[0].end = this.getDataZoomEnd(len)

                        this.optionBar = Object.assign({}, optionBar)
                    }
                })

                getCustomerStatusReport({
                    querytype: 2
                }).then(res => {
                    if (res.result.code === app.errok) {
                        if (!res.data.length) {
                            return this.showMidNoData = true
                        }

                        let list = res.data.filter(obj => obj.intentionalcustomercount).map(obj => {
                            return {
                                name: obj.invitecustomerstatusname,
                                value: obj.intentionalcustomercount,
                                icon: 'circle',
                                // icon: icon
                            }
                        })

                        optionPie.legend.data = list
                        optionPie.series[0].data = list

                        this.optionPie = Object.assign({}, optionPie)
                    }
                })

                getCustomerLevelReport().then(res => {
                    if (res.result.code === app.errok) {
                        let total = res.data.totalcount,
                            leve11 = res.data.onelevelcustomercount,
                            level2 = res.data.twolevelcustomercount,
                            level3 = res.data.threelevelcustomercount,
                            level4 = res.data.fourlevelcustomercount,
                            level5 = res.data.fivelevelcustomercount,
                            level0 = res.data.zerolevelcustomercount

                        if ((leve11 + level2 + level3 + level4 + level5 + level0) == 0) {
                            this.showBottomNoData = true
                        } 
                            
                        let list = [
                                {value:level0, name:`级别0`, icon: 'circle'},
                                {value:leve11, name:`级别1`, icon: 'circle'},
                                {value:level2, name:`级别2`, icon: 'circle'},
                                {value:level3, name:`级别3`, icon: 'circle'},
                                {value:level4, name:`级别4`, icon: 'circle'},
                                {value:level5, name:`级别5`, icon: 'circle'}
                            ]

                        list = list.filter(obj => obj.value)

                        optionPie2.legend.data = list
                        optionPie2.series[0].data = list

                        this.optionPie2 = Object.assign({}, optionPie2)
                    }
                })              
            }
        },
        created() {
            this.getData()
        },
        components: {
            Echarts
        }
    }


    const icon = 'path://M512 731.428571a219.428571 219.428571 0 1 0-219.428571-219.428571 219.428571 219.428571 0 0 0 219.428571 219.428571z m0 292.571429a512 512 0 1 1 512-512 512 512 0 0 1-512 512z';

    // 渠道来源&转化 - 柱状图模拟数据
    const optionBar = {
        color: ['#7CE0D1','#5991FF'],        
        tooltip : {
            show: true,
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            },
            confine: true
        },
        legend: {
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 25,
            left: '20px',
            textStyle:{
                fontSize:12,
                color:'#666',
            },
            data:[
                {
                    name: '待转化人数', 
                    icon: 'circle', 
                }, {
                    name: '转化人数', 
                    icon: 'circle', 
                }
            ]
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '30px'
        },
        xAxis : {
            type : 'category',
            data : ['网上渠道','活动招生','转介绍','进店','户外广告','网上渠道','活动招生','转介绍','进店','户外广告','网上渠道','活动招生','转介绍','进店','户外广告','网上渠道','活动招生','转介绍','进店','户外广告'],
            axisLine:{
                show:false,
            },
            axisTick:{
                show:false,
            }
        },
        yAxis : {
            show:false
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100,
                preventDefaultMouseMove: false
            }
        ],
        series : [
            {
                type:'bar',
                name:'转化人数',
                stack: 'abc',
                barWidth:30,
                barMaxWidth: 40,
                barMinHeight: 14,
                data:[null,0,1,2,7,13000,19,9,28,1,13,19,9,28,7,13,19,9,28,7],
                label:{
                    show:true,
                },
                itemStyle:{
                    barBorderRadius:[0,0,4,4]
                },
            }, {
                type:'bar',
                name:'待转化人数',
                stack: 'abc',
                barWidth:30,
                barMaxWidth: 40,
                barMinHeight: 14,
                data:[26,1,18,46,0,13,19,9,28,7,13,190,9,28,7,13,19,9,28,7],
                label:{
                    show:true,
                },
                itemStyle:{
                    barBorderRadius:[4,4,0,0]
                },
                barCategoryGap: '30%',
            }
        ]
    };

    // 客户状态 - 饼图模拟数据
    const optionPie = {
        tooltip: {
            trigger: 'item',
            formatter: data => `${data.name}: <br/> ${data.value} (${data.percent.toFixed(1)}%)`
        },
        grid:{
            left: '0%',
            right: '0%',
            bottom: '10%',
        },
        legend: {
            orient: 'vertical',
            type:'scroll',
            x: '70%',
            y: 'middle',
            itemWidth: 8,
            itemHeight: 8,
            textStyle:{
                fontSize:12,
                color:'#666',
            },
            align:'left',
            data:[  
                {name:'有效', icon:'circle'},
                {name:'转化成功', icon:'circle'},
                {name:'意向客户', icon:'circle'},
                {name:'年龄不符', icon:'circle'},
                {name:'诺到访', icon:'circle'},
                {name:'超范围', icon:'circle'},
                {name:'无效', icon:'circle'}
            ]
        },
        series: [
            {
                type:'pie',
                center:['35%','50%'],
                radius: ['30%', '60%'],
                minAngle: 12,
                label: {
                    normal:{
                        show:true,
                        position:'inside',
                        formatter:'{c}',
                    },
                },
                data:[ 
                    {value:95, name:'有效'},
                    {value:56, name:'已体验'},
                    {value:43, name:'转化成功'},
                    {value:34, name:'意向客户'},
                    {value:23, name:'年龄不符'},
                    {value:16, name:'诺到访'},
                    {value:13, name:'超范围'},
                    {value:9, name:'无效'},
                ]
            }
        ]
    }

    // 意向客户级别 - 饼图模拟数据
    const optionPie2 = {
        tooltip: {
            trigger: 'item',
            formatter: data => `${data.name}: <br/> ${data.value} (${data.percent.toFixed(1)}%)`
        },
        grid:{
            left: '0%',
            right: '0%',
            bottom: '10%',
        },
        legend: {
            orient: 'vertical',
            x: '70%',
            y: 'middle',
            itemWidth: 8,
            itemHeight: 8,
            textStyle:{
                fontSize:12,
                color:'#666',
            },
            align:'left',
            itemGap:15,
            data:[
                {value:100, name:'级别0', icon:'circle'},
                {value:50, name:'级别1', icon:'circle'},
                {value:30, name:'级别2', icon:'circle'},
                {value:20, name:'级别3', icon:'circle'},
                {value:10, name:'级别4', icon:'circle'},
                {value:1, name:'级别5', icon:'circle'}
            ]
        },
        series: [
            {
                type:'pie',
                center:['35%','50%'],
                radius: ['30%', '60%'],
                minAngle: 12, 
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: data => `${data.percent.toFixed(1)}%`
                    }
                },
                data:[
                    {value:100, name:'级别0', icon:'circle'},
                    {value:50, name:'级别1', icon:'circle'},
                    {value:30, name:'级别2', icon:'circle'},
                    {value:20, name:'级别3', icon:'circle'},
                    {value:10, name:'级别4', icon:'circle'},
                    {value:1, name:'级别5', icon:'circle'}
                ]
            }
        ]
    }

</script>