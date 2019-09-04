<template>
	<!-- 找回密码第一步组件 -->
	<div class="forgetpwd-wraper">

		<explain v-bind:explainName="explainName"></explain>

		<!-- 找回密码进度 -->
		<div class="find-pwd-process">
			<img src="./images/flow1.png" width="100%" height="100%" alt="找回密码第一步" />
		</div>
		<div class="account-container">
			<form class="account-container-form" v-on:submit.prevent="next">
				<p>
					<span class="phone-ico"></span>
					<input type="text" placeholder="请输入手机号" maxlength="11" class="phone" v-model.lazy.trim="phone" />
				</p>
				<p>
					<span class="code-ico"></span>
					<input type="text" placeholder="请输入验证码" maxlength="6" class="code" v-model.lazy.trim="code" />
					<count-down v-bind:phone=phone></count-down>
				</p>
				<p>
					<input type="submit" value="下一步" class="account-btn" />
				</p>
			</form>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';
	import countDown from '../count-down/index.vue';
	import cookie from 'static/js/cookie.js';

	export default {
		data () {
			return {
				explainName: '找回密码第一步',
				phone: '',
				code: ''
			}
		},
		components: {
			explain,
			countDown
		},
		methods: {
			next () {
				if (!(/^((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8})$/).test(this.phone)) {
					alert('手机号格式不正确，请重新输入！');
					return false;
				}

				let msgCode = cookie.get('msgCode');

				if (msgCode.length !== 6 || this.code !== msgCode) {
					alert('短信验证码必须是6位数的数字！');
					return false;
				}

				this.$router.push({name: 'ForgetPwdSecondStep', params: {phone: this.phone}});
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-account.less";

	.find-pwd-process {
		width: 100%;
		height: 35px;
		margin: 15px auto;
	}

	@media only screen and (min-width: 768px) {
		.find-pwd-process {
			height: 60px;
		}
	}
</style>
