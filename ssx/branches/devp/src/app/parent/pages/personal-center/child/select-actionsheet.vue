<!-- 个人信息-选择 -->
<style scoped lang="scss">
    
    

    .card {
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
</style>

<template>
    <action-sheet
            v-show="opened"
            @close="close"
            :position="position"
            :data="renderData">
        <!--公立学校-->
        <div v-if="type==0" class="card"
             :class="curSchoolId == item.id?'lighHeight':''"
             v-for="(item,index) in list"
             :key="index"
             @click="changeAction(item)">
            <span>{{item.value}}</span>
            <svg v-if="curSchoolId == item.id" class="icon" aria-hidden="true">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
        </div>
        <!--年级-->
        <div v-if="type==1" class="card"
             :class="(curGradeName == name.name)&&(curGradeId == name.id)?'lighHeight':''"
             v-for="(name,key) in list"
             :key="key"
             @click="changeAction(name,key)">
            <span>{{name.name}}</span>
            <svg v-if="(curGradeName == name.name)&&(curGradeId == name.id)" class="icon" aria-hidden="true">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
        </div>

    </action-sheet>
</template>

<script>
    import {opstudentinfoforwx} from 'parent/api/personal-center.js';

    export default {
        name: "select-actionsheet",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            type: {
                type: Number,
                default: 0
            },
            position: {
                default: 'bottom',
            },
            header: {
                type: Boolean,
                default: false
            },
            footer: {
                type: Boolean,
                default: false
            },
            list: {}
        
        },
        data() {
            return {
                curSchoolName: null,
                curSchoolId: null,
                curGradeName: null,
                curGradeId:null
            }
        },
        computed: {
            renderData() {
                return {
                    opened: this.opened
                }
            }
        },
        methods: {
            changeAction(card, key) {
                if (this.type == 0) {
                    this.curSchoolName = card.value;// 因为不是每次点击的时候都请求数据，所以这里要赋值
                    this.curSchoolId = card.id;// 因为不是每次点击的时候都请求数据，所以这里要赋值
                    opstudentinfoforwx({
                        'fullTimeschool':card.value
                    }).then(res => {
                        if (res.result.code == app.errok) {
                            this.$emit('informationCampu', card);
                            this.close();
                        } else {
                            app.toast('error', res.result.msg)
                        }
                    })

                } else if (this.type == 1) {
                    this.curGradeName = card.name;// 因为不是每次点击的时候都请求数据，所以这里要赋值
                    this.curGradeId = card.id;
                    opstudentinfoforwx({
                        grade: card.id
                    }).then(res => {
                        if (res.result.code == app.errok) {
                            this.$emit('informationCampu', card);
                            this.close();
                        } else {
                            app.toast('error', res.result.msg)
                        }
                    })

                }
            }
        }
    }
</script>