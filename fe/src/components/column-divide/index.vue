<template>
	<!-- 栏目划分组件 -->
	<div class="column-divide-wraper">
		<span class="left"></span>
		<span class="center">{{columnName}}</span>
		<span class="right"></span>
	</div>
</template>

<script lang="ts">
	import { Vue, Component, Prop } from 'vue-property-decorator';

	@Component
	export default class ColumnDivide extends Vue {
		@Prop({type: String}) private columnName!: string;
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	.column-divide-wraper {
		position: relative;
		margin: 5px 0;
		height: 30px;
		.left,
		.right {
			display: inline-block;
			position: absolute;
			top: 14px;
			width: 35%;
			border-bottom: 1px solid #cecece;
		}
		.left {
			left: 0;
		}
		.right {
			right: 0;
		}
		.center {
			display: inline-block;
			position: absolute;
			left: 37%;
			width: 27%;
			text-align: center;
			line-height: 30px;
			color: #595959;
		}
	}
</style>