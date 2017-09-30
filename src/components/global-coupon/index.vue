<template>
	<!-- APP全球优惠首页组件 -->
	<div class="global-coupon-wraper">

		<!-- 遮罩层 -->
		<div class="mask" v-bind:class="{'dis-block': isMask, 'dis-none': !isMask}" v-on:click="handleMask();"></div>

		<!-- 顶部 -->
		<div class="fixed-header">
			<div class="fixed-header-nav">
				<a href="javascript:;" class="choose-contry" v-on:click="showCountryList();">
					<span>{{countryName}}</span>
					<img src="./images/arrowsblue.png" width="15" height="15" />
				</a>
				<div class="title">环球锦囊团</div>
			</div>
		</div>

		<!-- 可选国家和地区列表 -->
		<div class="contry-list-wraper" id="contry-list" v-bind:class="{'dis-none': !isCountryList, 'dis-block': isCountryList}" v-if="countryList !== null">
			<a href="javascript:;" v-for="(v, k) in countryList" :key="k" v-on:click="chooseCountry(v.id);" class="this-country"><span>{{v.country_name}}</span></a>
		</div>

		<!-- banner -->
		<link rel="stylesheet" type="text/css" href="static/css/swiper.min.css" />
		<div class="banner-wraper">
			<div class="swiper-container" id="banner">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(v, k) in bannerData" :key="k"><a href="javascript:;"><img v-bind:src=v.banner_path width="100%" /></a></div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>

		<!-- 热门优惠 -->
		<div class="hot-wraper">
			<div class="title">
				<span class="title-left"></span>
				<span class="title-center">热门优惠</span>
				<span class="title-right"></span>
			</div>
			<div class="content clearfix">
				<router-link tag="a" v-for="(v, k) in hotCoupon" :key="k" :to="{name: 'GetCoupon', params: {couponId: v.id, showType: 1}}" class="item">
					<img v-bind:src=v.coupon_ico_path width="98%" />
					<p class="hot-title">{{v.coupon_name}}</p>
					<p class="hot-discounts">{{v.coupon_explain}}</p>
				</router-link>
			</div>
			<router-link tag="a" :to="{name: 'GlobalCouponList'}" class="show-more-wraper">
				<span class="show-more-text">查看更多</span>
				<span class="show-more-btn"></span>
			</router-link>
		</div>

		<!-- 广告 -->
		<a href="javascript:;" class="advertising m-distance">
			<img src="./images/advertising.png" width="100%" />
			<span class="ico"></span>
		</a>

		<!-- 文章 -->
		<feature v-bind:featureArticle="featureArticle"></feature>

		<footer-nav v-bind:navName="navName"></footer-nav>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapActions, mapGetters} from 'vuex';
	import feature from '../feature/index.vue';
	import footerNav from '../footer-nav/index.vue';
	import Swiper from 'static/js/swiper.min.js';

	export default {
		data () {
			return {
				navName: 'appIndex',
				countryList: null,
				isCountryList: false,
				isMask: false,
				bannerData: null,
				hotCoupon: null,
				featureArticle: null
			}
		},
		components: {
			feature,
			footerNav
		},
		computed: mapGetters([
			'countryId',
			'countryName'
		]),
		mounted () {
			// 请求首页数据
			this.$http.post('/globalCoupon/chooseCountry', {countryId: this.countryId}, {emulateJSON: true}).then((result) => {
				let data = JSON.parse(result.bodyText);
				this.bannerData = data.bannerData;
				this.hotCoupon = data.hotCoupon;
				this.featureArticle = data.featureArticle;
			});

			// 轮播图
			let swiper = new Swiper ('#banner', {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop : true,
				autoplay: 2500, // 自定义轮播间隔时间ms
				autoplayDisableOnInteraction: true
			});
		},
		methods: {
			handleMask () {
				this.isMask = this.isCountryList = false;
			},
			showCountryList () {
				if (!this.countryList) {
					this.$http.post('/globalCoupon/countryList', {emulateJSON: true}).then((result) => {
						this.countryList = JSON.parse(result.bodyText).countryList;
						this.currentCountry = this.countryList[0].country_name;
					});
				}
				this.isCountryList = !this.isCountryList;
				this.isMask = true;
			},
			chooseCountry (countryId) {
				this.$http.post('/globalCoupon/chooseCountry', {countryId: countryId}, {emulateJSON: true}).then((result) => {
					let data = JSON.parse(result.bodyText);
					this.bannerData = data.bannerData;
					this.hotCoupon = data.hotCoupon;
					this.featureArticle = data.featureArticle;
				});
				this.currentCountry = this.countryList[countryId-1].country_name;
				this.$store.commit('changeCountryId', countryId);
				this.$store.commit('changeCountryName', this.currentCountry);
				this.handleMask();
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.fixed-header-nav {
		position: relative;
		height: 45px;
		.choose-contry {
			position: absolute;
			left: 10px;
			top: 0;
			display: inline-block;
			line-height: 45px;
			text-align: left;
			font-size: 15px;
			font-weight: 600;
			color: #2577e3;
			img {
				vertical-align: middle;
			}
		}
		.title {
			position: absolute;
			left: 50%;
			top: 0;
			margin-left: -60px;
			width: 120px;
			text-align: right;
			line-height: 45px;
			font-size: 18px;
			color: #383838;
			background-image: url("./images/jinnangtuan.png");
			background-repeat: no-repeat;
			background-position: -7px 3px;
			background-size: 35px 35px;
		}
	}

	.contry-list-wraper {
		position: fixed;
		top: 45px;
		z-index: 10001;
		width: 100%;
		max-width: 640px;
		background-color: #fafbfc;
		a {
			display: block;
			height: 45px;
			line-height: 45px;
			text-align: center;
			font-size: 16px;
			color: #383838;
			&.this-contry span {
				display: inline-block;
				width: 75px;
				color: #2577e3;
				background-image: url("./images/check.png");
				background-repeat: no-repeat;
				background-position: 51px 5px;
				background-size: 32px 32px;
			}
		}
	}

	.hot-wraper {
		background-color: #fff;
		.title {
			display: flex;
			flex-wrap: wrap;
			height: 60px;
			line-height: 60px;
			span {
				flex: 1;
			}
			.title-left {
				background-image: url("./images/title_l.png");
				background-repeat: no-repeat;
				background-position: right 30px;
				background-size: 19px 1px;
			}
			.title-center {
				text-align: center;
				font-size: 15px;
				font-weight: bold;
				color: #4d4d4d;
			}
			.title-right {
				background-image: url("./images/title_r.png");
				background-repeat: no-repeat;
				background-position: left 30px;
				background-size: 19px 1px;
			}
		}
		.content {
			.item {
				display: block;
				float: left;
				width: 48%;
				margin: 0 1% 3% 1%;
				overflow: hidden;
				img {
					border: 1px solid #e2e2e2;
				}
				.hot-title {
					height: 22px;
					overflow: hidden;
					font-size: 15px;
					font-weight: 600;
					color: #4d4d4d;
				}
				.hot-discounts {
					font-size: 12px;
					color: #b3b3b3;
				}
			}
		}
		.show-more-wraper {
			display: block;
			position: relative;
			left: 50%;
			margin-left: -65px;
			width: 130px;
			height: 40px;
			.show-more-text {
				display: inline-block;
				position: absolute;
				width: 130px;
				height: 40px;
				background-image: url("./images/rectangle.png");
				background-repeat: no-repeat;
				background-position: center top;
				background-size: 125px 35px;
				text-align: center;
				line-height: 35px;
				font-size: 13px;
				color: #2577e3;
			}
			.show-more-btn {
				display: inline-block;
				position: absolute;
				right: 23px;
				top: 11px;
				width: 12px;
				height: 12px;
				background-image: url("./images/morearrows.png");
				background-repeat: no-repeat;
				background-size: 12px 12px;
			}
		}
	}

	.advertising {
		display: block;
		position: relative;
		.ico {
			display: block;
			position: absolute;
			bottom: 6px;
			left: 0;
			width: 22px;
			height: 11px;
			background-image: url("./images/advertisingico.png");
			background-repeat: no-repeat;
			background-size: 22px 11px;
		}
	}
</style>