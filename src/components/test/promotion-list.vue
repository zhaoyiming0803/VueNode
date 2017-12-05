<template>
	<div>
		this is promotion-list.vue	
		<a href="javascript:;" v-on:click="goback();">返回</a>
		<router-link 
			tag="a" 
			v-for="(v, k) in routes" 
			v-bind:key="k" 
			v-if="v.pid===0 || v.pid===5" 
			:to="{
				name: toUpperCaseFirst(v.node_name)
			}">{{v.node_mark}}
		</router-link>
		<router-view></router-view>
	</div>
</template>

<script scoped>
	import {mapGetters, mapActions} from 'vuex';

	export default {
		data () {
			return {

			}
		},
		computed: mapGetters([
			'routes'
		]),
		methods: {
			showRoutes () {
				console.log(this.routes);
			},
			toUpperCaseFirst (str) {
				return str.substr(0, 1).toUpperCase() + str.substr(1);
			},
			goback () {
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	a {
		display: block;
	}
</style>