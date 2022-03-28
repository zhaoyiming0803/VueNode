<template>
  <!-- 顶部固定定位组件 -->
  <div class="fixed-header">
    <div class="explain">
      <a href="javascript:;" v-show="!isAccount" @click="back()"> </a
      >{{ explainName }}
    </div>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  props: {
    explainName: {
      type: String,
      required: true
    },
    isAccount: {
      type: Boolean,
      default: false
    }
  },
  setup(props: {}, context: {}) {
    const router = useRouter()
    const route = useRoute()

    function back() {
      router.back()
    }
    return {
      back
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.fixed-header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  min-width: 320px;
  max-width: 640px;
  background-color: #fff;
  .explain {
    position: relative;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 18px;
    color: #383838;
    .goback {
      position: absolute;
      top: 7px;
      left: 10px;
      display: block;
      width: 21px;
      height: 31px;
      background: url('./goback.png') no-repeat left center;
      background-size: 12px 18px;
    }
  }
}
</style>
