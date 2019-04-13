export default {
	computed:{
		//是否全部出勤
		isCheckAllAttend(){
			return (this.listClone.length > 0) && this.listClone.every(val=>{
				return val.isAttend == 1 || (!this.CFG.lessEnableAttend && val.remainAmountToUnit - this.data.costConsumeAmount < 0);
			});
		},
		//是否全部计费
		isCheckAllCost(){
			return (this.listClone.length > 0) && this.listClone.every(val=>{
				return val.isCost > 0 || (!this.CFG.lessEnableCost && val.remainAmountToUnit - this.data.costConsumeAmount < 0);
			});
		},
	},
	methods:{
		//值为0或1,正选反选
		checkAttend(item){
            //计费和出勤必须同步的情况下，如果开启了自动计费，那么不能反勾选出勤
            if (this.CFG.enableAutoCharge && item.isCost>0 && item.IsAttendStauts == 0 && this.CFG.enableAttendCostRelation && item.isAttend == 0){
                app.toast("info","已开启自动计费，不能更改。");
				return;
            }



			if (!this.CFG.lessEnableAttend && item.isAttend == 0 && !this.judge(item)){
				return;
			}
			item.isAttend = +!item.isAttend;
			
			//如果attend,去除缺勤原因
			if (item.isAttend){
				item.absentCauseName = '';
				item.absentCauseID = '00000000-0000-0000-0000-000000000000';
			} 
			
			if (this.CFG.enableAutoCharge && item.isCost>0 && item.IsAttendStauts == 0){	//开启了自动出勤计费,不能修改计费(除非是请假的)
				return;
			}
			//让attend和cost保持一致
			if (	(item.isAttend == 0 && item.isCost > 0)	|| 
					(item.isAttend > 0 && item.isCost == 0)  ){
				if (this.data.isDynamicConsume == 0){
					this.checkCost(item);
				} else {
					this.checkCostDynamic(item,item.isAttend>0 ? this.data.costConsumeAmount : 0);
				}
			}
		},
		//有可能正选反选(0,1),也可能需要计费动态课消,值为数字(0或设定好的课消数量)		isCost==0是未勾选.
		checkCost(item){
			if (!this.CFG.lessEnableCost && item.isCost == 0 && !this.judge(item)){	//欠费不能勾选计费
				return;
			}
			if (this.CFG.enableAutoCharge && item.isCost>0 && item.IsAttendStauts == 0){	//开启了自动出勤计费,不能修改计费(除非是请假的)
				app.toast("info","已开启自动计费，不能更改。");
				return;
			}
			//正选反选.
            item.isCost =  item.isCost == 0 ? this.data.costConsumeAmount : 0;


            //计费和出勤必须同步的情况
            this.syncCostAndAttend(item);
		},
		checkCostDynamic(item,changeVal){	//changeVal:要修改为的值(有可能超过剩余费用)
			if (changeVal === undefined){		//通过点击修改费用弹窗动态修改计费
				if (!this.CFG.lessEnableCost && item.isCost == 0 && !this.judge(item)){	//欠费不能勾选计费
					return;
                }
                
				if (this.CFG.enableAutoCharge3 && item.isCost>0 && item.IsAttendStauts == 0){	//开启了动态课消自动出勤计费,不能修改计费(除非是请假的)
                    app.toast("info","已开启自动计费，不能更改。");
                    return;
                }
				//打开修改弹窗.
				this.$emit("openDynamic",{
					initVal:item.isCost,
					limitVal: this.CFG.lessEnableCost ? -1 : (item.remainAmountToUnit < 0 ? 0 : item.remainAmountToUnit)
				},result=>{
                    item.isCost = result;
                    this.syncCostAndAttend(item);
					this.$emit('amountChange',this.listClone);
				});
			} else {		//点击出勤自动计算计费或自动计费
				if (changeVal == 0){		//反勾选出勤,清除计费
					item.isCost = 0;					
				} else if (!this.CFG.lessEnableCost && item.remainAmountToUnit - changeVal < 0){
					item.isCost = item.remainAmountToUnit < 0 ? 0 : item.remainAmountToUnit;
				} else {
					item.isCost = changeVal;
                }
                this.syncCostAndAttend(item);
			}
		},
		checkTry(item){
			item.isTry = +!item.isTry;
		},
		checkAllAttend(firstTime){ //需求:跳过提前请假的学生. firstTime:是否自动点名时初始化
			this.showMsg = false;		//全选不弹窗.
			if (this.isCheckAllAttend){
				this.listClone.forEach(val=>{
					val.isAttend > 0 && this.checkAttend(val);
				})
			} else {
				let askForLeave = [];
				this.listClone.forEach(val=>{
					//后台单词拼写错误
					val.IsAttendStauts == 0 && val.isAttend == 0 && this.checkAttend(val);
					val.IsAttendStauts == 1 && askForLeave.push(val.name);
				});
				askForLeave.length > 0 && firstTime!=='firstTime' && app.toast('info',`以下为请假学员:<br/>${askForLeave.join('<br/>')}。`);
			}
			this.$emit('amountChange',this.listClone);
			this.showMsg = true;
		},
		checkAllCost(){
			this.showMsg = false;		//全选不弹窗.
			if (this.isCheckAllCost){
				this.listClone.forEach(val=>{
					val.isCost > 0 && 	this.checkCost(val);
				})
			} else {
				this.listClone.forEach(val=>{
					val.isCost == 0 && this.checkCost(val);	
				});
			}
			this.$emit('amountChange',this.listClone);
			this.showMsg = true;
		},
		checkAllCostDynamic(){
			//打开动态课消修改窗口,统一给所有计费项目赋予相同的值(如果开启了欠费不能计费,则只能取remainAmount和这个值中的最小值)
			this.$emit("openDynamic",{
					initVal:this.data.costConsumeAmount,
					limitVal: -1
			},res=>{
				this.listClone.forEach(item=>{
					this.checkCostDynamic(item,res);
				})
				this.$emit('amountChange',this.listClone);
			});
		},
		//判断能不能勾选(出勤或计费) 一定是勾选才进入这个判断
		judge(item){
			let unitText = this.data.unit == '小时' ? '课时' : 
								app.sysInfo.Title_CourseUnit_2 == '课时' ? '课时' : '课次',
				tipStr = !this.CFG.lessEnableAttend ? '出勤计费' : '计费';
			if ( (item.isCost + item.remainAmountToUnit - this.data.costConsumeAmount < 0 && this.data.isDynamicConsume == 0) ||
				 (item.isCost + item.remainAmountToUnit <= 0 && this.data.isDynamicConsume == 1) ){
				this.showMsg &&  app.toast('info',`${item.name}学员剩余${unitText}不足,不能${tipStr}。`);
				return false;
			}
			return true;
        },
        
        //计费和出勤必须同步的情况
        syncCostAndAttend(item){
            if (this.CFG.enableAttendCostRelation){
                if ((item.isCost > 0 && item.isAttend == 0) || (item.isCost == 0 && item.isAttend > 0)){
                    //item.isAttend = + (!!item.isCost);
                    item.isAttend = + Boolean(item.isCost);
                    if (item.isAttend){
                        item.absentCauseName = '';
                        item.absentCauseID = '00000000-0000-0000-0000-000000000000';
                    }
                }
            }
        },
		
		//验证点名上课
		checkFlag(){
			if (this.listClone.length ==0){		//必须有学员
				app.toast('info',"该班级未安排学员，不能点名。");
				return false;
			}
			let flag = this.listClone.some(item=>{	//必须有状态改变
				return (item.isAttend!=0 || item.isCost!=0 || item.isTry!=0 || (item.absentCauseID!='' && item.absentCauseID!="00000000-0000-0000-0000-000000000000"));				
			});
			if (!flag){
				app.toast('info',"请选择学员的出勤、计费等状态");
				return false;
			}
			
			let checkList = [],
				submitData = [];
			submitData = this.listClone.map(item=>{
				if (item.isAttend==1){
					checkList.push(item);
				}
				return item.id + "|" + item.isAttend + "|" + item.isCost + "|" + item.isTry + "|" + item.absentCauseID + "|" + item.remainAmount;
			});
			return {
				checkIDs:checkList.map(item=>item.id).join(','),
				data:submitData.join(',')
			}
		},
	}
}
