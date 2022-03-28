<template>
  <div class="account-container">
    <form class="account-container-form" v-on:submit="submitLogin">
      <p>
        <span class="phone-ico"></span>
        <input
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          class="phone"
          v-model.lazy.trim="state.phone"
          v-focus
          v-blur
        />
      </p>
      <p>
        <span class="pwd-ico"></span>
        <input
          type="password"
          placeholder="请输入密码"
          class="pwd"
          v-model.lazy.trim="state.pwd"
        />
      </p>
      <p>
        <input type="submit" value="登	录" class="account-btn" />
      </p>
      <router-link
        tag="a"
        class="phone-prompt"
        :to="{ name: 'GetPhoneCode' }"
        replace
        >忘记密码</router-link
      >
    </form>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import { focus, blur } from '@/mixins/directive'

import { login } from '@/api/auth'
import { validatePhone, validatePassword } from '@/utils/index'

export default defineComponent({
  directives: {
    focus,
    blur
  },
  setup(props: {}, context: {}) {
    const router = useRouter()

    const state = reactive({
      phone: '',
      pwd: ''
    })

    function submitLogin() {
      if (!validatePhone(state.phone)) {
        return Dialog.alert({
          message: '手机号码格式不正确，请重新输入！'
        })
      }

      if (!validatePassword(state.pwd)) {
        return Dialog.alert({
          message: '密码需要至少6位数，请重新输入！'
        })
      }

      login(state.phone, state.pwd)
        .then(res => {
          const { code, data, message } = res.data
          if (code === 0) {
            window.sessionStorage.uid = data
            router.back()
          } else {
            Dialog.alert({ message })
          }
        })
        .catch(error => {
          Dialog.alert({ message: '登录失败' })
        })
    }

    return {
      state,
      submitLogin
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './tour-app-account.less';
</style>
