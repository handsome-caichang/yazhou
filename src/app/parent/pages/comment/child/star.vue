<style scoped lang="scss">
    
    
    .comment-star{
        display: flex;
        /*align-items: center;*/
        flex-direction: column;
        // padding: 10px 0;
        margin-bottom: 12px;
        .comment-star-hd{
            display: flex;
            align-items: center;
        }
        .comment-star-bd{
            margin-right: 15px;
            margin-top: 9px;
            padding: 10px;
            background-color: #F2F2F2;
            word-break: break-word;
        }
        .star-name{
            flex: 1;
            // width: 150px;
            break-word: word-break;
        }
        .star-content{
            /*width: 150px;*/
            text-align: right;
            position: relative;
        }
        .star{
            font-size: 18px;
            padding: 0 6px;
            /*padding-left: 12px;*/
        }
        .star-more{
            padding-right: 15px;
            margin-left: 10px;
            width: 28px;
            height: 22px;
            line-height: 22px;
            text-align: right;
        }
        .star-tips-wrapper{
            position: absolute;
            top: 22px;
            max-width: 160px;
            left: 50%;
        }
        .star-tips{
            position: relative;
            font-size: 12px;
            width: 50px;
            text-align: center;
            /*line-height: 14px;*/
            border-radius: 2px;
            color: #F5A400;
            border: 1px solid #F5A400;
            background-color: #FFFFFF;
            white-space: normal;
            padding: 1px 5px;
            z-index: 2;
            transform: translateX(-50%);

        }
        .star-tips:before{
            content: '';
            position: absolute;
            top: -4px;
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #F5A400;
            left: 50%;
            transform: translateX(-4px);
        }
        .star-tips:after{
            content: '';
            position: absolute;
            top: -3px;
            width: 0;
            height: 0;
            border-left: 3px solid transparent; 
            border-right: 3px solid transparent;
            border-bottom: 3px solid #fff;
            left: 50%;
            transform: translateX(-3px);
        }
        
    }
</style>

<template>
    <div class="comment-star">
        <div class="comment-star-hd">
            <div class="star-name" v-if="title">{{title}}</div>
            <div class="star-content" v-for="(star,index) in starsDesc" v-if="isClick">
                <svg aria-hidden="true" 
                    class="icon star" 
                    @click="selectStar(star,index)">
                    <use :xlink:href="scope>=index?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                </svg>
                <div class="star-tips-wrapper" v-if="showTagsArr[index]&&star.Describe">
                    <div class="star-tips" ref="starTips">
                    {{star.Describe}}
                    </div>
                </div>
            </div>
            <div class="star-content" v-for="(star,index) in starsDesc" v-if="!isClick">
                <svg aria-hidden="true" 
                    class="icon star" 
                    @click="selectStar(star,index)">
                    <use :xlink:href="scope>index?'#icon-xingxingxuanzhong':'#icon-xingxingweixuanzhong'"></use>
                </svg>
                <div class="star-tips-wrapper" v-if="showTagsArr[index]&&star.Describe">
                    <div class="star-tips" ref="starTips">
                    {{star.Describe}}
                    </div>
                </div>
            </div>
            <div class="star-more" @click="pullDown">
                <svg class="icon" aria-hidden="true" v-if="desc">
                    <use :xlink:href="isShowShangla?'#icon-shangla':'#icon-xiala'"></use>
                </svg>
            </div>
        </div>
        <div class="comment-star-bd" v-if="isShowShangla">
            {{desc}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            /*starsArray: {
                type: Array,
                default: []
            },*/
            starsDesc: {
                type: Array
            },
            isClick: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            desc: {
                type: String
            },
            groupIndex: { //我是第几排星星
                type: Number,
                default: 0
            },
            selectedStarsNum: {
                type: Number,
                default: -1
            },
            isFinished: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                showTagsArr:[],
                starsArr: [],
                scope: -1,
                isShowShangla: false
            }
        },
        computed: {

        },
        methods: {
            computedScope(index) {
                  
            },
            selectStar(star, index) {
                //如果该班级已经结业，那么不应该能够继续点评，但是通过推送消息可以进入。
                //某一条维度打星了之后支持可以取消此条维度的打星交互。
                let num
                if (!this.isClick) return
                if (this.isFinished === 1) {
                    app.toast('info', '该班级已经结业，不能继续评价。')
                    return
                }
                for (let i = 0; i < this.showTagsArr.length; i++) {
                    this.showTagsArr[i] = false
                }
                if (index == this.scope) {
                    this.scope = index - 1
                    num = index
                } else {
                    this.scope = index
                    num = index + 1
                    this.showTagsArr.splice(index, 1, true)
                }
                setTimeout(() => {
                    this.showTagsArr.splice(index, 1, false)
                }, 1500)
                let obj = {
                    scope: num, //得分
                    scopIndex: this.groupIndex, //是第几组星星
                    settingID: this.settingID //改组星星id
                }
                this.$emit('selectStar', obj)
            },
            pullDown() {
                if (!this.desc) return
                this.isShowShangla = !this.isShowShangla
                this.$emit('addScrollNum')
            }
        },
        mounted() {
            this.starsDesc.forEach(item => {
                this.showTagsArr.push(false)
            })
            this.starsDescClone = app.tool.clone(this.starsDesc)
            this.scope = this.selectedStarsNum
        },
        watch: {
            // selectedStarsNum(newVal, oldVal) {
            // },
            // starIndex(val) {
            // }
        }
    }
</script>