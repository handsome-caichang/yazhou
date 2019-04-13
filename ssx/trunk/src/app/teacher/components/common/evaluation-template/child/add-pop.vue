<!-- 筛选状态（上课点评列表） -->
<style scoped lang="scss">
    
    .as-body{
        font-size: 15px;
        border-radius: 13px;
        .title{
            height: 45px;
            line-height: 45px;
            background-color: $color-primary;
            color: $color-white;
            text-align: center;
            font-size: 16px;
            margin-bottom: 30px;
            &.large{
                margin-bottom:50px;
            }
        }
        .content{
            padding: 0 15px;
            .type-name{
                font-size: 15px;
                color:$color-3;
                margin-bottom: 10px;
            }
            .form-area{
                margin-bottom: 20px;
                color: $color-3;
                .input-text{
                    height: 44px;
                    border: 1px solid $color-border;
                    border-radius: 4px;
                }
            }
            .remark-text{
                border: 1px solid $color-border;
                border-radius: 4px;
                padding: 12px;
                word-break: break-word;
                user-select: text;
                font-family: inherit;
                height: 160px;
                box-shadow: none;
                margin-top: 0px;
                resize: none;
            }
        }
        .footer{
            // height: 48px;
            // line-height: 48px;
            display: flex;
            justify-content: flex-end;
            padding: 15px 15px;
            &.large{
                margin-top: 20px;
            }
            .btn{
                width: 93px;
                height: 28px;
                line-height: 28px;
                border: 1px solid transparent;
                border-radius: 27px;
                text-align: center;
                margin-left: 15px;
            }
            .cancel{
                border: 1px solid #1E88F5;
                color: #1E88F5;
            }
            .submit{
                background-color: #1E88F5;
                color: #FFF;
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
        :data="renderData">
        <div slot="header" class="title" :class="{'large':popType==1}">
            {{popType==1?'新增模板类别':'新增评语'}}    
        </div>   
        <div class="content">
            <div class="type-name">
                {{popType==1?'类别名称':'评语名称'}}
            </div>
            <div class="form-area">
                <input class="input-text" type="text" :placeholder="popType==1?'请输入类别名称':'请输入评语名称'" v-model="nameModel">
            </div>
            <div class="type-name" v-if="popType!==1">
               评语内容
            </div>
            <div class="form-area" v-if="popType!==1">
                <textarea
                        class="remark-text"
                        maxlength="500"
                        v-model="commentModel"
                        placeholder="请输入评语内容（500字以内）"
                        @touchstart="app.area.start($event)"
                        @touchmove="app.area.move($event)"
                        @touchend="app.area.end($event)">
                </textarea>
            </div>
        </div>
        <div class="footer" slot="footer" :class="{'large':popType==1}">
            <div class="cancel btn" @click="close">取消</div>
            <div class="submit btn" @click="submit">确定</div>
        </div>
    </action-sheet>
</template>

<script>
    
    export default {
        name: "add-pop",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            popType:{
                type:Number,
                default: 1
            },
            paraData:{
                type:Object,
            }
        },
        data() {
            return {
                position:'center',
                nameModel:'',
                commentModel:''
            }
        },
        computed: {
            renderData() {
                return {
                    opened: this.opened,
                    paraData:this.paraData
                }
            }
        },
        methods: {
            submit(){
            }
        },
        components: {
            
        },
        watch:{
            opened(newVal,oldVal){
                if(newVal){
                    this.nameModel = this.paraData.name;
                    this.commentModel = this.popType==2 && this.paraData.remark;
                }
                
            }
        }
    }
</script>