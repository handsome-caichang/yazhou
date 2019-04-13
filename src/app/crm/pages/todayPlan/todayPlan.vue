<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
    }
</style>

<template>
    <div class="wrapper">
        <comm-page :params="params" :apiType="2"></comm-page>
    </div>
</template>

<script>
    import {getCustomerList} from 'crm/api/yy.js'
    import CommPage from 'crm/components/commPage/commPage.vue'
    export default {
        data() {
            return {
                wxTitle: '今日计划',
                params: {
                    querytype: 1
                }       
            }
        },
        methods: {
            
        },
        created() {
            
        },
        components: {
            CommPage
        }
    }
</script>