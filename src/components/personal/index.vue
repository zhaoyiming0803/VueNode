<template>
	<!-- 个人中心组件 -->
	<div class="personal-wraper">

		<explain v-bind:explainName="explainName"></explain>

		<!-- 个人信息 -->
		<div class="personal-msg-wraper">
			<div class="head">
				<img v-bind:src=personMsg.headpic width="80" height="80" alt="头像" />
			</div>
			<div class="phone">
				<img src="./images/phone.png" width="30" height="30" class="phone-ico" alt="手机" />
				<span class="phone-num">{{personMsg.phone}}</span>
			</div>
			<router-link tag="a" :to="{name: 'PersonalEdit'}" class="setting"></router-link>
		</div>

		<!-- 卡包列表 -->
		<div class="gift-list-wraper distance-wraper">
			<div class="title">卡包</div>
			<!-- 银联优惠 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showUnion();">
					<span class="gift-ico unionpay-ico"></span>
					<span class="gift-name">银联优惠({{unionNum}})</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isUnionpay, 'flex-ico-down': !isUnionpay}"></span>
				</div>
				<div class="coupon-list-wraper" v-bind:class="{'gift-detail-on': isUnionpay, 'gift-detail-off': !isUnionpay}">
					<router-link v-for="(v, k) in unionCouponList" :key="k" :to="{name: 'GetCoupon', params: {couponId: v.id, showType: 2}}" v-bind:class="{'use-discount-bg': v.status==0, 'used-bg': v.status==1, 'past-bg': v.status==2}">
						<div class="shop-ico">
							<img v-bind:src=v.coupon_ico_path width="100%" height="100%" v-bind:alt=v.coupon_name />
						</div>
						<div class="shop-intro">
							<div class="shop-title">{{v.coupon_name}}</div>
							<div class="shop-price">
								<span class="condition">{{v.coupon_explain}}</span>
							</div>
						</div>
						<div class="shop-active shop-active-canuse" v-if="v.status==0">
							<p>已抢</p>
							<p>{{v.coupon_recived_num}}</p>
							<span class="use-discount" ></span>
						</div>
						<div class="shop-active" v-if="v.status==1">
							<a href="javascript:;" class="used"></a>
						</div>
						<div class="shop-active" v-if="v.status==2">
							<a href="javascript:;" class="past"></a>
						</div>
					</router-link>
				</div>
			</div>

			<!-- VISA权益 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showVisa();">
					<span class="gift-ico visa-ico"></span>
					<span class="gift-name">VISA权益({{visaNum}})</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isVisa, 'flex-ico-down': !isVisa}"></span>
				</div>
				<div class="coupon-list-wraper" v-bind:class="{'gift-detail-on': isVisa, 'gift-detail-off': !isVisa}">
					<router-link v-for="(v, k) in visaCouponList" :key="k" :to="{name: 'GetCoupon', params: {couponId: v.id, showType: 2}}" v-bind:class="{'use-discount-bg': v.status==0, 'used-bg': v.status==1, 'past-bg': v.status==2}">
						<div class="shop-ico">
							<img v-bind:src=v.coupon_ico_path width="100%" height="100%" v-bind:alt=v.coupon_name />
						</div>
						<div class="shop-intro">
							<div class="shop-title">{{v.coupon_name}}</div>
							<div class="shop-price">
								<span class="condition">{{v.coupon_explain}}</span>
							</div>
						</div>
						<div class="shop-active shop-active-canuse" v-if="v.status==0">
							<p>已抢</p>
							<p>{{v.coupon_recived_num}}</p>
							<span class="use-discount" ></span>
						</div>
						<div class="shop-active" v-if="v.status==1">
							<a href="javascript:;" class="used"></a>
						</div>
						<div class="shop-active" v-if="v.status==2">
							<a href="javascript:;" class="past"></a>
						</div>
					</router-link>
				</div>
			</div>

			<!-- 环球锦囊团优惠 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showJinnang();">
					<span class="gift-ico jinnang-ico"></span>
					<span class="gift-name">环球锦囊团优惠({{jinnangNum}})</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isJinnang, 'flex-ico-down': !isJinnang}"></span>
				</div>
				<div class="coupon-list-wraper" v-bind:class="{'gift-detail-on': isJinnang, 'gift-detail-off': !isJinnang}">
					<router-link v-for="(v, k) in jinnangCouponList" :key="k" :to="{name: 'GetCoupon', params: {couponId: v.id, showType: 2}}" v-bind:class="{'use-discount-bg': v.status==0, 'used-bg': v.status==1, 'past-bg': v.status==2}">
						<div class="shop-ico">
							<img v-bind:src=v.coupon_ico_path width="100%" height="100%" v-bind:alt=v.coupon_name />
						</div>
						<div class="shop-intro">
							<div class="shop-title">{{v.coupon_name}}</div>
							<div class="shop-price">
								<span class="condition">{{v.coupon_explain}}</span>
							</div>
						</div>
						<div class="shop-active shop-active-canuse" v-if="v.status==0">
							<p>已抢</p>
							<p>{{v.coupon_recived_num}}</p>
							<span class="use-discount" ></span>
						</div>
						<div class="shop-active" v-if="v.status==1">
							<a href="javascript:;" class="used"></a>
						</div>
						<div class="shop-active" v-if="v.status==2">
							<a href="javascript:;" class="past"></a>
						</div>
					</router-link>
				</div>
			</div>

			<!-- 高岛屋权益 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showGaodaowu();">
					<span class="gift-ico gaodaowu-ico"></span>
					<span class="gift-name">高岛屋权益({{gaodaowuNum}})</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isGaodaowu, 'flex-ico-down': !isGaodaowu}"></span>
				</div>
				<div class="coupon-list-wraper" v-bind:class="{'gift-detail-on': isGaodaowu, 'gift-detail-off': !isGaodaowu}">
					<router-link v-for="(v, k) in gaodaowuCouponList" :key="k" :to="{name: 'GetCoupon', params: {couponId: v.id, showType: 2}}" v-bind:class="{'use-discount-bg': v.status==0, 'used-bg': v.status==1, 'past-bg': v.status==2}">
						<div class="shop-ico">
							<img v-bind:src=v.coupon_ico_path width="100%" height="100%" v-bind:alt=v.coupon_name />
						</div>
						<div class="shop-intro">
							<div class="shop-title">{{v.coupon_name}}</div>
							<div class="shop-price">
								<span class="condition">{{v.coupon_explain}}</span>
							</div>
						</div>
						<div class="shop-active shop-active-canuse" v-if="v.status==0">
							<p>已抢</p>
							<p>{{v.coupon_recived_num}}</p>
							<span class="use-discount" ></span>
						</div>
						<div class="shop-active" v-if="v.status==1">
							<a href="javascript:;" class="used"></a>
						</div>
						<div class="shop-active" v-if="v.status==2">
							<a href="javascript:;" class="past"></a>
						</div>
					</router-link>
				</div>
			</div>
		</div>

		<footer-nav v-bind:navName="navName"></footer-nav>

	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';
	import footerNav from '../footer-nav/index.vue';

	export default {
		data () {
			return {
				explainName: '个人中心',
				navName: 'personal',
				isUnionpay: false,
				isVisa: false,
				isJinnang: false,
				isGaodaowu: false,
				personMsg: {phone: '', headpic: ''},
				unionNum: 0,
				visaNum: 0,
				jinnangNum: 0,
				gaodaowuNum: 0,
				unionCouponList: null,
				visaCouponList: null,
				jinnangCouponList: null,
				gaodaowuCouponList: null
			}
		},
		components: {
			explain,
			footerNav
		},
		mounted () {
			try {
				const userMsg = JSON.parse(window.sessionStorage.userMsg);
				this.personMsg.phone = userMsg.phone;

				this.$http.post('/personal/basicMsg', {userId: userMsg.id}, {emulateJSON: true}).then((result) => {
					let data = JSON.parse(result.bodyText);
					this.personMsg.headpic = data.personalMsg[0].user_headpic;
					let couponMsg = data.couponMsg;
					couponMsg.forEach((v) => {
						switch (v.coupon_type) {
							case 'union':
								this.unionNum = v.num;
								break;
							case 'visa':
								this.visaNum = v.num;
								break;
							case 'jinnang':
								this.jinnangNum = v.num;
								break;
							case 'gaodaowu':
								this.gaodaowuNum = v.num;
								break;
						}
					});
				});
			} catch (e) {
				this.$router.push({name: 'Login'});
			}
		},
		methods: {
			showUnion () {
				if (this.unionCouponList === null) {
					const userMsg = JSON.parse(window.sessionStorage.userMsg);
					this.$http.post('/personal/showCoupon', {userId: userMsg.id, type: 'union'}, {emulateJSON: true}).then((result) => {
						let data = JSON.parse(result.bodyText);
						this.unionCouponList = data.couponList;
					});
				}
				this.isUnionpay = !this.isUnionpay;
				this.isVisa = this.isJinnang = this.isGaodaowu = false;
			},
			showVisa () {
				if (this.visaCouponList === null) {
					const userMsg = JSON.parse(window.sessionStorage.userMsg);
					this.$http.post('/personal/showCoupon', {userId: userMsg.id, type: 'visa'}, {emulateJSON: true}).then((result) => {
						let data = JSON.parse(result.bodyText);
						this.visaCouponList = data.couponList;
					});
				}
				this.isVisa = !this.isVisa;
				this.isUnionpay = this.isJinnang = this.isGaodaowu = false;
			},
			showJinnang () {
				if (this.jinnangCouponList === null) {
					const userMsg = JSON.parse(window.sessionStorage.userMsg);
					this.$http.post('/personal/showCoupon', {userId: userMsg.id, type: 'jinnang'}, {emulateJSON: true}).then((result) => {
						let data = JSON.parse(result.bodyText);
						this.jinnangCouponList = data.couponList;
					});
				}
				this.isJinnang = !this.isJinnang;
				this.isUnionpay = this.isVisa = this.isGaodaowu = false;
			},
			showGaodaowu () {
				if (this.gaodaowuCouponList === null) {
					const userMsg = JSON.parse(window.sessionStorage.userMsg);
					this.$http.post('/personal/showCoupon', {userId: userMsg.id, type: 'gaodaowu'}, {emulateJSON: true}).then((result) => {
						let data = JSON.parse(result.bodyText);
						this.gaodaowuCouponList = data.couponList;
					});
				}
				this.isGaodaowu = !this.isGaodaowu;
				this.isUnionpay = this.isVisa = this.isJinnang = false;
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-personal.less";
	@import "../../../static/less/coupon.less";

	.gift-list-wraper {
		.title {
			margin-bottom: 10px;
			border-left: 5px solid #ffb000;
			padding-left: 10px;
			font-size: 15px;
		}
		.gift-item {
			.brief {
				position: relative;
				margin-bottom: 10px;
				height: 55px;
				background-color: #fff;
				.gift-ico{
					display: inline-block;
					position: absolute;
					top: 10px;
					left: 10px;
					width: 35px;
					height: 35px;
					background-repeat: no-repeat;
					background-position: center center;
					background-size: 35px 35px;
				}
				.unionpay-ico {
					background-image: url("./images/list_unionpay.png");
				}
				.visa-ico {
					background-image: url("./images/list_visa.png");
				}
				.jinnang-ico {
					background-image: url("./images/jinnangtuan.png");
				}
				.gaodaowu-ico {
					background-image: url("./images/list_dutyfree.png");
				}
				.gift-name {
					display: inline-block;
					position: absolute;
					top: 10px;
					left: 55px;
					height: 35px;
					line-height: 35px;
				}
				.flex-ico {
					display: inline-block;
					position: absolute;
					right: 16px;
					top: 22px;
					width: 12px;
					height: 12px;
					background-repeat: no-repeat;
					background-position: center center;
					background-size: 12px 12px;
				}
				.flex-ico-down {
					background-image: url("./images/flex_down.png");
				}
				.flex-ico-up {
					background-image: url("./images/flex_up.png");
				}
			}
		}
	}

	.gift-detail-on {
		display: block;
	}

	.gift-detail-off {
		display: none;
	}
</style>