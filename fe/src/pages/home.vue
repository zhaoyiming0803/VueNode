<template>
  <div class="global-coupon-list-wraper">
    <explain :explainName="state.explainName"></explain>

    <div class="mb10">
      <div class="condition-wraper">
        <a
          href="javascript:;"
          class="left-wraper choose-condition"
          @click="showRegionList"
        >
          <span>
            <font>{{ regionName }}</font>
          </span>
        </a>
        <a
          href="javascript:;"
          class="right-wraper choose-condition"
          @click="showClassifyList"
        >
          <span>
            <font>{{ classifyName }}</font>
          </span>
        </a>
      </div>

      <!-- 地区列表 -->
      <div
        class="list"
        id="contry-list"
        :class="{ 'dis-block': state.isRegion, 'dis-none': !state.isRegion }"
      >
        <a
          href="javascript:;"
          v-for="(v, k) in state.regionList"
          :key="k"
          @click="showCoupons(v.id, classifyId)"
          :class="{ 'this-type': regionId == v.id }"
        >
          <span>{{ v.region_name }}</span>
        </a>
      </div>

      <!--分类列表 -->
      <div
        class="list"
        id="classify"
        :class="{
          'dis-block': state.isClassify,
          'dis-none': !state.isClassify
        }"
      >
        <a
          href="javascript:;"
          v-for="(v, k) in state.classifyList"
          :key="k"
          @click="showCoupons(regionId, v.id)"
          :class="{ 'this-type': classifyId == v.id }"
        >
          <span>{{ v.classify_name }}</span>
        </a>
      </div>
    </div>

    <div class="coupon-list-wraper">
      <router-link
        v-for="(v, k) in state.couponList"
        :key="k"
        :to="{ path: '/get-coupon', query: { id: v.id, type: 1 } }"
        :class="{
          'use-discount-bg': v.coupon_status == 0,
          'used-bg': v.coupon_status == 1,
          'past-bg': v.coupon_status == 2
        }"
      >
        <div class="shop-ico">
          <img
            :src="v.coupon_ico_path"
            width="100%"
            height="100%"
            :alt="v.coupon_name"
          />
        </div>
        <div class="shop-intro">
          <div class="shop-title">{{ v.coupon_name }}</div>
          <div class="shop-price">
            <span class="condition">{{ v.coupon_explain }}</span>
          </div>
        </div>
        <div class="shop-active shop-active-canuse">
          <p>已抢</p>
          <p>{{ v.coupon_recived_num }}</p>
          <span
            :class="{
              'use-discount': v.coupon_status == 0,
              used: v.coupon_status == 1,
              past: v.coupon_status == 2
            }"
          ></span>
        </div>
      </router-link>
    </div>

    <a
      href="javascript:;"
      v-if="state.couponList.length && state.couponList.length % 10 === 0"
      class="load-more"
      @click="loadMore"
      >加载更多</a
    >

    <div v-if="state.couponList.length === 0" style="background-color: white">
      <van-skeleton title avatar :row="3" />
      <van-skeleton title avatar :row="3" />
      <van-skeleton title avatar :row="3" />
      <van-skeleton title avatar :row="3" />
      <van-skeleton title avatar :row="3" />
    </div>

    <footer-nav></footer-nav>
  </div>
</template>

<script lang="ts">
import {
  reactive,
  computed,
  ComputedRef,
  defineComponent,
  SetupContext
} from 'vue'
import { useStore } from 'vuex'
import { StateProps } from '@/store'

import { getCouponsList, getClassifyList, getRegionList } from '@/api/coupon'

import { Skeleton, Dialog } from 'vant'
import Explain from '@/components/header-explain/index.vue'
import FooterNav from '@/components/footer-nav/index.vue'

type State = {
  explainName: string
  isRegion: boolean
  regionList: any[]
  classifyList: any[]
  isClassify: boolean
  currentPage: number
  couponList: any[]
}

function _getClassifyList(state: State) {
  getClassifyList().then(res => {
    const { code, data, message } = res.data
    if (code === 0) {
      state.classifyList = data
    }
  })
}

