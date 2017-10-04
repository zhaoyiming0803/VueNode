<template>
	<!-- 找回密码第二步组件 -->
	<div class="forgetpwd-wraper">

		<explain v-bind:explainName="explainName"></explain>

		<!-- 找回密码进度 -->
		<div class="find-pwd-process">
			<img src="./images/flow2.png" width="100%" height="100%" alt="找回密码第二步" />
		</div>
		<div class="account-container">
			<form class="account-container-form" v-on:submit.prevent="complete">
				<p>
					<span class="pwd-ico"></span>
					<input type="password" placeholder="请输入密码" class="pwd" v-model.lazy.trim="pwd" />
				</p>
				<p>
					<span class="pwd-ico"></span>
					<input type="password" placeholder="请确认密码" class="pwd" v-model.lazy.trim="confirmPwd" />
				</p>
				<p>
					<input type="submit" value="完	成" class="account-btn" />
				</p>
			</form>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';

	export default {
		data () {
			return {
				explainName: '找回密码第二步',
				phone: this.$route.params.phone,
				pwd: '',
				confirmPwd: ''
			}
		},
		components: {
			explain
		},
		mounted: function () {
			if (!(/^((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8})$/).test(this.phone)) {
				history.go(-1);
			}
		},
		methods: {
			complete () {
				const reg = /\w{6,}/;

				if (!reg.test(this.pwd)) {
					alert('密码至少6位数');
					return false;
				}

				if (this.pwd !== this.confirmPwd) {
					alert('两次输入的密码不一致，请重新输入！');
					return false;
				}

				this.$http.post('/forgetPwd/secondStep', {phone: this.phone, pwd: this.pwd}, {emulateJSON: true}).then((result) => {
					const backInfo = JSON.parse(result.bodyText).backInfo;
					if (backInfo === '0') {
						alert('密码修改失败，请重新操作');
					} else if (backInfo === '1') {
						this.$router.push({name: 'Login'})
					}
				});
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