<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        // font-size: $fs-normal-x;
        z-index: 10;
        .actionsheet-hd {
            @include flex-center;
            height: 50px;
            color: $color-9;
            .spec {
                color: $color-3;
            }
        }
        .selectTwo {
            background-color: #f0f0f0;
        }
        .selectOne-heard {
            margin-top: 15px;
            text-align: center;
            font-size: 14px;
        }
        .wrapper {
            .title {
                margin-top: 18px;
                font-size: 15px;
                text-align: center;
            }
            .selectCampus {
               margin-top: 18px;
               color: $color-primary;
               font-size: 15px;
               text-align: center;
            }
            .actionsheet-item {
                padding: 15px;
                color: $color-3;
                word-break: break-word;
                @include flex-between;
                &:not(:last-child){
                    @include border-bottom;
                }
                &.active {
                    color: $color-primary;
                }
            }
        }
        
        .footer {
            margin-top: 64px;
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
            .footer-item {
                width: 90px;
                height: 28px;
                line-height: 28px;
                border-radius: 14px;
                border: 1px solid $color-9;
                text-align: center;
                &:not(:last-child){
                    margin-right: 20px;
                }
            }
            .spec {
                color: $color-white;
                background-color: $color-primary;
                border: 1px solid $color-primary;
            }
        }
        .container {
            // padding: 12px;
            background-color: $color-white;
            .item {
                border-bottom: 1px solid $color-assist-1;
                padding: 15px;
                color: $color-3;
                word-break: break-word;
                @include flex-between;
                &:not(:last-child){
                    @include border-bottom;
                }
                &.active {
                    color: $color-primary;
                }
                
            }
            
        }
        
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="position"
        :scrollerConfig="scrollerConfig"
        :data="list" 
        v-show="opened" 
        @close="close">

        
        <div slot="header" class="selectOne-heard" v-if="selectOne">
            <div class="points">提示</div>
        </div>
        <div class="wrapper" v-if="selectOne">
            <div>
                <div class="title">转为正式学员(自动导入客户资料)</div>
                <div class="selectCampus" @click="changeContent">
                    {{campusObj.Value&&campusObj.Value.Name?campusObj.Value.Name:'选择目标校区'}}
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                
            </div>
        </div>
        <div slot="footer" class="footer" v-if="selectOne">
            <div class="footer-item" @click="close">取消</div>
            <div class="footer-item spec" @click="sureSelect">确定</div>
        </div>

        <div slot="header" class="actionsheet-hd selectTwo" v-if="selectTwo">校区选择</div>
        <div class="container" v-if="selectTwo">
           <div v-for="item in list" class="item" @click="selectCampus(item)" :class="{'active':item.Key===campusObj.Key}">
                {{item.Value.Name}}
           </div>
        </div>
    </action-sheet>
</template>

<script>
    import {getCommunicationMode} from 'teacher/api/customers';

    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            campusObj: {
                type: Object
            }
        },
        computed: {
            ...Vuex.mapState(['customConfigInfo']),
            position() {
                return this.selectOne ? 'center' : 'sideRight'
            }
        },
        data() {
            return {
                list: [],
                scrollerConfig:{
                    tag: 'base'
                },
                selectOne: false,
                selectTwo: false,
            }
        },
        methods: {
            selectCampus(obj) {
                obj.isSelect = !obj.isSelect
                this.$emit('selectCampus', obj)
                this.selectOne = true
                this.selectTwo = false
            },
            changeContent() {
                this.selectOne = false
                this.selectTwo = true
            },
            sureSelect() {
                if (!this.campusObj.Key) {
                    app.toast('info', '请选择校区。')
                    return 
                } 
                this.$emit('selectCampusOver')
                this.close()
            }
        },
        watch: {
            opened(val) {
                if (val) {
                    this.selectOne = true
                    this.selectTwo = false
                }
            },
            selectTwo(val) {
                if (val) {
                    this.list = app.customConfigInfo.CampusList       
                } else {
                    this.list = []
                }
            }
        }
    }
</script>