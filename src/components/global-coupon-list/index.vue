<template>
	<!-- 全球优惠列表页组件 -->
	<div class="global-coupon-list-wraper">

		<explain v-bind:explainName="explainName"></explain>

		<!-- 条件 -->
		<div class="mb10">
			<div class="condition-wraper">
				<a href="javascript:;" class="left-wraper choose-condition" v-on:click="showCountryList();"><span><font>{{countryName}}</font></span></a>
				<a href="javascript:;" class="right-wraper choose-condition" v-on:click="showClassifyList();"><span><font>{{classifyName}}</font></span></a>
			</div>

			<!-- 地区列表 -->
			<div class="list" id="contry-list" v-bind:class="{'dis-block': isCountry, 'dis-none': !isCountry}">
				<a href="javascript:;" v-for="(v, k) in countryList" :key="k" v-on:click="showCoupons(v.id, classifyId);" v-bind:class="{'this-type': countryId==v.id}"><span>{{v.country_name}}</span></a>
			</div>

			<!--分类列表 -->
			<div class="list" id="classify" v-bind:class="{'dis-block': isClassify, 'dis-none': !isClassify}">
				<a href="javascript:;" v-for="(v, k) in classifyList" :key="k" v-on:click="showCoupons(countryId, v.id);" v-bind:class="{'this-type': classifyId==v.id}"><span>{{v.classify_name}}</span></a>
			</div>
		</div>

		<div class="coupon-list-wraper">
			<router-link v-for="(v, k) in couponList" :key="k" :to="{name: 'GetCoupon', params: {couponId: v.id, showType: 1}}" v-bind:class="{'use-discount-bg': v.coupon_status==0, 'used-bg': v.coupon_status==1, 'past-bg': v.coupon_status==2}">
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
			<a href="javascript:;" class="load-more" v-on:click="loadMore();" v-if="couponList.length % 10 ===0">加载更多</a>
		</div>

		<footer-nav></footer-nav>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapActions, mapGetters} from 'vuex';
	import explain from '../header-explain/index.vue';
	import footerNav from '../footer-nav/index.vue';

	export default {
		data () {
			return {
				isCountry: false,
				isClassify: false,
				explainName: '全球优惠',
				countryList: null,
				classifyList: null,
				couponList: [],
				currentPage: 1
			}
		},
		computed: mapGetters([
			'countryId',
			'countryName',
			'classifyId',
			'classifyName'
		]),
		components: {
			explain,
			footerNav
		},
		mounted () {
			this.getCouponsList(this.countryId, this.classifyId, this.currentPage);
		},
		methods: {
			showCountryList () {
				this.isCountry = true;
				this.isClassify = false;
			},
			showClassifyList () {
				!this.classifyList &&
				this.$http.post('/globalCouponList/classifyList', {emulateJSON: true}).then((result) => {
					let data = JSON.parse(result.bodyText);
					this.classifyList = data.classifyList;
				});
				this.isCountry = false;
				this.isClassify = true;
			},
			getCouponsList (countryId=1, classifyId=1, currentPage=1) {
				this.$http.post('/globalCouponList/showCoupons', {countryId, classifyId, currentPage}, {emulateJSON: true}).then((result) => {
					let data = JSON.parse(result.bodyText).couponList,
						dataLen = data.length;

					for (let i = 0; i < dataLen; i += 1) {
						this.couponList.push(data[i]);
					}

				});

				// 为防止vuex中保持的countryName与判断条件中默认的countryName冲突，首次加载列表页的时候就需要获取到countryList，保证条件筛选正确
				!this.countryList &&
				this.$http.post('/globalCouponList/countryList', {emulateJSON: true}).then((result) => {
					let data = JSON.parse(result.bodyText);
					this.countryList = data.countryList;
				});
			},
			showCoupons (countryId, classifyId) {
				let currentCountryName = this.countryList ? this.countryList[countryId-1].country_name : '全球';
				let currentClassifyName = this.classifyList ? this.classifyList[classifyId-1].classify_name : '购物';

				this.currentPage = 1;
				this.couponList = [];

				this.$store.commit('changeCountryId', countryId);
				this.$store.commit('changeCountryName', currentCountryName);

				this.$store.commit('changeClassifyId', classifyId);
				this.$store.commit('changeClassifyName', currentClassifyName);

				this.getCouponsList(this.countryId, this.classifyId, this.currentPage);

				this.isCountry = this.isClassify = false;
			},
			loadMore () {
				this.currentPage += 1;
				this.getCouponsList(this.countryId, this.classifyId, this.currentPage);
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "../../../static/less/coupon.less";

	.mb10 {
		margin-bottom: 10px;
	}

	.global-coupon-list-wraper {
		.condition-wraper {
			display: flex;
			background-color: #fff;
			border-top: 1px solid #f1f4fd;
			.choose-condition{
				flex: 1;
				position: relative;
				height: 45px;
				color: #383838;
				&.left-wraper span {
					border-right: 1px solid #e6e6e6;
					font {
						width: 73px;
						background-position: 62px 8px;
					}
				}
				&.right-wraper span font {
					width: 62px;
					background-position: 50px 8px;
				}
				span {
					display: block;
					position: absolute;
					top: 10px;
					width: 100%;
					height: 26px;
					line-height: 26px;
					text-align: center;
					font {
						display: block;
						margin: 0 auto;
						background-image: url("./images/downarrows.png");
						background-repeat: no-repeat;
						background-size: 12px 12px;
					}
				}
			}
		}
		.list {
			position: fixed;
			left: 0;
			top: 91px;
			z-index: 10001;
			width: 100%;
			background-color: #fafbfc;
			a {
				display: block;
				height: 35px;
				line-height: 35px;
				text-align: center;
				color: #383838;
				font-size: 16px;
				&.this-type span {
					display: inline-block;
					width: 118px;
					color: #2577e3;
					background-image: url("./images/check.png");
					background-repeat: no-repeat;
					background-position: 92px 5px;
					background-size: 32px 32px;
				}
			}
		}
		.coupon-list-wraper {
			margin: 0 3%;
			.load-more {
				display: block;
				width: 100%;
				height: 50px;
				text-align: center;
				line-height: 50px;
				background-color: #fff;
				color: #333;
				font-size: 16px;
			}
		}
	}
</style>