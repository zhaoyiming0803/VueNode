<template>
  <div class="account-container">
    <form v-on:submit="submitRegist" class="account-container-form">
      <p>
        <span class="phone-ico"></span>
        <input
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          class="phone"
          v-model="state.phone"
          v-focus
          v-blur
        />
      </p>
      <p>
        <span class="pwd-ico"></span>
        <input
          type="password"
          placeholder="请输入至少6位数的密码"
          class="pwd"
          v-model="state.pwd"
          v-focus
          v-blur
        />
      </p>
      <p>
        <span class="pwd-ico"></span>
        <input
          type="password"
          placeholder="确认密码"
          class="pwd"
          v-model="state.confirmPwd"
          v-focus
          v-blur
        />
      </p>
      <p>
        <input type="submit" value="注	册" class="account-btn" />
      </p>
    </form>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { focus, blur } from '@/mixins/directive'

import { regist } from '@/api/auth'
import { validatePhone, validatePassword } from '@/utils/index'
import { Dialog } from 'vant'

export default defineComponent({
  directives: {
    focus,
    blur
  },
  setup(props: {}, context: {}) {
    const router = useRouter()

    const state = reactive({
      phone: '',
      pwd: '',
      confirmPwd: ''
    })

    function submitRegist() {
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

      if (state.pwd !== state.confirmPwd) {
        return Dialog.alert({
          message: '两次输入的密码不一致，请重新输入！'
        })
      }

      regist(state.phone, state.pwd)
        .then(res => {
          const { code, message } = res.data
          if (code === 0) {
            router.replace({
              path: '/account/login'
            })
            Dialog.alert({ message: '注册成功' })
          } else {
            Dialog.alert({ message })
          }
        })
        .catch(error => {
          Dialog.alert({
            message: error
          })
        })
    }
    return {
      state,
      submitRegist
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './tour-app-account.less';
</style>
