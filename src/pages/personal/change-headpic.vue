<template>
  <!-- 修改头像 -->
  <div class="change-headpic-wraper" id="haha">
    <explain :explainName="explainName"></explain>

    <div class="white-item-wrpaer" style="border-bottom: 1px solid #efeded">
      <label for="man">头像：</label>
      <upload
        ref="upload"
        :action="uploadFile"
        accept="image/*"
        :data="{id: userId}"
        :withCredentials="false"
        :defaultFile="defaultFile"
        :format="['jpg', 'jpeg', 'png', 'bmp']"
      ></upload>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Explain from "@/components/header-explain/index.vue";
import Upload from "@/components/upload/index.vue";

// 必须要有对应的声明文件，否则编译不通过
// import test from '@/libs/test';
// console.log(test);

interface File {
  process?: number;
  url?: string;
}

@Component({
  components: {
    Explain,
    Upload
  }
})
export default class ChangeHeadpic extends Vue {
  private explainName: string = "修改头像";
  private defaultFile: File = { url: "", process: 100 };
  private userId: undefined | number = 0;
  private fileMaxLength: number = 1;

  private created() {
    const query: any = this.$route.query;
    this.defaultFile.url = decodeURIComponent(query.headpic);
    this.userId = query.userId;
  }

  private changeHeadpic() {
    const query: any = this.$route.query;
    const userId = query.userId;
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.white-item-wrpaer {
  display: block;
  position: relative;
  height: 50px;
  padding: 0 1%;
  line-height: 50px;
  text-align: right;
  background-color: #fff;
  label {
    position: absolute;
    left: 20px;
    top: 0;
  }
  .headpic {
    position: absolute;
    left: 20%;
    top: 0;
    width: 80%;
    height: 50px;
    opacity: 0;
    z-index: 1;
  }
  img {
    position: absolute;
    right: 15px;
    bottom: 5px;
    border-radius: 50%;
    z-index: 0;
  }
}
</style>