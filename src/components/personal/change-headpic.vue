<template>
	<!-- 修改头像组件 -->
	<div class="change-headpic-wraper" id="haha">
		<explain v-bind:explainName="explainName"></explain>

		<div class="white-item-wrpaer" style="border-bottom: 1px solid #efeded">
			<label for="man">头像：</label>
			<input type="file" name="headpic" id="headpic" class="headpic" multiple="multiple" v-on:change="changeHeadpic();" />
			<img v-bind:src=headpic id="show-headpic" width="45" height="45" />
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';
	import validateFileUpload from 'static/js/validatefileupload.js';
	import iframeFileUpload from 'static/js/iframefileupload.js';

	export default {
		data () {
			return {
				explainName: '修改头像',
				headpic: ''
			}
		},
		components: {
			explain
		},
		mounted () {
			this.headpic = this.$route.params.headpic;
		},
		methods: {
			changeHeadpic () {
				const userId = this.$route.params.userId;

				let validateFile = new Promise((resolve, reject) => {
					validateFileUpload({
						fileType : ['jpg', 'jpeg', 'png', 'bmp'],
						maxSize : 2,
						inptEle : 'headpic',
						showEle : 'show-headpic',
						success : function (res) {
							resolve(res);
						},
						error : function (res) {
							reject(res);
						}
					});
				});

				validateFile.then((result) => {
					result
					&& iframeFileUpload({
						url : '/personalEdit/changeUserHeadpic',
						elementId : ['headpic'],
						data : {
							id : userId
						},
						success : function (res) {
							console.log(res);
						},
						error : function (res) {
							console.log(res);
						}
					});
				});
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
		label {
			position: absolute;
			left: 20px;
			top: 0;
		}
		.headpic {
			position: absolute;
			left: 20%;
			top: 0;
			width: 80%;
			height: 50px;
			opacity: 0;
			z-index: 1;
		}
		img {
			position: absolute;
			right: 15px;
			bottom: 5px;
			border-radius: 50%;
			z-index: 0;
		}
	}
</style>