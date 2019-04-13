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
                wxTitle: '邀约确认',
                params: {
                    querytype: 2
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