function _getCouponsList(
  state: State,
  context: SetupContext,
  regionId: number,
  classifyId: number,
  currentPage: number
) {
  getCouponsList(regionId, classifyId, currentPage)
    .then(res => {
      const { code, data, message } = res.data
      if (code === 0) {
        state.couponList.push.apply(state.couponList, data)
      } else {
        Dialog.alert({ message })
      }
    })
    .catch(error => {
      Dialog.alert({
        message: '优惠券列表获取失败，请稍后再试'
      })
    })
}

function _getRegionList(state: State) {
  getRegionList().then(res => {
    const { code, data, message } = res.data
    if (code === 0) {
      state.regionList = data
    }
  })
}

export default defineComponent({
  components: {
    Explain,
    FooterNav,
    [Skeleton.name]: Skeleton
  },

  setup(props: {}, context: SetupContext) {
    const store = useStore<StateProps>()
    const regionId: ComputedRef<number> = computed(
      () => store.state.app.regionId
    )
    const regionName: ComputedRef<string> = computed(
      () => store.state.app.regionName
    )
    const classifyId: ComputedRef<number> = computed(
      () => store.state.app.classifyId
    )
    const classifyName: ComputedRef<string> = computed(
      () => store.state.app.classifyName
    )

    console.log('store: ', store)

    const state: State = reactive({
      explainName: '全球优惠',
      isRegion: false,
      regionList: [],
      classifyList: [],
      isClassify: false,
      currentPage: 1,
      couponList: []
    })

    const showRegionList = () => {
      state.isRegion = true
      state.isClassify = false
    }

    const showClassifyList = () => {
      state.isRegion = false
      if (!state.classifyList.length) {
        _getClassifyList(state)
      }
      state.isClassify = true
    }

    const showCoupons = (regionId: number, classifyId: number) => {
      const currentregionName = state.regionList
        ? state.regionList[regionId - 1].region_name
        : '全球'
      const currentClassifyName = state.classifyList
        ? state.classifyList[classifyId - 1].classify_name
        : '购物'

      state.currentPage = 1
      state.couponList = []

      store.commit('app/changeRegionId', regionId)
      store.commit('app/changeRegionName', currentregionName)
      store.commit('app/changeClassifyId', classifyId)
      store.commit('app/changeClassifyName', currentClassifyName)

      _getCouponsList(state, context, regionId, classifyId, state.currentPage)

      state.isRegion = state.isClassify = false
    }

    const loadMore = () => {
      state.currentPage += 1
      _getCouponsList(
        state,
        context,
        regionId.value,
        classifyId.value,
        state.currentPage
      )
    }

    _getClassifyList(state)
    _getCouponsList(
      state,
      context,
      regionId.value,
      classifyId.value,
      state.currentPage
    )
    _getRegionList(state)

    return {
      state,
      regionId,
      regionName,
      classifyId,
      classifyName,
      showRegionList,
      showCoupons,
      loadMore,
      showClassifyList
    }
  }
})
</script>

<style lang="less" scoped>
@import '../static/less/coupon.less';

.mb10 {
  margin-bottom: 10px;
}

.global-coupon-list-wraper {
  .condition-wraper {
    display: flex;
    background-color: #fff;
    border-top: 1px solid #f1f4fd;
    .choose-condition {
      flex: 1;
      position: relative;
      height: 45px;
      color: #383838;
      &.left-wraper span {
        border-right: 1px solid #e6e6e6;
        font {
          width: 73px;
          background-position: 62px 8px;
        }
      }
      &.right-wraper span font {
        width: 62px;
        background-position: 50px 8px;
      }
      span {
        display: block;
        position: absolute;
        top: 10px;
        width: 100%;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font {
          display: block;
          margin: 0 auto;
          background-image: url('../static/images/downarrows.png');
          background-repeat: no-repeat;
          background-size: 12px 12px;
        }
      }
    }
  }
  .list {
    position: fixed;
    left: 0;
    top: 91px;
    z-index: 10001;
    width: 100%;
    background-color: #fafbfc;
    a {
      display: block;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #383838;
      font-size: 16px;
      &.this-type span {
        display: inline-block;
        width: 118px;
        color: #2577e3;
        background-image: url('../static/images/check.png');
        background-repeat: no-repeat;
        background-position: 92px 5px;
        background-size: 32px 32px;
      }
    }
  }
  .coupon-list-wraper {
    margin: 0 3%;
  }
  .load-more {
    display: block;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: #fff;
    color: #333;
    font-size: 16px;
  }
}
</style>
