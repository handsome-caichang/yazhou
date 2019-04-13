<template>
    <div class="help-popup" v-show="visible" :style="{top:y + 'px'}" ref="help">
        <div class="triangle up" :style="{left:x + 'px'}" v-if="direction === 'up'"></div>
        <div v-html="summary[type]" class="content" :class="[direction]" ref="helpContent"></div>
        <div class="triangle down" :style="{left:x + 'px'}" v-if="direction === 'down'"></div>
    </div>
</template>

<script>
    const summary = {
        0:"定义：可操作校区每个班级满班率汇总的平均值；<br/>公式：满班率=入班学生人数/预招人数*100%；班级是该校区下未结业并且预招人数大 于1的班级（去除试听班和补课班）；",
        1:"定义：可操作校区每个班级出勤率汇总的平均值；<br/>公式：出勤率=已出勤人数/应出勤人数*100%；已出勤学生人数是指该班级上课记录中的已出勤人数，应出勤人数是指该校区下未结业班级的上课记录中的总人数（去除试听班和补课班）；",
        2:"定义：可操作校区每个班级续费率汇总的平均值；<br/>公式：续费率=已续费人数/应续费人数*100%；已续费人数是指正常续费的学员与提前续费的学员人数之和，应续费人数是指课程单笔交费收据剩余数量是为0的学员。",
        3:"定义：可操作校区的意向客户到访率汇总的平均值；<br/>公式：到访率=到访人数/邀约人数*100%；到访人数是指邀约后实际到访的人数，邀约人数是指邀约意向客户承诺到访的人数；",
        4:"定义：可操作校区的意向客户转化率汇总的平均值；<br/>公式：转化率=转化人数/已跟进人数*100%；转化人数是指转化成功的意向客户数，已跟进人数是指已经跟意向客户跟进沟通人数；",
        5:"运营日报生成规则：每晚定时保存当天学校运营数据，对于之后时间修改当天的情况，不会影响当天的运营日报。"
    }

    export default {
        name: "help-popup",
        data(){
            return {
                summary,    
                type:0, //显示说明文字
                y:0,    //浮窗top值
                x:0,    //浮窗left值
                visible:false,
                direction:'up',     //箭头向上
            }
        },
        methods:{
            show(type,x,y,direction='up'){
                if (this.visible && this.type == type){
                    this.visible = false;
                } else{
                    this.type = type;
                    this.visible = true;
                    this.direction = direction;
                    if (this.direction === 'up'){
                        this.y = y + 18;
                    } else {
                        this.$nextTick(()=>{
                            let h = this.$refs.help.offsetHeight;
                            this.y = y -  h;
                        })                       
                    }
                    this.x = x;
                    //在首页标题上新增了一个，需要对齐。
                    if (this.type == 5){
                        this.x = this.x + 40;
                        this.y = this.y + 5;
                    }
                }
            }
        },
        mounted(){
            let that = this,
            parent = this.$refs.help.parentElement;
            parent.addEventListener("click",event=>{
                if (that.visible && (event.target != that.$refs.helpContent)){
                    that.visible = false;
                    event.stopPropagation();
                }
            });
        },
    }
</script>

<style scoped lang="scss">

    .help-popup{
        width:100%;
        z-index:6;
        max-width:calc(100% - 60px);
        position: absolute;
        left: 0;
        right: 0;
        margin:0 auto;
        top:30px;
        .triangle.up{
            @include triangle(14px,rgba(46, 46, 46, .9));
            top:0;        
        }
        .triangle.down{
            @include triangle(14px,rgba(46, 46, 46, .9),rgba(46, 46, 46, .9),down);
            bottom:0;    
      
        }
        >div.content{
            background:rgba(46, 46, 46, .9);            
            padding:15px;
            font-size:13px;
            line-height: 26px;
            color:#fff;
            border-radius: 6px;
            z-index:6;
            &.up{
                margin-top:7px
            }
            &.down{
                top:-7px;
                position:relative;
            }
        }
    }

</style>