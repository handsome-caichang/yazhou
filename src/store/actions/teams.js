/*
 * 群组
 */
import store from '../'
import config from '../../configs'
import {getUsers} from './search.js'


// 如果会话对象不是好友，需要更新好友名片
function updateTeamMembersAccount (members) {
    let accountsNeedSearch = []
    members.forEach(item => {
        // 如果不存在缓存资料
        if (!store.state.userInfos[item.account]) {
            accountsNeedSearch.push(item.account)
        }
    })

    accountsNeedSearch.length > 0 && getUsers(accountsNeedSearch)
}

export function formatTeamInfo(obj) {
	const nim = store.state.nim

	let avatarThumb = '',
		customObj = null,
		avatar = obj.avatar || config.defaultTeamIcon;

	let custom = obj.custom || ''
	try {
		customObj = JSON.parse(custom)
	} catch (e) {
		customObj = {
			data: custom
		}
	}

	avatarThumb = nim.viewImageSync({
		url: avatar, // 必填
		thumbnail: { // 生成缩略图， 可选填
			width: 60,
			height: 60,
			mode: 'cover'
		}
	})

	let result = Object.assign(obj, {
		avatar,
		avatarThumb,
		customObj,
	})

	return result
}

// 同步群列表的回调, 会传入群数组
export function onTeams(teams) {
	// console.log('同步群列表...',teams);

	updateTeamList(teams)

	// teams.forEach(team => {
	// 	getTeamMembers(team)
	// })
}

export function updateTeamList(teams) {
	teams = teams.map(team => {
		return formatTeamInfo(team)
	})
	store.commit('updateTeamList', teams)
}

// 获取群成员, 会传入群成员数组
export function getTeamMembers(team) {
	nim.getTeamMembers({
	    teamId: team.teamId,
	    done: (error, teamMapMembers) => {
	    	console.log("获取群成员...", teamMapMembers);
	    	if (!error) {
	    		// 获取用户名片
	    		updateTeamMembersAccount(teamMapMembers.members);
	    		// 
	    		store.commit('updateTeamMembers', teamMapMembers)
	    	} else {
	    		console.log(error);
	    	}
	    }
	})
}

// 根据群ID获取群成员
export function getTeamMembersById({state, commit, dispatch}, teamId) {
	getTeamMembers({teamId:teamId})
}

// 群成员信息更新后的回调, 会传入群成员对象, 不过此时的信息是不完整的, 只会包括被更新的字段。
export function onUpdateTeamMember(members) {
	// console.log("群成员信息更新...", members);
	console.log(members);
}

// 更新群的回调, 此方法接收一个参数, 更新后的群信息
export function onUpdateTeam(team) {
	// console.log("更新群.... onUpdateTeam ...", team);
	console.log(team);
}

// 新成员入群的回调, 此方法接收一个参数, 包含群信息和群成员信息
export function onAddTeamMembers(teamAndAccounts) {
	// console.log("新成员入群...", teamAndAccounts);

	// 获取用户名片
	let membersAccounts = teamAndAccounts.accounts.map(account => {
		return {account: account}
	})
	updateTeamMembersAccount(membersAccounts);

	// 更新群成员
	store.commit('updateTeamMembers', {
		teamId: teamAndAccounts.team.teamId,
		members: teamAndAccounts.members
	})

	// 如果自己是新入群的成员
	if (teamAndAccounts.accounts.indexOf(store.state.userUID) > -1) {
		onTeams([teamAndAccounts.team])
		return 
	} else {
		// 更新群资料
		nim.getTeam({
		    teamId: teamAndAccounts.team.teamId,
		    done: function (error, teams) {
		    	console.log('更新群资料...', teams);
		    	updateTeamList([teams])
		    }
		})
	}
}

// 有人出群的回调, 此方法接收一个参数, 包含群信息和群成员账号
export function onRemoveTeamMembers(teamAndAccounts) {
	console.log("有人出群...", teamAndAccounts);

	// 如果自己被踢了
	if (teamAndAccounts.accounts.indexOf(store.state.userUID) > -1) {
		store.commit('removeTeam', teamAndAccounts.team)
		app.event.emit('kick-team', teamAndAccounts.team)
		return 
	}

	// 获取用户名片
	let membersAccounts = teamAndAccounts.accounts.map(account => {
		return {account: account}
	})
	updateTeamMembersAccount(membersAccounts);

	// 更新群成员
	let curTeamMembers = store.state.teamMembers[teamAndAccounts.team.teamId]
	let curTeamMembersMap = {}
	curTeamMembers.forEach(member => {
		curTeamMembersMap[member.account] = member;
	})

	let members = teamAndAccounts.accounts.map(account => {
		return curTeamMembersMap[account]
	})

	store.commit('removeTeamMembers', {
		teamId: teamAndAccounts.team.teamId,
		invalids: members
	})

	// 更新群资料
	nim.getTeam({
	    teamId: teamAndAccounts.team.teamId,
	    done: function (error, teams) {
	    	console.log('更新群资料...', teams);
	    	updateTeamList([teams])
	    }
	})
}

// 解散群的回调, 此方法接收一个参数, 包含被解散的群id
export function onDismissTeam(tm) {
	console.log("解散群...", tm);
	let team = store.getters.validTeamListMap[tm.teamId]
	store.commit('removeTeam', team)
	app.event.emit('dismiss-team', team)
}

// 移交群的回调, 此方法接收一个参数, 包含群信息和新老群主信息
export function onTransferTeam(team) {
	console.log("移交群的回调");
	console.log(team);
}

// 更新群成员禁言状态的回调, 此方法接收一个参数, 包含群信息和禁言状态信息
export function onUpdateTeamMembersMute(team) {
	console.log("更新群成员禁言...", team);
	console.log(team);
}
