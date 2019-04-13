<!-- 筛选状态（上课点评列表） -->
<style scoped lang="scss">
    
    
    .as-body{
        font-size: 15px;
        .box{
            padding: 16px;
            border-radius: 0px;
            .term{
                font-size: 16px;
                height: 20px;
                line-height: 20px;
                margin-bottom: 8px;
                color: $color-primary;
            }
            .describe{
                color: $color-6;
                margin-bottom: 25px;
            }
            .got-it{
                width:150px ;
                height: 32px;
                line-height: 32px;
                margin: 0 auto;
                text-align: center;
                background-color: $color-primary;
                color: $color-white;
                border-radius: 32px;
            }
        }
    }
</style>

<template>
    <action-sheet
        class="as-body"
        v-show="opened"
        @close="close"
        :position="position"
        :data="tipsData">
        <div class="box">
            <div class="term">人均</div>
            <div class="describe">该学生在本班级历次得分的平均值</div>
            <div class="term">班平</div>
            <div class="describe">该班级内所有学生得分的平均值</div>
            <div class="term">满星</div>
            <div class="describe">第一个数是该学生在本班级得满分的次数<br>第二个数是已评分的次数</div>
            <div class="got-it" @click="gotIt">我知道了</div>
        </div>
    </action-sheet>
</template>

<script>
    
    

    export default {
        name: "tips-filter",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {}
        },
        data() {
            return {
                position:'center'
            }
        },
        computed: {
            tipsData() {
                return {
                    opened: this.opened,
                }
            }
        },
        methods: {
            gotIt(){
                this.close()
            }
        },
        components: {
            
        }
    }
</script>