import {clone,createFactory} from './tool.js';

/*---------------------------------------------------------------------------------------------------*/
const arrowUp = require('../../assets/img/arrowUp.png'),
      arrowDown = require('../../assets/img/arrowDown.png'),
      circle0 =  require('../../assets/img/circle0.png'),
      circle1 =  require('../../assets/img/circle1.png');


function rateSwitch(rate,link=''){
    if (Number(rate) > 0 && Number(rate)<= 200){
        return `${link}{arrowUp|}{rate|${rate}%}`
    } else if (Number(rate)<0){
        return `${link}{arrowDown|}{rate|${rate}%}`
    } else {
        return ''
    }
}

//主要为了适配上升和下降箭头.
function formatter(params){
    let data,valShow;
    if (data = params.data){
        valShow = data.valueShow !== undefined ? data.valueShow : data.value
        // if (Number(data.rate) > 0 && Number(data.rate)<= 200){
        //     return `{moneyBlue|${valShow}}\n{arrowUp|}{rate|${data.rate}%}`
        // } else if (Number(data.rate)<0){
        //     return `{moneyBlue|${valShow}}\n{arrowDown|}{rate|${data.rate}%}`
        // } else {
        //     return `{moneyBlue|${valShow}}`;
        // }
        return `{moneyBlue|${valShow}}` + rateSwitch(data.rate,'\n');
    }
}


function createFormatter(series){
    return function formatterMonth(params){
        //把series0
        let data;
        if (data = params.data){
            let dataIndex = params.dataIndex,
                valueShow1 = data.valueShow || data.value,
                valueShow2 = series[dataIndex] && (series[dataIndex].valueShow || series[dataIndex].value),
                rate1 = data.rate,
                rate2 = series[dataIndex] && series[dataIndex].rate;
           
            let line1 = `{circle0|}{moneyBlue|${valueShow1}}   ` + rateSwitch(rate1),
                line2 = series[dataIndex]? `\n{circle1|}{moneyYellow|${valueShow2}}   ` +  rateSwitch(rate2):'';
            return line1 + line2;
        }
    }
}



//图表位置，左右两边不留空。
const gridFull = {
    bottom:40,
    left:-10,
    right:-10,
    top:90
}

const rich = {
    moneyBlue:{
        lineHeight:20,
        color:'#78AEF9',
        fontSize:13,
        align:'left',
    },
    moneyYellow:{
        lineHeight:20,
        color:'#FFB508',
        fontSize:13,
        align:'left',
    },
    rate:{
        fontSize:11,
        color:'#C1C1C1',
        lineHeight:20,
        align:'left',
    },
    circle0:{
        height:10,
        backgroundColor:{
            image:circle0
        },
        align:'left',
    },
    circle1:{
        height:10,
        backgroundColor:{
            image:circle1
        },
        align:'left',
    },
    arrowUp:{
        height:10,
        backgroundColor:{
            image:arrowUp,
        },
        align:'left',
    },
    arrowDown:{
        height:10,
        backgroundColor:{
            image:arrowDown,
        },
        align:'left',
    }
}


