<template>
	<!-- 优惠券所属分类组件 -->
	<div class="feature-wraper">
		<div class="tag">
			<span v-bind:class="{'this-tag': isShopping}" v-on:click="checkFeature(1);">购物</span>
			<span v-bind:class="{'this-tag': isRebate}" v-on:click="checkFeature(2);">退税</span>
		</div>
		<!-- 购物栏目具体内容 -->
		<div class="feature-item" v-bind:class="{'feature-item-show': isShopping, 'feature-item-hide': !isShopping}">
			<a v-bind:href=v.feature_url class="feature-list" v-for="(v, k) in featureArticle" :key="k" v-if="v.feature_classify==1">
				<p class="shop-title">{{v.feature_title}}</p>
				<img v-bind:src=v.feature_ico_path width="100%" />
			</a>
		</div>

		<!-- 退税栏目具体内容 -->
		<div class="feature-item" v-bind:class="{'feature-item-show': isRebate, 'feature-item-hide': !isRebate}">
			<a v-bind:href=v.feature_url class="feature-list" v-for="(v, k) in featureArticle" :key="k" v-if="v.feature_classify==2">
				<p class="shop-title">{{v.feature_title}}</p>
				<img v-bind:src=v.feature_ico_path width="100%" />
			</a>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: ['featureArticle'],
		data () {
			return {
				isShopping: true,
				isRebate: false,
			}
		},
		methods: {
			checkFeature (type) {
				switch (type) {
					case 1:
						this.isShopping = true;
						this.isRebate = false;
						break;
					case 2:
						this.isShopping = false;
						this.isRebate = true;
						break;
				}
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.feature-wraper {
		background-color: #fff;
		.tag {
			display: flex;
			display: -webkit-flex;
			flex-wrap: wrap;
			span {
				flex: 1;
				height: 45px;
				line-height: 45px;
				text-align: center;
				border-bottom: 1px solid #e5e5e5;
				font-size: 15px;
				color: #393939;
				&.this-tag {
					border-bottom: 2px solid #2577e3;
					color: #2577e3;
				}
			}
		}
		.feature-item {
			margin: 0 10px;
			&.feature-item-show {
				display: block;
			}
			&.feature-item-hide {
				display: none;
			}
			.feature-list {
				display: block;
				padding: 5px 0 0 0;
				.shop-title {
					margin: 5px 0 10px 0;
					line-height: 27px;
					font-size: 16px;
					font-weight: bold;
					color: #4d4d4d;
				}
				.shop-flex {
					display: flex;
					display: -webkit-flex;
					flex-wrap: wrap;
					border-bottom: 1px solid #e5e5e5;
					padding-bottom: 10px;
					.shop-img {
						flex: 1;
						margin: 0 3px 0 3px;
					}
				}
			}
		}
	}
</style>