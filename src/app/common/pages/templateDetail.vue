<template>
    <div>
        <component :is="curDetail" @loadDataComplete="resolveSharePromise"></component>
    </div>
</template>
<script>
    import MAP from './map.js'
    export default {
        name: 'templateDetail',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                wxTitle: "拼团",
                curDetail: '',
                id: '',
                showBaoMing: false
            }
        },
        created () {
            //  匹配路由
            this.id = this.$route.params.id;

            MAP[this.id].path().then(component => {
                this.curDetail = component.default
            })
            
            this.wxTitle = MAP[this.id].title;
        },
        methods: {
            resolveSharePromise(res) {
                this.v_shareResolve(function () {
                    return {
                        title: res.name,
                        // desc: res.name,
                        url: this.$route.fullPath,
                        // imgUrl: 'https://cdn01.xiaogj.com/file/4f6257359a904707997e52fe0d1b10bb/201903/6510822ee6524c68a58fa09dc2648112.png'
                    }
                })
            }
        },
        components:{
        }
    }
</script>