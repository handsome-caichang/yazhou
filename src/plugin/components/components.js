import customRouterView from './custom-router-view/custom-router-view.vue'
import routerBus from './router-bus/router-bus.vue'

// 百度'echarts'库 vue组件化
import Echarts from './echarts/echarts.vue'
import Xgjcharts from './xgjcharts/xgjcharts.vue'

// 引入'遮罩'组件  通过 <loading></loading> 调用
import loading from './loading/loading.vue'

import scrollerBase from './scroller/scroller-base.vue'
import scrollerLoad from './scroller/scroller-load.vue'
import scrollerLoadUp from './scroller/scroller-load-up.vue'
import scrollerSuper from './scroller/scroller-super.vue'

import slider from './slider/slider.vue'

import swiper from './swiper/swiper.vue'


import actionSheet from './action-sheet/action-sheet.vue'
import richTextArea from './rich-text-area/rich-text-area.vue'
import sortSheet from './sort-sheet/sort-sheet.vue'

// 引入封装的选择'开始结束日期'组件，通过 <date-bar></date-bar> 调用 
import dateBar from './date-bar/date-bar.vue';
// 引入封装的图片上传组件，通过 <img-area></img-area> 调用 
import imgArea from './img-area/img-area.vue';

import fileBtn from './file-btn/file-btn.vue'

import videoArea from './video-comp/video-area.vue'
import fileArea from './file-comp/file-area.vue'

// 引入语音组件
import VoiceRecording from './voice/voice-recording.vue'




/* 引自vux */
import {DatetimeView} from 'vux';

const vueComponents = {
    customRouterView,
    routerBus,
    routerBusPromise: () => Promise.resolve(routerBus),
    Echarts,
    Xgjcharts,
	loading,
	scrollerBase,
	scrollerLoad,
	scrollerLoadUp,
	scrollerSuper,
    slider,
	swiper,
    actionSheet,
    richTextArea,
    sortSheet,
    dateBar,
    imgArea,
    fileBtn,
    fileArea,
    videoArea,
    VoiceRecording,


    DatetimeView
}


export default vueComponents;

