<template>
  <!-- 个人中心组件 -->
  <div class="personal-wraper">
    <explain :explainName="state.explainName"></explain>

    <!-- 个人信息 -->
    <div class="personal-msg-wraper">
      <div class="head">
        <img :src="state.userInfo.headpic" width="80" height="80" alt="头像" />
      </div>
      <div class="phone">
        <img
          src="./images/phone.png"
          width="30"
          height="30"
          class="phone-ico"
          alt="手机"
        />
        <span class="phone-num">{{ state.userInfo.phone }}</span>
      </div>
      <router-link
        tag="a"
        :to="{ path: '/personal-edit' }"
        class="setting"
      ></router-link>
    </div>

    <!-- 卡包列表 -->
    <div class="gift-list-wraper distance-wraper">
      <div class="title">卡包</div>
      <!-- 银联优惠 -->
      <div class="gift-item">
        <div class="brief" @click="showUnion">
          <span class="gift-ico unionpay-ico"></span>
          <span class="gift-name">银联优惠({{ state.unionNum }})</span>
          <span
            class="flex-ico"
            :class="{
              'flex-ico-up': state.isUnionpay,
              'flex-ico-down': !state.isUnionpay
            }"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{
            'gift-detail-on': state.isUnionpay,
            'gift-detail-off': !state.isUnionpay
          }"
        >
          <router-link
            v-for="(v, k) in state.unionCouponList"
            :key="k"
            :to="{ path: '/get-coupon', query: { id: v.id, type: 2 } }"
            :class="{
              'use-discount-bg': v.status === 0,
              'used-bg': v.status === 1,
              'past-bg': v.status === 2
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
            <div class="shop-active shop-active-canuse" v-if="v.status === 0">
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div class="shop-active" v-if="v.status === 1">
              <a href="javascript:;" class="used"></a>
            </div>
            <div class="shop-active" v-if="v.status === 2">
              <a href="javascript:;" class="past"></a>
            </div>
          </router-link>
        </div>
      </div>

      <!-- VISA权益 -->
      <div class="gift-item">
        <div class="brief" @click="showVisa">
          <span class="gift-ico visa-ico"></span>
          <span class="gift-name">VISA权益({{ state.visaNum }})</span>
          <span
            class="flex-ico"
            :class="{
              'flex-ico-up': state.isVisa,
              'flex-ico-down': !state.isVisa
            }"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{
            'gift-detail-on': state.isVisa,
            'gift-detail-off': !state.isVisa
          }"
        >
          <router-link
            v-for="(v, k) in state.visaCouponList"
            :key="k"
            :to="{ path: '/get-coupon', query: { id: v.id, type: 2 } }"
            :class="{
              'use-discount-bg': v.status === 0,
              'used-bg': v.status === 1,
              'past-bg': v.status === 2
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
            <div class="shop-active shop-active-canuse" v-if="v.status === 0">
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div class="shop-active" v-if="v.status === 1">
              <a href="javascript:;" class="used"></a>
            </div>
            <div class="shop-active" v-if="v.status === 2">
              <a href="javascript:;" class="past"></a>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 环球锦囊团优惠 -->
      <div class="gift-item">
        <div class="brief" @click="showJinnang">
          <span class="gift-ico jinnang-ico"></span>
          <span class="gift-name">环球锦囊团优惠({{ state.jinnangNum }})</span>
          <span
            class="flex-ico"
            :class="{
              'flex-ico-up': state.isJinnang,
              'flex-ico-down': !state.isJinnang
            }"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{
            'gift-detail-on': state.isJinnang,
            'gift-detail-off': !state.isJinnang
          }"
        >
          <router-link
            v-for="(v, k) in state.jinnangCouponList"
            :key="k"
            :to="{ path: '/get-coupon', query: { id: v.id, type: 2 } }"
            :class="{
              'use-discount-bg': v.status === 0,
              'used-bg': v.status === 1,
              'past-bg': v.status === 2
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
            <div class="shop-active shop-active-canuse" v-if="v.status === 0">
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div class="shop-active" v-if="v.status === 1">
              <a href="javascript:;" class="used"></a>
            </div>
            <div class="shop-active" v-if="v.status === 2">
              <a href="javascript:;" class="past"></a>
            </div>
          </router-link>
        </div>
      </div>

      <!-- 高岛屋权益 -->
      <div class="gift-item">
        <div class="brief" @click="showGaodaowu">
          <span class="gift-ico gaodaowu-ico"></span>
          <span class="gift-name">高岛屋权益({{ state.gaodaowuNum }})</span>
          <span
            class="flex-ico"
            :class="{
              'flex-ico-up': state.isGaodaowu,
              'flex-ico-down': !state.isGaodaowu
            }"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{
            'gift-detail-on': state.isGaodaowu,
            'gift-detail-off': !state.isGaodaowu
          }"
        >
          <router-link
            v-for="(v, k) in state.gaodaowuCouponList"
            :key="k"
            :to="{ path: '/get-coupon', query: { id: v.id, type: 2 } }"
            :class="{
              'use-discount-bg': v.status === 0,
              'used-bg': v.status === 1,
              'past-bg': v.status === 2
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
            <div class="shop-active shop-active-canuse" v-if="v.status == 0">
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div class="shop-active" v-if="v.status === 1">
              <a href="javascript:;" class="used"></a>
            </div>
            <div class="shop-active" v-if="v.status === 2">
              <a href="javascript:;" class="past"></a>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <footer-nav :navName="state.navName"></footer-nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import Explain from '@/components/header-explain/index.vue'
