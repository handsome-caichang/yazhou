import configuration from '../configuration/configuration.js'
import base from './base.js'
import * as event from './event.js'

import * as mixin from './mixin/mixin.js'

import ls from './localstorage.js'

import tool from './tool.js'
import http from './http/http.js'

import dom from './dom.js'

import oss from './oss/oss.js'


import voice from './voice/voice.js'
import Record from './record.js'

import sdk from './sdk/sdk.js'

import filters from '../filters/filters.js';

import JToast from './popup/toast.js'
import JDialog from './popup/dialog.js'

import Video from './video/video.js'

import Calendar from './calendar/calendar-actionsheet.js';
import QuickDate from './calendar/quickdate-actionsheet.js';
import DateTimePicker from './datetime-picker/datetime-picker.js';
import SortSheet from './sort-sheet/sort-sheet.js';

import AvatarModify from './avatar-modify/avatar-modify.js';
import VoicePopup from './voice-actionsheet/voice-actionsheet.js';
import Loading from './loading/loading.js';


var app = {
    configuration,
    ...base,
    ...event,
    mixin,
    ls,
    tool,
    http,
    dom,
    oss,
    voice,
    Record,
    ...sdk,
    filters
}


Vue.prototype.app = window.app = app

Vue.use(JToast, {root: app});

Vue.event.$on('instanceVueRouter', function (router) {
    Vue.use(JDialog, {router, root: app});
    Vue.use(Video, {router, root: app});

    Vue.use(Calendar, {router, root: app});
    Vue.use(QuickDate, {router, root: app});
    Vue.use(DateTimePicker, {router, root: app});
    Vue.use(SortSheet, {router, root: app});

    Vue.use(AvatarModify, {router, root: app});
    Vue.use(VoicePopup, {router, root: app});
    Vue.use(Loading, {router, root: app});
})

export default app
