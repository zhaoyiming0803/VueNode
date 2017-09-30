<template>
	<!-- 评论展示组件 -->
	<div class="comment-wraper">
		<column-divide v-bind:columnName="columnName"></column-divide>

		<div v-for="(v, k) in comments" :key="k" v-if="v.comment_user_phone" class="comment-item">
			<div class="comment-item-top clearfix">
				<div class="phone">{{v.comment_user_phone | truncatePhone}}</div>
				<div class="star">
					<img v-for="(value, key) in v.comment_star":key="key" src="./images/star.png" width="15" height="15" />
					<img v-for="(value, key) in (5-v.comment_star)" :key="key" src="./images/notclickstar.png" width="15" height="15" />
				</div>
			</div>
			<div class="comment-item-bottom">{{v.comment_content}}</div>
		</div>
		<div v-else style="padding: 0 0 10px 10px; color: #595959;">暂无评论</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import columnDivide from '../column-divide/index.vue';

	export default {
		props: ['comments'],
		data () {
			return {
				columnName: '最新评论'
			}
		},
		components: {
			columnDivide
		},
		filters: {
			truncatePhone (phone) {
				return phone.substr(0, 3) + '****' + phone.substr(7, 4);
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.comment-wraper {
		padding-top: 15px;
		.comment-item {
			margin: 3% 3%;
			.comment-item-top {
				.phone {
					float: left;
				}
				.star {
					float: right;
				}
			}
			.comment-item-bottom {
				padding: 7px 0 0 0;
				font-size: 12px;
				color: #b4b4b4;
			}
		}
	}
</style>