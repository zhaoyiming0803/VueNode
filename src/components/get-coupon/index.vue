<template>
	<!-- 获取优惠券组件 -->
	<div class="get-coupon-wraper">

		<explain v-bind:explainName="explainName"></explain>

		<coupon-brief v-bind:coupon="coupon"></coupon-brief>

		<div class="coupon-bottom-wraper" id="coupon-bottom-wraper">
			<a href="javascript:;" class="coupon-btn" v-on:click="getCoupon();" v-if="showType==1">立即领取</a>

			<!-- 优惠券使用方法 -->
			<div v-if="showType==2" class="use-coupon">
				<div class="quan_line"><img src="./images/quan_line.png" width="220" height="50" /></div>
				<div class="quan-er">
					<img src="./images/quan_er.png" width="150" height="150" />
					<p>请务必“长按”保存到手机相册</p>
				</div>

				<column-divide v-bind:columnName="columnName"></column-divide>
				<div class="useway">
					<div class="item">
						<img src="./images/quan_get.png" width="37" height="37" />
						<p>领券</p>
					</div>
					<div class="item">
						<img src="./images/pay_line.png" width="37" height="37" />
						<p>消费时出示券码</p>
					</div>
					<div class="item">
						<img src="./images/quan_cards.png" width="37" height="37" />
						<p>
							<span>银联刷卡</span>
							<span>(卡号以62开头)</span>
						</p>
					</div>
				</div>
			</div>

			<!-- 优惠券领取规则 -->
			<coupon-rule></coupon-rule>

			<!-- 用户文字和星级评价 -->
			<coupon-comment v-bind:comments="comments"></coupon-comment>
		</div>

		<!-- 领取状态 -->
		<div class="get-coupon-status" v-bind:class="{'dis-block': couponStatus!=='', 'dis-none': couponStatus===''}">
			<div class="prompt">{{couponStatus}}</div>
			<a href="javascript:;" class="btn" v-if="couponMark===0">重新领取</a>
			<a href="javascript:;" class="btn" v-if="couponMark===1 || couponMark===2" v-on:click="toUse();">立即使用</a>
		</div>

		<star></star>
		<h1>3分</h1>
		<footer-nav></footer-nav>
	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';
	import footerNav from '../footer-nav/index.vue';
	import couponBrief from '../coupon-brief/index.vue';
	import columnDivide from '../column-divide/index.vue';
	import couponRule from '../coupon-rule/index.vue';
	import couponComment from '../coupon-comment/index.vue';

	import star from '../star/index.vue';

	export default {
		data () {
			return {
				explainName: '领取优惠券',
				coupon: {},
				comments: [],
				couponStatus: '',
				couponMark: 0,
				columnName: '参与方式',
				showType: 1
			}
		},
		components: {
			explain,
			couponBrief,
			columnDivide,
			couponRule,
			couponComment,
			footerNav,
			star
		},
		mounted () {
			this.$http.post('/getCoupon/couponDetail', {couponId: this.$route.params.couponId}, {emulateJSON: true}).then((result) => {
				const data = JSON.parse(result.bodyText);
				this.coupon = data.couponDetail[0];
				this.comments = data.couponDetail;
				this.showType = this.$route.params.showType;
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
			},
			toUse () {
				this.showType = '2';
				this.couponStatus = '';
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.get-coupon-wraper {
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
			.use-coupon {
				.quan_line, .quan-er {
					text-align: center;
				}
				.useway {
					display: flex;
					.item {
						flex: 1;
						text-align: center;
						font-size: 12px;
						span {
							display: block;
							line-height: 20px;
						}
					}
				}
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