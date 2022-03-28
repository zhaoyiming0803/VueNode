<template>
  <!-- 修改性别组件 -->
  <div class="change-sex-wraper">
    <explain :explainName="state.explainName"></explain>

    <div class="white-item-wrpaer" style="border-bottom: 1px solid #efeded">
      <label for="man" :class="{ 'this-sex': state.sex == 1 }">男</label>
      <input
        type="radio"
        name="sex"
        value="1"
        id="man"
        checked
        v-model="state.sex"
        @click="_changeSex"
      />
    </div>
    <div class="white-item-wrpaer">
      <label for="woman" :class="{ 'this-sex': state.sex == 0 }">女</label>
      <input
        type="radio"
        name="sex"
        value="0"
        id="woman"
        v-model="state.sex"
        @click="_changeSex"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Explain from '@/components/header-explain/index.vue'
import { changeUserSex } from '@/api/personal'
import router from '@/router'
import { Dialog } from 'vant'

interface Query {
  userId?: number
  userSex?: 0 | 1
}

export default defineComponent({
  components: {
    Explain
  },
  setup(props, context: SetupContext) {
    const state = reactive({
      explainName: '修改性别',
      userId: 0,
      sex: 1
    })
    const route = useRoute()

    const query: Query = route.query
    state.userId = query.userId !== undefined ? query.userId - 0 : 0
    state.sex = query.userSex !== undefined ? query.userSex - 0 : 1

    function _changeSex(e: any) {
      state.sex = e.target.value - 0
      nextTick(() => {
        const userId = state.userId || 0
        const userSex = state.sex
        if (!userId) {
          return Dialog.alert({ message: '用户ID不合法' })
        }
        changeUserSex(userId, userSex)
          .then(res => {
            const { code, data, message } = res.data
            Dialog.alert({ message })
          })
          .catch(error => {
            Dialog.alert({ message: JSON.stringify(error) })
          })
      })
    }

    return {
      state,
      _changeSex
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.white-item-wrpaer {
  display: block;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: right;
  background-color: #fff;
}
.white-item-wrpaer label {
  position: absolute;
  left: 0;
  width: 95%;
  text-align: left;
  padding-left: 5%;
  &.this-sex {
    background-image: url('./images/check.png');
    background-repeat: no-repeat;
    background-size: 32px 32px;
    background-position: 95% 8px;
  }
}
</style>
