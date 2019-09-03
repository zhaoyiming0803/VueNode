<template>
  <div class="modal" v-show="currentValue">
    <div @click="close">关闭</div>
    <div>inject - {{foo}}</div>
  </div>
</template>

<script scoped lang="ts">
  import { Component, Prop, Vue, Watch, Inject, Emit } from 'vue-property-decorator';

  @Component
  export default class Modal extends Vue {
    @Prop() private value: boolean = false;

    @Inject('foo') private readonly foo!: string;

    private currentValue: boolean = false;

    @Watch('value', {immediate: true})
    private onValueChange(n: boolean, o: boolean) {
      this.currentValue = n;
    }

    @Emit('input')
    @Watch('currentValue')
    private onCurrentValueChange(n: boolean, o: boolean) {
      // this.$emit('input', n);
      console.log('cursomer modal value: ', n);
      return n;
    }

    private close() {
      this.currentValue = false;
    }
  }
</script>

<style lang="less" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    color: #fff;
  }
</style>
