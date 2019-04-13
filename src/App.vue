<style lang="scss">
    @import './assets/scss/variable.scss';
    @import './assets/scss/mixin.scss';

    // 全局 根路由/页面 基础样式
    #app{
        @include position-absolute;
        overflow: hidden;
        .page-veiw {
            @include position-absolute;
        }
    }

    .custom-router-page{
        background-color: #EDF1F7;
    }

</style>

<template>
    <div id='app'>
        <customRouterView class="page-veiw"></customRouterView>
        
        <global-dom-plugin class="plugins-view">
        </global-dom-plugin>
    </div>
</template>

<script>
    import GlobalDomPlugin from './components/global-dom-plugin/global-dom-plugin.vue'

    import {setUnReadMsg} from 'src/api/jie.js'
    
    export default {
        name: 'App',
        components: {
            GlobalDomPlugin,
        },
        data() {
            return {
            }
        },
        computed: {
            ...Vuex.mapGetters(['validUnreadSum']),
        },
        methods: {
           
        },
        created() {
        },
        mounted() {
            app.imApp = this;
        },
        watch: {
            // 该回调将会在侦听开始之后被立即调用
            validUnreadSum: {
                    handler: function (nv, ov) {
                    if (nv === 0) setUnReadMsg({set: 0})

                    if (ov === 0) setUnReadMsg({set: 1})
                },
                    immediate: true
            },
        }
    };
</script>