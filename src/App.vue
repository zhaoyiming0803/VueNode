<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" scoped>
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class Home extends Vue {}
</script>

<style lang="less">
  body {
    font-size: 16px;
    background-color: #f8f8f8;
    -webkit-font-smoothing: antialiased;
  }
</style>