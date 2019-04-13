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
					.not-read{
						position: absolute;
						right: 0;
						top: 0;
						bottom: 0;
						width: 9px;
						height: 9px;
						margin: auto 0;
						border-radius: 9px;
						background-color: #e93a0e;
					}
					.not-submit{ //未交
                        color: #FF4A22;
                    }
                    .isevaluateed{ //分数
                        color: #F5A206;
                    }
				}
                .card-read{
                    position: absolute;
					right: 30px;
					top: 0;
					bottom: 0;
                    width: 9px;
                    height: 9px;
                    margin: auto 0;
                    border-radius: 9px;
                    background-color: #e93a0e;
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
				:sdate='pagingOption.params.starttime' 
				:edate='pagingOption.params.endtime' 
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
			<div tag="div" v-for="item in list" :key="item.messageid">
                <div class="card" @click="goto(item)">
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
                    <div class="card-badge" v-if="item.isread==0">
						<div class="not-read"></div>
                    </div>
                    <div class="card-badge">
						<span v-if="item.isread==1&&item.issubmited==0" class="not-submit">未提交</span>
						<span v-if="item.isevaluateed==0&&item.issubmited==1">未评价</span>
						<span v-if="item.isevaluateed==1" class="isevaluateed">{{item.score}}分</span>
                    </div>
                    <svg class="icon card-next" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou"></use>
                    </svg>
                </div>
                <div class="void"></div>
			</div>
			<empty-page class="noData-temp" :type="2" v-if="list.length == 0"></empty-page>
		</scroller-super>
		<loading class="loading" v-show="isLoading"></loading>
	</div>
</template>

<script>
    import {gethomeworkinfos} from 'parent/api/homework';
	import EmptyPage from 'parent/components/common/empty-page/empty-page';
	
	export default {
		name: 'homework-list',
		data () {
			return {
				wxTitle: '作业',
				list: [],
				quickDateIndex: -1,
				pagingOption: {
					api: gethomeworkinfos,
					params: {
						starttime: app.tool.getDatesByIndex(3,app.localTimeToServer).sdate,
                        endtime: app.tool.getDatesByIndex(3,app.localTimeToServer).edate
					}
				},
				isLoading: true
			}
        },
		methods: {
			loadData(ajaxPromise){
				ajaxPromise.then(res => {
					this.isLoading = false;
					if (res.result.code == app.errok) {
						if (res.page.pageindex === 1) {
							this.list = [];
						}
                        this.list = this.list.concat(res.data);
					}
				})
			},
			changeDate(params){
                this.quickDateIndex = params.index;
                this.pagingOption.params.starttime = params.sdate;
                this.pagingOption.params.endtime = params.edate;
				this.isLoading = true;
                this.$refs.scroller.refresh(this.pagingOption.params);
			},
            goto(message){
                this.$router.push(`/homeworkDetail/${message.messageid}`);
                message.isread =1;
			},
			handleEmit(){
				this.$refs.scroller.refresh();
			}
		},
		mounted() {
            app.eventDefine.on('homeworkSave', this.handleEmit);
        },
        beforeDestroy() {
            app.eventDefine.off('homeworkSave');
        },
		components: {
			EmptyPage
		}
	}
</script>