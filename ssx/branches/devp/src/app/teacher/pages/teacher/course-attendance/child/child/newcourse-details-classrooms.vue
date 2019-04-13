<style scoped lang="scss">
    
    

    .as-body {
        @include position-absolute;
        font-size: 15px;
        .header{
            color: #999;
            font-size: 15px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            @include border-bottom;
        }
        .item {
            @include flex-between;
            @include border-bottom;
            height: 44px;
            line-height: 44px;
            padding: 0 12px;
            &.active {
                color: $color-primary;
            }
            .name {
                max-width: 90%;
                @include ellipsis-single;
            }
            &:nth-last-child{
                border-bottom: 0;
            }
        }
    }
</style>

<template>
    <action-sheet class="as-body" v-show="opened" @close="close" :data="classroomsData">
        <div class="header" slot="header">选择上课教室</div>
        <div :class="{active:item.ID==currentId}" class="item" @click="changeType(item)" v-for="item in classroomList">
            <div class="name">{{item.Name}}</div>
            <div v-show="item.ID==currentId">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    

    export default {
        name: "newcourse-details-classrooms",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            classroomList: {
                type: Array
            },
            classroomMsg: {}
        },
        data() {
            return {
                currentId: ''//当前id。用于回显。
            }
        },
        computed: {
            classroomsData() {
                return {
                    opened: this.opened,
                    classroomList: this.classroomList,
                    classroomMsg: this.classroomMsg
                }
            }
        },
        methods: {
            changeType(item) {
                if (this.currentId !== item.ID) {
                    this.currentId = item.ID;
                    this.$emit('newcourseDetailsClassroomsItem', item);
                    this.close()
                }
            }
        },
        components: {
            
        },
        watch: {
            opened: function (newVal, oldVal) {
                if (newVal) {
                    this.currentId = this.classroomMsg.id;
                }
            }
        }
    }
</script>

