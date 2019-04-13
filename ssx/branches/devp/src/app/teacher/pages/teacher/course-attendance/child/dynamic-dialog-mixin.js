export default {
	data(){
		return {
			openedDynamic:false,	//是否显示修改动态课消数量窗口
			dynamicModel:0,			//修改的动态课消数量v-model
			maxVal:0,				//限制能填写的最大值,如果是-1表示无限制
			callback:null,
		}
	},
	methods:{
		//打开动态课消数量修改窗口
		openDynamic(config,fn){
			this.dynamicModel = config.initVal;
			this.maxVal = config.limitVal;
			this.openedDynamic = true;
			this.callback = fn;
		},
		closeDynamic(){
			this.openedDynamic = false;
		},
		//修改动态课消数量并确认
		submitDynamic(){
			this.openedDynamic = false;
			this.callback && this.callback(+this.dynamicModel);
		},
		//为动态课消输入框添加输入限制
		inputDaynamicUpdate(event){
			let value = event.target.value;
			let reg = this.courseInfo.unitCode == 2 ? 
							/(?:^\d{1,8}\.\d{0,2}$)|(?:^\d{0,8}$)/
							:/(?:^\d{0,8}$)/;
			if (reg.test(value.trim())){
				if (this.maxVal != -1){
					event.target.value =  this.dynamicModel = (this.maxVal < +value ? this.maxVal : value);
				} else {
					event.target.value =  this.dynamicModel = value;
				}
			} else{
				event.target.value = this.dynamicModel;	//撤销
			}
		}
	},
}
