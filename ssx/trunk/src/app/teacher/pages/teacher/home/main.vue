<!-- 首屏 -->
<template>
	<component :is="current"></component>
</template>

<script>
    import MainTeacher from "./child/main-teacher";
    import MainMaster from "./child/main-master";
	
	export default {
        name: 'main-page',
        computed:{
            ...Vuex.mapState([
				'currole'
            ]),
            current(){
                return this.currole.Id == 1024 ? MainMaster : MainTeacher
            }
		}
	}
</script>