<!-- 家长端首屏 -->
<style scoped lang="scss">
	
	
	.main {
        background-color: $color-white;
		.banner-wrap{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 46.7%;
			.banner{
				@include position-absolute;
				.banner-item{
					display: block;
					height: 100%;
					@include background-img(false,cover);
					background-color: $color-assist-1;
				}
			}
		}
		.section-wrap{
			display: flex;
			flex-wrap: wrap;
			position: relative;
            background-color: $color-white;
			.section-item{
                padding: 30px 0;
                width: calc(100% / 2);
				position: relative;
				@include flex-center(column);

				.section-icon{
                    width: 55px;
                    height: 55px;
                    position: relative;
                    background-image: url("img/labelsprite.png");
                    background-size: cover;
                    background-repeat: no-repeat;
                    margin-bottom: 10px;
                    &.courseCalendar {
                        background-position: 0 0;
                    }
                    &.commentList {
                        background-position: 0 -55px;
                    }
                    &.homeworkList {
                        background-position: 0 -110px;
                    }
                    &.noticeList {
                        background-position: 0 -165px;
                    }
				}

				.num{
					position: absolute;
					top: -8px;
					right: -20px;
					min-width: 16px;
					height: 16px;
					line-height: 16px;
					padding: 0 4px;
					font-size: 12px;
					border-radius: 8px;
					text-align: center;
					color: $color-white;
					background-color: #FF3433;                    
				}
			}
		}
		.consult-dialog{
			position: fixed;
		    right: 5px;
		    bottom: 40px;
		    z-index: 100;
		    opacity: 0.5;
		    border-radius: 4px;
		    background-color: #000000;
		    svg{
		    	font-size: 45px;
		    }
		}
	}
</style>

<template>
	<scroller-base 
		class="main"
		ref="scrollBar"
		v-if="data">
        	<!-- banner图  -->
            <div class="banner-wrap" v-if="banneres.length !=0">
                <slider class='banner' :autoPlay="true" >
                    <a class="banner-item"                        
                        v-for="banner in banneres"
                        :style="'background-image:url('+ banner.Image + ')'"
                    ></a>
                </slider>
            </div>
            
            <!-- 模块 -->
            <div class="section-wrap">
                <router-link 
                    tag="div"
                    class="section-item"
                    v-for="(item,index) in list"
                    :key="index"
                    :to="`/${item.href}`">
                    <div class="section-icon" :class="item.href">
                        <span class="num" v-if="index==2&&data.homeworkcount>0">{{data.homeworkcount>99?'99+':data.homeworkcount}}</span>
                        <span class="num" v-if="index==3&&noticeUnreadNum>0">{{noticeUnreadNum>99?'99+':noticeUnreadNum}}</span>
					</div>{{item.text}}
				</router-link>
            </div>
            
            <!-- 在线咨询 -->
            <a class="consult-dialog" v-if="app.sysInfo.consulturl" @click="gotoConsult()">
            	<svg aria-hidden="true" class="icon">
	              <use xlink:href="#icon-zaixianzixun"></use>
    	        </svg>
            </a>
	</scroller-base>
</template>

<script>
    import { gethomepageinfo } from 'parent/api/personal-center';
	
	export default {
		data() {
			return {
                data: null,
                list: [{
                    icon: "#icon-chakankebiao",
                    text: "查看课表",
                    href: 'courseCalendar'              
                },{
                    icon: "#icon-ketangpingjia",
                    text: "课堂评价",
                    href: 'commentList'               
                },{
                    icon: "#icon-ketangzuoye",
                    text: "作业",
                    href: 'homeworkList'
                },{
                    icon: "#icon-tongzhigonggao",
                    text: "通知公告",
                    href: 'noticeList'
                },
                // {
                //     icon: "#icon-daoxiaolixiao",
                //     text: "到校离校",
                //     href: 'checkinList'
                // }
                ]
			}
		},
		computed: {
			banneres(){
				return [{
					"Image": require('./img/banner1.jpg')
				}]
			},
            noticeUnreadNum(){
                return parseInt(this.data.taskcount)+parseInt(this.data.publicinfocount);
            }
		},
		created(){
			if (this.$route.name==='home' && this.$route.params.homeIndex==='0') {
				this.loadData();
			}
		},
		methods: {
			loadData(){
                gethomepageinfo().then(res => {
                    if (res.result.code === app.errok) {
						this.data = res.data;
					}
                });
			},
            gotoConsult(){ //在线咨询
                location.href = app.sysInfo.consulturl;
            }
		},
		watch: {
			$route(to){
				if (to.name==='home' && to.params.homeIndex==='0') {
					this.loadData();
				}
			}
		}
	}
</script>