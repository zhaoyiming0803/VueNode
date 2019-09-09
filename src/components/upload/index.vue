<template>
  <div>

    <div v-if="fileList.length" v-for="(v, k) in fileList" :key="k" class="uploaded-item">
      <div v-if="v.process === 100 && v.url" class="img align-items">
        <img :src="v.url" @click="preview(k)">
      </div>
      <img v-else src="./images/grey.png" class="img">
      <img v-if="isAllowHandle && v.url" src="./images/delete.png" @click="deleteFile(k)" class="delete">
      <div v-if="isAllowHandle" class="process">
        <span v-if="v.process !== 100">{{v.process}}%</span>
        <span v-else>上传完成</span>
      </div>
    </div>

    <input 
      type="file" 
      id="upload-file"
      :accept="accept"
      @change="handleChange"
      :multiple="multiple"
      class="hide">
    <label 
      v-if="isAllowHandle && isAllowUpload && fileList.length < this.maxLength" 
      for="upload-file" 
      id="upload-file" 
      class="upload-file">
      <img src="./images/upload-btn.png">
    </label>
    1

  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import upload from './upload';

  let count = 0;

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
    @Prop({type: Number, default: 1}) private maxLength!: number;
    @Prop({type: String, required: true}) private action!: string;
    @Prop({type: Boolean, default: false}) private multiple!: false;
    @Prop({type: Object, default: () => {}}) private headers!: object;
    @Prop({type: Boolean, default: false}) private withCredentials!: false;
    @Prop({type: Object, default: () => {}}) private data!: object;
    @Prop({type: Function, default: () => {}}) private beforeUpload!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onProgress!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onSuccess!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onError!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private onComplete!: UploadCallback;
    @Prop({type: Function, default: () => {}}) private deleteItem!: UploadCallback;
    @Prop({type: Boolean, default: false}) private isAllowHandle!: false;
    @Prop({type: Array, default: () => []}) private defaultFileList!: File[];

    private fileList: File[] = [];
    private isAllUploaded: boolean = false;
    private isAllowUpload: boolean = true;

    private mounted () {
      this.initDefaultFileList();
    }

    private handleChange (e: any) {
      const files = e.target.files;
      const filesLen = files.length;

      if (filesLen + this.fileList.length > this.maxLength) {
        return this.$dialog.alert({
          message: `亲，当前最多还能上传${this.maxLength - this.fileList.length}张图片`
        });
      }

      if (this.multiple === false && filesLen > 1) {
        return this.$dialog.alert({
          message: '亲，每次只能上传一个文件'
        });
      }

      const fileTypeList = this.format.join('、');
      for (let i = 0; i < filesLen; i += 1) {
        const type = files[i].type;
        const fileType = type.substr(type.lastIndexOf('/') + 1);
        if (this.format.indexOf(fileType.toLowerCase()) === -1) {
          return this.$dialog.alert({
            message: `亲，当前仅支持上传${fileTypeList}等格式的文件`
          });
        }
        if (this.maxSize !== 0 && files[i].size > this.maxSize * Math.pow(1024, 2)) {
          return this.$dialog.alert({
            message: `亲，每个文件最大不能超过${this.maxSize}M`
          });
        }
      }

      if (this.beforeUpload() === false) {
        return;
      }

      count = 0;
      
      this.isAllowUpload = false;
      this.isAllUploaded = false;
      this.upload(files, filesLen);
    }

    upload (files: (string | Blob)[], filesLen: number) {
      const file: File = {
        url: '',
        process: 0
      }
      this.fileList.push(file);

      const idx = this.fileList.length - 1;

      upload({
        action: this.action,
        headers: this.headers,
        withCredentials: this.withCredentials,
        fileName: this.name,
        data: this.data,
        file: files[count],
        onProgress: (process: number) => {
          this.fileList[idx].process = process;
          this.onProgress(process);
        },
        onSuccess: (res: any) => {
          const url = res.data && res.data.url || '';
          this.fileList.splice(idx, 1, {url, process: 100});
          this.onSuccess({url: url, process: 100});
          
          count += 1;
          if (filesLen === count) {
            this.isAllUploaded = true;
            this.resetUpload();
          } else if (count < this.maxLength) {
            this.upload(files, filesLen);
          }
        },
        onError: (res: any) => {
          this.fileList.splice(idx, 1);
          this.resetUpload();
          this.$dialog.alert({
            message: `亲，文件上传失败，请重新操作`
          });
          this.onError(res);
        },
        onComplete: (res: any) => {
          this.onComplete(res);
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
      this.isAllowUpload = true;
      this.isAllUploaded = true;
    }

    deleteFile (idx: number): any {
      if (this.isAllowUpload === false) {
        return this.$dialog.alert({
          message: '亲，请等待本次任务完成再操作'
        });
      }

      this.fileList.splice(idx, 1);
    }

    initDefaultFileList () {
      const defaultFileList = this.defaultFileList;
      if (Array.isArray(defaultFileList) && defaultFileList.length) {
        this.fileList = defaultFileList;
      }
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
    width: 170px;
    height: 170px;

    img {
      width: 100%;
      height: 100%;
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

  .preview-container {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;

    .swiper-header {
      position: relative;
      width: 100%;
      height: 100px;
      color: #fff;

      .back {
        position: absolute;
        top: 50%;
        left: 32px;
        margin-top: -18px;
        width: 20px;
        height: 36px;
        background-image: url("./images/back.png");
        background-repeat: no-repeat;
        background-position: center top;
        background-size: cover;
      }

      .swiper-process {
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 36px;
        font-weight: 500;
      }

      .delete {
        position: absolute;
        top: 50%;
        right: 32px;
        margin-top: -20px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 28px;
        font-weight: 400;
      }
    }

    .dots {
      position: absolute;
      bottom: 50px;
      width: 100%;
      height: 14px;
      text-align: center;

      .item {
        display: inline-block;
        margin-right: 20px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.4);

        &.active {
          background-color: #fff;
        }
      }
    }

    .swiper-container {
      padding-bottom: 64px;
      height: 89%;

      .swiper-wrapper {
        height: 100%;

        .swiper-slide {
          height: 100%;
          overflow-y: auto;

          .img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }
</style>
