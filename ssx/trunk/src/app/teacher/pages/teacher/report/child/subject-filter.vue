<!-- 科目选择 -->
<style scoped lang="scss">
    .as-actionsheet {
        @include position-absolute(0, 0, 0, 0);
        font-size: 15px;

    }
    .actionsheet-item {
        padding: 0 15px;
        height: 44px;
        line-height: 44px;
        @include ellipsis-single;
        @include border-bottom(#E1F1F6);
        svg {
            font-size: 18px;
            margin-right: 10px;
        }
    }
    .as-footer {
        padding: 0 12px;
        height: 49px;
        line-height: 49px;
        border-top: 1px solid rgba(235,235,235,1);
        @include flex-between;
        svg {
            font-size: 18px;
            margin-right: 12px;
        }
        .btn {
            width: 92px;
            height: 28px;
            line-height: 28px;
            background-color: #1E88F5;
            color: $color-white;
            border-radius: 50px;
            font-size: 15px;
            text-align: center;
        }
    }
</style>

<template>
    <action-sheet
        class="as-actionsheet"
        v-show="opened"
        @close="close">
        <div class="actionsheet-item" v-for="(item,index) in subjectArr" @click="select(item)">
            <svg class="icon icon-duoxuan" aria-hidden="true">
                <use :xlink:href="item.checked==true?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
            </svg>{{item.name}}
        </div>
        <div class="as-footer" slot="footer">
            <div @click="selectAll">
                <svg class="icon icon-duoxuan" aria-hidden="true">
                    <use :xlink:href="counter==subjectArr.length?'#icon-duoxuan':'#icon-duoxuan-weixuanze'"></use>
                </svg>全选
            </div>
            <div class="btn" @click="confirm">确定({{counter}})</div>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: 'subjectFilter',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                subjectArr: [{id:'111',name:'语文'},{id:'222',name:'英语'},{id:'333',name:'数学'},{id:'444',name:'音乐'}]
            }
        },
        computed: {
            counter() {
                var len = 0;
                this.subjectArr.forEach(subject => {
                    if(subject.checked) {
                        len++;
                    }
                });
                return len;
            }
        },
        methods: {
            select(obj) {
                if(typeof obj.checked == 'undefined') {
                    this.$set(obj, 'checked', true);
                }else {
                    obj.checked = !obj.checked;
                }
            },
            selectAll() {
                if(this.counter==this.subjectArr.length) {
                    this.subjectArr.forEach(subject => {
                        this.$set(subject, 'checked', false);
                    });
                }else {
                    this.subjectArr.forEach(subject => {
                        if(typeof subject.checked == 'undefined') {
                            this.$set(subject, 'checked', true);
                        }else {
                            subject.checked = true;
                        }
                    });
                }
            },
            confirm() {
                this.close();
            }
        }
    }
</script>