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
					<img v-bind:src=coupon.coupon_ico_path width="79" height="79" />
				</div>
				<div class="coupon-name">{{coupon.coupon_name}}</div>
				<div class="coupon-discounts">{{coupon.coupon_explain}}</div>
				<div class="coupon-time">活动时间：{{coupon.coupon_starttime | dateFormate}}至{{coupon.coupon_endtime | dateFormate}}</div>
			</div>
		</div>

		<div class="coupon-bottom-wraper" id="coupon-bottom-wraper">
			<a href="javascript:;" class="coupon-btn" v-on:click="getCoupon();">立即领取</a>

			<!-- 优惠券领取规则 -->
			<coupon-rule></coupon-rule>

			<!-- 用户文字和星级评价 -->
			<coupon-comment v-bind:comments="comments"></coupon-comment>
		</div>

		<!-- 领取状态 -->
		<div class="get-coupon-status" v-bind:class="{'dis-block': couponStatus!=='', 'dis-none': couponStatus===''}">
			<div class="prompt">{{couponStatus}}</div>
			<a href="javascript:;" class="btn" v-if="couponMark===0">重新领取</a>
			<a href="javascript:;" class="btn" v-if="couponMark===1 || couponMark==2">立即使用</a>
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
				coupon: {},
				comments: [],
				couponStatus: '',
				couponMark: 0
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
				this.coupon = data.couponDetail[0];
				this.comments = data.couponDetail;
			});
		},
		methods: {
			getCoupon () {
				try {
					const userMsg = JSON.parse(window.sessionStorage.userMsg);
					this.$http.post('/getCoupon/getCoupon', {couponId: this.$route.params.couponId, userId: userMsg.id}, {emulateJSON: true}).then((result) => {
						const data = JSON.parse(result.bodyText);
						this.couponStatus = data.backInfo;
						this.couponMark = data.backMark;
					});
				} catch (e) {
					this.$router.push({name: 'Login'});
				}
			}
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

	.get-coupon-status {
		position: fixed;
		z-index: 10001;
		top: 30%;
		left: 50%;
		margin-left: -98px;
		width: 197px;
		height: 209px;
		background-image: url("./images/lingqu.png");
		background-repeat: no-repeat;
		background-size: 197px 209px;
		.prompt {
			position: absolute;
			top: 128px;
			width: 100%;
			height: 35px;
			line-height: 35px;
			text-align: center;
			font-size: 15px;
		}
		.btn {
			display: block;
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 42px;
			line-height: 40px;
			text-align: center;
			font-size: 15px;
			color: #fff;
		}
	}
</style>