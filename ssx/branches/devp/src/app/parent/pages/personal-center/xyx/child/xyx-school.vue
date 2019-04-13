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
        </action-sheet>

    </div>
</template>

<script>
    // 列表为空的时候上个界面已经做了提示
    export default {
        name: "xyx-school",
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
                this.$emit('informationSchool', item.Value);
                this.close();
            },
        }
    }
</script>

