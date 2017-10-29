<template>
	<div class="app-wraper wraper">
		<router-view></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import getRules from './router/login.js';
	export default {
		data () {
			return {

			};
		},
		mounted () {
			const _this = this;
			if (!sessionStorage.userMsg) {
				this.$router.push({name: 'Login'});
			} else {
				this.$store.commit('changeRoutes', [{id: 1, pid: 0, path: '/test', name: 'test', component: 'test', meta: ['admin', 'editor']}]);
				getRules(this.$store.getters.routes);
				this.$router.push({name: 'GlobalCouponIndex'});
				console.log('已登录，请求权限');
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	body {
		background: #fafafa;
	}
</style>