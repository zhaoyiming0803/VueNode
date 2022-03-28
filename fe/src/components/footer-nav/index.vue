<template>
  <!-- 底部导航组件 -->
  <div class="footer-nav-wraper">
    <!-- 个人中心 -->
    <div v-if="navName === 'personal'" class="box">
      <router-link tag="a" :to="{ path: '/home' }" class="nav-tag">
        <img
          src="./images/discountsgrey.png"
          width="30"
          height="26"
          alt="全球优惠"
          class="tag-ico"
        />
        <div class="tag-name">全球优惠</div>
      </router-link>
      <router-link tag="a" :to="{ path: '/personal' }" class="nav-tag this-tag">
        <img
          src="./images/mineblue.png"
          width="30"
          height="26"
          alt="我的"
          class="tag-ico"
        />
        <div class="tag-name">我的</div>
      </router-link>
    </div>

    <!-- 非个人中心 -->
    <div v-if="navName !== 'personal'" class="box">
      <router-link tag="a" :to="{ path: '/home' }" class="nav-tag this-tag">
        <img
          src="./images/discountsblue.png"
          width="30"
          height="26"
          alt="全球优惠"
          class="tag-ico"
        />
        <div class="tag-name">全球优惠</div>
      </router-link>
      <router-link tag="a" :to="{ path: '/personal' }" class="nav-tag">
        <img
          src="./images/minegrey.png"
          width="30"
          height="26"
          alt="我的"
          class="tag-ico"
        />
        <div class="tag-name">我的</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    navName: {
      type: String
    }
  }
})
</script>

<style scoped lang="less" rel="stylesheet/less">
.footer-nav-wraper {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  height: 50px;
  background-color: #fff;
  .box {
    display: flex;
    flex-flow: row nowrap;
    .nav-tag {
      flex: 1;
      text-align: center;
      color: #7c8592;
      .tag-ico {
        margin-top: 3px;
        width: 30px;
        height: 26px;
      }
      .tag-name {
        margin-top: -5px;
        height: 18px;
        line-height: 18px;
      }
      &.this-tag {
        color: #2577e3;
      }
    }
  }
}

@media only screen and (min-width: 640px) {
  .footer-nav-wraper {
    left: 50%;
    margin-left: -320px;
  }
}
</style>
