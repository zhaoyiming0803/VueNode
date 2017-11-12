<template>
	<div class="app-wraper wraper">
		<router-view></router-view>
	</div>
</template>

<script>
	import laydate from '../static/laydate/laydate.js';
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
				this.$store.commit('changeRoutes', [
					{
						id: 1, 
						pid: 0, 
						path: '/test', 
						name: 'Test', 
						component: 'test', 
						meta: ['admin', 'editor']
					}
				]);
				getRules(this.$store.getters.routes);
				this.$router.push({name: 'Test'});
				console.log('已登录，请求权限');
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import '../static/css/tour-app-base.css';
	body {
		background: #fafafa;
	}
</style>