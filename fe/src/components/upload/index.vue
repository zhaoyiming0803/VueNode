<template>
  <div>
    <label v-if="file.url" for="upload-file" class="upload-file">
      <div v-if="file.process === 100" class="img align-items">
        <img :src="file.url">
      </div>
      <img v-else src="./images/upload-btn.png" class="img">
    </label>

    <label 
      v-else
      for="upload-file" 
      class="upload-file">
      <img src="./images/upload-btn.png">
    </label>

    <input 
      type="file" 
      id="upload-file"
      :accept="accept"
      @change="handleChange"
      class="hide" />
    
    <van-loading
      v-if="isShowLoading" 
      type="spinner"
      color="#1989fa"
      style="transform: translate(-50%);">
    </van-loading>

  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import upload from './upload';

  interface UploadCallback {
    (field?: any): any
  }

  interface File {
    process: number
    url: string
  }

  @Component
  export default class Upload extends Vue {
    @Prop({type: String}) private name!: string;
    @Prop({type: String}) private accept!: string;
    @Prop({type: Array}) private format!: string[];
    @Prop({type: Number, default: 0}) private maxSize!: number;
    @Prop({type: String, required: true}) private action!: string;
    @Prop({type: Object, default: () => {}}) private headers!: object;
    @Prop({type: Boolean, default: false}) private withCredentials!: false;
    @Prop({type: Object, default: () => {}}) private data!: object;
    @Prop({type: Object}) private defaultFile!: File;
    @Prop({type: Function, default: () => {}}) private beforeUpload!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onProgress!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onSuccess!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onError!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onComplete!: UploadCallback;

    private file: File = { process: 0, url: '' };
    private isShowLoading: boolean = false;

    private created () {
      if (this.defaultFile) {
        this.file = this.defaultFile;
      }
    }

    private handleChange (e: any) {
      const [file] = e.target.files;
      const fileTypeList = this.format.join('、');
      const fileType: string = file.type.substr(file.type.lastIndexOf('/') + 1);

      if (this.format.indexOf(fileType.toLowerCase()) === -1) {
        return this.$dialog.alert({
          message: `亲，当前仅支持上传${fileTypeList}等格式的文件`
        });
      }

      if (this.maxSize !== 0 && file.size > this.maxSize * Math.pow(1024, 2)) {
        return this.$dialog.alert({
          message: `亲，每个文件最大不能超过${this.maxSize}M`
        });
      }

      if (this.beforeUpload() === false) {
        return;
      }

      this.upload(file);
    }

    upload (fileSource: (string | Blob)) {
      const file: File = this.file;
      this.isShowLoading = true;

      upload({
        action: this.action,
        headers: this.headers,
        withCredentials: this.withCredentials,
        fileName: this.name,
        data: this.data,
        file: fileSource,
        onProgress: (process: number) => {
          file.process = process
          this.onProgress(process);
        },
        onSuccess: (res: any) => {
          const url = res.data;
          // 后期要换成oss地址
          Object.assign(file, { url, process: 100 });
          this.onSuccess({url, process: 100});
          this.resetUpload();
        },
        onError: (res: any) => {
          Object.assign(file, { url: '', process: 0 });
          this.resetUpload();
          this.$dialog.alert({
            message: `亲，文件上传失败，请重新操作`
          });
          this.onError(res);
        },
        onComplete: (res: any) => {
          this.onComplete(res);
          this.isShowLoading = false;
        }
      });
    }

    resetUpload () {
      let uploadFile: HTMLInputElement | null  = this.$el.querySelector('#upload-file');
      if (uploadFile) {
        uploadFile.setAttribute('type', 'text');
        uploadFile.setAttribute('type', 'file');
      }
      uploadFile = null;
    }
  }
</script>

<style lang="less" scoped>
   @import "./styles/upload.less";
   
  .hide {
    display: none;
  }

  .upload-file {
    display: inline-block;
    width: 45px;
    height: 45px;

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }

  .uploaded-item {
    display: inline-block;
    position: relative;
    margin: 0 25px 25px 0;
    vertical-align: top;
    width: 170px;
    height: 170px;

    .img {
      width: 100%;
      height: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: auto;
      }
    }

    .delete {
      position: absolute;
      top: -18px;
      right: -18px;
      width: 36px;
      height: 36px;
    }

    .process {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 33px;
      line-height: 33px;
      text-align: center;
      background: rgba(0, 0, 0, 0.4);
      font-size: 24px;
      color: #fff;
    }
  }
</style>
