import {clone,createFactory} from './tool.js';


const optionPie = {
    series: [
        {
            silent :true,
            type:'pie',
            radius: ['65%', '78%'],
            hoverAnimation: false,
            legendHoverLink:false,
            hoverOffset: 0,
            selectedOffset: 0,
            avoidLabelOverlap: false,
            label: {
                normal:{
                    show:true,
                    position:'center',
                },
                emphasis:{
                    show:true,
                    formatter:'{d}%',
                    textStyle: {
                        fontSize: '14',
                        color:'#5E7785',
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false,                    
                }
            },
        }
    ]
}

const optionPie_extend1={
    color:['#78AEF9','#eee'],
}
const optionPie_extend2={
    color:['#FFB508','#eee'],
}
const optionPie_extend3={
    color:['#7ACE4C','#eee'],
}


let factory = createFactory(optionPie);

factory.prototype.setData = function(data){
    this.series[0].data = data;
}

const _indexPie1 = new factory().mix(optionPie_extend1),
      _indexPie2 = new factory().mix(optionPie_extend2),
      _indexPie3 = new factory().mix(optionPie_extend3);

export {_indexPie1,_indexPie2,_indexPie3}