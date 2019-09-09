<template>
	<!-- 星级评分组件 -->
	<div class="star-wraper">
		<span 
			v-for="(v, k) in gradeStarArry" 
			:key="k" 
			@click="grade(k)" 
			:class="{'colourful': v.className === 'colorfulStar', 'gray': v.className === 'grayStar'}" 
			class="star">{{v.star}}
		</span>
	</div>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator';

	@Component
	export default class Star extends Vue {
		private starArry: any[] = [];
		private gradeStarArry: any[] = [];

		private mounted () {
			let starArry = this.starArry;
			for (let j = 0; j < 5; j += 1) {
				starArry[j] = {star: '★', className: 'colorfulStar'};
			}
			for (let i = 5; i < 10; i += 1) {
				starArry[i] = {star: '★', className: 'grayStar'};
			}
			this.gradeStarArry = starArry.slice(5, 10);
		}

		private grade (num: number): void {
			this.gradeStarArry = this.starArry.slice(4 - num, 9 - num);
			this.$emit('on-change', num + 1)
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
