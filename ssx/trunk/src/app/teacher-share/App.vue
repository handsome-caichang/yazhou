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
        <custom-router-view class="page-veiw"></custom-router-view>        
        <!-- <global-dom-plugin class="plugins-view"></global-dom-plugin> -->
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted() {
            app.shareTeacherApp = this;
        },
        components: {
            // GlobalDomPlugin
        },
    };
</script>