<template>
  <!-- 星级评分组件 -->
  <div class="star-wraper">
    <span
      v-for="(v, k) in state.gradeStarArry"
      :key="k"
      @click="grade(k)"
      :class="{
        colourful: v.className === 'colorfulStar',
        gray: v.className === 'grayStar'
      }"
      class="star"
      >{{ v.star }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, SetupContext } from 'vue'

interface Star {
  // 只能用双引号
  star: '*'
  className: 'colorfulStar' | 'grayStar'
}

export default defineComponent({
  setup(props: {}, context: SetupContext) {
    const starArry: Star[] = []
    const gradeStarArry: Star[] = []
    const state = reactive({
      starArry,
      gradeStarArry
    })

    onMounted(() => {
      for (let j = 0; j < 5; j += 1) {
        state.starArry[j] = { star: '*', className: 'colorfulStar' }
      }
      for (let i = 5; i < 10; i += 1) {
        state.starArry[i] = { star: '*', className: 'grayStar' }
      }
      state.gradeStarArry = starArry.slice(5, 10)
    })

    function grade(num: number): void {
      state.gradeStarArry = state.starArry.slice(4 - num, 9 - num)
      context.emit('on-change', num + 1)
    }

    return {
      state,
      grade
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.star {
  display: inline-block;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
}

.colourful {
  color: #ffcc01;
}

.gray {
  color: #dcd7d7;
}
</style>
