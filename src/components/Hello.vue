<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <button @click="showModal">打开Modal</button>
    <Modal v-model="isShowModal"></Modal>
  </div>
</template>

<script scoped lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import Modal from './Modal.vue';

  @Component({
    components: {
      Modal
    }
  })
  export default class Hello extends Vue {
    @Prop() private msg!: string;

    private isShowModal: boolean = false;

    private showModal () {
      this.isShowModal = true;
    }
  }
</script>

<style scoped lang="less">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
