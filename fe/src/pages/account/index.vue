<template>
  <div class="account-wraper">
    <explain :explainName="explainName" :isAccount="isAccount"></explain>

    <div class="account-check">
      <router-link
        tag="div"
        :to="{name: 'Login'}"
        replace
        active-class="this-account-model"
        class="account-check-btn"
      >
        <span>登录</span>
      </router-link>
      <router-link
        tag="div"
        :to="{name: 'Regist'}"
        replace
        active-class="this-account-model"
        class="account-check-btn"
      >
        <span>注册</span>
      </router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts" scoped>
import { Component, Vue } from "vue-property-decorator";
import Explain from "@/components/header-explain/index.vue";

@Component({
  components: {
    Explain
  }
})
export default class AccountIndex extends Vue {
  public isAccount: boolean = true;
  public explainName: string = "欢迎来到锦囊团";

  private created () {
    if (window.sessionStorage.uid) {
      this.$router.replace({
        path: '/home'
      });
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.account-check {
  display: flex;
  flex-flow: row nowrap;
  .account-check-btn {
    flex: 1;
    position: relative;
    height: 50px;
    cursor: pointer;
    span {
      display: block;
      position: absolute;
      width: 100px;
      height: 32px;
      left: 50%;
      top: 8px;
      margin-left: -50px;
      line-height: 32px;
      text-align: center;
      font-size: 15px;
      color: #b4b4b4;
    }
    &.this-account-model span {
      border-bottom: 2px solid #ffb000;
      color: #4c4c4c;
    }
  }
}
</style>