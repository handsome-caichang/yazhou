import router from './router-state.js'
import im from './im-state.js'
import userWone from './user-wone.js'
import record from './record.js'
import net from './net.js'
import version from './version.js'

export default {
    ...router,
    ...im,
    ...userWone,
    ...record,
    ...net,
    ...version
}


