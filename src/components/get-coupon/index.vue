<template>
	<div class="get-coupon-wraper">

		<explain v-bind:explainName="explainName"></explain>

		<div class="coupon-top-wraper">
			<div class="top-ico clearfix">
				<span class="union-ico"></span>
				<span class="hq-ico"></span>
			</div>
			<div class="coupon-brief">
				<div class="coupon-ico">
					<img v-bind:src=couponDetail.coupon_ico_path width="79" height="79" />
				</div>
				<div class="coupon-name">{{couponDetail.coupon_name}}</div>
				<div class="coupon-discounts">{{couponDetail.coupon_explain}}</div>
				<div class="coupon-time">活动时间：{{couponDetail.coupon_starttime | dateFormate}}至{{couponDetail.coupon_endtime | dateFormate}}</div>
			</div>
		</div>

		<div class="coupon-bottom-wraper" id="coupon-bottom-wraper">
			<a href="javascript:;" class="coupon-btn">立即领取</a>

			<!-- 优惠券领取规则 -->
			<coupon-rule></coupon-rule>

			<!-- 用户文字和星级评价 -->
			<coupon-comment></coupon-comment>
		</div>

		<footer-nav></footer-nav>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';
	import footerNav from '../footer-nav/index.vue';
	import couponRule from '../coupon-rule/index.vue';
	import couponComment from '../coupon-comment/index.vue';

	export default {
		data () {
			return {
				explainName: '领取优惠券',
				couponDetail: {}
			}
		},
		components: {
			explain,
			couponRule,
			couponComment,
			footerNav
		},
		mounted () {
			this.$http.post('/getCoupon/couponDetail', {couponId: this.$route.params.couponId}, {emulateJSON: true}).then((result) => {
				const data = JSON.parse(result.bodyText);
				this.couponDetail = data.couponDetail[0];
			});
		},
		filters: {
			dateFormate (timestamp) {
				let addZero = (str) => {
					return str >= 10 ? str : ('0' + str);
				};
				let date = new Date(parseInt(timestamp, 10));
				return date.getFullYear() + '/' + addZero(date.getMonth()+1) + '/' + date.getDate();
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.get-coupon-wraper {
		.coupon-top-wraper {
			width: 94%;
			margin: 2% 3%;
			position: relative;
			height: 213px;
			background: #23a1df;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
			.top-ico {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				span {
					display: block;
					background-repeat: no-repeat;
				}
				.union-ico {
					width: 40px;
					height: 26px;
					float: left;
					margin: 10px 0 0 10px;
					background-image: url("./images/quan_banklogo.png");
					background-size: 40px 26px;
				}
				.hq-ico {
					width: 83px;
					height: 17px;
					float: right;
					margin: 10px 10px 0 0;
					background-image: url("./images/quan_logo.png");
					background-size: 83px 17px;
				}
			}
			.coupon-brief {
				position: absolute;
				top: 45px;
				left: 0;
				width: 100%;
				text-align: center;
				line-height: 25px;
				color: #fff;
				.coupon-ico {
					width: 79px;
					height: 79px;
					margin: 0 auto;
				}
			}
		}
		.coupon-bottom-wraper {
			width: 94%;
			margin: 2% 3%;
			overflow: hidden;
			padding-top: 15px;
			background: #fff;
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			.coupon-btn {
				display: block;
				width: 90%;
				height: 37px;
				margin: 0 auto;
				line-height: 37px;
				text-align: center;
				border-radius: 4px;
				background-color: #23a1df;
				color: #fff;
				font-size: 16px;
			}
		}
	}
</style>