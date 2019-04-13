<style lang="scss">
    
    

    // 全局 根路由/页面 基础样式
    #app{
        @include position-absolute;
        overflow: hidden;
        .page-view {
            @include position-absolute;
        }
    }

    .custom-router-page{
        background-color: #FFF;
    }

    .icon-circle{
        width:10px;
        height:10px;
        margin-right:5px;
    }

</style>

<template>
    <div id='app'>
        <custom-router-view class="page-view"></custom-router-view>
    </div>
</template>

<script>

    export default {
        name: 'App',
        mounted() {
            app.masterApp = this;
        },
        components: {

        },
    };
</script>