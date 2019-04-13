import util from '../../utils'

export default {
	validTeamList: state => {
		return state.teamlist.filter(team => {
			// 是否解散
			if (!team.valid) return false

			let serverCustom = team.serverCustom
			// 是否自定义关闭群
			if (serverCustom && JSON.parse(serverCustom).valid === false) return false

			return true
		})
	},
	validTeamListMap: (state, getters) => {
		let map = {}
		getters.validTeamList.forEach(team => {
			map[team.teamId] = team
		})
		return map
	}
}