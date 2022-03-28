<template>
  <!-- 修改头像 -->
  <div class="change-headpic-wraper" id="haha">
    <explain :explainName="state.explainName"></explain>

    <div class="white-item-wrpaer" style="border-bottom: 1px solid #efeded">
      <label for="man">头像：</label>
      <upload
        ref="upload"
        :action="state.uploadFile"
        accept="image/*"
        :data="{ id: state.userId }"
        :withCredentials="false"
        :defaultFile="state.defaultFile"
        :format="['jpg', 'jpeg', 'png', 'bmp']"
      ></upload>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'vue'
import { useRoute } from 'vue-router'
import Explain from '@/components/header-explain/index.vue'
import Upload from '@/components/upload/index.vue'

// 必须要有对应的声明文件，否则编译不通过
// import test from '@/libs/test';
// console.log(test);

interface File {
  process?: number
  url?: string
}

export default defineComponent({
  components: {
    Explain,
    Upload
  },
  setup(props, context: SetupContext) {
    const defaultFile: File = { url: '', process: 100 }
    const state = reactive({
      explainName: '修改头像',
      defaultFile,
      userId: 0,
      fileMaxLength: 1,
      uploadFile: 'https://xxx'
    })

    const route = useRoute()

    const query: any = route.query
    state.defaultFile.url = decodeURIComponent(query.headpic)
    state.userId = query.userId

    return {
      state
    }
  }
})
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
