<template>
	<!-- 登录组件 -->
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
			<router-link tag="a" class="phone-prompt" :to="{name: 'ForgetPwdFirstStep'}">忘记密码</router-link>
		</form>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				phone: '',
				pwd: ''
			}
		},
		methods: {
			login () {
				if (!(/^((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8})$/).test(this.phone)) {
					alert('手机号码格式不正确，请重新输入！');
					return false;
				}

				if (!(/\w{6,}/).test(this.pwd)) {
					alert('密码需要至少6位数，请重新输入！');
					return false;
				}

				this.$http.post('/login/loginForm', {phone: this.phone, pwd: this.pwd}, {emulateJSON: true}).then((result) => {
					const userMsg = JSON.parse(result.bodyText);
					switch (userMsg.backInfo) {
						case '0':
							alert('账号或密码有误，请重新输入！');
							break;
						case '1':
							window.sessionStorage.userMsg = JSON.stringify(userMsg);
							this.$router.push({name: 'Personal'});
							break;
						default:
							alert('登录失败，请重新操作！');
					}
				});
			}
		},
		mounted () {
			let $sessionStorage = window.sessionStorage;
			if (!$sessionStorage) {
				alert('为保证您可以正常使用我们的产品，请关闭浏览器的无痕浏览模式！');
				return;
			}
			if ($sessionStorage.userMsg && JSON.parse($sessionStorage.userMsg).id) {
				this.$router.push({name: 'GlobalCouponIndex'});
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-account.less";
</style>