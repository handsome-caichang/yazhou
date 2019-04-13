export default {
    getComputedD: (state) => {
        let h = 0, d = 0;
        let endTimeSecond = state.endTime - state.curTime;
        if (endTimeSecond > 3600) h = parseInt(endTimeSecond / 3600);
        if (h < 10) h = "0" + h;
        if (h > 24) {
            d = parseInt(h / 24);
        }
        return d;
    },
    getComputedH: (state) => {
        let h = 0;
        let endTimeSecond = state.endTime - state.curTime;
        if (endTimeSecond > 3600) h = parseInt(endTimeSecond / 3600);
        if (h > 24) {
            h = h -  ( 24 *  parseInt(h / 24) ) ;
        }
        if (h < 10) h = "0" + h;
        return h;
    },
    getComputedM: (state) => {
        let m = 0;
        let endTimeSecond = state.endTime - state.curTime;
        if (endTimeSecond > 60) m = parseInt(endTimeSecond / 60);
        if (m > 60) m = m % 60;
        if (m < 10) m = "0" + m;
        return m;
    },
    getComputedS: (state) => {
        let s = 0;
        let endTimeSecond = state.endTime - state.curTime;
        s = endTimeSecond % 60;
        if (s <= 0) {
            s = "00";
        }else if (s < 10) {
            s = "0" + s;
        } 
        return s;
    }
}