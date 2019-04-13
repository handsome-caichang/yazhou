export default {
	data(){
		return {
			openedAbsent:false,		//缺勤原因actionsheet
			absentStuSelect:{		//这个对象直接引用list里的学生,共享
				absentCauseID:"00000000-0000-0000-0000-000000000000"
			},		//点击选择缺勤的学生.
		}
	},
	methods:{
		//打开缺勤原因
		openAbsent(item){
			this.absentStuSelect = item;
			this.openedAbsent = true;
			this.$nextTick(() => {
				this.$refs.absentComponent.refresh();
			});
			app.tool.setDocTitle('请选择缺勤原因');
		},
		//选择缺勤原因
		selectAbsentCause(item){
			this.absentStuSelect.absentCauseID = item.id;
			this.absentStuSelect.absentCauseName = 
				item.id == "00000000-0000-0000-0000-000000000000" ? '' : item.name;
			this.openedAbsent = false;
			this.refreshScroller();
		},
		closeAbsent(){
			this.openedAbsent = false;
			app.tool.setDocTitle('学生列表');		
		},
	}
}
