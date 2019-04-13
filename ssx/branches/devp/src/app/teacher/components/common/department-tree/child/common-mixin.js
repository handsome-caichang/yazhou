import axios from 'teacher/api/axios-j.js';
export default {
	data() {
		return {
			opened: false, //整个页面的显示
			openedEdit: false, //编辑选择的学员的显示
			_resolve: null,
			validFn: null, //需求:选择员工后验证能不能选.不能选择不能关闭.
			originData: null, //从后台传输的数据
			EnableEmpIsClassTearcher: app.sysInfo.EnableEmpIsClassTearcher == '1', //配置项,开启的情况下,有可能只显示部分老师
		}
	},
	methods: {
		show(type, initEmps, validFn, onlyShowTeacher) {
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
			this.ajaxGetData().then(res => {
				let cloneRes = Object.assign({}, res);
				if (this.EnableEmpIsClassTearcher && onlyShowTeacher) {
					cloneRes.EmployeeList = filterEmp(res.EmployeeList);
				}
				this.initData(cloneRes);
				this.initEmpChosen(initEmps);
			});

			return new Promise((resolve) => {
				this._resolve = resolve
			});
		},

		initEmpChosen(initEmps) {
			//初始化学员
			if (initEmps) {
				!Array.isArray(initEmps) && (initEmps = [initEmps]);
				initEmps.forEach(item => {
					let emp;
					this._tempEmpList.some(val => {
						if (val.ID == item) {
							emp = val;
						}
						return val.ID == item;
					});
					if (emp) {
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
			if (this.validFn && !this.validFn(data)) {
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
			if (this.isLoading) {
				this.originData = axios.ajax('/api/Depart/QueryWithEmployeeRight').then(res => {
					if (res.ErrorCode == app.errok) {
						this.isLoading = false;
						return res.Data;
					} else {
						app.toast("error", res.ErrorMsg);
						return [];
					}
				});
			}
			return this.originData;
		},
	}
}

function filterEmp(params) {
	return params.filter(item => item.IsClassTeacher == 1);
}