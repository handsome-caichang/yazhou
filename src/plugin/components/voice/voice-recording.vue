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
		.voice-btn {
			cursor: pointer;
			color: rgba(30, 136, 245, 1);
			text-align: center;
			div {
				border-radius: 100px;
				border: 1px solid rgba(224, 229, 238, 1);
				background-color: rgba(247, 251, 255, 1);
				width: 100%;
				height: 44px;
				line-height: 44px;
			}
			input[type="button"] {
				color: inherit;
			}
		}
	}
</style>
<template>
	<div class="voice-container">
		<!-- 录制结果 -->
        <voice-list 
            :edit="edit"
            v-for="(item, key) in voiceArr"
            :item="item"
            :index="key"
            :key="item.localId || item.ID || item.id" 
            @delete="deleteVoice">
        </voice-list>

		<!-- 录制按钮 -->
		<div class="voice-btn" v-if="edit">
			<div @click="open">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-luzhiyuyin"></use>
				</svg>
				<span type="button">点击录制语音</span>
			</div>
		</div>
	</div>
</template>
<script>
    import VoiceList from './child/voice-list.vue';

	export default {
		name: "voice-recording",
		props: {
			// 用来区分是否再编辑
			edit: {
				type: Boolean,
				default: false, // false,展示;true,编辑
			},
			audioFileList: {
				type: Array, // 展示时的录音数据
				default: () => {
					return []
				}
            },
            eventType: {
                type: String,
                default: 'press',
                validator: value => value == 'click' || value == 'press'
            }
		},
		data() {
			return {
				voiceArr: [], // 已经完成的录音
                fileIdList: [] // 删除的语音
			};
        },
		methods: {
			open() {
                // 实例化组件
                this.voice = app.voicePopup(this.eventType);

				// 监听录音完成后返回的数据
				this.voice.$on("emitVoices", voices => {
					//将当前完成的录音添加到voiceArr
					this.voiceArr.push(...voices);
					// 当前录音结束，数据通过recordFinished返回到页面
					this.$emit("voiceFinished", this.voiceArr, this.fileIdList);
				});
			},
            deleteVoice(item, key) {
				// smart中为id
                let _id = item.localId || item.ID || item.id;

                // this.voiceArr可能包含服务器上的录音和本地录音
                // 删除服务器上的录音,提交删除的ID
                // 删除新增的录音,移除this.voiceArr的匹配项
                if(item.ID || item.id) {
                    // 被删除的服务器上的录音id
                    this.fileIdList.push(_id);
                }

                // 移除删除的录音
                this.voiceArr.splice(key, 1)

                this.$emit("voiceFinished", this.voiceArr, this.fileIdList);
            }
		},
		watch: {
			audioFileList: {
				handler: function(audioFileList) {
					this.voiceArr = [...audioFileList]
				},
				deep: true
			}
		},
		created() {
			// 对于需要编辑的场景,页面会传入ListAudiofile对象,其中包含
			// Durations, 时长
			// FileLength, 大小
			// FilePath, 服务器路径
			// ID, 文件id
			// Suffix, 文件后缀名

			// 新增或者删除只需返回新增id和删除id即可
			// fileIdList: 'ID,ID', 表示被删除的语音的服务器id

			// 传入的服务器录音
			if(this.audioFileList.length > 0) {
				this.voiceArr = [...this.audioFileList]
			}
        },
        components: {
            VoiceList
        }
	};
</script>