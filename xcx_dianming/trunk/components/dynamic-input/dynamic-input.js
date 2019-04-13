Component({
    properties:{
        dynamicCostUnitShow:{
            type:String,
            value:'',
        },
        unitcode:{
            type:String,
            value:'1'
        }
    },
    data:{
        openedDynamic:false,	//是否显示修改动态课消数量窗口
        maxVal:0,				//限制能填写的最大值,如果是-1表示无限制
        item:null,              //要修改的学生..
        val:0,
        callback:null,
    },
    methods: {
        open(config){
            this.selectComponent('#d').open();
            this.setData({
			    maxVal : config.limitVal,
                val: config.initVal,
                callback:config.callback,
            });
        },
        close(){
            this.selectComponent('#d').close();
        },
		//修改动态课消数量并确认
		submit(){
			this.selectComponent('#d').close();
			this.data.callback && this.data.callback(+this.data.val);
		},
		//为动态课消输入框添加输入限制
		inputDaynamicUpdate({detail}){
            let data = this.data,
                value = detail.value,
			    reg = this.data.unitcode == 2 ? 
							/(?:^\d{1,8}\.\d{0,5}$)|(?:^\d{0,8}$)/
                            :/(?:^\d{0,8}$)/,
                newVal;
			if (reg.test(value.trim())){
				if (data.maxVal != -1){
					newVal =  (data.maxVal < +value ? data.maxVal : value);
				} else {
					newVal = value;
				}
			} else{
				newVal = data.val;	//撤销
            }
            this.setData({val:newVal});
		}
    }
})