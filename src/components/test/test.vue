<template>
  <div>
    <button v-on:click="fetch">请求数据</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        uname: 'haha',
        pwd: 'hehe'
      };
    },
    
    methods: {
      fetch () {
        this.$http.post('/fetch', {uname: this.uname, pwd: this.pwd}, {emulateJSON: true}).then((result) => {
          const res = JSON.parse(result.bodyText);
          console.log(res);
        });
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
