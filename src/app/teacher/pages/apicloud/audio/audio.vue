<style lang="scss" scoped>
    .header {
        height: 40px;
    }
</style>

<template>
    <div>
        <div class="header">测试语音ing...</div>
        <!-- 语音 -->
        <voice-recording 
            eventType="click"
            :edit="true" 
            @voiceFinished="voiceFinished">
        </voice-recording>
    </div>
</template>

<script>
	// import ClassList from "./child/class-list";
	// import {savePost,getUploadToken} from "teacher/api/common";
	
	export default {
		name: "voice-page",
		data() {
			return {
                wxTitle: "测试语音",
				voice: {},
                voiceUploadOp: {
                    add: [],
                    del:[]
                },
			};
        },
		methods: {
			// 结束录音获取录音数据，object
			voiceFinished(voice, del) {
                this.voiceUploadOp.add = voice;
			}
		}
	};
</script>