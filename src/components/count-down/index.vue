<template>
	<!-- 倒计时组件 -->
	<div class="count-down-wraper">
		<input type="button" v-if="!disable" v-model="btnName" class="get-code get-code-off" @click="getCode" />
		<input type="button" v-if="disable" v-model="btnName" class="get-code get-code-on" disabled />
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Prop } from 'vue-property-decorator';
	import { validatePhone } from '@/utils/index';
	import { getPhoneCode } from '@/api/auth';

	@Component
	export default class CountDown extends Vue {
		@Prop({type: String}) private phone!: string;

		private btnName: string = '获取验证码';
		private disable: boolean = false;
		
		private getCode () {
			if (!validatePhone(this.phone)) {
				return this.$dialog.alert({
					message: '手机号格式不正确，请重新输入！'
				});
			}

			this.disable = true;

			let num: number = 60;
			const timer: number = setInterval(() => {
				num -= 1;
				this.btnName = num + 's后重试';
				if (num < 1) {
					this.disable = false;
					this.btnName = '获取验证码';
					clearInterval(timer);
				}
			}, 1000);

			getPhoneCode(this.phone)
				.then(res => {
					const { code, data, message } = res.data;
					this.$dialog.alert({
						message: code === 0
							? `短信验证码：${data}`
							: message
					});
				})
				.catch(error => {
					this.$dialog.alert({
						message: '短信验证码获取失败，请重新操作'
					});
				})
		}
	}
</script>

<style scoped lang="less">
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