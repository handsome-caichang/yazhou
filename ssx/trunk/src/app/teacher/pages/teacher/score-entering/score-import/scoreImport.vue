<style scoped lang="scss">
    
    
    .wrapper {
        .top {
            background-color: $color-white;
            height: 100px;
            .top-title {
                margin-top: 30px;
                font-size: 13px;
                text-align: center;
                color: $color-9;
            }
            .top-content {
                margin-top: 15px;
                font-size: 16px;
                text-align: center;
                color: $color-3;
            }
        }
        .bottom {
            height: 100%;
            background-color: $color-assist-1;
            padding: 10px 15px;
            .select-class {
                background-color: $color-white;
                height: 160px;
                .title {
                    padding: 26px 46px 0 46px;
                    .title-content {
                        font-size: 14px;
                        text-align: center;
                        color: $color-9;
                    }
                }
                .submit {
                    margin-top: 20px;
                    padding: 0 40px;
                    .submit-content {
                        height: 49px;
                        line-height: 49px;
                        text-align: center;
                        background-color: $color-primary;
                        font-size: 16px;
                        color: $color-white;
                        border-radius: 50px;
                    }
                    .spc {
                        background-color: #F5A623;
                    }
                }
            }
            .void {
                height: 10px;
                background-color: $color-assist-1;
            }
        }
    }
</style>

<template>
    <div class="wrapper">
        <div class="top">
            <div class="top-title">考试名称:</div>
            <div class="top-content">{{curExamObj.name}}</div>
        </div>
        <div class="bottom">
            <div class="select-class">
                <div class="title">
                    <div class="title-content">选择此次考试您需要录入成绩的班级里的所有学员</div>
                </div>
                <div class="submit">
                    <div class="submit-content" @click="jumpRoute(0)">选择班级</div>
                </div>
            </div>
            <div class="void"></div>
            <div class="select-class">
                <div class="title">
                    <div class="title-content">选择此次考试您需要录入成绩学员，并选择学员所在的班级</div>
                </div>
                <div class="submit">
                    <div class="submit-content spc" @click="jumpRoute(1)">选择学员</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                wxTitle: "成绩录入",
                curExamObj: app.ls.get('curExamObj')
            }
        },
        methods: {
            jumpRoute(num) {
                app.ls.set('type', num)
                if (num === 0) {
                    this.$router.push('/scoreSelectClass')
                }
                if (num === 1) {
                    this.$router.push('/scoreSelectStu')
                }
            }
        }
    }
</script>