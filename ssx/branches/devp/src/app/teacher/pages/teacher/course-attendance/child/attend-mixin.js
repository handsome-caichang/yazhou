export default {
	data(){
		return {
            openedAttend: false,    //出勤状态actionsheet
            attendCauseList: [{
                id: 0,
                name: '正常'
            },{
                id: 1,
                name: '迟到'
            },{
                id: 2,
                name: '早退'
            }]
		}
	},
	methods:{
		//打开出勤状态
		openAttend(item){
			this.absentStuSelect = item;
			this.openedAttend = true;
			this.$nextTick(() => {
				this.$refs.absentComponent.refresh();
			});
			app.tool.setDocTitle('请选择出勤状态');
		},
		//选择出勤状态
		selectAttendCause(item){
			// this.absentStuSelect.absentCauseID = item.id;
			// this.absentStuSelect.absentCauseName = 
            // 	item.id == "00000000-0000-0000-0000-000000000000" ? '' : item.name;
            console.log(111111111)
			this.closeAttend();
			this.refreshScroller();
		},
		closeAttend(){
			this.openedAttend = false;
			app.tool.setDocTitle('学生列表');	
		},
	}
}
