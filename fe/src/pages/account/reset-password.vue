<template>
  <!-- 重置密码 -->
  <div class="forgetpwd-wraper">
    <explain :explainName="explainName"></explain>

    <div class="find-pwd-process">
      <img src="./images/flow2.png" width="100%" height="100%" alt="找回密码第二步" />
    </div>
    <div class="account-container">
      <form class="account-container-form" v-on:submit.prevent="complete">
        <p>
          <span class="pwd-ico"></span>
          <input
            type="password"
            placeholder="请输入密码"
            class="pwd"
            v-model.lazy.trim="pwd"
            v-focus
            v-blur
          />
        </p>
        <p>
          <span class="pwd-ico"></span>
          <input
            type="password"
            placeholder="请确认密码"
            class="pwd"
            v-model.lazy.trim="confirmPwd"
            v-focus
            v-blur
          />
        </p>
        <p>
          <input type="submit" value="完	成" class="account-btn" />
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Explain from "@/components/header-explain/index.vue";

import { focus, blur } from "@/mixins/directive";

import { validatePhone, validatePassword } from "@/utils/index";
import { resetPassword } from "@/api/auth";

@Component({
  components: {
    Explain
  },
  directives: {
    focus,
    blur
  }
})
export default class ResetPassword extends Vue {
  private explainName: string = "找回密码第二步";
  private phone: string = "";
  private pwd: string = "";
  private confirmPwd: string = "";

  private created() {
    this.phone = this.$route.query.phone as string;
    if (!validatePhone(this.phone)) {
      this.$router.back();
    }
  }

  private complete() {
    if (!validatePassword(this.pwd)) {
      return this.$dialog.alert({
        message: "密码至少6位数"
      });
    }

    if (this.pwd !== this.confirmPwd) {
      return this.$dialog.alert({
        message: "两次输入的密码不一致，请重新输入！"
      });
    }

    resetPassword(this.phone, this.pwd)
      .then(res => {
        const { code, data, message } = res.data;
        if (code === 0) {
          this.$dialog.alert({
            message: "密码修改成功"
          });
          this.$router.replace({ name: "Login" });
        } else {
          this.$dialog.alert({
            message
          });
        }
      })
      .catch(error => {
        return this.$dialog.alert({
          message: error
        });
      });
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
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