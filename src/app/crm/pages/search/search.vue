<style scoped lang="scss">
    
    
    .wrapper {
        .header {
            height: 44px;
            @include flex-between;
            background-color: $color-assist-1;
            padding: 0 12px;
            .left {
                flex: 1;
                position: relative;
                margin-right: 10px;
                .input {
                    height: 28px;
                    line-height: 28px;
                    width: 100%;
                    border: 1px solid #5991FF;
                    background-color: $color-white;
                    border-radius: 14px;
                    font-size: 13px;
                }
                input::-webkit-input-placeholder {
                    color: $color-9;
                    font-size: 13px;
                    text-align: center;
                }
                .icon-wrapper {
                    position: absolute;
                    right: 10px;
                    top: 0;
                    height: 28px;
                    line-height: 28px;
                }
            }
            .right {
                width: 50px;
                height: 28px;
                line-height: 28px;
                background-color: $color-white;
                border-radius: 50px;
                font-size: 13px;
                color: $color-6;
                text-align: center;
            }
        }
        .scroll {
            @include position-absolute(44px, 0, 0, 0);
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="header">
            <div class="left">
                <input type="text" class="input" placeholder="搜索客户名、手机号" v-model="searchText" style="font-size: 12px;line-height: 28px;">
                <div class="icon-wrapper" @click="searchText=''">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shanchuanniu"></use>
                    </svg>
                </div>
            </div>
            <div class="right" @click="search">搜索</div>
        </div>
        <comm-page :params="params" class="scroll" :autoLoadFirst="false" ref="commPage"></comm-page>
    </div>
</template>

<script>
    import CommPage from 'crm/components/commPage/commPage.vue'
    export default {
        data() {
            return {
                wxTitle: '客户搜索',
                searchText: '',
                params: {
                    scope: parseInt(this.$route.params.scope), //1 公海 2线索  3私海
                    sourcetype: 0,
                    keyword: this.searchText,
                    status: 0
                }       
            }
        },
        methods: {
            search() {
                this.$refs.commPage.$refs.scroll.refresh({keyword: this.searchText})
            }
        },
        created() {
            
        },
        components: {
            CommPage
        }
    }
</script>