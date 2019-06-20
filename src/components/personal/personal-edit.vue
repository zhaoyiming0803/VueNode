<template>
	<!-- 个人资料展示组件 -->
	<div class="personal-edit-wraper">
		<explain v-bind:explainName="explainName"></explain>

		<!-- 个人信息 -->
		<div class="personal-msg-wraper personal-edit-msg-wraper">
			<div class="personal-edit-head">
				<router-link tag="a" :to="{name: 'ChangeUserHeadpic', params: {'userId': userId, 'headpic': headpic}}">
					<img v-bind:src=headpic width="119" height="119" alt="头像" />
				</router-link>
			</div>
		</div>

		<!-- 个人信息修改项 -->
		<div class="personal-msg-item-wraper">
			<router-link tag="a" :to="{name: 'ChangeUserName', params: {'userId': userId, 'userName': userName}}" class="white-item-wrpaer item" style="margin: 10px auto 15px auto;">
				<div class="ico username">
					<span>用户名称</span>
				</div>
				<div class="content">
					<span>{{userName}}</span>
				</div>
			</router-link>
			<router-link tag="a" :to="{name: 'ChangeUserSex', params: {'userId': userId, 'userSex': userSex}}" class="white-item-wrpaer item">
				<div class="ico sex">
					<span>性别</span>
				</div>
				<div class="content">
					<span v-if="userSex==1">男</span>
					<span v-else>女</span>
				</div>
				<div class="line"></div>
			</router-link>
		</div>

		<!-- 退出登录 -->
		<div class="white-item-wrpaer">
			<a href="javascript:;" class="login-out" v-on:click="loginOut();">退出登录</a>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';

	export default {
		data () {
			return {
				explainName: '个人资料修改',
				headpic: ' ',
				userId: 0,
				userName: ' ',
				userSex: 1
			}
		},
		components: {
			explain
		},
		mounted () {
			try {
				const userMsg = JSON.parse(window.sessionStorage.userMsg);
				this.userId = userMsg.id;
				this.$http.post('/personalEdit/getMsg', {userId: this.userId}, {emulateJSON: true}).then((result) => {
					const data = JSON.parse(result.bodyText).backInfo[0];
					this.userName = data.user_name;
					this.userSex = data.user_sex;
					this.headpic = data.user_headpic;
				});
			} catch (e) {
				this.$router.push({name: 'Login'});
			}
		},
		methods: {
			loginOut () {
				window.sessionStorage.userMsg = '';
				this.$router.push({name: 'GlobalCouponIndex'});
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-personal.less";

	.white-item-wrpaer {
		display: block;
		position: relative;
		height: 50px;
		line-height: 50px;
		text-align: right;
		background-color: #fff;
	}

	.personal-msg-item-wraper {
		margin-bottom: 15px;
		.item {
			.line {
				position: absolute;
				left: 55px;
				width: 100%;
				border-top: 1px solid #efeded;
			}
			.username {
				background-image: url("./images/username.png");
			}
			.sex {
				background-image: url("./images/sex.png");
			}
			.ico {
				position: absolute;
				left: 0;
				top: 0;
				width: 35%;
				height: 50px;
				text-align:left;
				padding-left: 56px;
				background-repeat: no-repeat;
				background-size: 30px 30px;
				background-position: 16px 10px;
				span {
					font-size: 15px;
					color: #333;
				}
			}
			.content {
				position: absolute;
				left: 35%;
				top: 0;
				width: 65%;
				height: 50px;
				text-align: right;
				background-image: url("./images/right.png");
				background-repeat: no-repeat;
				background-size: 15px 15px;
				background-position: 95% 17px;
				color: #808080;
				font-size: 14px;
				span {
					margin-right: 38px;
				}
			}
		}
	}

	.login-out {
		display: block;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		color: #3c79db;
	}
</style>