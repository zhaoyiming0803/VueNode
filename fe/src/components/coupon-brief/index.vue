<template>
  <!-- 优惠券信息简介组件 -->
  <div class="coupon-top-wraper">
    <div class="top-ico clearfix">
      <span class="union-ico"></span>
    </div>
    <div class="coupon-brief">
      <div class="coupon-ico">
        <img :src="coupon.couponIcoPath" width="79" height="79" />
      </div>
      <div class="coupon-name">{{ coupon.couponName }}</div>
      <div class="coupon-discounts">{{ coupon.couponExplain }}</div>
      <div class="coupon-time">
        活动时间：{{ dateFormate(coupon.couponStartTime) }}至{{
          dateFormate(coupon.couponEndTime)
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface CouponInterface {
  commentContent: string
  commentStar: number
  commentUserPhone: string
  couponEndtime: string
  couponExplain: string
  couponIcoPath: string
  couponName: string
  couponStartTime: string
  couponEndTime: string
}

export default defineComponent({
  props: {
    coupon: {
      type: Object as PropType<CouponInterface>,
      required: true
    }
  },
  setup(props: {}, context) {
    function dateFormate(timestamp: string): string | number {
      const addZero = (value: number) => (value >= 10 ? value : '0' + value)
      const date = new Date(parseInt(timestamp, 10))
      return (
        date.getFullYear() +
        '/' +
        addZero(date.getMonth() + 1) +
        '/' +
        date.getDate()
      )
    }

    return {
      dateFormate
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.coupon-top-wraper {
  width: 94%;
  margin: 2% 3%;
  position: relative;
  height: 213px;
  background: #23a1df;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .top-ico {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    span {
      display: block;
      background-repeat: no-repeat;
    }
    .union-ico {
      width: 40px;
      height: 26px;
      float: left;
      margin: 10px 0 0 10px;
      background-image: url('./images/quan_banklogo.png');
      background-size: 40px 26px;
    }
  }
  .coupon-brief {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 25px;
    color: #fff;
    .coupon-ico {
      width: 79px;
      height: 79px;
      margin: 0 auto;
    }
  }
}
</style>
