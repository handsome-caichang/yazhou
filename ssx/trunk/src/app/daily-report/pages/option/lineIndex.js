import {clone,createFactory} from './tool.js';
/*
    export:
    1._indexCharge:    首页收费的图表
    2._indexConsume:   首页课消的图表
*/



/*---------------------------------------------------------------------------------------------------*/
const arrowUp = require('../../assets/img/arrowUp.png'),
      arrowDown = require('../../assets/img/arrowDown.png')    
//图表位置，左右两边不留空。
const gridFull = {
    bottom:10,
    left:0,
    right:10,
    top:90
}

function formatter(params){
    let data;
    if (data = params.data){
        if (Number(data.rate) > 0){
            return `{money|${data.value}}\n{arrowUp|}{rate|${data.rate}%}`
        } else if (Number(data.rate)<0){
            return `{money|${data.value}}\n{arrowDown|}{rate|${data.rate}%}`
        } else if (Number(data.rate) == 0 || isNaN(Number(data.rate)) ){
            return `{money|${data.value}}`;
        }
    }
    return `{money|${data.value}}\n{rate|${data.rate}%}`
}

//折线图共享配置
const optionLine = {
    title:{        
        textStyle:{
            color:'#fff',           
            fontSize:14,
            lineHeight:15,
        },
        left:10,
        top:19,
        subtext:'',
        subtextStyle:{
            rich:{
                big:{
                    color:'#fff',
                    fontSize:25,
                    verticalAlign:'bottom',
                },
                small:{
                    color:'#fff',
                    fontSize:13,
                    verticalAlign:'bottom',
                }
            }
        }
    },
    tooltip:{
        trigger:'axis',
        show:'true',
        position:[10,40],
        axisPointer:{
            z:1,
            lineStyle:{
                color:"rgba(255,255,255,0.2)",
                type:"solid",          
                width:2
            },
        },
        triggerOn:'none',
        backgroundColor:'transparent',
        textStyle:{
            fontSize:20,
        },
        showContent:false,
    },
    grid:clone(gridFull),
    series:[{
        data:[],
        silent:true,
        type:'line',
        itemStyle:{
            color:'#fff',
            opacity:0
        },
        emphasis:{
            itemStyle:{
                color:'#5DADE2',
                opacity:1,
                //borderColor:'#fff',
                borderColor:'#5DADE2',
                borderWidth:2,
            },
           
            label:{
                show:true,
                distance:10,
                align:'center',
                padding:[8,10],
                borderRadius:4,
                backgroundColor:'#FFF',
                rich:{
                    money:{
                        lineHeight:20,
                        color:'#5DADE2',
                        fontSize:13,
                    },
                    rate:{
                        fontSize:11,
                        color:'#737B91',
                        lineHeight:20
                    },
                    arrowUp:{
                        height:10,
                        backgroundColor:{
                            image:arrowUp,
                        }
                    },
                    arrowDown:{
                        height:10,
                        backgroundColor:{
                            image:arrowDown,
                        }
                    }
                }
            },
          
        },
    }],
    xAxis:{
        boundaryGap: false,
        type: 'category',
        show:false, 
        data:[], 
    },

    yAxis:{
        z:100,
        type: 'value',
        axisLine:{
            show:false
        },
        axisTick:{
            show:false
        },
        axisLabel:{
            color:'#fff',
            margin:-35,
            show:false
        },
        splitNumber:3,
        splitLine:{
            
            lineStyle:{
                type:'dashed',
                width:1,
                color: 'rgba(255,255,255,0.2)',
            },
        }
    }
}

//首页收费的扩展配置
const optionLine_extend1 = {
    title: {
        text: '收费金额（元）',
    },
    backgroundColor:'#78AEF9',
    series:[{
        areaStyle:{
            color:'#85B6F9'
        },
        emphasis:{
            itemStyle:{
                color:'#5DADE2',
                borderColor:'#5DADE2',
            },
            label:{
                color:'#5DADE2',
            },           
        }
    }]
}

//首页课消的扩展配置
const optionLine_extend2 = {
    title: {
        text: '课消金额（元）',
    },
    backgroundColor:'#7ACE4C',
    series:[{
        areaStyle:{
            color:'#87D25E'
        },
        emphasis:{
            itemStyle:{
                color:'#7ACE4C',
                borderColor:'#7ACE4C',
            },
            label:{
                color:'#3DBD7D',
            },           
        }
    }]
}


let factory = createFactory(optionLine);
factory.prototype.setSubText = function(money,count){
    this.title.subtext = `{big|${money}}   {small|${count}人次}`
    return this;
}

// factory.prototype.setLabel = function(rate){
//     this.series[0].emphasis.label.formatter = `{money|{c}}\n{arrow|}{rate|${rate}%}`
//     return this;
// }

factory.prototype.setData = function(data){
    this.series[0].data = data;
    this.series[0].emphasis.label.formatter = formatter;
    return this;
}

factory.prototype.setxAsis = function(data){
    this.xAxis.data = data;
    return this;
}


const _indexCharge = new factory().mix(optionLine_extend1);
const _indexConsume = new factory().mix(optionLine_extend2);

export {_indexCharge,_indexConsume}