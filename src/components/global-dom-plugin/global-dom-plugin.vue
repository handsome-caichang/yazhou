<style lang="scss" scoped>
    @import '../../assets/scss/variable.scss';
    @import '../../assets/scss/mixin.scss';

    .global-dom-plugin {
        .record-status-tip {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
        }
        .net-status-tip {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }

        .update-tip {
            @include position-absolute;
            z-index: 200;
        }
        
        .loading {
            @include position-absolute;
            z-index: 1000;
        }
    }
</style>

<template>
    <div class="global-dom-plugin">
        <!-- 录音状态指示 -->
        <record-status class="record-status-tip" />

        <net-status class="net-status-tip" />

        <!-- <update-tip class="update-tip" /> -->

        <loading class="loading" :isDefault="false" :bgType="1" v-if="!imSync" />
    </div>
</template>

<script>
import RecordStatus from './record-status/record-status.vue'
import NetStatus from './net-status/net-status.vue'
// import UpdateTip from './update-tip/update-tip.vue'



export default {
    name: 'global-dom-plugin',
    data () {
        return {

        }
    },
    computed: {
        ...Vuex.mapState(['imSync', 'version']),
        ...Vuex.mapGetters(['curSession']),
    },
    methods: {
        abc(e, team) {
            let type = e.type,
                tip = '',
                tid = team.teamId,
                tname = team.name,
                routeIsTeamDetail = this.$route.name === 'teamDetail' && this.$route.params.teamId === tid

            if (this.curSession.to === tid || routeIsTeamDetail) {
                this.$router.back()
                setTimeout(() => {

                    if (type === 'kick-team') {
                        tip = `您已被移出 "${tname}" 群`
                    } else if (type === 'dismiss-team') {
                        tip = `群 "${tname}" 已解散`
                    } else if (type === 'close-team') {
                        tip = `群 "${tname}" 已关闭`
                    }

                    app.alert(tip)
                }, 800)
            }
        }
    },
    created() {
        // 监听被踢出群的自定义事件
        app.event.on('kick-team', (e, team) => this.abc(e, team))
        app.event.on('dismiss-team', (e, team) => this.abc(e, team))
        app.event.on('close-team', (e, team) => this.abc(e, team))
    },
    components: {
        RecordStatus,
        NetStatus,
        // UpdateTip
    },
}
</script>

