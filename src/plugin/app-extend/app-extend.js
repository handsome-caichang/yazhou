
import qim from './im-queue/queue.js'
import transFile from './trans-file/trans-file.js'


app.sdk.qim = qim

app.im = {
    transFile
}

export default {
    install: function (Vue, options) {

    }
}