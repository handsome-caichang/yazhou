const range = {
    data(){
        return {
            dateObj: {
                id: "week" //默认星期
            }, //时间间隔对象
        }
    },
    computed: {
        dateIcon() {
            let icon = "#icon-zhou";
            let obj = this.dateObj;
            if (obj.id == "day") {
                icon = "#icon-tian";
            } else if (obj.id == "week") {
                icon = "#icon-zhou";
            } else if (obj.id == "month") {
                icon = "#icon-yue";
            }
            return icon;
        },
        range() {
            if (this.dateObj.id == "day") {
                return this.pagingOption.params.rangestart;
            }
            return this.pagingOption.params.rangestart + "~" + this.pagingOption.params.rangeend;
        }
    },
    methods: {
        changeTime(type) {
            //时间切换后的整理
            let res = this.getNextTime(this.dateObj.id, this.pagingOption.params.rangestart, type);
            let newDate =
                typeof res == "object" ? new Date(res[0]) : new Date(res);
            let now = new Date();
            if (typeof res == "object") {
                if (newDate.getFullYear() > now.getFullYear()) {
                    return;
                } else if (
                    newDate.getFullYear() == now.getFullYear() &&
                    newDate.getMonth() > now.getMonth()
                ) {
                    return;
                } else if (newDate.getDate() > now.getDate() + 7) return;
                else {
                    this.pagingOption.params.rangestart = res[0];
                    this.pagingOption.params.rangeend = res[1];
                }
            } else {
                if (newDate > now) return;
                this.pagingOption.params.rangestart = res;
            }
            this.refreshTabel();
        },
        refreshTabel() {
            this.$refs.table&&this.$refs.table.pagingRefresh();
        },
        afterTimerFilter(obj) {
            this.dateObj = obj;
            //选择时间区域后的初始化处理
            console.log(obj);
            if (obj.id == "week") {
                this.pagingOption.params.rangestart = app.tool.getDatesByIndex(
                    2,
                    this.pagingOption.params.rangestart
                ).sdate;
                this.pagingOption.params.rangeend = app.tool.getDatesByIndex(
                    2,
                    this.pagingOption.params.rangestart
                ).edate;
            }

            if (obj.id == "month") {
                let centerDay = new Date(this.pagingOption.params.rangestart);
              
                centerDay.setDate(centerDay.getDate());
                this.pagingOption.params.rangestart = app.tool.getDatesByIndex(5, centerDay).sdate;
                this.pagingOption.params.rangeend = app.tool.getDatesByIndex(5, centerDay).edate;
            }

            this.refreshTabel();
        }, //时间选择后图标变更
        getNextTime(type, localTime, direction) {
            let fmt = "yyyy-MM-dd";
            let today = new Date(localTime) || new Date(),
                start,
                end;
            if (type === "day") {
                if (direction) today.setDate(today.getDate() + 1);
                else today.setDate(today.getDate() - 1);
                return app.filters.formatDatetime(today, fmt);
            }
        
            if (type === "week") {
                if (direction) today.setDate(today.getDate() + 7);
                else today.setDate(today.getDate() - 7);
                return [
                    app.filters.formatDatetime(today, fmt),
                    app.tool.getDatesByIndex(2, today).edate
                ];
            }
        
            if (type === "month") {
                if (direction) today.setMonth(today.getMonth() + 1);
                else today.setMonth(today.getMonth() - 1);
                return [
                    app.filters.formatDatetime(today, fmt),
                    app.tool.getDatesByIndex(5, today).edate
                ];
            }
        }
    }
}
export default range