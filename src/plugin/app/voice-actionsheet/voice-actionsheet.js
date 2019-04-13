import VoiceOpts from './voice-actionsheet.vue';

let VueVoice, router;

function getEl () {
    let el = document.createElement('div');
    document.querySelector('body').appendChild(el);
    return el;
}

function Voice(type, options) {
    let props = Object.assign({type: type}, Voice.defaultPropsData, options);
    return new VueVoice({
        el: getEl(),
        router,
        propsData: props
    });
}

Voice.defaultPropsData = {}

Voice.install = function(Vue, opt) {
    VueVoice = Vue.extend(VoiceOpts);
    router = opt.router;

    opt.root.voicePopup = Voice
}

export default Voice;