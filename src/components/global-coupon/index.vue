<template>
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

		<!-- 待更新首页数据 -->


		<footer-nav v-bind:navName="navName"></footer-nav>
	</div>
</template>

<script type="text/ecmascript-6">
	import {mapActions, mapGetters} from 'vuex';
	import footerNav from '../footer-nav/index.vue';

	export default {
		data () {
			return {
				navName: 'appIndex',
				countryList: null,
				isCountryList: false,
				isMask: false
			}
		},
		components: {
			footerNav
		},
		computed: mapGetters([
			'countryId',
			'countryName'
		]),
		mounted () {
			this.$http.post('/globalCoupon/chooseCountry', {countryId: 1}, {emulateJSON: true}).then((result) => {
				console.log('--------------------');
				console.log(JSON.parse(result.bodyText));
			});
		},
		methods: {
			handleMask () {
				this.isMask = this.isCountryList = false;
			},
			showCountryList () {
				if (!this.countryList) {
					this.$http.post('/globalCoupon/countryList', {emulateJSON: true}).then((result) => {
						console.log(JSON.parse(result.bodyText));
						this.countryList = JSON.parse(result.bodyText).countryList;
						this.currentCountry = this.countryList[0].country_name;
					});
				}
				this.isCountryList = !this.isCountryList;
				this.isMask = true;
			},
			chooseCountry (countryId) {
				console.log(countryId);
				this.$http.post('/globalCoupon/chooseCountry', {countryId: countryId}, {emulateJSON: true}).then((result) => {
					console.log('--------------------');
					console.log(JSON.parse(result.bodyText));
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
</style>