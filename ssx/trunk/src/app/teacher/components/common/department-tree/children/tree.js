/**
 * 说明(前提):
 * 后台返回的数组(部门)为深度优先遍历树,满足:
 * 1.根节点(root)为数组的第一个元素
 * 2."后代"(不止直接子代)节点在数组中的位置(index)一定小于祖先节点
 * 3.一个节点的所有"后代"节点的位置为从该节点的位置后一个开始,连续的n个位置.
 */

/**
 * 此函数返回以node为祖先的树结构对象(包含node和node的所有后代节点),
 * 递归调用
 * 
 * @param {Object} node  祖先node,还未包含后代信息,规范化了每个节点的数据结构
 * @param {Number} index 祖先node在list中的位置
 * @param {Array}  list  深度优先遍历结果的数组,后台返回.
 * 
 * @returns {Object}  返回一个树结构对象
 * 
 */
/*
 	 说明:list的元素的数据结构为单个
 	{
 		ID:"",
 		PID:"",		   //父亲节点的ID
 		Name:"",		//校区或部门名字
 		
 		//-------------------------------以下不做处理
 		IsCampus:0,    //是否校区,0是部门,1是校区 ->校区下面不可以再建校区
 		Type:1		   //职能
  	}
  	
  	希望转化为的树形数据结构为对象
  	{
  		id:"",
  		name:"",
  		departList:[],		//直接子代节点的数组,递归结构.
  		
  		//--------------------部门的下面可能会挂上"人员"相关属性,如员工
  		//说明:这种属性在我们系统里和"部门"性质不同,属于"叶子"节点,不可以在员工下面,再挂载员工.
  		empList:[],		//直接挂在该节点下的员工(子代)
  		empCount:0,		//设计需求,这个值用来储存当前节点所有后代的员工总和.
  	}
 * 
 */

export function transformTree(list){
	let index = 0;
	let root = {
		id: list[0].ID,
		name: list[0].Name,
		departList:[]
	}
	return recursiveTree(root);
	function recursiveTree(zNode){
		let pid = zNode.id.toLowerCase();
		//从当前节点往后挨个找子代节点
		index++;
		
		while (index < list.length){
			let item = list[index];
			if ((item.PID || item.parentId).toLowerCase() === pid){	//如果是子节点
				//构建子节点对象
				let childNode = {
					id: item.ID,
					name: item.Name,
					departList:[]
				};
				let childTree = recursiveTree(childNode);
				zNode.departList.push(childTree);
				index++;
			} else {//没有子节点或已经找完了子节点
				index--;	//保证返回的时候index指向的是返回的节点的当前位置.
				return zNode;
			}
		}
		return zNode;
	}
}


/**
 * 新增需求->员工结构树
 * 1.在部门树里增加员工属性(数组)
 * 2.统计每个节点下面的员工人数,没有员工则节点不加入这棵树.
 */

export function transformEmpTree(list,empList){
	empList = [...empList];
	if (list.length == 0){
		return {}
	};
	let index = 0;
	let root = {
		id: list[0].ID,
		name: list[0].Name,
		departList: [],
		emps: [],
		empsTotal:0,			//是自己和后代所有员工总和
		$data: Object.assign({},list[0]),
	}
	return recursiveTree(root);
	function recursiveTree(zNode){
		serachEmp(zNode,empList);	//统计员工
		
		let pid = zNode.id.toLowerCase();
		//从当前节点往后挨个找子代节点
		index++;
		
		while (index < list.length){
			let item = list[index];
			if ((item.PID || item.parentId).toLowerCase() === pid){	//如果是子节点
				//构建子节点对象
				let childNode = {
					id: item.ID,
					name: item.Name,
					departList:[],
					emps: [],
					empsTotal:0,			//是自己和后代所有员工总和
					$data: Object.assign({},item),
				};
				let childTree = recursiveTree(childNode);
				//有员工才加入树
				if (childTree.empsTotal){
					zNode.departList.push(childTree);
					zNode.empsTotal += childTree.empsTotal;
				}
				index++;
			} else {//没有子节点或已经找完了子节点
				index--;	//保证返回的时候index指向的是返回的节点的当前位置.
				return zNode;
			}
		}
		return zNode;
	}
}

//这个过程总在刚开始处理这个节点时.先构造和统计自己节点下面的员工(不包含后代)
function serachEmp(zNode,empList){
	let i = 0,
		len = empList.length,
		emp;
	for (;  i < len; i++){
		emp = empList[i];
		if (emp.DepartID.toLowerCase() == zNode.id.toLowerCase()){
			//构造emp对象
			let empNode = createEmpNode(emp);
			zNode.emps.push(empNode);
			empList.splice(i,1);
			i--;
			len--;
		}
	}
	zNode.empsTotal = zNode.emps.length;
}

export function createEmpNode(emp){
	return 	{
		id: emp.ID,
		name: emp.Name,
		photo: emp.Photo,
		$data: Object.assign({},emp),
	}
}