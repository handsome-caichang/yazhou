import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
})

// window.store = store

export default store