<style scoped>
</style>

<template>
    <div class="echarts" ref="echarts"></div>
</template>

<script>
    import base from 'src/plugin/app/base.js'

    // 全局颜色
    const globalColor = [
        '#A2C9FF',
        '#6DA8FB',
        '#FBC725',
        '#F7B84F',
        '#EC7703', 
        '#F1B59B',
        '#D09DD3',
        '#BA6FBF',
        '#F1769D',
        '#731D8E',
    ];

    export default {
        name: "xgjcharts",
        props: {
            options: {
                type: Object
            },
            // 
            resizeFalg: '',
            /*action:{
                type:[Array,Object],
                default(){
                    return []
                },
                required:false
            },*/
        },
        data() {
            return {
                echartsInstance: null
            }
        },
        methods: {
            // 初始化echarts
            init() {
                // import(/* webpackChunkName: "echarts" */ 'echarts').then()

                base.getEchartsPromise().then(echarts => {
                    if (this.options && this.options.series) {

                        if (!this.options.color) {
                            this.options.color = globalColor
                        }

                        this.echartsInstance = echarts.init(this.$el);
                        this.echartsInstance.setOption(this.options);
                        this.echartsInstance.hideLoading();
                    }
                })
            },
            load(){
                this.echartsInstance && this.echartsInstance.showLoading();
            },
            // 销毁实例
            dispose() {
                this.echartsInstance && this.echartsInstance.dispose();
            },
            _winResizeHandler() {
                this.echartsInstance && this.echartsInstance.resize();
            }
        },
        mounted() {
            window.addEventListener('resize',this._winResizeHandler)
        },
        created() {
        },
        destroy() {
            this.dispose();
            window.removeEventListener('resize',this._winResizeHandler)
        },
        watch: {
            options: {
                handler: function (newVal, oldVal) {
                    if (!this.echartsInstance) {
                        this.init()
                    } else {
                        this.$nextTick(() => {
                            this.echartsInstance.setOption(newVal);
                            /*if (this.action instanceof Array){
                                this.action.forEach(item=>this.echartsInstance.dispatchAction(item));
                            } else {
                                this.echartsInstance.dispatchAction(this.action);
                            }*/
                        })
                    }
                },
                deep: true,
                immediate: true
            },
            resizeFalg() {
                // this.$nextTick(() => {
                    this.echartsInstance && this.echartsInstance.resize();
                // })
            }
        }
    };

</script>

