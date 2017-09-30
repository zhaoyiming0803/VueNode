<template>
	<!-- 星级评分组件 -->
	<div class="star-wraper">
		<span v-for="(v, k) in gradeStarArry" :key="k" v-on:click="grade(k);" v-bind:class="{'colourful': v.className==='colorfulStar', 'gray': v.className==='grayStar'}" class="star">{{v.star}}</span>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				starArry: [],
				gradeStarArry: null
			}
		},
		mounted () {
			let starArry = this.starArry;
			for (let j = 0; j < 5; j += 1) {
				starArry.push({star: '★', className: 'colorfulStar'});
			}
			for (let i = 0; i < 5; i += 1) {
				starArry.push({star: '★', className: 'grayStar'});
			}
			this.gradeStarArry = starArry.slice(5, 10);
		},
		methods: {
			grade (num) {
				this.gradeStarArry = this.starArry.slice(4-num, 9-num);
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.star {
		display: inline-block;
		width: 32px;
		height: 32px;
		text-align: center;
		line-height: 32px;
		font-size: 22px;
		font-weight: 600;
		cursor: pointer;
	}
		
	.colourful {
		color: #ffcc01;
	}
		
	.gray {
		color: #dcd7d7;
	}
</style>