<template>
  <div>
    <explain :explainName="explainName"></explain>

    <div class="find-pwd-process">
      <img src="./images/flow1.png" width="100%" height="100%" alt="找回密码第一步" />
    </div>
    <div class="account-container">
      <form class="account-container-form" v-on:submit.prevent="next">
        <p>
          <span class="phone-ico"></span>
          <input
            type="tel"
            placeholder="请输入手机号"
            maxlength="11"
            class="phone"
            v-model.lazy.trim="phone"
            v-focus
            v-blur
          />
        </p>
        <p>
          <span class="code-ico"></span>
          <input
            type="text"
            placeholder="请输入验证码"
            maxlength="6"
            class="code"
            v-model.lazy.trim="code"
            v-focus
            v-blur
          />
          <count-down :phone="phone"></count-down>
        </p>
        <p>
          <input type="submit" value="下一步" class="account-btn" />
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Explain from "@/components/header-explain/index.vue";
import CountDown from "@/components//count-down/index.vue";

import { focus, blur } from "@/mixins/directive";

import { validatePhone } from "@/utils/index";

@Component({
  components: {
    Explain,
    CountDown
  },
  directives: {
    focus,
    blur
  }
})
export default class GetPhoneCode extends Vue {
  private explainName: string = "找回密码第一步";
  private phone: string = "";
  private code: string = "";

  private next() {
    if (!validatePhone(this.phone)) {
      return this.$dialog.alert({
        message: "手机号格式不正确，请重新输入！"
      });
    }

    this.$router.replace({
      path: "/account/reset-password",
      query: {
        phone: this.phone
      }
    });
  }
}
</script>

<style lang="less" scoped>
@import "./tour-app-account.less";

.find-pwd-process {
  width: 100%;
  height: 35px;
  margin: 15px auto;
}

@media only screen and (min-width: 768px) {
  .find-pwd-process {
    height: 60px;
  }
}
</style>