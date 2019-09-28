<template>
  <div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import wxAuth from '@/libs/wx/auth';

@Component
export default class Wechat extends Vue {
  private mounted () {
    wxAuth(encodeURIComponent('https://web.0351zhuangxiu.com/tour/auth'));
  }
}
</script>