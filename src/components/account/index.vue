<template>
	<!-- 登录、注册、找回密码等父组件 -->
	<div class="account-wraper">

		<explain v-bind:explainName="explainName" v-bind:isAccount="isAccount"></explain>

		<div class="account-check">
			<router-link tag="div" :to="{name: 'Login'}" active-class="this-account-model" class="account-check-btn"><span>登录</span></router-link>
			<router-link tag="div" :to="{name: 'Regist'}" active-class="this-account-model" class="account-check-btn"><span>注册</span></router-link>
		</div>

		<router-view></router-view>

	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';

	export default {
		data () {
			return {
				isAccount: true,
				explainName: '欢迎来到锦囊团'
			}
		},
		components: {
			explain
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "./tour-app-account.less";
</style>