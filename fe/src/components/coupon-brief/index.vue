<template>
  <!-- 优惠券信息简介组件 -->
  <div class="coupon-top-wraper">
    <div class="top-ico clearfix">
      <span class="union-ico"></span>
      <span class="hq-ico"></span>
    </div>
    <div class="coupon-brief">
      <div class="coupon-ico">
        <img :src="coupon.coupon_ico_path" width="79" height="79" />
      </div>
      <div class="coupon-name">{{ coupon.coupon_name }}</div>
      <div class="coupon-discounts">{{ coupon.coupon_explain }}</div>
      <div class="coupon-time">
        活动时间：{{ dateFormate(coupon.coupon_starttime) }}至{{
          dateFormate(coupon.coupon_endtime)
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface CouponInterface {
  comment_content: string
  comment_star: number
  comment_user_phone: string
  coupon_endtime: string
  coupon_explain: string
  coupon_ico_path: string
  coupon_name: string
  coupon_starttime: string
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
    .hq-ico {
      width: 83px;
      height: 17px;
      float: right;
      margin: 10px 10px 0 0;
      background-image: url('./images/quan_logo.png');
      background-size: 83px 17px;
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
