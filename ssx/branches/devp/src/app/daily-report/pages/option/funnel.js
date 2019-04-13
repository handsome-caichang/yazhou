import {clone,createFactory} from './tool.js';
/*
    export:
    1._customerFunnel:    招生页面的漏斗图
*/


/*---------------------------------------------------------------------------------------------------*/
const globalColor = ['#A2C9FF','#6DA8FB','#FBC725','#F7B84F','#EC7703','#F1B59B','#F1B59B','#BA6FBF','#F1769D','#731D8E'];

/*const optionFunnel =  {
    color:globalColor,
    calculable: true,
    series: [
        {
            z:101,
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '70%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
           
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    
                }
            },
            data: []
        },
        {
            z:100,
            silent:true,
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '70%',
            min: 0,
            max: 100,
            minSize: '1%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                },
            },
            labelLine: {
                show:false
            },

            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    opacity:0.5
                }
            },
            data: [{
                name:'',value:100
            },{
                name:'',value:75
            },{
                name:'',value:50
            },{
                name:'',value:25
            }
            ]
        }
    ]
}

function formatter(params){
    return params.data ? params.data.count : '';
}

const funnelPercent = [25,50,75,100];
//计算series[0]的maxSize,使得内漏斗能完全包裹再外漏斗内.
function calcMax(percent){
    let max = 100;       

    percent.sort((a,b)=>a - b);
    percent.forEach((item,index)=>{
        let scale = 100 * funnelPercent[index] / item;
        if (scale < max){
            max = scale;
        }
    })
    return max
}

let factory = createFactory(optionFunnel);

factory.prototype.setData = function(data){
    //设置data
    let total = Math.max(...data.map(item=>item.value));

    data.sort((a,b)=>b.value - a.value);

    this.series[0].data = data.map((item,index)=>{
        item.count = item.value;
        item.value = total === 0 ? 1 : (item.value / total) * 100;
        item.itemStyle = {
            color:globalColor[index]
        }
        return item
    });
    this.series[0].label.normal.formatter = formatter;

    //设置maxSize
    let percent = data.map(item=>item.value);
   this.series[0].maxSize = calcMax(percent) + '%';

    //设置右侧标题
    let title = [...data];
    this.series[1].label.normal.formatter = function(params){
        return title[params.dataIndex].name
    }

    return this;
}*/









const optionFunnel = {
    color:globalColor,
    //calculable: true,
    series:[
        {
            name:'漏斗图',
            type:'funnel',
            left: '25%',
            top: 60,
            bottom: 60,
            width: '50%',
            sort: 'none',
            gap: 2,
            label: {
                normal: {
                    show: true,
                    position: 'right',
                }
            },

            labelLine: {
                normal: {
                    length: 20,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    
                }
            },
            data: []
        },
        {
            name:'漏斗图',
            type:'funnel',
            left: '25%',
            top: 60,
            bottom: 60,
            width: '50%',
            sort: 'none',
            gap: 2,
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                },
                emphasis: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            labelLine: {
                normal: {
                    length: 20,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: '#fff',
                    borderWidth: 1,
                    opacity:0,                    
                }
            },
            data: []
        }
    ]
}


let factory = createFactory(optionFunnel);

function formatter(params){
    let name = params.data.name;
    return name.length > 6 ? name.slice(0,6)+'...':name;
}

factory.prototype.setData = function(data){
    let funnelVal = [];
    if (data.length > 0){
        let divide= 100 / data.length;
        funnelVal = data.map((item,index)=>({
            value: divide * (data.length - index),
            name: item.name
        }));
    }
    this.series[0].data = funnelVal;
    this.series[1].data = data;
    this.series[0].label.normal.formatter = formatter;
    this.series[1].label.normal.formatter = params=>params.data.value;
}


const _customerFunnel = new factory();

export {_customerFunnel,}