const optionLine = {
    backgroundColor:'#FFFFFF',
    title:{        
        textStyle:{
            color:'#666',           
            fontSize:14
        },
        left:10,
        top:19
    },
    tooltip:{
        trigger:'axis',
        show:true,
        showContent:false,
        axisPointer:{
            z:1,
            lineStyle:{
                color:"rgba(155,155,155,0.5)",
                type:"solid",          
                width:1,
            },
        },
    },
    grid:clone(gridFull),
    series:[{
        type:'line',
        z:2,
        data:[],
        itemStyle:{
            color:'#78AEF9',
            opacity:0
        },
        areaStyle:{
            color:'#F1F6FE'
        },
        emphasis:{
            
            itemStyle:{
                color:'#5DADE2',
                opacity:1,
                borderColor:'#fff',
                borderWidth:4,
                shadowColor:'rgb(120,174,249)',
                shadowBlur:12,
            },
            label:{
                show:true,
                align:'left',
                distance:35,
                color:'#78AEF9',
                fontSize:14,
                lineHeight:1,
                padding:[8,10],
                backgroundColor:'rgb(255,255,255)',
                shadowColor:'rgba(0,0,0,0.2)',
                shadowBlur:20,
                borderRadius:6,
                formatter:'',
                verticalAlign:'middle',
                rich:clone(rich)
            },
        },
    },{
        type:'line',
        z:1,
        data:[],
        itemStyle:{
            color:'#FFB508',
            opacity:0
        },
        areaStyle:{
            color:'#EAE9DE'
        },
        emphasis:{
            itemStyle:{
                color:'#FFB508',
                opacity:1,
                borderColor:'#fff',
                borderWidth:4,
                shadowColor:'#ECD996',
                shadowBlur:12,
            },
            // label:{
            //     show:true,
            //     align:'center',
            //     distance:35,
            //     color:'#78AEF9',
            //     fontSize:14,
            //     lineHeight:1,
            //     padding:[8,10],
            //     backgroundColor:'#414141',
            //     shadowColor:'rgba(0,0,0,0.2)',
            //     shadowBlur:15,
            //     borderRadius:6,
            //     formatter:'',
            //     verticalAlign:'middle',
            //     rich:clone(rich)  
            // },
        
        }
    }],
    xAxis:{
        boundaryGap: false,
        type: 'category',
        data:[],
        axisLine:{
            lineStyle:{
                color:'#5DADE2'
            }
        },
        color:'#5DADE2'       
    },
    yAxis:{
        type: 'value',
        axisLine:{
            show:false
        },
        axisTick:{
            show:false
        },
        axisLabel:{
            color:'#fff',
            margin:-35
        },
        splitLine:{
            show:false,
        }
    }
}

//月报的报表有图例.
const extend_month = {
    legend:{
        data:[],
        left:15,
        top:5,
        icon:'roundRect',
        itemWidth:20,
        itemHeight:5,
        selectedMode:false,
    }
}

let factory = createFactory(optionLine);
factory.prototype.setSubText = function(money,count){
    this.title.subtext = `{big|${money}}   {small|${count}人次}`
    return this;
}

factory.prototype.setLabel = function(rate){
    this.series[0].emphasis.label.formatter = `{money|{c}}\n{arrow|}{rate|${rate}%}`
    return this;
}

factory.prototype.setData = function(data1,data2){
    this.series[0].data = data1;
    if (data2!==undefined){
        //是月报表,处理formatter
        this.series[0].emphasis.label.formatter = createFormatter(data2);
    } else {
        data2 = [];
    }
    this.series[1].data = data2;

    //处理左右端点显示问题。
    let padding = data2.length === 0 ? 30 : 15;
    //后三分之一全部靠右处理。
    for (let i =0 ; i < Math.ceil(data1.length / 3); i++){
        this.series[0].data[data1.length - i - 2].emphasis = {
            label:{
                align:'right'
            }
        }
    }
    return this;
}

factory.prototype.setxAsis = function(data){
    this.xAxis.data = data;
    return this;
}

//函数无法克隆,初始化实例的时候调用
factory.prototype.setFormatter = function(formatter){
    this.series[0].emphasis.label.formatter = formatter;
    return this;
}

factory.prototype.setLegend = function(curYear,preYear){
    if (this.legend){
        this.legend.data = [curYear,preYear];
        this.series[0].name = curYear;
        this.series[1].name = preYear;
    }
    return this;
}

let factory1 = ()=> new factory().setFormatter(formatter),
    factory2 = ()=> new factory().mix(extend_month);

const _dayCharge = factory1(),
      _dayConsume = factory1(),
      _dayClassManban = factory1(),
      _dayClassChuqin = factory1(),
      _dayClassXufei = factory1(),
      _dayCustomerVisit = factory1(),
      _dayCustomerTranslate = factory1(),

      _monthCharge = factory2(),
      _monthConsume = factory2(),
      _monthClassManban = factory2(),
      _monthClassChuqin = factory2(),
      _monthClassXufei = factory2(),
      _monthCustomerVisit = factory2(),
      _monthCustomerTranslate = factory2();

export {
        _dayCharge,_monthCharge,_dayConsume,_monthConsume,      //收费和课消
        _dayClassManban,_dayClassChuqin,_dayClassXufei,_monthClassManban,_monthClassChuqin,_monthClassXufei,    //班级分析报表
        _dayCustomerVisit,_dayCustomerTranslate,_monthCustomerVisit,_monthCustomerTranslate //招生分析报表
    }    