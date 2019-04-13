<!-- 选择校区组件 -->
<style lang="scss" scoped>
    
    

    .cs-header{
        padding-top: 14px;
        line-height: 55px;
        text-align: center;
        color: $color-3;
        font-size: $fs-big;
        @include border-bottom($color-border-1);
    }
    .cs-footer {
        padding-bottom: 25px;
    }

    .cs-item {
        height: $h-2;
        line-height: $h-2;
        padding-left: $edge;
        padding-right: $edge;
        color: $color-3-s;
        @include ellipsis-single;
        &.center {
            text-align: center;
        }
        &.between {
            @include flex-between;            
        }
        &.active {
            color: $color-primary;
        }
    }
</style>

<template>
    <!-- 'center'场情只用于进入应用时选择校区使用，因为这种情况下该组件不在其它的'scroller'或'slider'组件内，
    所以没有可代理的'click'事件; -->
    <action-sheet 
        v-show="opened" 
        :maskToClose="position === 'center' ? false : true"
        @close="close" 
        :position="position" 
        :data="campusData">

        <div class="cs-header" v-if="position === 'center'" slot="header">选择校区</div>
        
        <ul>
            <li 
                class="cs-item"
                v-for="campus in campuslist"
                :class="[position === 'center' ? 'center': 'between', {'active': curCampus.id === campus.ID}]"
                @click="changeCampus(campus)">
                <span>{{campus.Name}}</span>
                <svg v-if="position !== 'center' && curCampus.id === campus.ID" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xuanzhong"></use>
                </svg>
            </li>
        </ul>

        <div class="cs-footer" v-if="position === 'center'" slot="footer"></div>
    </action-sheet>
</template>

<script>
    
     

    import {setcampus} from 'api/jie.js'

    export default {
        name: 'actionsheets-camppus',
        mixins: [app.mixin.popupWindowRouteMixin],
        props:{
            opened: {},
            position: {
                // 可用值:'top','bottom','center'
                // 其中为'center'时，只能给进入应用时在'home'页调用;
                default: 'center'
            },
            header: {
                type: Boolean,
                default: false
            },
            footer: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
            };
        },
        computed: {
            ...Vuex.mapState(['curCampus', 'campuslist']),
            campusData() {
                return {
                    opened: this.opened,
                    campuslist: this.campuslist
                }
            },
        },
        methods: {
            ...Vuex.mapMutations(['set_curCampus']),
            changeCampus(campus) {
                if (this.curCampus.id !== campus.ID) {
                    // 发送转变校区请求，并'commit'当前校区
                    // 必需在请求成功的回调里'commit'
                    setcampus({CampusID: campus.ID}).then(res => {
                        if (res.ErrorCode === 200) {
                            this.set_curCampus({
                                id: campus.ID,
                                name: campus.Name
                            })
                            // 选择好初始化校区后, 切换路由; 目的在于把校区ID放到url上，以便以后的分享；
                            this.$router.replace(this.$route.fullPath);
                        }
                    })
                }
                if (this.position === 'center') {
                    this.cancel();
                } else {
                    this.close();
                }
            },
        },
        components: {
        }
    };
</script>

