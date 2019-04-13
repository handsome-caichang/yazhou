<!--活动管理-->
<style lang="scss" scoped>
    .activity-manage {
        @include position-absolute(0, 0, 49px, 0);
        .header{
        	position: absolute !important;
        	display: flex;
        	top: 0;
			left: 0;
			width: 100%;
            height: 47px;
            line-height: 47px;
            background-color: #fff;
            border-bottom: 1px solid #E5E5E5;
        	.header-item-wrap{
        		flex: 1;
        		@include flex-center;
        		.header-item{
                    padding: 0 15px;
        			position: relative;
                    &.active {
                        color: #FE5C00;
                    }
        			&.active:after{
    				    content: '';
					    position: absolute;
					    bottom: 0px;
					    left: 0;
					    right: 0;
        				border-bottom: 3px solid #FE5C00;
        			}
        		}
        	}
        }
        .component {
			@include position-absolute(47px, 0, 0, 0);
			z-index: 1;
			opacity: 0;
			&.active {
				z-index: 2;
				opacity: 1;
			}
		}
    }
</style>

<template>
    <div class="activity-manage">
        <!-- 头部选项卡 -->
		<div class="header">
            <div class="header-item-wrap"
				v-for="(item, index) in headerList" :key="index"
				@click="()=>{activeIndex = index}">
				<div class="header-item" :class="{active:index==activeIndex}">{{item.text}}</div>
			</div>
		</div>
        <component 
            v-for="(item, index) in headerList" 
            v-if="showList"
            class="component" 
            :key="index" 
            :is="item.component" 
            :class="{active: activeIndex === index}">
        </component>
    </div>
</template>

<script>
    import MyActivity from 'manage/pages/activity-manage/components/my-activity.vue';
    import EntryList from 'manage/pages/activity-manage/components/entry-list.vue';

    export default {
        name:'activity-manage',
        mixins: [app.mixin.shareMixin],
        data() {
            return {
                showList: false,
                activeIndex: 0,
                headerList: [{
                    text: '我的活动',
                    component: MyActivity
                },{
                    text: '报名名单',
                    component: EntryList
                }]
            }
        },
        created() {
            if (this.$route.name === 'home' && this.$route.params.homeIndex === '1') {
                this.showList = true;
            }
            this.v_shareResolve(function () {
                return {
                    title: '活动管理',
                    // desc: '活动管理',
                    url: this.$route.fullPath,
                    // imgUrl: 'https://cdn01.xiaogj.com/file/4f6257359a904707997e52fe0d1b10bb/201903/6510822ee6524c68a58fa09dc2648112.png'
                };
            })
        },
        watch: {
            $route(to) {
                if (to.name === 'home' && to.params.homeIndex === '1') {
                    this.showList = true;
                }
            }
        }
    }
</script>