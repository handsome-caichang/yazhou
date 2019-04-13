<style lang="scss" scoped>
	@import 'src/plugin/scss/mixin.scss';
	@import 'src/plugin/scss/variable.scss';
	.datetime-picker{
		@include position-absolute;
		z-index: 9999990;
        .header{
            line-height: 50px;
            font-size: 15px;
            text-align: center;
            color: #999999;
            @include border-bottom;
            padding: 0 15px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
		.footer{
            height: 48px;
            line-height: 48px;
            display: flex;
            justify-content: flex-end;
            padding: 10px 15px;
            @include border-top;
            .cancel-btn,
            .submit-btn{
                width: 93px;
                height: 28px;
                line-height: 28px;
                border-radius: 27px;
                text-align: center;
                margin-left: 15px;
                color: $color-primary;
                border: 1px solid $color-primary;
            }
            .submit-btn {
                color: $color-white;
                background-color: $color-primary;
            }
		}
	}
</style>

<template>
	<action-sheet 
        class="datetime-picker"
        v-show="opened"
        @close="close">
        <div slot="header" class="header" v-show="opts.title">{{opts.title}}</div>
		<datetime-view 
            ref="dtview"
            v-model="value"
            :format="opts.format"
            :max-year="opts.maxYear"
            :min-year="opts.minYear">
        </datetime-view>
		<div slot="footer" class="footer">
			<div class="cancel-btn" @click="close">取消</div>
			<div class="submit-btn" @click="returnData">确定</div>
		</div>
	</action-sheet>
</template>

<script>
	import {DatetimeView} from 'vux';
    import {popupWindowRouteMixin} from 'src/plugin/app/mixin/mixin.js';
    import ActionSheet from 'src/plugin/components/action-sheet/action-sheet.vue';
	
    function formateFilter(datestr,formate){
    	formate = formate.replace(/Y/g,'y').replace(/D/g,'d').replace(/H/g,'h');
    	return Vue.options.filters.formatDatetime(new Date(datestr),formate);
    }

	export default {
		name: 'datetime-picker',
		mixins:[popupWindowRouteMixin],
		data(){
			return {
				value:'',
				opened:false,
				opts:{},
                optionDefault: {
                    title: '',
                    format:'YYYY-MM-DD',
                    maxYear:2050,
                    minYear:2000,
                    date:app.tool.getDatesByIndex('0').sdate    //初始化日期
                },
				_resolve:null,
				hasMountedPromise:null,
			}
		},
		methods: {
			show(opts){
				return new Promise((resolve) => {
					this.hasMountedPromise.then(()=>{
                        this.opts = Object.assign({}, this.optionDefault, opts);
						setTimeout(()=>{
							this.opened = true;
							this.value = formateFilter(this.opts.date, this.opts.format);
							this.$refs.dtview.render();	
						}, 80);
					});
					this._resolve = resolve;
				}); 
			},
			returnData(){
				this._resolve(this.value);
				this.close();
			}
		},
		created(){
        },
        mounted(){
            this.hasMountedPromise = Promise.resolve()
		},
		components:{
			DatetimeView,
			ActionSheet
		}
	}
</script>