<template>
	<div class="coupon-list-wraper">
		<!-- 可使用 -->
		<router-link v-for="(v, k) in couponList" :key="k" :to="{name: 'GetCoupon', params: {couponId: v.id}}" v-bind:class="{'use-discount-bg': v.coupon_status==0, 'used-bg': v.coupon_status==1, 'past-bg': v.coupon_status==2}">
			<div class="shop-ico">
				<img v-bind:src=v.coupon_ico_path width="100%" height="100%" v-bind:alt=v.coupon_name />
			</div>
			<div class="shop-intro">
				<div class="shop-title">{{v.coupon_name}}</div>
				<div class="shop-price">
					<span class="condition">{{v.coupon_explain}}</span>
				</div>
			</div>
			<div class="shop-active shop-active-canuse">
				<p>已抢</p>
				<p>{{v.coupon_recived_num}}</p>
				<span class="" v-bind:class="{'use-discount': v.coupon_status==0, 'used': v.coupon_status==1, 'past': v.coupon_status==2}"></span>
			</div>
		</router-link>

		<!-- 已使用 -->
		<a href="javascript:;" class="used-bg">
			<div class="shop-ico">
				<img src="./images/taizilogo.png" width="100%" height="100%" alt="优惠商品" />
			</div>
			<div class="shop-intro">
				<div class="shop-title">太子珠宝钟表</div>
				<div class="shop-price">
					<span class="condition">满10万减1万满10万减1万</span>
				</div>
			</div>
			<div class="shop-active">
				<span class="used"></span>
			</div>
		</a>

		<!-- 已过期 -->
		<a href="javascript:;" class="past-bg">
			<div class="shop-ico">
				<img src="./images/taizilogo.png" width="100%" height="100%" alt="优惠商品" />
			</div>
			<div class="shop-intro">
				<div class="shop-title">太子珠宝钟表</div>
				<div class="shop-price">
					<span class="condition">满10万减1万满10万减1万</span>
				</div>
			</div>
			<div class="shop-active">
				<span class="past"></span>
			</div>
		</a>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: ['couponList'],
		data () {
			return {

			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.coupon-list-wraper {
		a {
			display: block;
			position: relative;
			height: 95px;
			margin-bottom: 10px;
			background-repeat: no-repeat;
			background-position: left top;
			&.use-discount-bg {
				background-image: url("./images/discountbg.png");
				background-size: 100% 100%;
				.shop-active {
					position: absolute;
					top: 13px;
					right: 4px;
					height: 70px;
				}
			}
			&.used-bg {
				background-image: url("./images/usebg.png");
				background-size: 100% 103%;
			}
			&.past-bg {
				background-image: url("./images/pastduebg.png");
				background-size: 100% 103%;
			}
			.shop-ico {
				position: absolute;
				left: 8px;
				top: 13px;
				width: 105px;
				height: 70px;
				img {
					border: 1px solid #e2e2e2;
				}
			}
			.shop-intro {
				position: absolute;
				left: 118px;
				top: 13px;
				width: 100%;
				.shop-title {
					font-size: 15px;
					color: #4d4d4d;
				}
				.shop-discounts {
					font-size: 12px;
					color: #b3b3b3;
				}
				.shop-price span{
					display: inline-block;
					height: 100%;
					line-height: 22px;
					vertical-align: middle;
					&.condition {
						padding: 0 3px;
						background-color: #fff4ec;
						font-size: 15px;
						color: #f23030;
					}
				}
			}
			.shop-active {
				position: absolute;
				top: 45px;
				right: 4px;
				height: 70px;
				p {
					height: 18px;
					line-height: 30px;
					text-align: center;
					font-size: 10px;
					font-weight: 500;
					color: #f23030;
				}
				.use-discount {
					background-image: url("./images/littlebtn.png");
				}
				.used {
					background-image: url("./images/usebtn.png");
				}
				.past {
					background-image: url("./images/pastduebtn.png");
				}
			}
			.shop-active-canuse {
				background-image: url("./images/circlered.png");
				background-repeat: no-repeat;
				background-position: center top;
				background-size: 47px 35px;
			}
		}
	}

	.use-discount, .used, .past {
		display: block;
		height: 33px;
		margin: 10px auto 0 auto;
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 54px 33px;
	}

	@media only screen and (min-width:320px) and (max-width:374px) {
		.shop-price {
			max-width: 125px;
		}

		.shop-active {
			width: 50px;
		}

		.use-discount, .used, .past {
			width: 50px;
			height: 30px;
			background-size: 50px 33px;
		}
	}

	@media only screen and (min-width:375px) and (max-width:413px) {
		.shop-price {
			max-width: 156px;
		}

		.shop-active {
			width: 60px;
		}
	}

	@media only screen and (min-width:414px) and (max-width:767px) {
		.shop-price {
			max-width: 185px;
		}

		.shop-active {
			width: 65px;
		}
	}

	@media only screen and (min-width:768px) {
		.shop-price {
			max-width: 360px;
		}

		.shop-active {
			width: 107px;
			background-size: 60px 45px;
			p {
				height: 20px;
				line-height: 42px;
			}
		}
	}
</style>