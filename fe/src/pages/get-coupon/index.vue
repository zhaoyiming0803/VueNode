<template>
  <!-- 获取优惠券 -->
  <div class="get-coupon-wraper">
    <explain :explainName="explainName"></explain>

    <coupon-brief :coupon="coupon" v-if="coupon.coupon_name"></coupon-brief>

    <div class="coupon-bottom-wraper" id="coupon-bottom-wraper">
      <a href="javascript:;" v-if="showType==1" @click="receiveCoupon" class="coupon-btn">立即领取</a>

      <!-- 优惠券使用方法 -->
      <div v-if="showType==2" class="use-coupon">
        <div class="quan_line">
          <img src="./images/quan_line.png" width="220" height="50" />
        </div>
        <div class="quan-er">
          <img src="./images/quan_er.png" width="150" height="150" />
          <p>请务必“长按”保存到手机相册</p>
        </div>

        <column-divide :columnName="columnName"></column-divide>
        <div class="useway">
          <div class="item">
            <img src="./images/quan_get.png" width="37" height="37" />
            <p>领券</p>
          </div>
          <div class="item">
            <img src="./images/pay_line.png" width="37" height="37" />
            <p>消费时出示券码</p>
          </div>
          <div class="item">
            <img src="./images/quan_cards.png" width="37" height="37" />
            <p>
              <span>银联刷卡</span>
              <span>(卡号以62开头)</span>
            </p>
          </div>
        </div>
      </div>

      <!-- 优惠券领取规则 -->
      <coupon-rule></coupon-rule>

      <!-- 用户文字和星级评价 -->
      <coupon-comment :comments="comments"></coupon-comment>
    </div>

    <!-- 领取状态 -->
    <div
      class="get-coupon-status"
      :class="{'dis-block': couponStatus !== '', 'dis-none': couponStatus === ''}"
    >
      <div class="prompt">{{couponStatus}}</div>
      <a href="javascript:;" class="btn" v-if="couponMark===0">重新领取</a>
      <a href="javascript:;" class="btn" v-else-if="couponMark===1" @click="toUse">立即使用</a>
      <a href="javascript:;" class="btn">
        <span v-if="couponMark === 0" @click="receiveCoupon">重新领取</span>
        <span v-else-if="couponMark === 1" @click="toUse">立即使用</span>
        <span v-else @click="couponStatus = ''">知道了</span>
      </a>
    </div>

    <!-- 填写评论 -->
    <div class="add-comment-wraper" v-if="showType === 2">
      <div style="margin: 2% 3%;">
        <div class="comment-num clearfix">
          <div class="comment-num-star">
            <span class="comment-num-star-txt">您的评价</span>
            <span class="star-wraper" id="star">
              <star @on-change="changeStar"></star>
            </span>
          </div>
          <div class="comment-num-txt">
            <span id="comment-num-txt">{{starGrade}}</span>分
          </div>
        </div>
        <div class="add-comment clearfix">
          <input
            type="text"
            class="comment-box"
            id="comment-box"
            @focus="amendInpt"
            v-focus
            v-blur
            v-model.lazy.trim="commentContent"
          />
          <input
            type="button"
            value="发布"
            id="publish-comment"
            class="publish-comment"
            @click="publishComment"
          />
        </div>
      </div>
    </div>

    <footer-nav></footer-nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Explain from "@/components/header-explain/index.vue";
import FooterNav from "@/components/footer-nav/index.vue";
import CouponBrief from "@/components/coupon-brief/index.vue";
import CouponRule from "@/components/coupon-rule/index.vue";
import CouponComment from "@/components/coupon-comment/index.vue";
import Star from "@/components/star/index.vue";
import ColumnDivide from "@/components/column-divide/index.vue";

import { focus, blur } from '@/mixins/directive';

import { getCouponDetail, receiveCoupon } from "@/api/coupon";
import { publishComment, getCouponComment } from "@/api/comment";

interface CouponInterface {
  comment_content: string;
  comment_star: number;
  comment_user_phone: string;
  coupon_endtime: string;
  coupon_explain: string;
  coupon_ico_path: string;
  coupon_name: string;
}

let scrollTop: number = 0;

@Component({
  components: {
    Explain,
    FooterNav,
    CouponBrief,
    CouponRule,
    CouponComment,
    Star,
    ColumnDivide
  },
  directives: {
    focus,
    blur
  }
})
export default class GetCoupon extends Vue {
  private explainName: string = "领取优惠券";
  private coupon: CouponInterface = {
    comment_content: "",
    comment_star: 0,
    comment_user_phone: "",
    coupon_endtime: "",
    coupon_explain: "",
    coupon_ico_path: "",
    coupon_name: ""
  };
  private comments: any[] = [];
  private couponStatus: string = "";
  private couponMark: 0 | 1 | 2 = 0;
  private showType: number = 1;
  private columnName: string = "参与方式";
  private starGrade: number = 0;
  private commentContent: string = "";
  private couponId: number = 0;

