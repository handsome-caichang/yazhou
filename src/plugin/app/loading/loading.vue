<!-- 透明遮罩 -->
<template>
    <loading class="loading" v-show="opened" :bgType="opts.bgType" :showIcon="opts.showIcon"></loading>
</template>

<script>
    export default {
        name: 'mask-load',
        data() {
            return {
                opened: false,
				opts: {
                    bgType: 1
                },
				_resolve: null,
            }
        },
        methods: {
            show(options) {
                if(!(options === undefined || typeof options == 'object')) return

                this.opts = Object.assign({}, this.opts, options);
                this.opened = true;

                return new Promise((resolve) => {
                    this._resolve = resolve;
                });
            },
            close() {
                this.opened = false;
            }
        }
    }    
</script>