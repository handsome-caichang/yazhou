<style lang="scss" scoped>
    @import "../../../assets/scss/variable.scss";
    @import "../../../assets/scss/mixin.scss";
    .chat-notice {
        padding: 10px 18px;
        @include flex-center;
        .content {
            line-height: 20px;
            font-size: 12px;
            color: #999999;
            text-align: center;
        }
    }
</style>

<template>
    <div class="chat-notice">
        <component
            class="content"
            :is="map[rawMsg.type]"
            :msg="rawMsg">
        </component>
    </div>
</template>

<script>
import TimgTag from './child/chat-timetag.vue'
import ChatTip from './child/chat-tip.vue'
import ChatTeamNotice from './child/chat-team-notice.vue'

export default {
    name: 'chat-notice',
    props: {
        rawMsg: Object
    },
    data() {
        return {
            map: {
                'timeTag': TimgTag,
                'tip': ChatTip,
                'notification': ChatTeamNotice,
            }
        }
    },
}
</script>
