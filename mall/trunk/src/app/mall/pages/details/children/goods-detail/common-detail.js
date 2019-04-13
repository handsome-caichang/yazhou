//班级、课程、物品、套餐公用的mixin

export const commonDetail = {
	methods: {
  		showTimeTag(startTime, endTime) {
  			
  			let time1 = Date.parse(new Date(startTime)),
  			 	time2 = Date.parse(new Date(endTime)),
  			 	nowTime = Date.parse(new Date())
  			if ((time2 - time1) < 0) return 

		 	if ((time2 - nowTime) < 0) { //已下架
		 		this.timeTag = 'underShell'
		 		this.timeText = '已下架'
		 		return
		 	}
		 	if ((time1 - nowTime) > 0) { // 还未开售
		 		let startYear = new Date(startTime).getFullYear(),
		 			startMonth = new Date(startTime).getMonth(),
		 			startDate = new Date(startTime).getDate(),//开售年月日

		 			nowYear = new Date().getFullYear(),
		 			nowMonth = new Date().getMonth(),
		 			nowDate = new Date().getDate()//当前年月日
		 			if ((startYear === nowYear) && (startMonth === nowMonth) && (startDate === nowDate)) {
		 				this.timeText = new Date(startTime).getHours() + ':' + new Date(startTime).getMinutes() + '开售'
		 			} else {
		 				this.timeText = startMonth + 1 + '月' + startDate + '日开售'
		 			}
	 				this.remainingTime = parseInt((time1 - nowTime) / 1000) 
		 			this.timeTag = 'notShell'
		 	}
		 	if (((time1 - nowTime) < 0) && ((time2 - nowTime) > 0)) { //正在卖的商品

		 	}

  		}
	}
}
