<template>
  <!-- 个人中心组件 -->
  <div class="personal-wraper">
    <explain :explainName="explainName"></explain>

    <!-- 个人信息 -->
    <div class="personal-msg-wraper">
      <div class="head">
        <img :src="userInfo.headpic" width="80" height="80" alt="头像" />
      </div>
      <div class="phone">
        <img src="./images/phone.png" width="30" height="30" class="phone-ico" alt="手机" />
        <span class="phone-num">{{userInfo.phone}}</span>
      </div>
      <router-link tag="a" :to="{path: '/personal-edit'}" class="setting"></router-link>
    </div>

    <!-- 卡包列表 -->
    <div class="gift-list-wraper distance-wraper">
      <div class="title">卡包</div>
      <!-- 银联优惠 -->
      <div class="gift-item">
        <div class="brief" @click="showUnion">
          <span class="gift-ico unionpay-ico"></span>
          <span class="gift-name">银联优惠({{unionNum}})</span>
          <span class="flex-ico" :class="{'flex-ico-up': isUnionpay, 'flex-ico-down': !isUnionpay}"></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isUnionpay, 'gift-detail-off': !isUnionpay}"
        >
          <router-link
            v-for="(v, k) in unionCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img :src="v.coupon_ico_path" width="100%" height="100%" :alt="v.coupon_name" />
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{v.coupon_name}}</div>
              <div class="shop-price">
                <span class="condition">{{v.coupon_explain}}</span>
              </div>
            </div>
            <div class="shop-active shop-active-canuse" v-if="v.status === 0">
              <p>已抢</p>
              <p>{{v.coupon_recived_num}}</p>
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
          <span class="gift-name">VISA权益({{visaNum}})</span>
          <span class="flex-ico" :class="{'flex-ico-up': isVisa, 'flex-ico-down': !isVisa}"></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isVisa, 'gift-detail-off': !isVisa}"
        >
          <router-link
            v-for="(v, k) in visaCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img :src="v.coupon_ico_path" width="100%" height="100%" :alt="v.coupon_name" />
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{v.coupon_name}}</div>
              <div class="shop-price">
                <span class="condition">{{v.coupon_explain}}</span>
              </div>
            </div>
            <div class="shop-active shop-active-canuse" v-if="v.status === 0">
              <p>已抢</p>
              <p>{{v.coupon_recived_num}}</p>
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
          <span class="gift-name">环球锦囊团优惠({{jinnangNum}})</span>
          <span class="flex-ico" :class="{'flex-ico-up': isJinnang, 'flex-ico-down': !isJinnang}"></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isJinnang, 'gift-detail-off': !isJinnang}"
        >
          <router-link
            v-for="(v, k) in jinnangCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img :src="v.coupon_ico_path" width="100%" height="100%" :alt="v.coupon_name" />
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{v.coupon_name}}</div>
              <div class="shop-price">
                <span class="condition">{{v.coupon_explain}}</span>
              </div>
            </div>
            <div class="shop-active shop-active-canuse" v-if="v.status === 0">
              <p>已抢</p>
              <p>{{v.coupon_recived_num}}</p>
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
          <span class="gift-name">高岛屋权益({{gaodaowuNum}})</span>
          <span class="flex-ico" :class="{'flex-ico-up': isGaodaowu, 'flex-ico-down': !isGaodaowu}"></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isGaodaowu, 'gift-detail-off': !isGaodaowu}"
        >
          <router-link
            v-for="(v, k) in gaodaowuCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img :src="v.coupon_ico_path" width="100%" height="100%" :alt="v.coupon_name" />
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{v.coupon_name}}</div>
              <div class="shop-price">
                <span class="condition">{{v.coupon_explain}}</span>
              </div>
            </div>
            <div class="shop-active shop-active-canuse" v-if="v.status==0">
              <p>已抢</p>
              <p>{{v.coupon_recived_num}}</p>
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

    <footer-nav :navName="navName"></footer-nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Explain from "@/components/header-explain/index.vue";
import FooterNav from "@/components/footer-nav/index.vue";
import { getUserInfo } from "@/api/personal";
import { getCouponRecord, getReceivedCouponList } from "@/api/coupon";

interface UserInfo {
  phone: string;
  headpic: string;
}

interface CouponRecord {
  num: number;
  coupon_type: string;
}

interface Coupon {
  coupon_explain: string;
  coupon_ico_path: string;
  coupon_name: string;
  coupon_recived_num: number;
  id: number;
  status: number;
}

