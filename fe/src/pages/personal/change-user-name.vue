<template>
  <!-- 修改用户名组件 -->
  <div class="change-username-sex">
    <explain :explainName="state.explainName"></explain>

    <div class="white-item-wrpaer" style="border-bottom: 1px solid #efeded">
      <label for="username">用户名：</label>
      <input
        type="text"
        placeholder="请输入您的用户名"
        id="username"
        v-model="state.userName"
        v-on:blur="_changeUserName()"
        v-focus
        v-blur
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'vue'
import { useRoute } from 'vue-router'
import Explain from '@/components/header-explain/index.vue'

import { focus, blur } from '@/mixins/directive'

import { changeUserName } from '@/api/personal'
import { Dialog } from 'vant'

interface Query {
  userName?: string
  userId?: number
}

export default defineComponent({
  components: {
    Explain
  },
  directives: {
    focus,
    blur
  },
  setup(props, context: SetupContext) {
    const state = reactive({
      explainName: '修改用户名',
      userName: ''
    })

    const route = useRoute()

    const query: Query = route.query
    state.userName = query.userName || ''

    function _changeUserName() {
      const query: Query = route.query
      const userId = query.userId !== undefined ? query.userId : 0
      const userName = state.userName || ''
      if (!userName.trim()) {
        return Dialog.alert({ message: '请填写用户昵称' })
      }
      if (!userId) {
        return Dialog.alert({ message: '用户ID不合法' })
      }
      changeUserName(userId, state.userName)
        .then(res => {
          const { code, data, message } = res.data
          Dialog.alert({ message })
        })
        .catch(error => {
          Dialog.alert({ message: JSON.stringify(error) })
        })
    }

    return {
      state,
      _changeUserName
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.white-item-wrpaer {
  display: block;
  position: relative;
  height: 50px;
  padding: 0 1%;
  line-height: 50px;
  text-align: right;
  background-color: #fff;
  input {
    width: 76%;
  }
}
</style>
