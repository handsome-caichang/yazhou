<style lang="scss" scoped>
    .app-details {
        @include position-absolute;
        background-color: $color-white;
    }
</style>

<template>
    <div class="app-details">
        <component :is="goodDetail"
            @loadDataComplete="resolveSharePromise">
        </component>
    </div>
</template>

<script>
    import GoodsDetailBj from './children/goods-detail/goods-detail-bj.vue'
    import GoodsDetailWp from './children/goods-detail/goods-detail-wp.vue'
    import GoodsDetailKC from './children/goods-detail/goods-detail-kc.vue'
    import GoodsDetailTC from './children/goods-detail/goods-detail-package.vue'
     
    export default {
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                wxTitle: "商品详情",
                type: parseInt(this.$route.params.type)
                // currentView: this.type === 1 ? GoodsDetailBj : this.type === 2 ? GoodsDetailWp : this.type === 3 ? GoodsDetailKC : GoodsDetailTC,
            }
        },
        computed: {
            ...Vuex.mapState([
                'config', 'companyId'
            ]),
            goodDetail() {
                let type = this.type;
                if (type === 1) {
                    return GoodsDetailBj
                } else if(type === 2 || type === 4) {
                    return GoodsDetailWp
                } else if(type === 3) {
                    return GoodsDetailKC
                } else if(type === 100) {
                    return GoodsDetailTC
                }
            }
        },
        methods: {
            resolveSharePromise(res) {
                this.v_shareResolve(function () {
                    return app.tool.mallShare({
                        title: `${res.name}`,
                        desc: res.desc ? res.desc : `我在${this.$store.state.config.CompanyShortName}发现了一个很好的${this.shareName()},你也来看看吧`,
                        link: app.tool.parseToWXshareUrl(this.$route.fullPath),
                        imgUrl: this.$store.state.config.Logo
                    });
                })
            },
            shareName() {
                let type = this.type
                if (type === 1 || type === 3) {
                    return '课程'
                } else if(type === 2) {
                    return '东东'
                } else if(type === 100) {
                    return '套餐'
                }
            }
        },
        created() {
        },
        components: {
            GoodsDetailBj,
            GoodsDetailWp,
            GoodsDetailTC,
            GoodsDetailKC
        }
    }
</script>