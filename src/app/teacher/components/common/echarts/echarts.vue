<template>
    <div class="ecahrts" ref="ecahrts" :style="cssStyle"></div>
</template>

<script>
    // import Echarts from "./js/index"
    import { SERIESTYPE, EVENTS } from './js/config'
    // import * as Echarts from 'echarts/lib/echarts'
    import Echarts from 'echarts/lib/echarts'
    
    export default {
        name: "Echarts",
        props: {
            setOption: {
                type: Object
            },
            cssStyle: {
                type: String
            }
        },
        data() {
            return {
                echarts: null
            }
        },
        methods: {
            // 初始化echarts
            init() {
                let arr = this.setOption.series, type
                if (arr.length) {
                    arr.forEach(item => {
                        type = SERIESTYPE.some((item1) => {
                            return item1 === item.type
                        })
                        if (type) {
                            require(`echarts/lib/chart/${item.type}`)
                            this.ecahrts = new Echarts.init(this.$el)
                            this.ecahrts.setOption(this.setOption)    
                        }
                    })
                }
            },
            // 销毁实例
            dispose() {
                this.ecahrts && this.echarts.dispose();
            },
            // 抛出绑定
            emit() {
                this.echarts.emit(this);
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.init();
            })
        },
        created() {
        },
        destroy() {
            this.dispose()
        },
        watch: {
            setOption(newVal, oldVal) {
                if (newVal) {
                    this.ecahrts.setOption(this.setOption)
                    // this.init()
                } else {
                    // this.echarts.setOption(newVal)
                }
            }
        }
    };
</script>

<style scoped>
    .echarts {
        width: 100%;
    }
</style>