  private created() {
    const query: any = this.$route.query;
    const showType: number = query.type - 0;
    this.couponId = query.id - 0;
    this.getCouponDetail(showType);
    this.getCouponComment();
  }

  private getCouponDetail(showType: number) {
    getCouponDetail(this.couponId)
      .then(res => {
        const { code, data, message } = res.data;
        if (code === 0) {
          this.coupon = data;
          this.showType = showType;
        } else {
          this.$dialog.alert({ message });
        }
      })
      .catch(error => {
        this.$dialog.alert({
          message: error
        });
      });
  }

  private getCouponComment() {
    getCouponComment(this.couponId)
      .then(res => {
        const { code, data, message } = res.data;
        if (code === 0) this.comments = data;
        else this.$dialog.alert({ message });
      })
      .catch(error => {
        this.$dialog.alert({ message: error });
      });
  }

  private receiveCoupon() {
    try {
      const uid: number = window.sessionStorage.uid;
      if (!uid) {
        return this.$router.push({
          path: '/account/login'
        });
      }
      const query: any = this.$route.query;
      const couponId: number = query.id - 0;
      receiveCoupon(couponId, uid)
        .then(res => {
          const { code, data, message } = res.data;
          this.couponStatus = message;
          this.couponMark = data;
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

  private toUse() {
    this.showType = 2;
    this.couponStatus = "";
  }

  private amendInpt() {
    // 解决ios系统输入法遮挡input框的问题
    const timer: number = setTimeout(() => {
      let oBody = document.body;
      oBody.scrollTop = oBody.scrollHeight;
      clearTimeout(timer);
    }, 500);
  }

  private publishComment() {
    try {
      const uid = window.sessionStorage.uid;
      const starGrade = this.starGrade;
      const commentContent = this.commentContent.trim();
      const query: any = this.$route.query;
      const couponId = query.id - 0;

      if (commentContent.length) {
        publishComment(uid, starGrade, commentContent, couponId)
          .then(res => {
            const { code, data, message } = res.data;
            this.$dialog.alert({ message });
            this.showType = 1;
            this.getCouponComment();
          })
          .catch(error => {
            this.$dialog.alert({
              message: error
            });
          });
      }
    } catch (e) {
      this.$router.push({ name: "Login" });
    }
  }

  private changeStar(starGrade: number): void {
    this.starGrade = starGrade;
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.get-coupon-wraper {
  .coupon-bottom-wraper {
    width: 94%;
    margin: 2% 3%;
    overflow: hidden;
    padding-top: 15px;
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .coupon-btn {
      display: block;
      width: 90%;
      height: 37px;
      margin: 0 auto;
      line-height: 37px;
      text-align: center;
      border-radius: 4px;
      background-color: #23a1df;
      color: #fff;
      font-size: 16px;
    }
    .use-coupon {
      .quan_line,
      .quan-er {
        text-align: center;
      }
      .useway {
        display: flex;
        .item {
          flex: 1;
          text-align: center;
          font-size: 12px;
          span {
            display: block;
            line-height: 20px;
          }
        }
      }
    }
  }
}

.get-coupon-status {
  position: fixed;
  z-index: 10;
  top: 30%;
  left: 50%;
  margin-left: -98px;
  width: 197px;
  height: 209px;
  background-image: url("./images/lingqu.png");
  background-repeat: no-repeat;
  background-size: 197px 209px;
  .prompt {
    position: absolute;
    top: 128px;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 15px;
  }
  .btn {
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 42px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    color: #fff;
  }
}

.add-comment-wraper {
  position: fixed;
  bottom: 0;
  z-index: 11;
  width: 100%;
  max-width: 640px;
  background-color: #fff;
  .comment-num {
    margin-bottom: 7px;
    .comment-num-star {
      float: left;
      .star-wraper {
        display: inline-block;
      }
      .comment-num-star-txt {
        margin-right: 10px;
      }
    }
    .comment-num-txt {
      float: right;
      margin-right: 10px;
      font-size: 17px;
      font-weight: 500;
    }
  }
  .add-comment {
    position: relative;
    .publish-comment {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 20%;
      height: 30px;
      border-radius: 25px;
      border: 1px solid #23a1df;
      color: #23a1df;
      font-size: 15px;
      background-color: #fff;
    }
  }
  .comment-box {
    position: relative;
    bottom: 0;
    width: 74%;
    min-height: 30px;
    line-height: 30px;
    padding-left: 3%;
    border-radius: 25px;
    background-color: #efefef;
  }
}

@media only screen and (min-width: 640px) {
  .add-comment-wraper {
    left: 50%;
    margin-left: -320px;
  }
}
</style>