<style lang="scss" scoped>
	// @import "../../../assets/scss/variable.scss";
	// @import "../../../assets/scss/mixin.scss";

</style>

<template>
	<contact-member :list="cList"></contact-member>
</template>

<script>
import ContactMember from '../home/child/contact/child/contact-member.vue'
import {getClassStudents} from 'src/api/jie.js'

export default {
	name: 'contact-class-member',
	data () {
		return {
			wxTitle: this.$route.params.className,
			cList: []
		}
	},
	computed: {
	},
	methods: {
	},
	created() {
		getClassStudents({classID: this.$route.params.classID})
			.then(res => {
				if (res.ErrorCode === app.errok) {
					this.cList = res.Data
				}
			})
	},
	components: {
		ContactMember
	}
}
</script>

