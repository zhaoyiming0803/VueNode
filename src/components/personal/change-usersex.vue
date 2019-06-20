<template>
	<!-- 修改性别组件 -->
	<div class="change-sex-wraper">
		<explain v-bind:explainName="explainName"></explain>

		<div class="white-item-wrpaer" style="border-bottom: 1px solid #efeded">
			<label for="man" v-bind:class="{'this-sex': sex==1}">男</label>
			<input type="radio" name="sex" value="1" id="man" checked v-model="sex" v-on:click="changeSex();" />
		</div>
		<div class="white-item-wrpaer">
			<label for="woman" v-bind:class="{'this-sex': sex==0}">女</label>
			<input type="radio" name="sex" value="0" id="woman" v-model="sex" v-on:click="changeSex();" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';

	export default {
		data () {
			return {
				explainName: '修改性别',
				useId: 0,
				sex: 1
			}
		},
		components: {
			explain
		},
		mounted () {
			this.userId = this.$route.params.userId;
			this.sex = this.$route.params.userSex;
		},
		methods: {
			changeSex () {
				let timer = setTimeout(() => {
					this.$http.post('/personalEdit/changeUserSex', {userId: this.userId, sex: this.sex}, {emulateJSON: true}).then((result) => {
						if (result.status === 200) {
							clearTimeout(timer);
							timer = null;
						}
					});
				}, 4);
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.white-item-wrpaer {
		display: block;
		position: relative;
		height: 50px;
		line-height: 50px;
		text-align: right;
		background-color: #fff;
	}
	.white-item-wrpaer label {
		position: absolute;
		left: 0;
		width: 95%;
		text-align: left;
		padding-left: 5%;
		&.this-sex {
			background-image: url("./images/check.png");
			background-repeat: no-repeat;
			background-size: 32px 32px;
			background-position: 95% 8px;
		}
	}
</style>