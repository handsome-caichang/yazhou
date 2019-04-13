export default {
    data(){
        return {
            openedCause: false, //缺勤原因统计弹框
            causeParams: {}, //缺勤原因单个学员对象数据
        }
    },
    methods:{
        //查看缺勤原因
        openCountOfAbsence(item){
            this.causeParams = item;
            this.openedCause = true;

        },

    }
}
