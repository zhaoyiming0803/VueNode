<template>
  <div class="app-wraper wraper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" scoped>
  import { Component, Vue } from 'vue-property-decorator';
  import wechat from '@/libs/wx'

  @Component({})
  export default class Home extends Vue {
    mounted () {
      wechat();
    }
  }
</script>

<style lang="less">
  @import './static/css/tour-app-base.css';
	body {
		background: #fafafa;
	}
</style>