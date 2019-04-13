<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: 12px;
        color: $color-3;
        .heard {
            padding: 12px;
            background-color: $color-assist-1;
        }
        .container {
            padding: 12px;
            background-color: $color-white;
            font-size: 14px;
            .item {
                height: 40px;
                @include flex-between;
                border-bottom: 1px solid $color-assist-1;
                .item-name {
                    flex: 1;
                }
                .icon-wrapper {
                    width: 40px;
                    text-align: right;
                    .icon {
                        font-size: 16px;
                        color: $color-3;
                    }
                }
            }
        }
        .bottom {
            height: 49px;
            line-height: 49px;
            font-size: 15px;
            display: flex;
            .reset {
                flex: 1;
                color: $color-9;
                border-top:  1px solid $color-assist-1;
                text-align: center;
            }
            .sure {
                flex: 1;
                background-color: $color-primary;
                color: $color-white;
                text-align: center;
            }
        }
        
    }
</style>

<template>
    <action-sheet
        class="role-actionsheet"
        :position="'sideRight'"
        :data="list"
        v-show="opened" 
        @close="close">
        <div class="heard" slot="header" @click="close">
            <svg aria-hidden="true" class="icon">
                <use xlink:href="#icon-zuobianjiantou"></use>
            </svg>
            选择考试项目
        </div>
        <div class="container">
            <div class="item" v-for="item in list" @click="item.isSelect=!item.isSelect">
                <div class="item-name">{{item.Value}}</div>
                <div class="icon-wrapper">
                    <svg aria-hidden="true" class="icon">
                        <use :xlink:href="item.isSelect?'#icon-danxuan':'#icon-danxuan-weixuanze'"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="bottom" slot="footer">
            <div class="reset" @click="reset">重置</div>
            <div class="sure" @click="emitSelectEd">确定</div>
        </div>
    </action-sheet>
</template>

<script>
    
    
    import {getCommunicationMode} from 'teacher/api/customers'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            },
            examSubjectList: {
                type: Array
            }
        },
        data() {
            return {
                list: [],
            }
        },
        computed: {
           
        },
        methods: {
            reset() {
                this.list.forEach(obj => {
                    obj.isSelect = false
                })
            },
            emitSelectEd() {
                this.$emit('selectExam', this.list)
            }
        },
        created() {
           
        },
        watch: {
            opened(val) {
                this.list = app.tool.clone(this.examSubjectList)
            }
        },
        components: {
            
        }
    }
</script>