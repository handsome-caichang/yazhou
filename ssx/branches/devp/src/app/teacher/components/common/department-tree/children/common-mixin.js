import axios from 'teacher/api/axios-j.js';
export default {
	data() {
		return {
			opened: false, //整个页面的显示
			openedEdit: false, //编辑选择的学员的显示
			_resolve: null,
			validFn: null, //需求:选择员工后验证能不能选.不能选择不能关闭.
		}
	},
	methods: {
		show(type, initEmps, validFn) {
			//打开弹窗
			this.type = type;
			this.opened = true;
			this.$nextTick(() => {
				this.$refs.treeBase.$refs.scroller.refresh();
			});
			this.validFn = validFn;
			this.chosenEmpList = [];
			this.clearKeyWord(); //清除搜索关键字并且重置目录
			this.closeEdit();
			//拿取数据
			if(this.isLoading) {
				this.ajaxGetData().then(res => {
					this.initEmpChosen(initEmps);
				});
			} else {
				this.initEmpChosen(initEmps);
			}

			return new Promise((resolve) => {
				this._resolve = resolve
			});
		},

		initEmpChosen(initEmps) {
			//初始化学员
			if(initEmps) {
				!Array.isArray(initEmps) && (initEmps = [initEmps]);
				initEmps.forEach(item => {
					let emp;
					this._tempEmpList.some(val => {
						if(val.ID == item) {
							emp = val;
						}
						return val.ID == item;
					});
					if(emp) {
						this.chosenEmpList.push({
							id: emp.ID,
							name: emp.Name,
							photo: emp.Photo,
							$data: Object.assign({}, emp),
						})
					}
				});
			}
		},
		returnData() {
			let data = this.type == 1 ? this.$data.chosenEmpList : this.$data.chosenEmpList[this.$data.chosenEmpList.length - 1];
			if(this.validFn && !this.validFn(data)) {
				return;
			} else {
				this.opened = false;
				this._resolve(data);
			}
		},
		showEdit() {
			this.openedEdit = true;
			this.$nextTick(() => {
				this.$refs.editSheet.refresh();
			})
		},
		closeEdit() {
			this.openedEdit = false;
		},
		ajaxGetData() {
			return axios.smajax('getdeparttree',{isemp:1,empstatus:-1}).then(res => {
				_tempEmpList = [];
					let root = {
						id: '',
						name: '',
						subdeparts: res.data,
						subemps: [],					
					} 						
                let data = recursion(root);
				this.initData2(data,_tempEmpList);
				this.isLoading = false;
			})
		},
	}
}


let _tempEmpList = [];

function recursion(tree){
	tree.emps = tree.subemps;

    
	_tempEmpList.push(...tree.emps.map(item=>{
		return {
			Name:item.name,
			ID: item.id,
			Photo:item.photo
		}
    }));
    
    if (tree.name == 'new school test'){
    }
	
	tree.departList = tree.subdeparts.map(item=>{	
		return recursion(item);
    })

    tree.departList = tree.departList.filter(item=>{
		return item.empsTotal; 
	})
    
    tree._emps = [];
    tree._emps.push(...tree.emps);
    tree.departList.forEach(item=>{
        tree._emps.push(...item._emps);
    });
    tree._emps.sort((a,b)=>{
        return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
    })
    tree._emps = tree._emps.filter((item,index,arr)=>{
        return index === 0 || item.id!= arr[index-1].id
    });
    tree.empsTotal = tree._emps.length;
	return tree;
}
