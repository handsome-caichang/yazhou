<style scoped lang="scss">
    
    

    .public-school-as{
        @include position-absolute;
        .item {
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            color: $color-3-s;
            @include ellipsis-single;
            @include flex-between;
            &.lighHeight {
                color: $color-primary;
            }
        }
    }

    .footer{
        @include flex-between;
        padding: 0 15px;
        height: 40px;
        color: $color-9;
        font-size: 12px;
        background-color: #F7F7F7;
        .btn{
            width: 63px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 24px;
            border: 1px solid #1A97F2;
            color: #1a97f2;
        }
    }
</style>

<template>
    <div v-show="opened">
        <action-sheet
                class="public-school-as"
                v-show="opened"
                :data="renderData"
                @close="close"
                :position="position">
            <div>
                <div class="item"
                     v-for="(item,index) in list"
                     :key="index"
                     @click="changeAction(item)">
                    <span>{{item.Value}}</span>
                    <svg v-if="current.id==item.ID" class="icon" aria-hidden="true">
                        <use xlink:href="#icon-danxuan"></use>
                    </svg>
                </div>
            </div>
            <div v-if="AllowParentInputSchool" class="footer" slot="footer">
                <div class="describe">没有覆盖到的公立学校，请手动填写。</div>
                <div class="btn" @click="openEditSchoolAS">手动填写</div>
            </div>
        </action-sheet>
        <edit-school
                class="edit-school"
                :opened.sync="openEditSchool"
                @publicSchool="publicSchool"
                >
        </edit-school>
    </div>
</template>

<script>
    // 列表为空的时候上个界面已经做了提示
    import {savePost} from "parent/api/common";
    import EditSchool from './edit-school.vue'
    export default {
        name: "public-school",
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened: {},
            position: {
                default: 'bottom',
            },
            canEdit:{
                default:true
            },
            list:{}
        },
        data() {
            return {
                wxTitle: "选择公立学校",
                current:{
                    id:''
                },
                openEditSchool:false,
                AllowParentInputSchool: true,//是否允许用户自由输入公立学校的名称：1允许（默认），0不允许。当设置为0时，用户只能从预先设置好的下拉列表中进行选择。
            }
        },
        computed: {
            renderData() {
                return {
                    opened: this.opened,
                    list:this.list
                }
            }
        },
        methods: {
            openEditSchoolAS(){
                this.openEditSchool = !this.openEditSchool;
            },
            changeAction(item){
                this.current.id = item.ID;
                savePost({
                    saveFlag: "modifiedPersonalInfo",
                    FullTimeSchool: item.Value
                }).then(res => {
                    if (res.errcode == app.errok) {
                        app.toast('success','修改成功')
                        this.$emit('informationSchool', item);
                        this.close();
                    } else {
                        app.toast('error', res.errmsg)
                    }
                })
            },
            publicSchool(item){
                this.$emit('informationSchool', item);
                this.current.id='';//编辑确定之后再进来不回显
                this.close();
            }
        },
        created() {
            // // 是否允许用户自由输入公立学校的名称：1允许(默认)，0不允许。当设置为0时，用户只能从预先设置好的列表中进行选择。
            this.AllowParentInputSchool = app.sysInfo.AllowParentInputSchool==1;//配置项
        },
        components: {
            EditSchool
        }
    }
</script>

