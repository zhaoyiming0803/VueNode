<template>
	<!-- 倒计时组件 -->
	<div class="count-down-wraper">
		<input type="button" v-if="!disable" v-model="btnName" class="get-code get-code-off" v-on:click="getCode();" />
		<input type="button" v-if="disable" v-model="btnName" class="get-code get-code-on" disabled />
	</div>
</template>

<script type="text/ecmascript-6">
	import cookie from 'static/js/cookie.js';

	export default {
		props: ['phone'],
		data () {
			return {
				btnName: '获取验证码',
				disable: false
			}
		},
		methods: {
			getCode () {
				if (!(/^((13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8})$/).test(this.phone)) {
					alert('手机号格式不正确，请重新输入！');
					return false;
				}

				let num = 60;
				this.disable = true;
				let timer = setInterval(() => {
					num -= 1;
					this.btnName = num + 's后重试';

					if (num < 1) {
						this.disable = false;
						this.btnName = '获取验证码';
						clearInterval(timer);
						timer = null;
					}
				}, 1000);

				this.$http.post('/forgetPwd/firstStep', {phone: this.phone}, {emulateJSON: true}).then((result) => {
					const backInfo = JSON.parse(result.bodyText).backInfo;
					if (backInfo === '0') {
						alert('不存在该手机用户，请重新操作');
					} else if (backInfo.length === 6) {
						let cookieDate = new Date();
						cookieDate.setTime(cookieDate.getTime()+10*1000);
						cookie.set({name: 'msgCode', value: backInfo, expires: cookieDate.toGMTString()});
						alert('您的手机验证码是：' + backInfo + '，有效期为60s'); // 模拟发送到用户手机的短信验证码
					}
				});
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.get-code {
		position: absolute;
		right: 10px;
		top: 8px;
		width: 90px;
		height: 30px;
		background-color: #fff;
		font-size: 13px;
	}

	.get-code-on {
		color: #b4b4b4;
	}

	.get-code-off {
		color: #2577e3;
	}
</style>