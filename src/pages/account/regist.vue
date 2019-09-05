<template>
	<div class="account-container">
		<form v-on:submit.prevent="regist" class="account-container-form">
			<p>
				<span class="phone-ico"></span>
				<input type="text" placeholder="请输入手机号" maxlength="11" class="phone" v-model.lazy.trim="phone" />
			</p>
			<p>
				<span class="pwd-ico"></span>
				<input type="password" placeholder="请输入至少6位数的密码" class="pwd" v-model.lazy.trim="pwd" />
			</p>
			<p>
				<span class="pwd-ico"></span>
				<input type="password" placeholder="确认密码" class="pwd" v-model.lazy.trim="confirmPwd" />
			</p>
			<p>
				<input type="submit" value="注	册" class="account-btn" />
			</p>
		</form>
	</div>
</template>

<script lang="ts" scoped>
	import { Component, Vue } from 'vue-property-decorator';

	import { regist } from '@/api/account';

	export default class Regist extends Vue {
		private phone: string = '';
		private pwd: string = '';
		private confirmPwd: string = '';

		private regist () {
			if (!(/^((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8})$/).test(this.phone)) {
				alert('手机号码格式不正确，请重新输入！');
				return false;
			}

			if (!(/\w{6,}/).test(this.pwd)) {
				alert('密码需要至少6位数，请重新输入！');
				return false;
			}

			if (this.pwd !== this.confirmPwd) {
				alert('两次输入的密码不一致，请重新输入！');
				return false;
			}
			
			regist(this.phone, this.pwd)
				.then(res => {
					const { code, msg } = res.data;
					if (code === 1) alert('注册成功');
					else alert(msg);
				})
				.catch(res => {
					alert('系统错误，请稍后再试');
				});
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-account.less";
</style>