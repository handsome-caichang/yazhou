<style scoped lang="scss">
    
    

    .as-body {
        @include position-absolute;
        font-size: 15px;
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
        }
    }
</style>

<template>
    <action-sheet class="as-body" v-show="opened" @close="close" :data="classroomsData">
        <div :class="{active:item.ID||item.SubjectID==currentId}" class="item" @click="changeType(item)" v-for="item in subjectList">
            <div class="name">{{item.Value||item.SubjectName}}</div>
            <div v-show="item.ID||item.SubjectID==currentId">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gouxuan"></use>
                </svg>
            </div>
        </div>
    </action-sheet>
</template>

<script>
    
    

    export default {
        name: "newcourse-details-subject",
        mixins: [app.mixin.popupWindowRouteMixin],
        props: {
            opened: {},
            subjectList: {
                type: Array
            },
            subjectMsg: {}
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
                    subjectList: this.subjectList,
                    subjectMsg: this.subjectMsg
                }
            }
        },
        methods: {
            changeType(item) {
                if (this.currentId !== (item.ID||item.SubjectID)) {
                    this.currentId = item.ID||item.SubjectID;
                    this.$emit('newcourseDetailsSubjectItem', item);
                    this.close();
                }
            }
        },
        components: {
            
        },
        watch: {
            opened: function (newVal, oldVal) {
                if (newVal) {
                    this.currentId = this.subjectMsg.id;
                }
            }
        }
    }
</script>