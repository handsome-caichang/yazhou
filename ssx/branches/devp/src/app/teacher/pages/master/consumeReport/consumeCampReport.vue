<style lang="scss" scoped>
    
</style>

<template>
    <comm-page :api="api" 
               :router="'consumeDetail'" 
               @changeDate="changeDate"
               :title="app.sysInfo.Title_Campus" 
               ref="commPage"></comm-page>
</template>

<script>
    import CommPage from './child/commPage.vue'
    import {queryConsumeTotal} from 'teacher/api/consumeReport.js'
    export default {
        data() {
            return {
                wxTitle: '课消报表',
                api: queryConsumeTotal
            }
        },
        methods: {
            changeDate(obj) {
                app.ls.set('timeObj', obj)
            }
        },
        components: {
            CommPage
        },
        created() {
            let timeObj = app.ls.get('timeObj')
            if (timeObj) {
                this.$nextTick(() => {
                    this.$refs.commPage.pagingOption.params.sdate = timeObj.sdate
                    this.$refs.commPage.pagingOption.params.edate = timeObj.edate
                    this.quickDateIndex = timeObj.index
                })
            }
        },
        destroyed() {
            if (!app.tool.op('EnableDeptAddArea')) app.ls.remove('timeObj')
        }
    }
</script>