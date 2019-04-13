<style scoped lang="scss">
    
    

    .edit-school-container{
        @include position-absolute;
        z-index: 2;
        background-color: #EEF1F6;
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
                /*::-webkit-input-placeholder {*/
                    /*color: #BBBBBB;*/
                    /*font-size: 14px;*/
                /*}*/
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
    .as-edit-school-enter-active,
    .as-edit-school-leave-active {
        transition: all $duration $timing;
        transform: translate3d(0, 0, 0);
    }
    .as-edit-school-enter,
    .as-edit-school-leave-active {
        transition: all $duration $timing;
        transform: translate3d(100%, 0, 0);
    }
</style>

<template>
    <transition name="as-edit-school">
        <div class="edit-school-container" v-show="opened">

            <div class="edit-area">
                <div class="input-area">
                    <input class="content-text" placeholder="请输入学校名称" ref="inputEle" type="text" maxlength="50" v-model="schoolName">
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
        name: "edit-school",
        mixins: [app.mixin.popupWindowRouteMixin],
        data() {
            return {
                wxTitle: "",
                showClearIcon: false,
                schoolName:''
            }
        },
        props:{
            opened: {}
        },
        computed: {},
        methods: {
            //取消按钮
            editCancel() {
                this.close();
                this.clearText();
            },
            //确定按钮  保存成功之后再改变上个界面的值
            complete() {
                if(app.tool.trim(this.schoolName)==''){
                    app.toast('info','没有输入内容，请重新填写。')
                    return
                }
                savePost({
                    saveFlag: "modifiedPersonalInfo",
                    FullTimeSchool: this.schoolName
                }).then(res => {
                    if (res.errcode == app.errok) {
                        app.toast('success','修改成功')
                        this.$emit('publicSchool',{Value:this.schoolName});
                        this.close();
                    } else {
                        app.toast('error', res.errmsg)
                    }
                })
            },
            clearText() {
                this.schoolName = '';
                this.$refs.inputEle.focus();
            }
        },
        created() {
        },
        components: {},
        watch:{
            schoolName: function () {
                // 此处规则与PC端保持一致 禁止部分特殊字符
                let Regx = /[`#\$%&@\*<>\?:\"\{\}\/;'\[\\\]]/g;
                this.schoolName = this.schoolName.replace(Regx,'');
                this.showClearIcon = this.schoolName == '' ? false : true;
            },
            opened:function (newVal,oldVal) {
                if(newVal){
                    this.schoolName = app.ls.getStorage('personalInfomationPublicSchool');
                    //不用nexttick是由于微信浏览器兼容问题
                    setTimeout(()=>{this.$refs.inputEle.focus();},501)
                }
            }
        }
    }
</script>

