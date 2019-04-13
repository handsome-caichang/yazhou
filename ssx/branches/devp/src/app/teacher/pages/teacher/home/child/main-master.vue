<!-- 校长端首屏 -->
<style scoped lang="scss">
	
	
	.main-master {
		.banner{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 46.7%;
            @include background-img(false,cover);
		}
		.section-wrap{
            padding: 10px;
			display: flex;
			flex-wrap: wrap;
			position: relative;
            .section-grid{
				width: 50%;
                padding: 10px;
            }
			.grid{
                position: relative;
                height: 0;
                padding-top: 100%;
			    .grid-item{
                    background-color: $color-white;
                    @include flex-center(column);
                    @include position-absolute;
                    .section-icon{
                        position: relative;
                    }
                    svg{
                        font-size: 40px;
                        margin-bottom: $edge;
                    }
                }
			}
		}
	}
</style>

<template>
	<scroller-base
		class="scroller main-master"
		ref="scrollBar">
            <div class="banner" :style="'background-image:url('+ banner + ')'"></div>

			<!-- 模块 -->
            <div class="section-wrap">
                <div class="section-grid" v-for="(item,index) in list">
                    <div class="grid">
                        <router-link 
                            tag="div"
                            :key="index"
                            :to="`/${item.href}`"
                            class="grid-item">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="item.icon"></use>
                            </svg>{{item.text}}
                        </router-link>
                    </div>
                </div>
            </div>
	</scroller-base>
</template>

<script>
	export default {
        name: 'main-master',
		data() {
			return {
                data: null,
                banner: require('../img/banner-master.png'),
                list: [{
                    icon: "#icon-chakankebiao",
                    text: "收费报表",
                    name: '',
                    href: ''              
                },{
                    icon: "#icon-chakankebiao",
                    text: "课消报表",
                    name: '',
                    href: ''               
                },{
                    icon: "#icon-chakankebiao",
                    text: "业绩报表",
                    name: '',
                    href: ''
                },{
                    icon: "#icon-chakankebiao",
                    text: "班级报表",
                    name: '',
                    href: ''
                }]
			}
		},
        computed:{
		},
		methods: {
		},
		created(){
		},
		components: {
		}
	}
</script>