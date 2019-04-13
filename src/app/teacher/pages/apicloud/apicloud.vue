<style lang="scss" scoped>
    .rl {
        height: 40px;
        padding: 20px;
    }
</style>

<template>
    <div>
        <router-link class="rl" to="/" replace tag="div">回首页</router-link>

        <router-link class="rl" to="/apicloud/image" tag="div">图片</router-link>
        <router-link class="rl" to="/apicloud/audio" tag="div">语音</router-link>
        <router-link class="rl" to="/apicloud/video" tag="div">视频</router-link>

    </div>
</template>

<script>
export default {
    name: 'apicloue',
    data () {
        return {
            wxTitle: "图片选择",
            navig: window.navigator
        }
    },
    created() {
        for (var prop in window.navigator) {
            if (window.navigator.hasOwnProperty(prop)) {
                console.log(window.navigator[prop]);
            }
        }
    }
}
</script>

