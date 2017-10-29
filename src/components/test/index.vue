<template>
	<div class="">
		<div v-for="(v1, k1) in newList" :key="k1">
			<div>
				<span>
					<input type="checkbox" v-check:data="list" v-model="my" v-bind:value="v1.id" v-on:change="change(v1.id, v1.pid);"   />
					<a href="javascript:;">{{v1.name}}</a>
				</span>
			</div>

			<div style="margin-left: 50px;">
				<span v-for="(v2, k2) in v1.child" :key="k2" v-if="v1.child && v1.child.length" style="margin-right: 20px;">
					<input type="checkbox" v-check:data="list" v-model="my" v-bind:value="v2.id" v-on:change="change(v2.id, v2.pid);"   />
					<a href="javascript:;">{{v2.name}}</a>
					<div style="margin-left: 100px;" v-if="v2.child && v2.child.length">
						<span v-for="(v3, k3) in v2.child" :key="k3" style="margin-right: 20px;">
							<input type="checkbox" v-check:data="list" v-model="my" v-bind:value="v3.id" v-on:change="change(v3.id, v3.pid);"  />
							<a href="javascript:;">{{v3.name}}</a>
						</span>
					</div>
				</span>
			</div>
		</div>

		<a href="javascript:;" v-on:click="show();">所有</a>
		<a href="javascript:;" v-on:click="go();">展示id集合</a>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				list: [
					{id: 1, name: '北京', pid: 0, level: 1},
					{id: 2, name: '山西', pid: 0, level: 1},
					{id: 3, name: '太原', pid: 2, level: 2},
					{id: 4, name: '忻州', pid: 2, level: 2},
					{id: 5, name: '五台县', pid: 4, level: 3}
				],
				newList: [],
				arry: [],

				test: 1,
				my: []
			}
		},
		directives: {
			check: {
				inserted: function (el, data, vnode) {

				},
				bind: function (el, data, vnode) {
//					const list = vnode.context.list;
//					const my = vnode.context.my;
//					el.onchange = function () {
//						if (el.checked) {
//							$(this).parent().siblings().find('input').prop('checked', true);
//						} else {
//							$(this).parent().siblings().find('input').prop('checked', false);
//						}
//					}
				}
			}
		},
		mounted () {
			let list = this.list;

			function fn (list, pid) {
				let arry = [];
				list.forEach(function (item) {
					if (item.pid == pid) {
						item.child = fn(list, item.id);
						arry.push(item);
					}
				});
				return arry;
			}
			this.newList = fn(list, 0);
		},
		methods: {
			show () {
				console.log(this.my);
			},
			change (id, pid) {
				let event = window.event;
				let _this = this;
				let list = this.list;
				let arry = [];

				function fn (list, pid) {

					list.forEach(function (item) {
						if (item.pid == pid) {
							arry.push(item.id);
							fn(list, item.id);
						}
					});
					return arry;
				}

				let result = fn(list, id);
				console.log(result);

				result = Array.from(new Set(result));
				_this.my = Array.from(new Set(_this.my));

				if (event.target.checked) {
					result.forEach(function (item) {
						_this.my.push(item);
					});
					function fn1 (pid) {
						_this.list.forEach(function (item) {
							if (item.id == pid) {
								_this.my.push(item.id);
								fn1(item.pid);
							}
						});
					}
					fn1(pid);
				} else {
					let tmpArry = [];
					let mark = false;
					let fId = null;
					_this.list.forEach(function (item) {
						if (item.pid == pid) {
							fId = pid;
							tmpArry.push(item.id);
						}
					});

					for (let j = 0; j < result.length; j+=1) {
						for (let i = 0; i < _this.my.length; i+=1) {
							if (_this.my[i] == result[j]) {
								_this.my.splice(i, 1);
								break;
							}
						}
					}

					for (let k = 0; k < _this.my.length; k+=1) {
						for (let m = 0; m < tmpArry.length; m+=1) {
							if (_this.my[k] == tmpArry[m]) {
								mark = true;
								break;
							}
						}
					}

					if (!mark) {
						for (let n = 0; n < _this.my.length; n+=1) {
							if (_this.my[n] == fId) {
								_this.my.splice(n, 1);
								break;
							}
						}
					}

				}
				console.log(_this.my);
				console.log('----------');
			}
		}
	}
</script>

<style scoped lang="less" rel="stylesheet/less">
	input[type=checkbox] {
		border: 1px solid #ccc;
	}
</style>