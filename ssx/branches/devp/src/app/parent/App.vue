<style lang="scss">
    
    

    // 全局 根路由/页面 基础样式
    #app{
        @include position-absolute;
        overflow: hidden;
        .page-veiw {
            @include position-absolute;
        }
    }

    .custom-router-page{
        background-color: #FFF;
    }

</style>

<template>
    <div id='app'>
        <custom-router-view class="page-veiw" v-if="!systemOverdue"></custom-router-view>
        
        <global-dom-plugin class="plugins-view"></global-dom-plugin>
    </div>
</template>

<script>
    import GlobalDomPlugin from 'parent/components/global-dom-plugin/global-dom-plugin.vue';

    export default {
        name: 'App',
        mounted() {
            app.parentApp = this;
        },
        computed: {
            ...Vuex.mapState(['systemOverdue'])
        },
        components: {
            GlobalDomPlugin
        },
    };
</script>