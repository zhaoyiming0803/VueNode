<template>
  <!-- 倒计时组件 -->
  <div class="count-down-wraper">
    <input
      type="button"
      v-if="!state.disable"
      v-model="state.btnName"
      class="get-code get-code-off"
      @click="getCode"
    />
    <input
      type="button"
      v-if="state.disable"
      v-model="state.btnName"
      class="get-code get-code-on"
      disabled
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { validatePhone } from '@/utils/index'
import { getPhoneCode } from '@/api/auth'
import { Dialog } from 'vant'

interface Props {
  phone: string
}

export default defineComponent({
  props: {
    phone: {
      type: String,
      required: true
    }
  },
  setup(props: Props, context: {}) {
    const state = reactive({
      btnName: '获取验证码',
      disable: false
    })

    function getCode() {
      if (!validatePhone(props.phone)) {
        return Dialog.alert({
          message: '手机号格式不正确，请重新输入！'
        })
      }

      state.disable = true

      let num: number = 60
      const timer: number = setInterval(() => {
        num -= 1
        state.btnName = num + 's后重试'
        if (num < 1) {
          state.disable = false
          state.btnName = '获取验证码'
          clearInterval(timer)
        }
      }, 1000)

      getPhoneCode(props.phone)
        .then(res => {
          const { code, data, message } = res.data
          Dialog.alert({
            message: code === 0 ? `短信验证码：${data}` : message
          })
        })
        .catch(error => {
          Dialog.alert({
            message: '短信验证码获取失败，请重新操作'
          })
        })
    }

    return {
      state,
      getCode
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  position: absolute;
  right: 10px;
  top: 8px;
  width: 90px;
  height: 30px;
  background-color: #fff;
  font-size: 13px;
}

.get-code-on {
  color: #b4b4b4;
}

.get-code-off {
  color: #2577e3;
}
</style>
