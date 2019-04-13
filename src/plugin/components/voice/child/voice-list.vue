/**
 * @Author: Sa 
 * @Date: 2017-12-12 10:37:10 
 * @Last Modified by: Sa
 * @Last Modified time: 2018-02-13 11:38:28
 * @Descript: actions-sheet子组件基础封装
 */
<style lang="scss" scoped>
	@import "src/plugin/scss/variable.scss";
	@import "src/plugin/scss/mixin.scss";
    .voice-container {
        &:last-child {
            >.vocie-list {
                margin-bottom: 0;
            }
        }
        .vocie-list {
            width: 100%;
            height: 40px;
            text-align: left;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 15px;
            .span {
                height: 40px;
                background-color: #1e88f5;
                line-height: 40px;
                border-radius: 2px;
                border: 1px solid #1e88f5;
                cursor: pointer;
            }
            .voice-item {
                width: 58.8%;
                background-repeat: no-repeat;
                background-size: 20px;
                background-position: 5px center;
                position: relative;
                .duration {
                    position: absolute;
                    right: 0;
                    color: #ffffff;
                    margin-right: 15px;
                }
            }
            .btn-del {
                width: 40px;
                margin-left: 4px;
                text-align: center;
            }
        }
    }
</style>
<template>
    <div class="voice-container">
        <div class="vocie-list">
            <div class="span voice-item" 
                @click="playVoice(item.localId || item.FilePath || item.filepath, $event)" 
                :style="{'background-image': 'url('+ bgimg +')'}">
                <span v-if="item.FileLength||item.filelength > 0" class="duration">{{item.FileLength || item.filelength}}"</span>
            </div>
            <div class="span btn-del" @click="delVoice(item, index)" v-if="edit">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shanchuyuyin1"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
    let voicePng = require("../img/leftvoice1.png")
    let voiceGif = require("../img/leftvoice_play1.gif")

	export default {
		name: "voice",
		props: {
			// 用来区分是否再编辑
			edit: {
				type: Boolean,
				default: false, // false,展示;true,编辑
            },
            item: {
                type: Object,
                default: null
            },
            index: {
                type: Number
            }
		},
		data() {
			return {
				status: 0,
				dom: null
			};
        },
        computed: {
            bgimg() {
                if (this.status === 2) {
                    return voiceGif
                } else {
                    return voicePng
                }
            }
        },
		methods: {
            // 语音加载中....
            _onloading() {
                this.status = 1;
            },
            // 语音开始播放....
            _onplaying() {
                this.status = 2;
            },
            // 回到默认状态...
            _ondefault() {
                this.status = 0;
            },
			// 播放语音
			playVoice(voiceId, event) {
                if (this.status == 0) {
                    this.dom = event.target;
                    let opt = {
                        loading: this._onloading,
                        playing: this._onplaying,
                        end: this._ondefault,
                        endAuto: this._ondefault,
                        error: this._ondefault
                    };
                    app.voice.play(voiceId, opt);
                } else {
                    app.voice.stop();
                }
			},
			// 删除语音
			delVoice(item, index) {
                // 删除时停止正在播放的语音
                app.voice.flag && app.voice.stop();

                this.$emit('delete', item, index);
            }
		},
        // 离开前停止正在播放的语音
		beforeDestroy() {
            app.voice.flag && app.voice.stop();
		}
	};
</script>