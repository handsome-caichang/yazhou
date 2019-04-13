function getToday() {
    let now = new Date();
    return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
}

const app = getApp();
const conf = {
    data: {
        hasEmptyGrid: false,
        today: getToday(),
        select: ''
    },
    getThisMonthDays(year, month) { //获取一个月有多少天
        return new Date(year, month, 0).getDate();
    },
    getFirstDayOfWeek(year, month) { //获取一个月第一天前有多少个空格
        return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    calculateEmptyGrids(year, month) { //空格
        let firstDayOfWeek = this.getFirstDayOfWeek(year, month),
            empytGrids = [];
        if (firstDayOfWeek > 0) {
            for (let i = 0; i < firstDayOfWeek; i++) {
                empytGrids.push(i);
            }
            this.setData({
                hasEmptyGrid: true,
                empytGrids
            });
        } else {
            this.setData({
                hasEmptyGrid: false,
                empytGrids: []
            });
        }
    },
    calculateDays(year, month) {
        let days = [],
            thisMonthDays = this.getThisMonthDays(year, month);

        for (let i = 1; i <= thisMonthDays; i++) {
            days.push({
                date: year + '-' + month + '-' + i,
                day: i,
            });
        }

        this.setData({
            days
        });
    },
    onLoad(options) { //如果有已选日期，要通过{select:''}传进来
        let date = new Date();
        if (options && options.select) {
            let selArr = options.select.split('-');
            date = new Date(selArr[0], selArr[1] - 1, selArr[2]);
            this.setData({
                select: options && options.select ? options.select : ''
            })
        }

        let cur_year = date.getFullYear();
        let cur_month = date.getMonth() + 1;
        let weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        this.calculateEmptyGrids(cur_year, cur_month);
        this.calculateDays(cur_year, cur_month);
        this.setData({
            cur_year,
            cur_month,
            weeks_ch
        })
    },
    handleYear(e) {
        let handle = e.currentTarget.dataset.handle;
        let cur_year = this.data.cur_year;
        let cur_month = this.data.cur_month;
        if (handle === 'prev') {
            let newMonth = cur_month;
            let newYear = cur_year - 1;
            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
        } else {
            let newMonth = cur_month;
            let newYear = cur_year + 1;
            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
        }
    },
    handleMonth(e) {
        let handle = e.currentTarget.dataset.handle;
        let cur_year = this.data.cur_year;
        let cur_month = this.data.cur_month;
        if (handle === 'prev') {
            let newMonth = cur_month - 1;
            let newYear = cur_year;
            if (newMonth < 1) {
                newYear = cur_year - 1;
                newMonth = 12;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
        } else {
            let newMonth = cur_month + 1;
            let newYear = cur_year;
            if (newMonth > 12) {
                newYear = cur_year + 1;
                newMonth = 1;
            }

            this.calculateDays(newYear, newMonth);
            this.calculateEmptyGrids(newYear, newMonth);
            this.setData({
                cur_year: newYear,
                cur_month: newMonth
            })
        }
    },
    handleChoose(e) { //选择日期
        let selectDate = e.currentTarget.dataset.date,
            dateArr = selectDate.split('-'),
            page = getCurrentPages()[getCurrentPages().length-2];

        page.setData({
            dateInfo: page.getDateByDay(new Date(dateArr[0],dateArr[1]-1,dateArr[2]), 0)
        })
        page.getCourseInfo();
        wx.navigateBack({
            delta: 1
        });
    }
};

Page(conf);