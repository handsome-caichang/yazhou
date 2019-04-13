<style scoped lang="scss">
	.slider-group {
		overflow-x: hidden;
		height: 100%;
		.content {
			width: 100%;
			height: 100%;
			position: relative;
		}
	}
</style>

<template>
	<div class="slider-group" ref="sliderGroup">
		<div class="content" ref="content">
			<slot></slot>
		</div>
	</div>
</template>

<script type="text/javascript">
	let eventType = {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,
		mousedown: 2,
		mousemove: 2,
		mouseup: 2,
	}

	export default {
		data() {
			return {
				timeoutEvent: 0,
				startX: null,
				startY: null,
				endX: null,
				endY: null,
				diff: 0,
				direction: 0,
				positionX: 0,
				flag: false,
				initiated: 0
			}
		},
		methods: {
			getSlideAngle(dx,dy) {
	          	return Math.atan2(dy,dx) * 180 / Math.PI;
	        },
	        getSlideDirection(startX,startY, endX, endY) {
                let dy = startY - endY;
	            let dx = endX - startX;
	            let result = 0;
                //如果滑动距离太短
		        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
		            return result;
		        }
	            let angle = this.getSlideAngle(dx, dy);
	            if (angle >= -30 && angle < 30) {
	                result = 4;//右边
	            }else if (angle >= 30 && angle < 150) {
	                result = 1;//上边
	            }else if (angle >= -150 && angle < -30) {
	                result = 2;//下边
	            }else if ((angle >= 150 && angle <= 180) || (angle >= -180 && angle < -150)) {
	                result = 3;
	                //左边
	            }
                return result;
	        },
	        moveBack(flag) {
	        	if (flag) {
	        		this.$refs.content.style.transition = ''
	        	} else {
	        		this.$refs.content.style.transition = 'all 0.3s'
	        	}
	        	this.$refs.content.style.left = 0
	        	this.diff = 0
	        },
	        eventStartHandle(ev) {
	        	this.initiated = eventType[ev.type];
				this.$refs.content.style.transition = ''
				this.positionX = parseInt(this.$refs.content.style.left) || 0

				let point = ev.touches ? ev.touches[0] : ev

	          	this.startX = point.pageX;
	          	this.startY = point.pageY; 
	          	this.flag = true;
	        },
	        eventMoveHandle(ev) {
	        	if (eventType[ev.type] !== this.initiated) {
	        		return;
	        	}

	        	let point = ev.touches ? ev.touches[0] : ev

		        let moveX = point.pageX;
		        let moveY = point.pageY;
		        let direction = this.getSlideDirection(this.startX, this.startY, moveX , moveY)
		        if (direction == 1 || direction == 2) {
		        	this.flag = false
		        	this.moveBack()
		        }

	        	let diff = moveX - this.startX
	        	if (diff < -49) diff = -49
	        	if (diff > 49) diff = 49
		        if (direction == 3 && this.positionX !== -49 && this.flag) {
		        	this.$refs.content.style.left = diff + 'px'
		        }
		        if (direction == 4 && this.positionX !== 0 && this.flag) {
		        	this.$refs.content.style.left = -(49 - diff) + 'px'
		        }

	        },
	        eventEndhandle(ev) {
	        	if (eventType[ev.type] !== this.initiated) {
	        		this.initiated = 0; // jie 新增的一行代码;
	        		return;
	        	}
	        	this.initiated = 0;

	        	let point = ev.changedTouches ? ev.changedTouches[0] : ev

	        	this.endX = point.pageX;
	        	this.endY = point.pageY
	        	this.direction = this.getSlideDirection(this.startX, this.startY, this.endX , this.endY)
	        	if (this.positionX == 0 && this.direction == 4) {
	        		return
	        	}
	        	if (this.positionX == -49 && this.direction == 3) {
	        		this.moveBack()
	        		return
	        	}
	        	if (this.direction == 1 || this.direction == 2) {
	        		return
	        	}
	        	this.diff = this.endX - this.startX
	        	if (this.direction == 0 || this.direction == 1 || this.direction == 2) return
	        	this.$refs.content.style.transition = 'all 0.3s'
	        	if (this.diff < -49) this.diff = -49
	        	if (this.diff > 49)  this.diff = 49
	        	if (this.direction == 3 && this.positionX !== -49 && this.flag) {
	        		if (Math.abs(this.diff) <= 25 ) {
	        			this.$refs.content.style.left = 0
	        			this.diff = 0;
	        			
	        		}
	        		if (Math.abs(this.diff) >= 25 && Math.abs(this.diff) < 49) {
	        			this.$refs.content.style.left = -49 + 'px'
	        			this.diff = -49
	        		}
	        	}

	        	if (this.direction == 4 && this.positionX !== 0 && this.flag) {
	        		if (Math.abs(this.diff) <= 25 && this.diff > 0) {
	        			this.$refs.content.style.left = -49 + 'px'
	        			this.diff = 49
	        		}
	        		if (Math.abs(this.diff) >= 25 && Math.abs(this.diff) < 49) {
	        			this.$refs.content.style.left = 0
	        			this.diff = 0
	        		}
	        	}
	        	this.startX = null
	        	this.startY = null
	        	this.endX = null
	        	this.endY = null
	        	this.flag = false
	        },
			addEvent() {
				this.$refs.content.addEventListener('touchstart', this.eventStartHandle, false)
				this.$refs.content.addEventListener('touchmove', this.eventMoveHandle, false)
				this.$refs.content.addEventListener('touchend', this.eventEndhandle, false)
				
				this.$refs.content.addEventListener('mousedown', this.eventStartHandle, false)
				this.$refs.content.addEventListener('mousemove', this.eventMoveHandle, false)
				this.$refs.content.addEventListener('mouseup', this.eventEndhandle, false)
			}
		},
		mounted() {
			this.$nextTick(() =>{
				this.addEvent()
			})
		},
		watch: {
			diff(val) {
				if(val == -49) {
					this.$emit('changeStatus', {
						status: true,
						component: this
					})
				}
				if(val == 0) {
					this.$emit('changeStatus', {
						status: false,
						component: this
					})
				}
			}
		}
	}
</script>