import {reduceStudent, removeTryStudent,removeStudent,getMachineAttend} from '../../../api/api.js';

const app = getApp();
let CFG = null,
    showMsg = true;

Component({
    attached(){
        CFG = app.globalData.CFG;
        this.setData({
            CFG:app.globalData.CFG,
            courseStudentEdit:app.op('CourseStudentEdit')
        });
    },
    options:{},
    properties:{
        listOrigin:{      //学生数组
            type:Array,
            value:[],
            observer:function(newval,oldval){
                //如果是添加学员...那么保留以前的状态.
                if (oldval.length>0 && newval.length != oldval.length){
                    let list = this.data.list,
                        map = {};
                    list.forEach(item=>{
                        map[item.id] = item;
                    });
                    newval = newval.map(item=> map[item.id] ? map[item.id] : item );
                };
                this.setData({list:JSON.parse(JSON.stringify(newval))});        //克隆一份原始数据                    
                this.triggerEvent('countChange',this.countChange());


                if (newval.length > 0){
                    this.autoCharge();
                }
            }
        },
        config:{
            type:Object,
            value:{}
        },
    },
    data:{
        list:[],            //子组件克隆父组件的数据，但是维持自己的状态。
        IMG:app.globalData.IMG,
        CFG,
        allAttend:false,
        allCost:false,
        fixedHeader:false,
        courseStudentEdit:false,
        outAmountTip:'',
        outAmountPos:{
            topo:0,
            left:0
        }
    },
    methods:{
        render(){
            this.setData({
                list:this.data.list
            });
        },
        dispatcher(event){
            let dataset = event.target.dataset;
            if (dataset.identity === undefined){
                return;
            }
            let [method,index] = dataset.identity.split('-'),
                item = this.data.list[+index];
            switch (method) {
                case 'toggle':
                    this.toggleDelete(item);
                    break;
                case 'attend':
                    this.triggerAttend(item);
                    this.setData({list:this.data.list});
                    this.triggerEvent('countChange',this.countChange());
                    break;
                case 'cost':
                    this.triggerCost(item);
                    this.setData({list:this.data.list});
                    this.triggerEvent('countChange',this.countChange());
                    break;
                case 'costDynamic':
                    this.triggerCostDynamic(item);
                    break;
                case 'try':
                    this.triggerTry(item);
                    this.triggerEvent('countChange',this.countChange());
                    break;
                case 'absent':
                    if (item.isattend == 1){
                        wx.showToast({title:'已标记出勤',icon:'none'});
                    } else{
                        item.isattend ==  0 && this.triggerEvent("openAbsent",{item});
                    }
                    break;
                case 'delete':
                    this.postDeleteStu(item,+index);
                    break;
                case 'phone':
                    if (/^\d+$/.test(item.phone)){
                        wx.makePhoneCall({
                            phoneNumber: item.phone
                        });
                    }
                    break;
            }
        },
        toggleDelete(item){
            if (app.op('CourseStudentEdit') || CFG.showtelwhencourseconfirm == 1){
                item._isShowDelete = !item._isShowDelete;
            }
            this.setData({list:this.data.list});
        },
        triggerAttend(item){
            //计费和出勤必须同步的情况下，如果开启了自动计费，那么不能反勾选出勤
            if (item._isDisableCostAuto && item.iscost>0 && CFG.enableattendcostrelation == '1' && item.isattend == 0){
                wx.showToast({title:'已开启自动计费，不能更改。',icon:'none'});
				return;
            }

            //如果是欠费不能点击的
            if (item._isDisableAttend){
                //@TODO 弹窗提示
                showMsg && wx.showToast({title:`${item.name}学员剩余${this.data.config.unitText}不足,不能出勤计费`,icon:'none'});
            } else {
                item.isattend = +!item.isattend;
                if (item.isattend){
                    item.absentcausename = '';
                    item.absentcauseid = '00000000-0000-0000-0000-000000000000';
                }

                if (item.iscost>0 && item._isDisableCostAuto){	//开启了自动出勤计费,不能修改计费(除非是请假的)
                    return;
                }

                if (	(item.isattend == 0 && item.iscost > 0)	|| 
					(item.isattend > 0 && item.iscost == 0)  ){
                    if (this.data.config.isdynamicconsume == 0){
                        this.triggerCost(item);
                    } else {
                        this.triggerCostDynamic(item,item.isattend>0 ? this.data.config.costConsumeAmount : 0);
                    }
                }

            }
            
        },
        triggerCost(item){
            //如果是欠费不能点击的
            if (item._isDisableCost){
                //@TODO 弹窗提示
                showMsg && wx.showToast({title:`${item.name}学员剩余${this.data.config.unitText}不足,不能计费`,icon:'none'});
            } else if (item.iscost > 0 && item._isDisableCostAuto){
                //@TODO 弹窗提示
                wx.showToast({title:'已开启自动计费，不能更改。',icon:'none'});
            } else {
                item.iscost =  item.iscost == 0 ? this.data.config.costConsumeAmount : 0;
                this.syncCostAndAttend(item);
            }
        },
        triggerCostDynamic(item,changeVal){
            let callback = result=>{
                item.iscost = result;
                this.syncCostAndAttend(item);
                this.setData({list:this.data.list});
                this.triggerEvent('countChange',this.countChange());
            }

            if (item._isDisableCostAuto3 && item.iscost > 0) {	//开启了动态课消自动出勤计费,不能修改计费(除非是请假的)
                changeVal === undefined && wx.showToast({title:"已开启自动计费，不能更改。",icon:'none'});
                return;
            }
            
            if (changeVal === undefined){
                if (item._isDisableCost){
                    //@TODO 弹窗提示
                    wx.showToast({title:'欠费不能计费',icon:'none'});
                } else {
                this.triggerEvent("openDynamic",{
                        callback,
                        initVal:item.iscost,
                        limitVal: CFG.enablecourseconfirmwhenless == 1 ? -1 : (item._remainAmountToUnit < 0 ? 0 : item._remainAmountToUnit)
                    });
                };
            } else {    //点击出勤自动计算计费或自动计费
                if (changeVal == 0){		//反勾选出勤,清除计费
					item.iscost = 0;
				}else if (CFG.enablecourseconfirmwhenless != 1 && item._remainAmountToUnit - changeVal < 0){
					item.iscost = item._remainAmountToUnit < 0 ? 0 : item._remainAmountToUnit;
				} else {
					item.iscost = changeVal;
                }
                this.syncCostAndAttend(item);
                this.setData({list:this.data.list});
                this.triggerEvent('countChange',this.countChange());
            }
        },
        triggerTry(item){
            item.istry = + !item.istry;
            this.setData({list:this.data.list});
        },
        checkAllAttend(firstTime){
            showMsg = false;
            if (this.data.allAttend){//反选
                this.data.list.forEach(item=>{
                    this.triggerAttend(item);
                })
            } else {
                let askForLeave = [];
                this.data.list.forEach(item=>{
                    item.isattendstauts == 0 && item.isattend == 0 && this.triggerAttend(item);
                    item.isattendstauts == 1 && askForLeave.push(item.name);
                })
                askForLeave.length > 0 && firstTime!=='firstTime' && wx.showToast({title:`以下为请假学员:\n${askForLeave.join('\n')}。`,icon:'none'});
            }
            this.setData({list:this.data.list});
            this.triggerEvent('countChange',this.countChange());
            showMsg = true;
        },
        checkAllCost(){
            showMsg = false;
            if (this.data.allCost){//反选
                this.data.list.forEach(item=>{
                    this.triggerCost(item);
                })
            } else {
                this.data.list.forEach(item=>{
                    item.iscost == 0 && this.triggerCost(item);
                })
            }
            this.setData({list:this.data.list});
            this.triggerEvent('countChange',this.countChange());
            showMsg = true;
        },

        checkAllCostDynamic(){
            let callback = res=>{
				this.data.list.forEach(item=>{
					this.triggerCostDynamic(item,res);
				})
				this.setData({list:this.data.list});
                this.triggerEvent('countChange',this.countChange());
            };
            
            //打开动态课消修改窗口,统一给所有计费项目赋予相同的值(如果开启了欠费不能计费,则只能取remainAmount和这个值中的最小值)
            this.triggerEvent("openDynamic",{
                callback,
                initVal: this.data.config.costConsumeAmount,
                limitVal: -1
            });
        },
        
        //计费和出勤必须同步的情况
        syncCostAndAttend(item){
            return;
            if (CFG.enableattendcostrelation == '1'){
                if ((item.iscost > 0 && item.isattend == 0) || (item.iscost == 0 && item.isattend > 0)){
                    item.isattend = + Boolean(item.iscost);
                    if (item.isattend){
                        item.absentcausename = '';
                        item.absentcauseid = '00000000-0000-0000-0000-000000000000';
                    }
                }
            }
        },

        countChange(){  //统计出勤,计费,试听
            let list = this.data.list,
                attend = 0,cost = 0,try_ = 0,
                allAttend = true,
                allCost = true;
            list.forEach(item=>{
                item.isattend == 1 && attend++;
                item.iscost > 0 && cost++;
                item.istry == 1 && try_++;

                if (item.isattend == 0 && !item._isDisableAttend){
                    allAttend = false;
                }
                if (item.iscost == 0 && !item._isDisableCost){
                    allCost = false;
                }
            })
            this.setData({
                allAttend,
                allCost
            })
            return {
                attend,
                cost,
                try_,
                total:list.length
            }
        },

        postDeleteStu(deleteStu,index){
            let params,send,tip;

            params = {
                id: this.data.config.courseid,
                student: deleteStu.id,
                UsePlatform:4,
            };
            if (deleteStu.adjustflag == 3){//临加
                tip = `确定从当前上课记录中移除${deleteStu.name}学员吗?`;
                send = removeStudent;	//请求
            } else {	//一般学员,临调和试听.
                params.students = params.student;
                delete params.student;
                tip = `确定将学员“${deleteStu.name}”从该堂课中移除（可在临时调课功能中撤销）？`;
                if (deleteStu.adjustflag == 2 || deleteStu.istry == 1){
                    send = removeTryStudent;
                    params.type = deleteStu.adjustflag == 2 ? 0 : 1;
                } else {
                    send = reduceStudent;
                }
            };
            app.Util.confirm(tip).then(flag => {
                if(flag) {
                    send(params).then(res => {
                        if (res.errorcode == 200){
                            this.data.list.splice(index, 1);
                            this.setData({
                                list:this.data.list
                            });
                            this.triggerEvent('countChange',this.countChange());
                            wx.showToast({title: '移除学员成功。',icon:'none'});
                        } else {
                            wx.showToast({title: res.errormsg,icon:'none'});
                        }
                    });
                }
            });
        },
        //验证点名上课,返回提交数据
        checkFlag(){
            let list = this.data.list;
            if (list.length === 0){
                wx.showToast({
                    title:'该班级未安排学员，不能点名。',
                    icon:'none'
                });
                return false;
            }

            let flag = list.some(item=>{
                return (item.isattend!=0 || item.iscost!=0 || item.istry!=0 || (item.absentcauseid!='' && item.absentcauseid!="00000000-0000-0000-0000-000000000000"));				
            })
			if (!flag){
				wx.showToast({
                    title:"请选择学员的出勤、计费等状态",
                    icon:"none"
                });
				return false;
            }
            
            let checkList = [],
				submitData = [];
			submitData = list.map(item=>{
				if (item.isattend==1){
					checkList.push(item);
				}
				return item.id + "|" + item.isattend + "|" + item.iscost + "|" + item.istry + "|" + item.absentcauseid + "|" + item.remainamount;
			});
			return {
				checkIDs:checkList.map(item=>item.id).join(','),
				data:submitData.join(',')
			}
        },
        //自动处理:考勤打卡或自动出勤计费
        autoCharge(){
            let list = this.data.list,
                config = this.data.config;

            if(CFG.classautocharge != 0 &&  this.data.config.isonetoone == 0 && !this.data.allAttend && config.finished == 0) {
                this.checkAllAttend('firstTime');
            } else if(CFG.enablemachineattendance == 1 && list.length > 0) {
                //开启了打卡签到
                let params = {
                    CourseID: config.courseid,
                    StudentIDs: list.map(item => item.id).join(','),
                    UsePlatform:4,
                }
                getMachineAttend(params).then(res => {
                    if(res.errorcode == 200) {
                        let result = res.data;
                        //this.showMsg = false;
                        list.forEach(item => {
                            item.machineChecked = result.indexOf(item.id) > -1;
                            if(item.machineChecked && item.isattend == 0 && config.finished == 0) { //如果打卡自动勾选出勤
                                this.triggerAttend(item);
                            }
                        });
                        this.setData({list:this.data.list});
                        // this.showMsg = true;
                        this.triggerEvent('countChange',this.countChange());
                    } else {
                        wx.showToast({title:res.errormsg,icon:"none"});
                    }
                })
            }
        },
        
        //@TODO 过期费用展示.
        warnOutAmount({currentTarget}){
            if (this.data.outAmountTip != ''){
                return;
            }

            let item = this.data.list[currentTarget.dataset.index],
                left = currentTarget.offsetLeft,
                top = currentTarget.offsetTop;

            setTimeout(()=>{
                wx.createSelectorQuery().in(this).select('.outAmount-tip').boundingClientRect(rect=>{
                    this.setData({
                        outAmountPos:{
                            top: top - rect.height - 4 ,
                            left: left - rect.width/2 + 8
                        }
                    });
                }).exec();
            },0);           
            this.setData({outAmountTip:item.outamount + this.data.config.unit});

            setTimeout(()=>{
                this.setData({outAmountTip:''});
            },2000)
        }
    },
});