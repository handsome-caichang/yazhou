<style scoped>
    /* .echarts {
        width: 100%;
        overflow: hidden;
        border-radius: 5px;
        min-height:50px;
    } */
</style>

<template>
    <div class="echarts" ref="echarts" :style="cssStyle"></div>
</template>

<script>
    export default {
        name: "Echarts",
        props: {
            setOption: {
                type: Object
            },
            cssStyle: {
                type: String
            },
            action:{
                type:[Array,Object],
                default(){
                    return []
                },
                required:false
            },
        },
        data() {
            return {
                echarts: null
            }
        },
        methods: {
            // 初始化echarts
            init() {
                import(/*webpackChunkName: "echarts"*/ 'vender/echarts/4.1.0/echarts.min.js').then(echarts => {
                    console.log(echarts)
                    console.log('m .. >>>...>>>...')

                    // var echarts = echarts.echarts

                    let arr = this.setOption.series;
                    if (arr.length) {
                        this.echarts = echarts.init(this.$el);
                        this.echarts.setOption(this.setOption);
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
            // 抛出绑定
            emit() {
                this.echarts.emit(this);
            }
        },
        mounted() {
            this.$nextTick(() => this.init());
        },
        created() {
        },
        destroy() {
            this.dispose();
        },
        watch: {
            setOption(newVal, oldVal) {
                if (newVal && this.echarts){
                    this.echarts.setOption(newVal);
                    if (this.action instanceof Array){
                        this.action.forEach(item=>this.echarts.dispatchAction(item));
                    } else {
                        this.echarts.dispatchAction(this.action);
                    }
                }
            },
        }
    };

</script>
