<!-- 新开班补课冲突 -->
<style scoped lang="scss">
    
    

    .as-body {
        font-size: 15px;
        .box {
            .center {
                padding: 16px;
                .title{
                    text-align: center;
                    padding-bottom: 12px;
                }
                .item {
                    display: flex;
                    padding: 8px 0;
                    .key{
                        color: $color-6;
                    }
                    .describe {
                        flex: 1;
                        color: $color-3;
                    }
                }
            }
            .got-it {
                width: 100%;
                height: 44px;
                line-height: 44px;
                margin: 0 auto;
                text-align: center;
                background-color: $color-primary;
                color: $color-white;
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
            <div class="center">

                <div class="title">检测到冲突</div>

                <div class="item">
                    <div class="key">时间：</div>
                    <div class="describe">{{formartTime}}</div>
                </div>
                <div class="item">
                    <div class="key">老师：</div>
                    <div class="describe">{{conflictObj.Teacher}}</div>
                </div>
                <div class="item">
                    <div class="key">班级：</div>
                    <div class="describe">{{conflictObj.ClassName}}</div>
                </div>
                <div class="item">
                    <div class="key">教室：</div>
                    <div class="describe">{{conflictObj.Classroom}}</div>
                </div>
            </div>
            <div class="got-it" @click="gotIt">关闭</div>
        </div>
    </action-sheet>
</template>

<script>
    
    

    export default {
        name: "conflict-filter",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            conflictObj: {}
        },
        data() {
            return {
                position: 'center'
            }
        },
        computed: {
            tipsData() {
                return {
                    opened: this.opened,
                }
            },
            formartTime() {
                //StartTime:"2018-03-21T09:00:00"
                //EndTime:"2018-03-21T11:00:00"
                if(!app.tool.isEmptyObject(this.conflictObj)){
                    let dArr = this.conflictObj.StartTime.split('T')[0].split('-'),
                        tArr1 = this.conflictObj.StartTime.split('T')[1].split(':'),
                        tArr2 = this.conflictObj.EndTime.split('T')[1].split(':');
                    return dArr[1]+'-'+dArr[2]+' '+tArr1[0]+':'+tArr1[1]+'~'+tArr2[0]+':'+tArr2[1]
                }

            }
        },
        methods: {
            gotIt() {
                this.close()
            }
        },
        components: {
            
        }
    }
</script>