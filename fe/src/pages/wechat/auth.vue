<template>
  <div>{{ state.userInfo }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'vue'
import { useRoute } from 'vue-router'
import { authorizeUserInfo } from '@/api/wechat'

export default defineComponent({
  setup(props, context: SetupContext) {
    const state = reactive({
      userInfo: ''
    })

    const route = useRoute()

    const query = route.query
    const code = query.code as string

    authorizeUserInfo(code).then(res => {
      state.userInfo = JSON.stringify(res.data)
    })

    return {
      state
    }
  }
})
</script>
