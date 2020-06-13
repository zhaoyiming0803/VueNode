<template>
  <div class="global-coupon-list-wraper">
    <explain :explainName="explainName"></explain>

    <div class="mb10">
      <div class="condition-wraper">
        <a href="javascript:;" class="left-wraper choose-condition" @click="showregionList">
          <span>
            <font>{{regionName}}</font>
          </span>
        </a>
        <a href="javascript:;" class="right-wraper choose-condition" @click="showClassifyList">
          <span>
            <font>{{classifyName}}</font>
          </span>
        </a>
      </div>

      <!-- 地区列表 -->
      <div class="list" id="contry-list" :class="{'dis-block': isRegion, 'dis-none': !isRegion}">
        <a
          href="javascript:;"
          v-for="(v, k) in regionList"
          :key="k"
          @click="showCoupons(v.id, classifyId);"
          :class="{'this-type': regionId==v.id}"
        >
          <span>{{v.region_name}}</span>
        </a>
      </div>

      <!--分类列表 -->
      <div class="list" id="classify" :class="{'dis-block': isClassify, 'dis-none': !isClassify}">
        <a
          href="javascript:;"
          v-for="(v, k) in classifyList"
          :key="k"
          @click="showCoupons(regionId, v.id);"
          :class="{'this-type': classifyId==v.id}"
        >
          <span>{{v.classify_name}}</span>
        </a>
      </div>
    </div>

    <div class="coupon-list-wraper">
      <router-link
        v-for="(v, k) in couponList"
        :key="k"
        :to="{path: '/get-coupon', query: {id: v.id, type: 1}}"
        :class="{'use-discount-bg': v.coupon_status==0, 'used-bg': v.coupon_status==1, 'past-bg': v.coupon_status==2}"
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
        <div class="shop-active shop-active-canuse">
          <p>已抢</p>
          <p>{{v.coupon_recived_num}}</p>
          <span
            :class="{'use-discount': v.coupon_status==0, 'used': v.coupon_status==1, 'past': v.coupon_status==2}"
          ></span>
        </div>
      </router-link>
    </div>

    <a
      href="javascript:;"
      v-if="couponList.length && couponList.length % 10 === 0"
      class="load-more"
      @click="loadMore"
    >加载更多</a>

    <div v-if="couponList.length === 0" style="background-color: white">
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
import { Component, Vue } from "vue-property-decorator";

import { Skeleton } from "vant";
import Explain from "@/components/header-explain/index.vue";
import FooterNav from "@/components/footer-nav/index.vue";

import { getCouponsList, getClassifyList, getRegionList } from "@/api/coupon";

@Component({
  components: {
    Explain,
    FooterNav,
    [Skeleton.name]: Skeleton
  }
})
export default class Home extends Vue {
  private explainName: string = "全球优惠";
  private isRegion: boolean = false;
  private regionList: any[] = [];
  private classifyList: any[] = [];
  private isClassify: boolean = false;
  private currentPage: number = 1;
  private couponList: any[] = [];

  private get regionId(): number {
    return this.$store.state.app.regionId;
  }

  private get regionName(): string {
    return this.$store.state.app.regionName;
  }

  private get classifyId(): number {
    return this.$store.state.app.classifyId;
  }

  private get classifyName(): string {
    return this.$store.state.app.classifyName;
  }

  private created() {
    this.getClassifyList();
    this.getCouponsList(this.regionId, this.classifyId, this.currentPage);
  }

  private getCouponsList(regionId: number, classifyId: number, page: number) {
    getCouponsList(regionId, classifyId, page)
      .then(res => {
        const { code, data, message } = res.data;
        if (code === 0) {
          this.couponList.push.apply(this.couponList, data);
        } else {
          this.$dialog.alert({ message });
        }
      })
      .catch(error => {
        this.$dialog.alert({
          message: "优惠券列表获取失败，请稍后再试"
        });
      })
      .finally(() => {
        
      });
    this.getRegionList();
  }

  private getRegionList() {
    getRegionList().then(res => {
      const { code, data, message } = res.data;
      if (code === 0) {
        this.regionList = data;
      }
    });
  }

  private showregionList() {
    this.isRegion = true;
    this.isClassify = false;
  }

  private showClassifyList() {
    this.isRegion = false;
    if (!this.classifyList.length) {
      this.getClassifyList();
    }
    this.isClassify = true;
  }

  private getClassifyList() {
    getClassifyList().then(res => {
      const { code, data, message } = res.data;
      if (code === 0) {
        this.classifyList = data;
      }
    });
  }

  private showCoupons(regionId: number, classifyId: number) {
    console.log(this.classifyList);
    const currentregionName = this.regionList
      ? this.regionList[regionId - 1].region_name
      : "全球";
    const currentClassifyName = this.classifyList
      ? this.classifyList[classifyId - 1].classify_name
      : "购物";

    this.currentPage = 1;
    this.couponList = [];

    this.$store.commit("changeRegionId", regionId);
    this.$store.commit("changeRegionName", currentregionName);
    this.$store.commit("changeClassifyId", classifyId);
    this.$store.commit("changeClassifyName", currentClassifyName);

    this.getCouponsList(this.regionId, this.classifyId, this.currentPage);

    this.isRegion = this.isClassify = false;
  }

  private loadMore() {
    this.getCouponsList(
      this.regionId,
      this.classifyId,
      (this.currentPage += 1)
    );
  }
}
</script>

<style lang="less" scoped>
@import "../static/less/coupon.less";

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
          background-image: url("../static/images/downarrows.png");
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
        background-image: url("../static/images/check.png");
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