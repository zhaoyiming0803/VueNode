<template>
  <!-- 优惠券使用规则组件 -->
  <div class="coupon-rule-wraper" id="coupon-rule">
    <column-divide :columnName="state.columnName"></column-divide>
    <div
      class="content"
      id="content"
      :class="{ 'constant-height': state.isShowRule }"
    >
      <div class="coupon-rule-title">【优惠券有效期】</div>
      <div class="coupon-rule-detail">
        <font color="#f00">自领取日起5天内有效</font>
      </div>
      <div class="coupon-rule-title">【活动范围】</div>
      <div class="coupon-rule-detail">所有银联卡（卡号以62开头）</div>
      <div class="coupon-rule-title">【活动地点】</div>
      <div class="coupon-rule-detail">莎莎香港及澳门所有门店</div>
      <div class="coupon-rule-title">【活动内容】</div>
      <div class="coupon-rule-detail" id="activity">
        <p>
          1、优惠活动期内，银联卡（卡号以62开头）持卡人在莎莎香港及澳门门店消费单笔购物金额满港币或澳门币100元或以上，经验证以二维码或条形码为形式的莎莎电子现金券后使用银联卡支付，立减港币或澳门币30元；
        </p>
        <p>2、具体电子现金券可使用时间以券显示有效期为准；</p>
        <p>3、每一次交易仅可使用一张电子现金券，不可拆分，不能提现；</p>
        <p>4、每人每天在同一店内只可使用最多3张电子现金券；</p>
        <p>5、必须于付款前声明使用且主动出示电子现金券；</p>
        <p>6、交易必须通过银联网络付款，方可享有此优惠；</p>
        <p>7、本活动仅限莎莎香港及澳门所有门店；</p>
        <p>8、活动详情以店内信息为准；</p>
        <p>9、本活动的最终解释权归莎莎、锦囊团和银联国际共同所有。</p>
      </div>
    </div>
    <div class="coupon-show-more" @click="showMore">
      <div
        class="show-more-mask"
        id="show-more-mask"
        :class="{
          'dis-block': state.isShowRule,
          'dis-none': !state.isShowRule
        }"
      ></div>
      <div
        class="show-more-btn"
        id="show-more-btn"
        :class="{ 'flex-down': state.isShowRule, 'flex-up': !state.isShowRule }"
      >
        <span>查看详情</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ColumnDivide from '../column-divide/index.vue'

export default defineComponent({
  components: {
    ColumnDivide
  },
  setup(props: {}, context: {}) {
    const state = reactive({
      isShowRule: true,
      columnName: '优惠券详情'
    })

    function showMore() {
      state.isShowRule = !state.isShowRule
    }

    return {
      state,
      showMore
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.coupon-rule-wraper {
  margin: 0 5%;
  line-height: 25px;
  .content {
    overflow: hidden;
    &.constant-height {
      height: 250px;
    }
    .coupon-rule-title {
      font-size: 15px;
      color: #06b0f0;
    }
    .coupon-rule-detail {
      color: #4b4b4b;
    }
  }
}

.coupon-show-more {
  position: relative;
  .show-more-mask {
    position: absolute;
    top: -75px;
    width: 100%;
    height: 78px;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(255, 255, 255, 0)),
      to(#ffffff)
    );
  }
  .show-more-btn {
    display: block;
    color: #393939;
    span {
      display: block;
      width: 80px;
      height: 30px;
      margin: 0 auto;
      line-height: 30px;
      background-repeat: no-repeat;
      background-size: 12px 12px;
      background-position: 61px 9px;
    }
    &.flex-down span {
      background-image: url('./images/flex_down.png');
    }
    &.flex-up span {
      background-image: url('./images/flex_up.png');
    }
  }
}
</style>
