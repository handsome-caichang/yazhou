import * as mutations from './mutations'
import router from './router-mutations'

export default {
    ...router,
    ...mutations
}