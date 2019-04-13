export default {
	data(){
		return {
			openedSort:false,		//排序方式actionsheet
			keyWord:'',				//搜索关键字
			descStatus:false,
			sortConfig:[
				{
					name:'名字',
					attr:'orderIdx',
				},
				{
					name:'出勤',
					attr:'isAttend',
				},
				{
					name:'计费',
					attr:'isCost',
				},
			]
		}
	},
	methods:{
		//打开缺勤原因
		openSort(item){
			this.openedSort = true;
		},
		selectSortType(obj){
			let item = obj.item;
			this.descStatus = obj.desc;
			this.$refs.listComponent.listClone.sort((a,b)=>{
				if (item.attr == 'orderIdx'){
					return obj.desc ? b[item.attr] - a[item.attr] : a[item.attr] - b[item.attr];
				} else{
					return !obj.desc ? b[item.attr] - a[item.attr] : a[item.attr] - b[item.attr];
				}
			});
		},
		//搜索并排序
		searchList(){
			let listClone = this.$refs.listComponent.listClone;
			//清除样式
			listClone.forEach(item=>{
				item.nameHighlight = item.name
			});
			
			//排序
			let newList = [],
				validIdx,
				name;
			listClone.forEach(item=>{
				name = item.name;
				validIdx = name.indexOf(this.keyWord);
				if (validIdx > -1){
					item.nameHighlight = name.slice(0, validIdx) + 
					`<span  class="high-light0001">${name.slice(validIdx,validIdx+this.keyWord.length)}</span>` +
					name.slice(validIdx + this.keyWord.length,name.length);
					newList.unshift(item);	
				} else {
					newList.push(item);
				}
			})
			this.$refs.listComponent.listClone = newList;
		}
	}
}
