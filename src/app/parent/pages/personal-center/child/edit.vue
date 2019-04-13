<!-- 个人信息-编辑 -->
<style scoped lang="scss">
    
    
    .edit-container {
        background-color: $color-assist-1;
        @include position-absolute(0,0,0,0);
        overflow: hidden;
        .address-area{
            margin-top: 9px;
            textarea{
                outline: none;
                resize: none;
                font-family: normal;
                padding: 10px;
                box-shadow: none;
                word-break: break-word;
            }
        }
        .edit-area {
            @include flex-between;
            margin: 9px auto;
            height: 49px;
            line-height: 49px;
            background-color: $color-white;
            .input-area {
                width: 100%;
                font-size: 16px;
                .content-text {
                    flex: 1;
                    height: 28px;
                    line-height: 28px;
                    width: 100%;
                }
            }
            .icon-area {
                width: 24px;
            }
        }
        .btn-area {
            width: 100%;
            position: absolute;
            bottom: 0;
            @include flex-base;
            div {
                flex: 1;
                font-size: 16px;
                height: 49px;
                line-height: 49px;
                text-align: center;
            }
            .cancel {
                background-color: $color-white;
                color: $color-6;
            }
            .complete {
                background-color: $color-primary;
                color: $color-white;
            }
        }
    }
    // 动画
    .as-edit-enter-active,
    .as-edit-leave-active {
        transition: all $duration $timing;
        transform: translate3d(0, 0, 0);
    }
    .as-edit-enter,
    .as-edit-leave-active {
        transition: all $duration $timing;
        transform: translate3d(100%, 0, 0);
    }
</style>

<template>
    <transition name="as-edit">
        <div class="edit-container" v-show="opened">
            <!--家庭住址 不要清空字符-->
            <div class="address-area" v-if="titleType==1">
                <textarea maxlength="84" v-model="text" name="" ref="focuEl" cols="30" rows="4"></textarea>
            </div>
            <div class="edit-area" v-else>
                <div class="input-area">
                    <input class="content-text" ref="focuEl" type="text" maxlength="50" v-model="text">
                </div>
                <div class="icon-area" @click="clearText">
                    <svg class="icon" aria-hidden="true" v-if="showClearIcon">
                        <use xlink:href="#icon-sousuowenzishanchu"></use>
                    </svg>
                </div>
            </div>
            <!--按钮-->
            <div class="btn-area">
                <div class="cancel" @click="editCancel">取消</div>
                <div class="complete" @click="complete">完成</div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {savePost} from "parent/api/common";
    
    export default {
        name: "edit",
        mixins: [app.mixin.popupWindowRouteMixin],
        data() {
            return {
                wxTitle: '',
                text: '',
                showClearIcon: false
            }
        },
        props: {
            opened: {},
            titleType: {
                type: Number,
                default: null
            },
            editText:{
                type:String,
                default:null
            }
        },
        methods: {
            //取消按钮
            editCancel() {
                this.close();
                this.clearText();
            },
            //确定按钮  保存成功之后再改变上个界面的值
            complete() {
                if(!app.tool.trim(this.text)){
                    app.toast('info','没有输入内容，请重新填写。')
                    return
                }
                let type = parseInt(this.titleType);
                savePost(type==0?{
                    saveFlag:"modifiedPersonalInfo",
                    QQ:this.text
                }:type==1?{
                    saveFlag:"modifiedPersonalInfo",
                    LivePlace:this.text
                }:{
                    saveFlag:"modifiedPersonalInfo",
                    ClassName:this.text
                }).then(res=>{
                    if (res.errcode == app.errok) {
                        app.toast('success','修改成功')
                        if (type == 0) {
                            this.$emit('informationQQ', this.text);
                        }else if(type == 1){
                            this.$emit('informationAddress', this.text);
                        }else{
                            this.$emit('informationClassName', this.text);
                        }
                        this.close();
                        this.clearText();
                    }else{
                        app.toast('error', res.errmsg)
                    }
                });

            },
            clearText() {
                this.text = '';
            }
        },
        watch: {
            text: function () {
                this.showClearIcon = this.text == '' ? false : true;
            },
            opened:function(newVal,oldVal){
                if(newVal){
                    this.text = this.editText;
                    if (this.titleType == 0) {
                        app.tool.setDocTitle('QQ号码')
                    } else if (this.titleType == 1){
                        app.tool.setDocTitle('家庭住址')
                    }else{
                        app.tool.setDocTitle('就读班级')
                    }
                    //不用nexttick是由于微信浏览器兼容问题
                    setTimeout(()=>{this.$refs.focuEl.focus();},501)
                }



            }

        }
    }
</script>