<template>
  <div>
    <h1>{{msg}}</h1>
    <div v-for="(goods, index) in goodsList" :key="index">
      <span>名称：{{goods.name}} </span>
      <span>价格：{{goods.price}}</span>
    </div>
    <button ref="aButton" @click="change">点击</button>
    <div>{{currentValue}}</div>
    <div>sum: {{sum}}</div>
  </div>
</template>

<script scoped lang="ts">
  import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator';

  interface GoodsItem {
    name: string;
    price: number;
  }

  interface GoodsList<T> {
    [index: number]: T;
  }

  @Component
  export default class World extends Vue {
    @Prop({ /*default: '123', required: true*/ }) private readonly msg!: number | string;
    @Prop({ type: [Array], default: [], required: true }) private goodsList!: object[];

    private currentValue: string = 'world';
    private num1: number = 1;
    private num2: number = 2;

    get sum(): number {
      return this.num1 + this.num2;
    }

    @Watch('currentValue', /*{immediate: true}*/)
    private onCurrentValueChanged(n: string, o: string): void {
      console.log('new value is ' + n);
    }

    @Watch('goodsList', { deep: true })
    private onGoodsListChange(n: GoodsList<GoodsItem>, o: GoodsList<GoodsItem>) {
      console.log(n);
    }

    private created() {
      this.$on('change', (content: string): void => {
        this.currentValue = content;
      });
    }

    private mounted() {
      const aButton: HTMLButtonElement = this.$refs.aButton as HTMLButtonElement;
      console.log(aButton.innerHTML);
    }

    private change() {
      this.$emit('change', 'hello world');
    }
  }
</script>
