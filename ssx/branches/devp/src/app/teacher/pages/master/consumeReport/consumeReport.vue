<style lang="scss" scoped>
    
</style>

<template>
    <comm-page :router="'consumeCampReport'" :api="api" @changeDate="changeDate" :title="'区域'">
        
    </comm-page>
</template>

<script>
    // import CommPage from './child/commPage.vue'
    import {queryConsumeTotalOfArea} from 'teacher/api/consumeReport.js'
    export default {
        data() {
            return {
                wxTitle: '区域课消报表',
                api: queryConsumeTotalOfArea
            }
        },
        methods: {
            changeDate(obj) {
                app.ls.set('timeObj', obj)
            }
        },
        destroyed() {
            if (!app.tool.op('EnableDeptAddArea')) app.ls.remove('timeObj')
        },
        components: {
            CommPage
        }
    }
</script>