<template>
  <!-- 重置密码 -->
  <div class="forgetpwd-wraper">
    <explain :explainName="state.explainName"></explain>

    <div class="find-pwd-process">
      <img
        src="./images/flow2.png"
        width="100%"
        height="100%"
        alt="找回密码第二步"
      />
    </div>
    <div class="account-container">
      <form class="account-container-form" v-on:submit="complete">
        <p>
          <span class="pwd-ico"></span>
          <input
            type="password"
            placeholder="请输入密码"
            class="pwd"
            v-model.lazy.trim="state.pwd"
            v-focus
            v-blur
          />
        </p>
        <p>
          <span class="pwd-ico"></span>
          <input
            type="password"
            placeholder="请确认密码"
            class="pwd"
            v-model.lazy.trim="state.confirmPwd"
            v-focus
            v-blur
          />
        </p>
        <p>
          <input type="submit" value="完	成" class="account-btn" />
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Explain from '@/components/header-explain/index.vue'

import { focus, blur } from '@/mixins/directive'

import { validatePhone, validatePassword } from '@/utils/index'
import { resetPassword } from '@/api/auth'
import { Dialog } from 'vant'

export default defineComponent({
  components: {
    Explain
  },
  directives: {
    focus,
    blur
  },
  setup(props: {}, context: {}) {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      explainName: '找回密码第二步',
      phone: '',
      pwd: '',
      confirmPwd: ''
    })

    state.phone = route.query.phone as string
    if (!validatePhone(state.phone)) {
      router.back()
    }

    function complete() {
      if (!validatePassword(state.pwd)) {
        return Dialog.alert({
          message: '密码至少6位数'
        })
      }

      if (state.pwd !== state.confirmPwd) {
        return Dialog.alert({
          message: '两次输入的密码不一致，请重新输入！'
        })
      }

      resetPassword(state.phone, state.pwd)
        .then(res => {
          const { code, data, message } = res.data
          if (code === 0) {
            Dialog.alert({
              message: '密码修改成功'
            })
            router.replace({ name: 'Login' })
          } else {
            Dialog.alert({
              message
            })
          }
        })
        .catch(error => {
          return Dialog.alert({
            message: error
          })
        })
    }

    return {
      state,
      complete
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './tour-app-account.less';

.find-pwd-process {
  width: 100%;
  height: 35px;
  margin: 15px auto;
}

@media only screen and (min-width: 768px) {
  .find-pwd-process {
    height: 60px;
  }
}
</style>
