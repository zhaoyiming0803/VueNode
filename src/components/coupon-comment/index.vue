<template>
	<div class="comment-wraper">
		<column-divide v-bind:columnName="columnName"></column-divide>

		<div class="comment-item">
			<div class="comment-item-top clearfix">
				<div class="phone">131****9251</div>
				<div class="star">
					<img src="./images/star.png" width="15" height="15" />
					<img src="./images/star.png" width="15" height="15" />
					<img src="./images/star.png" width="15" height="15" />
					<img src="./images/notclickstar.png" width="15" height="15" />
					<img src="./images/notclickstar.png" width="15" height="15" />
				</div>
			</div>
			<div class="comment-item-bottom">优惠券很好用，力度很大，希望多多搞这种活动，我们好剁手，么么哒</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import columnDivide from '../column-divide/index.vue';

	export default {
		data () {
			return {
				columnName: '最新评论'
			}
		},
		components: {
			columnDivide
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.comment-wraper {
		padding-top: 15px;
		.comment-item {
			margin: 3% 3%;
		}
	}
</style>