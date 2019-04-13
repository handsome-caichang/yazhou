import router from './router-mutations.js'
import im from './im-mutations.js'
import userwone from './userwone-mutations.js'
import record from './record-mutations.js'
import net from './net-mutations.js'

export default {
    ...router,
    ...im,
    ...userwone,
    ...record,
    ...net
}

