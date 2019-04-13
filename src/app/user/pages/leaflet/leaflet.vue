<style scoped lang="scss">
    
</style>

<template>
    <leaflet :type="'stu'"></leaflet>
</template>

<script>
    import Leaflet from 'common/pages/leaflet/leaflet.vue'
    export default {
        data() {
            return {
                wxTitle: '招招秀'
            }
        },
        components: {
            Leaflet
        }
    }
</script>