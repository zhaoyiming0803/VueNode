<template>
	<!-- 修改头像组件 -->
	<div class="change-headpic-wraper">
		<explain v-bind:explainName="explainName"></explain>

		<div>
			<input type="file" id="headpic" v-on:change="changeHeadpic();" />
		</div>
		<div>
			<img id="show-headpic" />
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
				explainName: '修改头像'
			}
		},
		components: {
			explain
		},
		mounted () {

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
							userid : userId
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

</style>