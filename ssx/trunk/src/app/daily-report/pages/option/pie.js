import {clone,createFactory} from './tool.js';
/*
    export:
    1._chargePie:    收费页面的环形图
    2._consumePie:  课消页面的环形图
*/

/**
 * 收费页面的pie图
 */

/*---------------------------------------------------------------------------------------------------*/
const icon = 'path://M512 731.428571a219.428571 219.428571 0 1 0-219.428571-219.428571 219.428571 219.428571 0 0 0 219.428571 219.428571z m0 292.571429a512 512 0 1 1 512-512 512 512 0 0 1-512 512z';

const optionPie = {
    color:['#7ACE4C','#5DADE2','#FFB508','#7460EE','#75859B'],
    legend: {
        orient: 'vertical',
        x: 'right',
        y: 'middle',
        itemWidth:7,
        itemHeight:7,
        textStyle:{
            fontSize:12,
            color:'#333',
        },
        align:'left',
        itemGap:15,
        data:[],
    },
    series: [
        {
            silent :true,
            type:'pie',
            radius: ['30%', '47%'],
            center:['42%','50%'],
            hoverAnimation: false,
            legendHoverLink:false,
            hoverOffset: 0,
            selectedOffset: 0,
            avoidLabelOverlap: true,
            label: {
                normal:{
                    show:true,
                    position:'outside',
                    formatter:'{c}',
                },
            },
            labelLine: {
                normal: {
                    show: true,
                    length:10,
                    length2:10,
                }
            },
            itemStyle: {
                borderWidth: 1,
                borderColor:'#FFF',
            }
        }
    ]
}


function formatter(str){
    return str.length>6? str.slice(0,6) + '...' : str;
}

let factory = createFactory(optionPie);

factory.prototype.setData = function(data){
    this.series[0].data = data;
    this.legend.data = data.map(item=>({
            name:item.name,
            icon
    }));
    return this;
}

factory.prototype.setFormatter = function(formatter){
    this.legend.formatter = formatter;
    return this;
}

const _chargePie = new factory().setFormatter(formatter),
      _consumePie = new factory().setFormatter(formatter);

export {_chargePie,_consumePie}