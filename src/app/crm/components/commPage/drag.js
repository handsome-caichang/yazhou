let eventType = {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2
}


export const dragMixin = {
    data() {
        return {
            dom: '',
            startX: '',
            startY: '',
            height: ''
        }
    },
    methods: {
        eventStartHandle(ev) {
            // console.log(ev);
            let point = ev.touches ? ev.touches[0] : ev

        },
        eventMoveHandle(ev) {
            let point = ev.touches ? ev.touches[0] : ev
            let moveX = point.pageX
            let moveY = point.pageY
            let clientWidth = document.body.clientWidth
            let clientHeight = document.body.clientHeight
            if (moveX < 27) moveX = 29
            if (moveX > clientWidth - 27) moveX = clientWidth - 29
            if (moveY < 116) moveY = 119
            if (moveY > clientHeight - 77) moveY = clientHeight - 77
            this.dom.style.left = moveX - 28 + 'px'
            this.dom.style.top = moveY - 116 + 'px'

        },
        eventEndhandle(ev) {

        },
        addEvent() {
            // this.dom.addEventListener('touchstart', this.eventStartHandle, false)
            this.dom && this.dom.addEventListener('touchmove', this.eventMoveHandle, false)
            // this.dom.addEventListener('touchend', this.eventEndhandle, false)

            /*this.$refs.add.addEventListener('mousedown', this.eventStartHandle, false)
            this.$refs.add.addEventListener('mousemove', this.eventMoveHandle, false)
            this.$refs.add.addEventListener('mouseup', this.eventEndhandle, false)*/
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.dom = this.$refs.add && this.$refs.add.$el
            this.addEvent()
        })
    },
    watch: {
        params: {
            handler: function(val, oldVal) {
                this.$nextTick(() => {
                    this.dom = this.$refs.add && this.$refs.add.$el
                    this.addEvent()
                })
            },
            deep: true
        }
    }
}