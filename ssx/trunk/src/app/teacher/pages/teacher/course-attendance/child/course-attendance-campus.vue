<!-- 快速排课-选择校区 -->
<style scoped lang="scss">
    
    
    .header{
        color: #999;
        font-size: 15px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        @include border-bottom;
    }
    .card{
        height: 44px;
        line-height: 44px;
        padding: 0 12px;
        color: $color-3-s;
        @include ellipsis-single;
        @include flex-between;
        &.lighHeight{
            color: $color-primary;
        }
    }
</style>

<template>
    <action-sheet
            v-show="opened"
            @close="close"
            :position="position"
            :data="campusData">
            <div class="header" slot="header">选择{{app.sysInfo.title_campus}}</div>
        <div class="card"
             :class="curCampuId == campus.id?'lighHeight':''"
             v-for="campus in campusList"
             @click="changeCampus(campus)">
            <span>{{campus.name}}</span>
            <svg v-if="curCampuId == campus.id" class="icon" aria-hidden="true">
                <use xlink:href="#icon-danxuan"></use>
            </svg>
        </div>
    </action-sheet>
</template>

<script>
    export default {
        name: 'course-attendance-campus',
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
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
            campusList:{}
        },
        data() {
            return {
                curCampuId:null
            }
        },
        computed: {
            campusData() {
                return {
                    opened: this.opened
                }
            }
        },
        methods: {
            changeCampus(card){
                this.curCampuId = card.id;
                this.$emit('courseAttendanceCampus',card);
                this.close();
            }
        }
    }
</script>