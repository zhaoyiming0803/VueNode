<template>
	<!-- 注册组件 -->
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

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				phone: '',
				pwd: '',
				confirmPwd: ''
			}
		},
		methods: {
			regist () {
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

				this.$http.post('/regist/registForm', {phone: this.phone, pwd: this.pwd}, {emulateJSON: true}).then((result) => {
					switch (JSON.parse(result.bodyText).backInfo) {
						case '0':
							alert('该手机号已经被注册，请重新操作！');
							break;
						case '1':
							alert('注册成功！');
							window.location.href = '/#/login';
							break;
						default:
							alert('注册失败，请重新操作！');
					}
				});
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-account.less";
</style>