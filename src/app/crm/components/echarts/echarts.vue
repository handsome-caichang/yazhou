<style scoped>
</style>

<template>
    <div class="echarts" ref="echarts"></div>
</template>

<script>
    
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
        name: "Echarts",
        props: {
            options: {
                type: Object
            },
            // 
            restFalg: '',
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
                echarts: null
            }
        },
        methods: {
            // 初始化echarts
            init() {
                import(/* webpackChunkName: "echarts" */ 'echarts').then(echarts => {
                    if (this.options && this.options.series) {

                        if (!this.options.color) {
                            this.options.color = globalColor
                        }

                        this.echarts = echarts.init(this.$el);
                        this.echarts.setOption(this.options);
                        this.echarts.hideLoading();
                    }
                })
            },
            load(){
                this.echarts && this.echarts.showLoading();
            },
            // 销毁实例
            dispose() {
                this.echarts && this.echarts.dispose();
            },
            _winResizeHandler() {
                this.echarts && this.echarts.resize();
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
                    if (!this.echarts) {
                        this.init()
                    } else {
                        this.$nextTick(() => {
                            this.echarts.setOption(newVal);
                        })
                        /*if (this.action instanceof Array){
                            this.action.forEach(item=>this.echarts.dispatchAction(item));
                        } else {
                            this.echarts.dispatchAction(this.action);
                        }*/
                    }
                },
                deep: true,
                immediate: true
            },
            restFalg() {
                // this.$nextTick(() => {
                    this.echarts && this.echarts.resize();
                // })
            }
        }
    };

</script>

