<template>
  <!-- 评论展示组件 -->
  <div class="comment-wraper">
    <column-divide :columnName="state.columnName"></column-divide>

    <template v-if="comments.length">
      <div v-for="(v, k) in comments" :key="k" class="comment-item">
        <template v-if="v.commentUserPhone">
          <div class="comment-item-top clearfix">
            <div class="phone">{{ truncatePhone(v.commentUserPhone) }}</div>
            <div class="star">
              <img
                v-for="(value, key) in v.commentStar"
                :key="key"
                src="./images/star.png"
                width="15"
                height="15"
              />
              <img
                v-for="(value, key) in 5 - v.commentStar"
                :key="key"
                src="./images/notclickstar.png"
                width="15"
                height="15"
              />
            </div>
          </div>
        </template>
        <div class="comment-item-bottom">{{ v.commentContent }}</div>
      </div>
    </template>

    <div v-else style="padding: 0 0 10px 10px; color: #595959">暂无评论</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import ColumnDivide from '../column-divide/index.vue'

interface Column {
  commentUserPhone: string
  commentStar: number
  commentContent: string
}

export default defineComponent({
  props: {
    comments: {
      type: Array as PropType<Column[]>,
      default: () => []
    }
  },
  components: {
    ColumnDivide
  },
  setup(props: {}, context: {}) {
    const state = reactive({
      columnName: '最新评论'
    })

    function truncatePhone(phone: string) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 4)
    }

    return {
      state,
      truncatePhone
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.comment-wraper {
  padding-top: 15px;
  .comment-item {
    margin: 3% 3%;
    .comment-item-top {
      .phone {
        float: left;
      }
      .star {
        float: right;
      }
    }
    .comment-item-bottom {
      padding: 7px 0 0 0;
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}
</style>
