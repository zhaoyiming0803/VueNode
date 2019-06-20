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
				starArry[j] = {star: '★', className: 'colorfulStar'};
			}
			for (let i = 5; i < 10; i += 1) {
				starArry[i] = {star: '★', className: 'grayStar'};
			}
			this.gradeStarArry = starArry.slice(5, 10);
		},
		methods: {
			/*
			* 星级评分组件一般是作为其他组件的子组件使用；
			* 这里使用【单一事件管理】的方法将星级分数传给父组件；
			* 也可以通过props属性，获取父组件的一个对象(内存地址)，然后将对象的某个属性设置成星级分数值！
			*/
			grade (num) {
				this.gradeStarArry = this.starArry.slice(4-num, 9-num);
				vueEvent.$emit('starGrade', num+1);
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

	.colourful {color: #ffcc01;}

	.gray {color: #dcd7d7;}
</style>
