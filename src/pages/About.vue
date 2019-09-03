<template>
  <div class="about">
    <template v-if="isShowPage">
      <h1>This is an about page !</h1>
      <van-button type="primary" @click="openModal">打开Modal</van-button>
      <modal v-model="isShowModal"></modal>
      <van-button type="info" @click="onSuccess">成功提示</van-button>
      <van-button type="info" @click="resetVersion">重置Version</van-button>
      <van-button type="info" @click="getMenuList">获取菜单列表</van-button>
    </template>
    <template v-else>
      <van-skeleton title avatar :row="3"></van-skeleton>
      <van-skeleton title avatar :row="3"></van-skeleton>
      <van-skeleton title avatar :row="3"></van-skeleton>
    </template>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Provide } from 'vue-property-decorator';
  
  import Modal from '../components/Modal.vue';
  import { Button, Skeleton } from 'vant';

  import { getUserInfoReq } from '@/api/user';

  @Component({
    components: {
      Modal,
      [Button.name]: Button,
      [Skeleton.name]: Skeleton
    }
  })
  export default class About extends Vue {
    private isShowModal: boolean = false;
    private checked: boolean = false;
    private isShowPage: boolean = false;

    @Provide() foo = 'foo-about';

    private created () {
      console.log('$route: ', this.$route);
      console.log('state: ', this.$store.state);
    }

    private mounted () {
      setTimeout(() => {
        this.isShowPage = true;
      }, 2000);
      getUserInfoReq('123')
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    }

    private openModal () {
      this.isShowModal = true;
    }

    private onSuccess () {
      this.$toast.success('成功提示');
    }

    private resetVersion () {
      this.$store.commit('setVersion', 'v0.0.2');
    }

    private getMenuList () {
      this.$store.dispatch('getMenuList', '1234');
    }
  }
</script>

<style lang="less" scoped>

</style>