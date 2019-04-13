<style scoped lang="scss">
    
    
    .role-actionsheet {
        @include position-absolute;
        font-size: 12px;
        color: $color-3;
        .heard {
            .header-top {
                height: 40px;
                padding: 12px;
                background-color: $color-assist-1;
            }
            .header-bottom {
                padding: 12px;
                .input {
                    height: 40px;
                    width: 100%;
                    border: 1px solid $color-assist-1;
                    padding: 10px;
                }
            }
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
        v-if="opened"
        :position="'sideRight'"
        :data="list"
        :scrollerConfig="scrollerConfig"
        ref="acSheet"
        @loadData="loadData" 
        @close="close">
        <div class="heard" slot="header">
            <div class="header-top" @click="close">
                <svg aria-hidden="true" class="icon">
                    <use xlink:href="#icon-zuobianjiantou"></use>
                </svg>
                选择班级
            </div>
            <div class="header-bottom">
                <input class="input" placeholder="请输入名称" v-model="classText">
            </div>
        </div>
        <div class="container">
            <div class="item" v-for="item in list" @click="selectClass(item)">
                <div class="item-name">{{item.Name}}</div>
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
    
    import {getClassName} from 'teacher/api/score'
    export default {
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean
            },
            campusObj: {
                type: Object,
                default: () => {}
            },
            classObj: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                list: [],
                scrollerConfig: {
                    tag: 'super',
                    type: 2,
                    pagingOption: {
                        autoLoadFirst: true,
                        params: {
                            campus: this.campusObj && this.campusObj.id
                        },
                        api: getClassName
                    }
                },
                classText: ''
            }
        },
        methods: {
            reset() {
                this.classText = ''
                this.list.forEach(obj => obj.isSelect = false)
                this.$refs.acSheet.$refs.scroller.refresh({query: this.classText})
            },
            selectClass(obj) {
                this.list.forEach(item => {
                    if (obj.ID === item.ID) {
                        item.isSelect = !obj.isSelect
                    } else {
                        item.isSelect = false
                    }
                })
            },
            emitSelectEd() {
                let obj = {}
                for (let i = 0, len = this.list.length; i < len; i++) {
                    if (this.list[i].isSelect) {
                        obj.ID = this.list[i].ID
                        obj.Name = this.list[i].Name
                        break
                    }
                }
                this.$emit('selectClassDone', obj)
            },
            loadData(ajaxPromise) {
                ajaxPromise.then(res => {
                    if (res.ErrorCode == app.errok) {
                        if (res.PageIndex === 1) {
                            this.list = []
                        }
                        this.list = this.list.concat(res.Data)
                        this.list.forEach(obj => {
                            if (obj.ID === this.classObj.ID) {
                                this.$set(obj, 'isSelect', true)
                            } else {
                                this.$set(obj, 'isSelect', false)
                            }
                        })
                    }
                })
            }
        },
        watch: {
            classText(val) {
                this.$refs.acSheet.$refs.scroller.refresh({query: this.classText})
            }
        }
    }
</script>