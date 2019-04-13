<style lang="scss" scoped>
    $duration: 0.3s;
    $timing: ease;

    .toast {
        position: absolute;
        right: 5%;
        bottom: 25%;
        left: 5%;
        z-index: 99999999;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        .toast-content {
            display: inline-block;
            padding: 10px 16px;
            text-align: left;
            color: #FFF;
            border-radius: 4px;
            word-break: break-word;
            &.toast-default {
                background-color: rgba(0,0,0,.8);
            }
            &.toast-success {
                background-color: #26a733;
            }
            &.toast-error {
                background-color: #ff3c00;
            } 
            &.toast-info {
                background-color: #f5a400;
            }
            .icon {
                padding-right: 6px;
                font-size: 20px;
                vertical-align: bottom;
            }
        }
    }

    .toast-anim-enter-active, .toast-anim-leave-active {
        transform: scale(1);
        transition: all $duration $timing;
    }
    .toast-anim-enter, .toast-anim-leave-active {
        transform: scale(0.1);
        opacity: 0;
    }

</style>

<template>
    <transition name='toast-anim'>
        <div class="toast" v-show='opened'>
            <span class="toast-content" :class="'toast-' + dataObj.type" v-html="dataObj.text">
            </span>
        </div>
    </transition>
</template>

<script>
    const types = ['default','success','error','info']
    export default {
        name: 'toast',
        props: {
            type: {
                type: String,
                default: 'default',
                validator: function(value) {
                    return types.indexOf(value) > -1;
                }
            },
            text: '',
            duration: {
                type: Number,
                default: 2000
            }
        },
        data() {
            return {
                opened: false,
                opts: null
            };
        },
        computed: {
            dataObj() {
                return Object.assign({}, this.$props, this.opts)
            }
        },
        methods: {
            open() {
                this.opened = true;
            },
            close() {
                this.opened = false;
            },
            show(type, text, duration) {
                clearInterval(this.timer);
                this._setOpts(type, text, duration);
                this.open();
                this.timer = setTimeout(() => {
                    this.close();
                }, this.dataObj.duration)
            },
            // 对传入参数进行验证并赋值给this.opts;
            _setOpts(type, text, duration) {
                let tp, tx, dt, o = {};

                if (typeof type === 'object') {
                    ({type: tp, text: tx, duration: dt} = type);
                } else if (text === undefined) {
                    tx = type;
                } else if (duration === undefined  && typeof text === 'number' && types.indexOf(type) === -1) {
                    tx = type
                    dt = text
                } else {
                    [tp, tx, dt] = arguments;
                }

                o.text = tx;
                types.indexOf(tp) > -1 && (o.type = tp);
                typeof dt === 'number' && (o.duration = dt);

                this.opts = o;
            }
        }
    };
</script>
