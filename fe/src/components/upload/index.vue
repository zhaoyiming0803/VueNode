<template>
  <div>
    <label v-if="state.file.url" for="upload-file" class="upload-file">
      <div v-if="state.file.process === 100" class="img align-items">
        <img :src="state.file.url" />
      </div>
      <img v-else src="./images/upload-btn.png" class="img" />
    </label>

    <label v-else for="upload-file" class="upload-file">
      <img src="./images/upload-btn.png" />
    </label>

    <input
      type="file"
      id="upload-file"
      ref="inputRef"
      :accept="accept"
      @change="handleChange"
      class="hide"
    />

    <van-loading
      v-if="state.isShowLoading"
      type="spinner"
      color="#1989fa"
      style="transform: translate(-50%)"
    ></van-loading>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, SetupContext, ref } from 'vue'
import upload from './upload'
import { Loading, Dialog } from 'vant'

interface UploadCallback {
  (field?: any): any
}

interface File {
  process?: number
  url?: string
}

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: ''
    },
    format: {
      type: Array as PropType<string[]>,
      default: []
    },
    maxSize: {
      type: Number,
      default: 0
    },
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => ({})
    },
    defaultFile: {
      type: Object as PropType<File>
    },
    beforeUpload: {
      type: Function as PropType<UploadCallback>,
      default: () => {}
    },
    onProgress: {
      type: Function as PropType<UploadCallback>,
      default: () => {}
    },
    onSuccess: {
      type: Function as PropType<UploadCallback>,
      default: () => {}
    },
    onError: {
      type: Function as PropType<UploadCallback>,
      default: () => {}
    },
    onComplete: {
      type: Function as PropType<UploadCallback>,
      default: () => {}
    }
  },

  components: {
    [Loading.name]: Loading
  },

  setup(props, context: SetupContext) {
    const file: File = {
      process: 0,
      url: ''
    }
    const state = reactive({
      file,
      isShowLoading: false
    })

    const inputRef = ref(null)

    if (props.defaultFile) {
      state.file = props.defaultFile
    }

    function handleChange(e: any) {
      const [file] = e.target.files
      const fileTypeList = props.format.join('、')
      const fileType: string = file.type.substr(file.type.lastIndexOf('/') + 1)

      if (props.format.indexOf(fileType.toLowerCase()) === -1) {
        return Dialog.alert({
          message: `亲，当前仅支持上传${fileTypeList}等格式的文件`
        })
      }

      if (
        props.maxSize !== 0 &&
        file.size > props.maxSize * Math.pow(1024, 2)
      ) {
        return Dialog.alert({
          message: `亲，每个文件最大不能超过${props.maxSize}M`
        })
      }

      if (props.beforeUpload() === false) {
        return
      }

      _upload(file)
    }

    function _upload(fileSource: string | Blob) {
      const file: File = state.file
      state.isShowLoading = true

      upload({
        action: props.action,
        headers: props.headers,
        withCredentials: props.withCredentials,
        fileName: props.name,
        data: props.data,
        file: fileSource,
        onProgress: (process: number) => {
          file.process = process
          props.onProgress(process)
        },
        onSuccess: (res: any) => {
          const url = res.data
          // 后期要换成oss地址
          Object.assign(file, { url, process: 100 })
          props.onSuccess({ url, process: 100 })
          resetUpload()
        },
        onError: (res: any) => {
          Object.assign(file, { url: '', process: 0 })
          resetUpload()
          Dialog.alert({
            message: `亲，文件上传失败，请重新操作`
          })
          props.onError(res)
        },
        onComplete: (res: any) => {
          props.onComplete(res)
          state.isShowLoading = false
        }
      })
    }

    function resetUpload() {
      let uploadFile: HTMLInputElement | null = inputRef.value
      if (uploadFile) {
        ;(uploadFile as HTMLInputElement).setAttribute('type', 'text')
        ;(uploadFile as HTMLInputElement).setAttribute('type', 'file')
      }
      uploadFile = null
    }

    return {
      state,
      handleChange,
      inputRef
    }
  }
})
</script>

<style lang="less" scoped>
@import './styles/upload.less';

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
