Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        clazz: {
            type: String,
            value: 'bottom'
        },
    },
    data: {
        isOpen: false, //display开关
        isOpenAnimate: false, //动画开关
    },
    methods: {
        close() {
            this.setData({
                isOpenAnimate: false
            });
            setTimeout(() => {
                this.setData({
                    isOpen: false
                });
            }, 200);
            this.triggerEvent("close");
        },
        open() {
            this.setData({
                isOpen: true
            });
            setTimeout(() => {
                this.setData({
                    isOpenAnimate: true
                });
            }, 50);
        }
    }
})