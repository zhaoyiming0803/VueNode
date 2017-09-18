<template>
	<div class="personal-wraper">

		<explain v-bind:explainName="explainName"></explain>

		<!-- 个人信息 -->
		<div class="personal-msg-wraper">
			<div class="head">
				<img src="./images/head.png" width="80" height="80" alt="头像" />
			</div>
			<div class="phone">
				<img src="./images/phone.png" width="30" height="30" class="phone-ico" alt="手机" />
				<span class="phone-num">18600588707</span>
			</div>
			<a href="javascript:;" class="setting"></a>
		</div>

		<!-- 卡包列表 -->
		<div class="gift-list-wraper distance-wraper">
			<div class="title">卡包</div>
			<!-- 银联优惠 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showUnion();">
					<span class="gift-ico unionpay-ico"></span>
					<span class="gift-name">银联优惠(2)</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isUnionpay, 'flex-ico-down': !isUnionpay}"></span>
				</div>
				<coupon-list v-bind:class="{'gift-detail-on': isUnionpay, 'gift-detail-off': !isUnionpay}"></coupon-list>
			</div>

			<!-- VISA权益 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showVisa();">
					<span class="gift-ico visa-ico"></span>
					<span class="gift-name">VISA权益(3)</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isVisa, 'flex-ico-down': !isVisa}"></span>
				</div>
				<coupon-list v-bind:class="{'gift-detail-on': isVisa, 'gift-detail-off': !isVisa}"></coupon-list>
			</div>

			<!-- 环球锦囊团优惠 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showJinnang();">
					<span class="gift-ico jinnang-ico"></span>
					<span class="gift-name">环球锦囊团优惠(4)</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isJinnang, 'flex-ico-down': !isJinnang}"></span>
				</div>
				<coupon-list v-bind:class="{'gift-detail-on': isJinnang, 'gift-detail-off': !isJinnang}"></coupon-list>
			</div>

			<!-- 高岛物权益 -->
			<div class="gift-item">
				<div class="brief" v-on:click="showGaodaowu();">
					<span class="gift-ico gaodaowu-ico"></span>
					<span class="gift-name">高岛物权益(5)</span>
					<span class="flex-ico" v-bind:class="{'flex-ico-up': isGaodaowu, 'flex-ico-down': !isGaodaowu}"></span>
				</div>
				<coupon-list v-bind:class="{'gift-detail-on': isGaodaowu, 'gift-detail-off': !isGaodaowu}"></coupon-list>
			</div>
		</div>

		<footer-nav v-bind:navName="navName"></footer-nav>

	</div>
</template>

<script type="text/ecmascript-6">
	import explain from '../header-explain/index.vue';
	import couponList from '../coupon-list/index.vue';
	import footerNav from '../footer-nav/index.vue';

	export default {
		data () {
			return {
				explainName: '个人中心',
				navName: 'personal',
				isUnionpay: false,
				isVisa: false,
				isJinnang: false,
				isGaodaowu: false
			}
		},
		components: {
			explain,
			couponList,
			footerNav
		},
		methods: {
			showUnion () {
				this.isUnionpay = !this.isUnionpay;
				this.isVisa = this.isJinnang = this.isGaodaowu = false;
			},
			showVisa () {
				this.isVisa = !this.isVisa;
				this.isUnionpay = this.isJinnang = this.isGaodaowu = false;
			},
			showJinnang () {
				this.isJinnang = !this.isJinnang;
				this.isUnionpay = this.isVisa = this.isGaodaowu = false;
			},
			showGaodaowu () {
				this.isGaodaowu = !this.isGaodaowu;
				this.isUnionpay = this.isVisa = this.isJinnang = false;
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	@import "./tour-app-personal.less";

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