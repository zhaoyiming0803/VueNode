<template>
	<!-- 顶部固定定位组件 -->
	<div class="fixed-header">
		<!-- 页面说明 -->
		<div class="explain"><a href="javascript:;" class="goback" id="goback" v-show="!isAccount" v-on:click="goback();"></a>{{explainName}}</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: ['explainName', 'isAccount'],
		methods: {
			goback () {
				this.$router.back();
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.fixed-header {
	  position: fixed;
	  top: 0;
	  z-index: 10001;
	  width: 100%;
	  min-width: 320px;
	  max-width: 640px;
	  background-color: #fff;
	  .explain {
		position: relative;
		height: 45px;
		text-align: center;
		line-height: 45px;
		font-size: 18px;
		color: #383838;
		.goback {
			position: absolute;
			top: 7px;
			left: 10px;
			display: block;
			width: 21px;
			height: 31px;
			background: url("../../../static/images/goback.png") no-repeat left center;
			background-size: 12px 18px;
		}
	  }
	}
</style>