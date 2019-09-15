<template>
  <div class="account-container">
    <form v-on:submit.prevent="regist" class="account-container-form">
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
        <span class="pwd-ico"></span>
        <input 
          type="password" 
          placeholder="请输入至少6位数的密码" 
          class="pwd" 
          v-model.lazy.trim="pwd"
          v-focus
          v-blur />
      </p>
      <p>
        <span class="pwd-ico"></span>
        <input 
          type="password" 
          placeholder="确认密码" 
          class="pwd" 
          v-model.lazy.trim="confirmPwd"
          v-focus
          v-blur />
      </p>
      <p>
        <input type="submit" value="注	册" class="account-btn" />
      </p>
    </form>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";

import { focus, blur } from "@/mixins/directive";

import { regist } from "@/api/auth";
import { validatePhone, validatePassword } from "@/utils/index";

@Component({
  directives: {
    focus,
    blur
  }
})
export default class Regist extends Vue {
  private phone: string = "";
  private pwd: string = "";
  private confirmPwd: string = "";

  private regist() {
    if (!validatePhone(this.phone)) {
      return this.$dialog.alert({
        message: "手机号码格式不正确，请重新输入！"
      });
    }

    if (!validatePassword(this.pwd)) {
      return this.$dialog.alert({
        message: "密码需要至少6位数，请重新输入！"
      });
    }

    if (this.pwd !== this.confirmPwd) {
      return this.$dialog.alert({
        message: "两次输入的密码不一致，请重新输入！"
      });
    }

    regist(this.phone, this.pwd)
      .then(res => {
        const { code, message } = res.data;
        if (code === 0) {
          this.$router.replace({
            path: '/account/login'
          });
          this.$dialog.alert({ message: "注册成功" });
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
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "./tour-app-account.less";
</style>