@Component({
  components: {
    Explain,
    FooterNav
  }
})
export default class Personal extends Vue {
  private explainName: string = "个人中心";
  private navName: string = "personal";
  private isUnionpay: boolean = false;
  private isVisa: boolean = false;
  private isJinnang: boolean = false;
  private isGaodaowu: boolean = false;
  private userInfo: UserInfo = { phone: "", headpic: "" };
  private unionNum: number = 0;
  private visaNum: number = 0;
  private jinnangNum: number = 0;
  private gaodaowuNum: number = 0;
  private unionCouponList: Coupon[] = [];
  private visaCouponList: Coupon[] = [];
  private jinnangCouponList: Coupon[] = [];
  private gaodaowuCouponList: Coupon[] = [];

  private created() {
    const uid: number = window.sessionStorage.uid;
    if (uid) {
      this.getUserInfo(uid);
      this.getCouponRecord(uid);
    } else {
      this.$router.push({ path: "/account/login" });
    }
  }

  private getUserInfo(id: number) {
    try {
      getUserInfo(id)
        .then(res => {
          const { code, data, message } = res.data;
          if (code === 0) {
            const { user_headpic, user_phone } = data;
            this.userInfo.headpic = user_headpic;
            this.userInfo.phone = user_phone;
          } else {
            this.$dialog.alert({ message });
          }
        })
        .catch(error => {
          this.$dialog.alert({
            message: error
          });
        });
    } catch (e) {
      this.$router.push({ name: "Login" });
    }
  }

  getCouponRecord(id: number) {
    getCouponRecord(id)
      .then(res => {
        const { code, data, message } = res.data;
        if (code === 0) {
          data.forEach((coupon: CouponRecord): void => {
            switch (coupon.coupon_type) {
              case "union":
                this.unionNum = coupon.num;
                break;
              case "visa":
                this.visaNum = coupon.num;
                break;
              case "jinnang":
                this.jinnangNum = coupon.num;
                break;
              case "gaodaowu":
                this.gaodaowuNum = coupon.num;
                break;
            }
          });
        } else {
          this.$dialog.alert({ message });
        }
      })
      .catch(error => this.$dialog.alert({ message: error }));
  }

  private getReceivedCouponList(
    type: "union" | "visa" | "jinnang" | "gaodaowu"
  ) {
    const uid: number = window.sessionStorage.uid;
    return getReceivedCouponList(uid, type);
  }

  private async showUnion() {
    this.isUnionpay = !this.isUnionpay;
    this.isVisa = this.isJinnang = this.isGaodaowu = false;
    if (!this.isUnionpay) return;

    try {
      const res = await this.getReceivedCouponList("union");
      const { code, data, message } = res.data;
      if (code === 0) {
        this.unionCouponList = data;
      } else {
        this.$dialog.alert({ message });
      }
    } catch (e) {
      this.$dialog.alert({ message: e });
    }
  }

  private async showVisa() {
    this.isVisa = !this.isVisa;
    this.isUnionpay = this.isJinnang = this.isGaodaowu = false;
    if (!this.isVisa) return;

    try {
      const res = await this.getReceivedCouponList("visa");
      const { code, data, message } = res.data;
      if (code === 0) {
        this.visaCouponList = data;
      } else {
        this.$dialog.alert({ message });
      }
    } catch (e) {
      this.$dialog.alert({ message: e });
    }
  }

  private async showJinnang() {
    this.isJinnang = !this.isJinnang;
    this.isUnionpay = this.isVisa = this.isGaodaowu = false;
    if (!this.isJinnang) return;
    try {
      const res = await this.getReceivedCouponList("jinnang");
      const { code, data, message } = res.data;
      if (code === 0) {
        this.jinnangCouponList = data;
      } else {
        this.$dialog.alert({ message });
      }
    } catch (e) {
      this.$dialog.alert({ message: e });
    }
  }

  private async showGaodaowu() {
    this.isGaodaowu = !this.isGaodaowu;
    this.isUnionpay = this.isVisa = this.isJinnang = false;
    if (!this.isGaodaowu) return;
    try {
      const res = await this.getReceivedCouponList("gaodaowu");
      const { code, data, message } = res.data;
      if (code === 0) {
        this.gaodaowuCouponList = data;
      } else {
        this.$dialog.alert({ message });
      }
    } catch (e) {
      this.$dialog.alert({ message: e });
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "./tour-app-personal.less";
@import "../../static/less/coupon.less";

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
        background-image: url("./images/list_unionpay.png");
      }
      .visa-ico {
        background-image: url("./images/list_visa.png");
      }
      .jinnang-ico {
        background-image: url("./images/jinnangtuan.png");
      }
      .gaodaowu-ico {
        background-image: url("./images/list_dutyfree.png");
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
        background-image: url("./images/flex_down.png");
      }
      .flex-ico-up {
        background-image: url("./images/flex_up.png");
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