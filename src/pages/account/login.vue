<template>
	<div class="account-container">
		<form class="account-container-form" v-on:submit.prevent="login">
			<p>
				<span class="phone-ico"></span>
				<input type="text" placeholder="请输入手机号" maxlength="11" class="phone" v-model.lazy.trim="phone" />
			</p>
			<p>
				<span class="pwd-ico"></span>
				<input type="password" placeholder="请输入密码" class="pwd" v-model.lazy.trim="pwd" />
			</p>
			<p>
				<input type="submit" value="登	录" class="account-btn" />
			</p>
			<!-- <router-link tag="a" class="phone-prompt" :to="{name: 'ForgetPwdFirstStep'}">忘记密码</!-->
		</form>
	</div>
</template>

<script lang="ts" scoped>
	import { Component, Vue } from 'vue-property-decorator';
	import { login } from '@/api/account';
	import { validatePhone, validatePassword } from '@/utils/index';

	@Component
	export default class Login extends Vue {
		private phone: string = '';
		private pwd: string = '';

		private mounted () {
			let $sessionStorage = window.sessionStorage;
			if (!$sessionStorage) {
				alert('为保证您可以正常使用我们的产品，请关闭浏览器的无痕浏览模式！');
				return;
			}
			if ($sessionStorage.userMsg && JSON.parse($sessionStorage.userMsg).id) {
				this.$router.push({name: 'GlobalCouponIndex'});
			}
		}

		login () {
			if (!validatePhone(this.phone)) {
				return this.$dialog.alert({
					message: '手机号码格式不正确，请重新输入！'
				});
			}

			if (!validatePassword(this.pwd)) {
				return this.$dialog.alert({
					message: '密码需要至少6位数，请重新输入！'
				});
			}

			login(this.phone, this.pwd)
				.then(res => {
					const { code, data, message } = res.data;
					if (code === 0) {
						window.sessionStorage.user_info = JSON.stringify(data);
					} else {
						this.$dialog.alert({ message });
					}
				})
				.catch(error => {
					this.$dialog.alert({ message: error });
				});
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-account.less";
</style>