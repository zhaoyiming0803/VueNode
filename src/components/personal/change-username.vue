<template>
	<!-- 修改用户名组件 -->
	<div class="change-username-sex">
		<explain v-bind:explainName="explainName"></explain>

		<div class="white-item-wrpaer" style="border-bottom: 1px solid #efeded">
			<label for="username">用户名：</label>
			<input type="text" placeholder="请输入您的用户名" id="username" v-model="userName" v-on:blur="changeUserName();" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';

	export default {
		data () {
			return {
				explainName: '修改用户名',
				userName: ''
			}
		},
		components: {
			explain
		},
		mounted () {
			this.userName = this.$route.params.userName;
		},
		methods: {
			changeUserName () {
				const userId = this.$route.params.userId;
				this.$http.post('/personalEdit/changeUserName', {userId, userName: this.userName}, {emulateJSON: true});
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.white-item-wrpaer {
		display: block;
		position: relative;
		height: 50px;
		padding: 0 1%;
		line-height: 50px;
		text-align: right;
		background-color: #fff;
		input {
			width: 76%;
		}
	}
</style>