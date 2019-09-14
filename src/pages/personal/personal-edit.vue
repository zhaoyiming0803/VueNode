<template>
  <!-- 个人资料展示组件 -->
  <div class="personal-edit-wraper">
    <explain :explainName="explainName"></explain>

    <!-- 个人信息 -->
    <div class="personal-msg-wraper personal-edit-msg-wraper">
      <div class="personal-edit-head">
        <router-link
          tag="a"
          :to="{path: '/change-user-thumb', query: {'userId': userId, 'headpic': encodeURIComponent(headpic)}}"
        >
          <img :src="headpic" width="119" height="119" alt="头像" />
        </router-link>
      </div>
    </div>

    <!-- 个人信息修改项 -->
    <div class="personal-msg-item-wraper">
      <router-link
        tag="a"
        :to="{path: '/change-user-name', query: {'userId': userId, 'userName': userName}}"
        class="white-item-wrpaer item"
        style="margin: 10px auto 15px auto;"
      >
        <div class="ico username">
          <span>用户名称</span>
        </div>
        <div class="content">
          <span>{{userName}}</span>
        </div>
      </router-link>
      <router-link
        tag="a"
        :to="{path: '/change-user-sex', query: {'userId': userId, 'userSex': userSex}}"
        class="white-item-wrpaer item"
      >
        <div class="ico sex">
          <span>性别</span>
        </div>
        <div class="content">
          <span v-if="userSex==1">男</span>
          <span v-else>女</span>
        </div>
        <div class="line"></div>
      </router-link>
    </div>

    <!-- 退出登录 -->
    <div class="white-item-wrpaer">
      <a href="javascript:;" class="login-out" @click="logOut">退出登录</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Explain from "@/components/header-explain/index.vue";
import { getUserInfo } from "@/api/personal";

@Component({
  components: {
    Explain
  }
})
export default class PersonalEdit extends Vue {
  private explainName: string = "个人资料修改";
  private headpic: string = "";
  private userId: number = 0;
  private userName: string = "";
  private userSex: 1 | 0 = 1;

  private created() {
    this.getUserInfo();
  }

  private getUserInfo() {
    try {
      const uid = window.sessionStorage.uid;
      this.userId = uid;
      getUserInfo(uid)
        .then(res => {
          const { code, data, message } = res.data;
          if (code === 0) {
            const { user_name, user_sex, user_headpic } = data;
            this.userName = user_name;
            this.userSex = user_sex;
            this.headpic = user_headpic;
          } else {
            this.$dialog.alert({ message });
          }
        })
        .catch(error => {
          this.$dialog.alert({ message: error });
        });
    } catch (e) {
      this.$router.push({ name: "Login" });
    }
  }

  private logOut() {
    window.sessionStorage.removeItem("uid");
    this.$router.push({
      path: "/home"
    });
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
@import "./tour-app-personal.less";

.white-item-wrpaer {
  display: block;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: right;
  background-color: #fff;
}

.personal-msg-item-wraper {
  margin-bottom: 15px;
  .item {
    .line {
      position: absolute;
      left: 55px;
      width: 100%;
      border-top: 1px solid #efeded;
    }
    .username {
      background-image: url("./images/username.png");
    }
    .sex {
      background-image: url("./images/sex.png");
    }
    .ico {
      position: absolute;
      left: 0;
      top: 0;
      width: 35%;
      height: 50px;
      text-align: left;
      padding-left: 56px;
      background-repeat: no-repeat;
      background-size: 30px 30px;
      background-position: 16px 10px;
      span {
        font-size: 15px;
        color: #333;
      }
    }
    .content {
      position: absolute;
      left: 35%;
      top: 0;
      width: 65%;
      height: 50px;
      text-align: right;
      background-image: url("./images/right.png");
      background-repeat: no-repeat;
      background-size: 15px 15px;
      background-position: 95% 17px;
      color: #808080;
      font-size: 14px;
      span {
        margin-right: 38px;
      }
    }
  }
}

.login-out {
  display: block;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  color: #3c79db;
}
</style>