<style scoped lang="scss">
    
    
    .wrapper {
        @include position-absolute;
    }
</style>

<template>
    <div class="wrapper">
        <comm-page :params="params"></comm-page>
    </div>
</template>

<script>
    import CommPage from 'crm/components/commPage/commPage.vue'
    export default {
        data() {
            return {
                wxTitle: '客户公海',
                params: {
                    scope: 1, //1 公海 2线索  3私海
                    sourcetype: 3, // 1自己添加 2 公司分配 3 公海 4 我的推广
                    keyWords: '',
                    status: 1
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