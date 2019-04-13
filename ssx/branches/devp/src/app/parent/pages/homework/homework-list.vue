<!--作业列表页-->
<style scoped lang="scss">
	.homework-list{
		.header{
			@include border-bottom;
			padding: 8px 12px;
			height: 44px;
			line-height: 28px;
			@include flex-between;
		}
        .void{
            height: 10px;
            background-color: #EEF1F6;
        }
		.body{
			position: absolute;
			top: 44px;
			bottom: 0;
			left: 0;
			right: 0;
			.card{
				padding: 15px 55px 15px 15px;
				background-color: $color-white;
				@include border-bottom;
				line-height: 1;
				color: $color-9;
				.card-hd{
					font-size: 16px;
					height: 16px;
					.name{
						display: inline-block;
						max-width: 80%;
						color: $color-3;
						@include ellipsis-single;
					}
					svg{
						width: 12px;
						height: 12px;
						vertical-align:baseline;
					}
				}
				.card-bd{
					padding-top: 8px;
					font-size: 12px;
					.cname{
						display: inline-block;
						max-width: 65%;
						margin-left: 14px;
					    vertical-align: top;
					    @include ellipsis-single;
					}
				}
				.card-badge{
					position: absolute;
					right: 26px;
					top: 0;
					bottom: 0;
					display: flex;
                    font-size: 12px;
					align-items: center;
					justify-content: flex-end; 
                    &.status0{ //未交
                        color: #FF4A22;
                    }
                    &.status1{ //已交
                        color: #CCCCCC;
                    }
                    &.status2{ //分数
                        color: #F5A206;
                    }
				}
				.card-next{
					position: absolute;
					top: 0;
					bottom: 0;
					right: 12px;
					margin: auto 0;
				}
			}
		}
		.noData-temp{
			@include position-absolute;
		}
	}
</style>

<template>
	<div class="homework-list">
		<!-- 头部日期筛选 -->
		<div class="header">
			<date-bar 
				:sdate='pagingOption.params.sdate' 
				:edate='pagingOption.params.edate' 
				:index="quickDateIndex" 
				@changeDate="changeDate">
			</date-bar>
		</div>
		<!-- 内容部分 -->
		<scroller-super
			class="body"
			:type="2"
			:data="list"
			:pagingOption="pagingOption"
			@loadData="loadData"
            ref="scroller">
            <div v-for="item in list">
                <router-link tag="div" class="card" :to="`/homeworkDetail/${item.jobid}`" :key="item.jobid">
                    <div class="card-hd">
                        <div class="name">{{item.title}}</div>
                        <svg class="icon" aria-hidden="true" v-if="item.isfile==1">
                            <use xlink:href="#icon-guanlian"></use>
                        </svg>
                    </div>
                    <div class="card-bd">
                        <span class="time">{{item.createtime|formatDatetime('MM.dd hh:mm')}}</span>
                        <span class="cname">{{item.classname}}</span>
                    </div>
                    <div class="card-badge" :class="{'status0':item.issubmit==0,'status1':(item.issubmit==1&&!item.score),'status2':(item.issubmit==1&&item.score)}">
                        {{item.issubmit==0?'未交':(item.score?item.score:'已交')}}
                    </div>
                    <svg class="icon card-next" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </router-link>
                <div class="void"></div>
            </div>
			<empty-page class="noData-temp" :type="2" v-if="list.length == 0"></empty-page>
		</scroller-super>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
    import {getjoblistforstudent} from 'parent/api/homework.js';
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
	
	export default {
		name: 'homework-list',
		data () {
			return {
				wxTitle: '作业',
				list: [],
				quickDateIndex: -1,
				pagingOption: {
					api: getjoblistforstudent,
					params: {
						sdate: app.tool.getDatesByIndex(3,app.localTimeToServer).sdate,
                        edate: app.tool.getDatesByIndex(3,app.localTimeToServer).edate
					}
				},
				isLoading: true
			}
        },
        computed: {
			...Vuex.mapState([
				'homeworkDetailRefreshFlag'
            ])
        },
		methods: {
			loadData(ajaxPromise){
				ajaxPromise.then(res => {
					this.isLoading = false;
					if (res.result.code == app.errok) {
						if (res.page.pageindex === 1) {
							this.list = [];
						}
                        //TODO:改：暂时没有分数字段
						// this.list = this.list.concat(this.handlerScore(res.data));
						this.list = this.list.concat(res.data);
					}
				})
			},
            handlerScore(arr){
                arr.forEach(ele => {
                    let scoreArr = ele.score.split('-');
                    ele.score = scoreArr[1];
                    if (scoreArr[0]=='0') {
                        ele.score = ele.score+'分';
                    }
                });
                return arr;
            },
			changeDate(params){
                this.quickDateIndex = params.index;
                this.$refs.scroller.refresh({
                    sdate: params.sdate,
                    edate: params.edate
                });
			}
        },
        watch: {
			homeworkDetailRefreshFlag() {
                this.$refs.scroller.refresh(this.pagingOption.params);
            }
		},
		components: {
			EmptyPage
		}
	}
</script>