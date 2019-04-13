<style lang="scss">
    // 基础样式
    // @import "./assets/scss/base/index.scss";

    @import "./assets/scss/base/901-rich-text.scss";

    // 全局 根路由/页面 基础样式
    #app{
        @include position-absolute;
        overflow: hidden;
        .page-veiw {
            @include position-absolute;
        }
        .server-block {
            @include position-absolute;
            z-index: 9999999;
        }
    }

    .custom-router-page{
        background-color: #FFF;
    }

</style>

<template>
    <div id='app'>
        <div class="server-block" v-show="serverBlock">
             <loading :bgType='1'></loading>
        </div>
        
        <form method="post" id="wxPayForm" name="wxPayForm" style="display:none">
            <input type="hidden" id="wxData" name="wxData" value="">
        </form>
        <custom-router-view class="page-veiw" ref="CRview"></custom-router-view>
        
        <global-dom-plugin class="plugins-view"></global-dom-plugin>

    </div>
</template>

<script>
    import GlobalDomPlugin from './components/global-dom-plugin/global-dom-plugin.vue';
    import {CartMixin} from './cart-mixin.js';
    export default {
        mixins: [CartMixin],
        methods: {
            ...Vuex.mapMutations([
                'set_companyId'
            ]),
        },
        mounted() {
            this.$nextTick(() => {
                app.mallApp = this.$refs.CRview;
            })
        },
        computed: {
            
        },
        created() {
            
        },
        components: {
            GlobalDomPlugin
        },
        watch: {
            
        }
    };
</script>