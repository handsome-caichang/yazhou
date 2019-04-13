<style lang="scss" scoped>
</style>

<template>
	<!-- 群通知消息 -->
    <div class="team-notice-msg">{{noticeText}}</div>
</template>

<script>
export default {
  	name: 'chat-team-notice',
  	props: {
  		msg: Object
  	},
    computed: {
        noticeText() {
            let msg = this.msg,
                attach = msg.attach,
                type = attach.type,
                from = msg.from,
                teamId = msg.to,
                timetag = msg.time,
                team = attach.team,
                account = attach.account,
                accounts = attach.accounts,
                users = attach.users;

            let usersMap = {}, nicks, text = '群通知消息';

            if (users) {
                users.forEach(user => {
                    usersMap[user.account] = user;
                })
            }
            
            if (accounts) {
                nicks = accounts.map(account => {
                    return `${usersMap[account].nick}`
                })
            }

            switch (type) {
                // 更新群
                case 'updateTeam':
                    text = `${usersMap[from].nick} 更新了群信息。`
                    break;
                // 拉人入群
                case 'addTeamMembers':
                    text = `${usersMap[from].nick} 邀请了 ${nicks.join('、')} 加入群聊。`
                    break;
                // 踢人出群
                case 'removeTeamMembers':
                    // text = `${usersMap[from].nick} 将 ${nicks.join('、')} 移出群聊。`
                    text = `${usersMap[from].nick} 更新了群信息。`
                    break;
                // 接受入群邀请
                case 'acceptTeamInvite':
                    text = '接受入群邀请'
                    break;
                // 通过入群申请
                case 'passTeamApply':
                    text = '通过入群申请'
                    break;
                // 添加群管理员
                case 'addTeamManagers':
                    text = '添加群管理员'
                    break;
                // 移除群管理员
                case 'removeTeamManagers':
                    text = '移除群管理员'
                    break;
                // 主动退群
                case 'leaveTeam':
                    text = '主动退群'
                    break;
                // 解散群
                case 'dismissTeam':
                    text = '解散群'
                    break;
                // 转让群
                case 'transferTeam':
                    text = `${usersMap[from].nick} 将群转让给 ${usersMap[account].nick}。`
                    break;
                // 更新群成员禁言状态
                case 'updateTeamMute':
                    text = '更新群成员禁言状态'
                    break;
            }
            return text
        }
    },
}
</script>

