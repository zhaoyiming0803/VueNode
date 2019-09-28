<template>
  <div>
    {{userInfo}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { authorizeUserInfo } from '@/api/wechat';

@Component
export default class Auth extends Vue {
  userInfo: string = '';

  private created () {
    const query = this.$route.query;
    const code = query.code as string;
    const state = query.state as string;
    
    authorizeUserInfo(code)
      .then(res => {
        this.userInfo = JSON.stringify(res.data);
      });
  }
}
</script>