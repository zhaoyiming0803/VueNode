<template>
	<div class="app-wraper wraper">
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {

			};
		},
		mounted () {
			const _this = this;
			this.$router.push({name: 'Login'});
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	body {
		background: #fafafa;
	}
</style>