import FooterNav from '@/components/footer-nav/index.vue'

import { getUserInfo } from '@/api/personal'
import { getCouponRecord, getReceivedCouponList } from '@/api/coupon'
import router from '@/router'
import { Dialog } from 'vant'

interface UserInfo {
  phone: string
  headpic: string
}

interface CouponRecord {
  num: number
  coupon_type: string
}

interface Coupon {
  coupon_explain: string
  coupon_ico_path: string
  coupon_name: string
  coupon_recived_num: number
  id: number
  status: number
}

interface State {
  explainName: string
  navName: string
  isUnionpay: boolean
  isVisa: boolean
  isJinnang: boolean
  isGaodaowu: boolean
  userInfo: UserInfo
  unionNum: number
  visaNum: number
  jinnangNum: number
  gaodaowuNum: number
  unionCouponList: Coupon[]
  visaCouponList: Coupon[]
  jinnangCouponList: Coupon[]
  gaodaowuCouponList: Coupon[]
}

export default defineComponent({
  components: {
    Explain,
    FooterNav
  },
  setup(props: {}, context: {}) {
    const state: State = reactive<State>({
      explainName: '个人中心',
      navName: 'personal',
      isUnionpay: false,
      isVisa: false,
      isJinnang: false,
      isGaodaowu: false,
      userInfo: { phone: '', headpic: '' },
      unionNum: 0,
      visaNum: 0,
      jinnangNum: 0,
      gaodaowuNum: 0,
      unionCouponList: [],
      visaCouponList: [],
      jinnangCouponList: [],
      gaodaowuCouponList: []
    })

    const uid: number = window.sessionStorage.uid
    if (uid) {
      _getUserInfo(uid)
      _getCouponRecord(uid)
    } else {
      router.push({ path: '/account/login' })
    }

    function _getUserInfo(id: number) {
      try {
        getUserInfo(id)
          .then(res => {
            const { code, data, message } = res.data
            if (code === 0) {
              const { user_headpic, user_phone } = data
              state.userInfo.headpic = user_headpic
              state.userInfo.phone = user_phone
            } else {
              Dialog.alert({ message })
            }
          })
          .catch(error => {
            Dialog.alert({
              message: error
            })
          })
      } catch (e) {
        router.push({ name: 'Login' })
      }
    }

    function _getCouponRecord(id: number) {
      getCouponRecord(id)
        .then(res => {
          const { code, data, message } = res.data
          if (code === 0) {
            data.forEach((coupon: CouponRecord): void => {
              switch (coupon.coupon_type) {
                case 'union':
                  state.unionNum = coupon.num
                  break
                case 'visa':
                  state.visaNum = coupon.num
                  break
                case 'jinnang':
                  state.jinnangNum = coupon.num
                  break
                case 'gaodaowu':
                  state.gaodaowuNum = coupon.num
                  break
              }
            })
          } else {
            Dialog.alert({ message })
          }
        })
        .catch(error => Dialog.alert({ message: error }))
    }

    function _getReceivedCouponList(
      type: 'union' | 'visa' | 'jinnang' | 'gaodaowu'
    ) {
      const uid: number = window.sessionStorage.uid
      return getReceivedCouponList(uid, type)
    }

    async function showUnion() {
      state.isUnionpay = !state.isUnionpay
      state.isVisa = state.isJinnang = state.isGaodaowu = false
      if (!state.isUnionpay) return

      try {
        const res = await _getReceivedCouponList('union')
        const { code, data, message } = res.data
        if (code === 0) {
          state.unionCouponList = data
        } else {
          Dialog.alert({ message })
        }
      } catch (e) {
        Dialog.alert({ message: JSON.stringify(e) })
      }
    }

    async function showVisa() {
      state.isVisa = !state.isVisa
      state.isUnionpay = state.isJinnang = state.isGaodaowu = false
      if (!state.isVisa) return

      try {
        const res = await _getReceivedCouponList('visa')
        const { code, data, message } = res.data
        if (code === 0) {
          state.visaCouponList = data
        } else {
          Dialog.alert({ message })
        }
      } catch (e) {
        Dialog.alert({ message: JSON.stringify(e) })
      }
    }

    async function showJinnang() {
      state.isJinnang = !state.isJinnang
      state.isUnionpay = state.isVisa = state.isGaodaowu = false
      if (!state.isJinnang) return
      try {
        const res = await _getReceivedCouponList('jinnang')
        const { code, data, message } = res.data
        if (code === 0) {
          state.jinnangCouponList = data
        } else {
          Dialog.alert({ message })
        }
      } catch (e) {
        Dialog.alert({ message: JSON.stringify(e) })
      }
    }

    async function showGaodaowu() {
      state.isGaodaowu = !state.isGaodaowu
      state.isUnionpay = state.isVisa = state.isJinnang = false
      if (!state.isGaodaowu) return
      try {
        const res = await _getReceivedCouponList('gaodaowu')
        const { code, data, message } = res.data
        if (code === 0) {
          state.gaodaowuCouponList = data
        } else {
          Dialog.alert({ message })
        }
      } catch (e) {
        Dialog.alert({ message: JSON.stringify(e) })
      }
    }

    return {
      state,
      showUnion,
      showVisa,
      showJinnang,
      showGaodaowu
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
@import './tour-app-personal.less';
@import '../../static/less/coupon.less';

.gift-list-wraper {
  .title {
    margin-bottom: 10px;
    border-left: 5px solid #ffb000;
    padding-left: 10px;
    font-size: 15px;
  }
  .gift-item {
    .brief {
      position: relative;
      margin-bottom: 10px;
      height: 55px;
      background-color: #fff;
      .gift-ico {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 10px;
        width: 35px;
        height: 35px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 35px 35px;
      }
      .unionpay-ico {
        background-image: url('./images/list_unionpay.png');
      }
      .visa-ico {
        background-image: url('./images/list_visa.png');
      }
      .jinnang-ico {
        background-image: url('./images/jinnangtuan.png');
      }
      .gaodaowu-ico {
        background-image: url('./images/list_dutyfree.png');
      }
      .gift-name {
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 55px;
        height: 35px;
        line-height: 35px;
      }
      .flex-ico {
        display: inline-block;
        position: absolute;
        right: 16px;
        top: 22px;
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 12px 12px;
      }
      .flex-ico-down {
        background-image: url('./images/flex_down.png');
      }
      .flex-ico-up {
        background-image: url('./images/flex_up.png');
      }
    }
  }
}

.gift-detail-on {
  display: block;
}

.gift-detail-off {
  display: none;
}
</style>
