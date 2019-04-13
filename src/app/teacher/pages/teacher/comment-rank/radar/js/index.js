// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts'
// 引入配置项
import { SERIESTYPE, EVENTS } from './config'

let EChart = () => {
	// console.log(this.echart,2382983)
}

// 初始化图表
EChart.init = (el, setOption) => {
	console.log(el, setOption);
	let _series = setOption.series
	_series.length > 0 ? _series.forEach(item => {
		// 检测传入的图表类型是否存在
		let _type = SERIESTYPE.some((item1) => {
			return item1 === item.type
		})
		// 按需载入图表系列
		if(_type) {
			require(`echarts/lib/chart/${item.type}`)
			this.echart = echarts.init(el)
			this.echart.setOption(setOption)
		} else {
			console.warn('series type更多细节请参考：http://echarts.baidu.com/option.html#series-line')
			throw Error('[series type] does not support the type', item.type)
		}
	}) : console.warn('ex: setOption.series.type')
}

// 动态渲染
EChart.setOption = (setOption) => {
	this.echart.setOption(setOption)
}

// 销毁实例
EChart.dispose = () => {
	this.echart.dispose()
}

EChart.emit = (vue) => {
	EVENTS.forEach(event => {
		// 绑定echarts事件
		this.echart.on(event, params => {
			// 抛出事件
			vue.$emit(event, params)
		})
	})
}

export default EChart