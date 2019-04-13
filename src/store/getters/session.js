import util from '../../utils'

// import {checkMsgValid} from '../tool/tool.js'

export default {
	// 有效的最近会话列表
	validSessionList: (state, getters) => {
		let uid = state.userUID, 
			vtlm = getters.validTeamListMap

		return state.sessionlist.filter(sess => {

			if (sess.scene === 'p2p') {
				return sess.to !== uid ? true : false
			}

			if (sess.scene === 'team') {
				return vtlm[sess.to] ? true : false
			}
		})
	},
	// 有效会话的总未读数
	validUnreadSum: (state,getters) => {
		let num = 0;
		getters.validSessionList.forEach(s => num += s.unread)
		return num > 99 ? '99+' : num

	},
	// 最近会话列表; 取到了相关的用户名片，以及相关的群对象信息;
	latelySessionList: (state, getters) => {
		let sslits = getters.validSessionList.filter(item => {
			item.name = ''
			item.avatar = ''

			if (item.scene === 'p2p') {
				let	userInfo = state.userInfos[item.to]
				
				if (userInfo) {
					item.name = util.getFriendAlias(userInfo)
					item.avatar = userInfo.avatarThumb
				}
			}
			if (item.scene === 'team') {
				let team = getters.validTeamListMap[item.to];

				item.name = team.name
				item.avatar = team.avatarThumb

				// if (!checkMsgValid(item.lastMsg)) {
				// 	if (state.msgs[item.id]) {
				// 		item.lastMsg = state.msgs[item.id][state.msgs[item.id].length -1]
				// 	}
				// }
			}
			let lastMsg = item.lastMsg || {}
			if (lastMsg.type === 'text') {
				item.lastMsgShow = lastMsg.text || ''
			} else if (lastMsg.type === 'custom') {
				item.lastMsgShow = util.parseCustomMsg(lastMsg)
			} else if (lastMsg.type === 'tip' && lastMsg.tip === 'recall') {
				let nick = lastMsg.from === state.userUID ? '你' : `"${lastMsg.fromNick}" `
				item.lastMsgShow = `${nick}撤回了一条消息`
			} else if (util.mapMsgType(lastMsg)) {
				item.lastMsgShow = `[${util.mapMsgType(lastMsg)}]`
			} else {
				item.lastMsgShow = ''
			}
			if (item.updateTime) {
				item.updateTimeShow = util.formatDate(item.updateTime, true)
			}
			return item
		})
	 	return sslits;
	},
	curSession: state => {
		let s = {}, csi = state.currSessionId
		if (csi) {
			let sArr = csi.split('-')
			s.sessionId = csi
			s.scene = sArr[0]
			s.to = sArr[1]
		}
		return s
	}
}