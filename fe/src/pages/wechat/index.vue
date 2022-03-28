<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, SetupContext } from 'vue'
import wxAuth from '@/libs/wx/auth'

export default defineComponent({
  setup(props, context: SetupContext) {
    onMounted(() => {
      wxAuth(encodeURIComponent('https://web.0351zhuangxiu.com/tour/auth'))
    })
  }
})
</script>
