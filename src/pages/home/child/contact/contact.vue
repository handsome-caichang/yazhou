<style scoped lang="scss">
	@import "../../../../assets/scss/variable.scss";
	@import "../../../../assets/scss/mixin.scss";
	
	.contact-box {
		width: 100%;
		height: 100%;
		.contact {
			height: 100%;
		}
		.empty-page {
			width: 100%;
			height: 100%;
			@include position-absolute;
		}
	}
</style>

<template>
	<div class="contact-box">
		<component
			v-if="requested"
			class="contact"
		    v-bind:is="getComponent"
		    :list="cList"
		    >
		</component>

		<empty-page class="empty-page" 
			type="contact"
			v-if="requested && cList.length === 0">
		</empty-page>
	</div>
</template>

<script>
	// 通讯录班级列表
	import contactClass from './child/contact-class.vue'
	// 通讯录人员列表
	import contactMember from './child/contact-member.vue'
	import {getParentContacts, getTeacherContacts} from 'src/api/jie.js'
	import EmptyPage from 'src/components/common/empty-page/empty-page.vue'

	export default {
		name: "contact",
		data() {
			return {
				contactMember: contactMember,
				contactClass: contactClass,
				cList: [],
				// 拉取联系人的请求是否完成
				requested: false
			}
		},
		computed: {
			...Vuex.mapState(['userWone']),
			// 判断应该用什么组件渲染通讯录列表
			getComponent() {
				if (!this.userWone.IsParent && this.userWone.TeacherRole !== 16) {
					return contactClass
				} else {
					return contactMember
				}
			},
			// 获取联系人接口
			getContactList() {
				return this.userWone.IsParent ? getParentContacts : getTeacherContacts
			}
		},
		methods: {
			loadContactList() {
				this.getContactList()
					.then(res => {
						this.requested = true
						if (res.ErrorCode === app.errok) {
							this.cList = res.Data
						}
					})
			}
		},
		created() {
			if (this.$route.name === 'home' && this.$route.params.homeIndex === "1") {
				this.loadContactList()
			}			
		},
		components: {
			EmptyPage
		},
		watch: {
			$route(to) {
				// console.log(to);
				if (to.name === 'home' && to.params.homeIndex === "1") {
					this.loadContactList()
				}
			}
		}
	}
</script>