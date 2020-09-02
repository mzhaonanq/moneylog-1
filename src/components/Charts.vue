<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import charts, {EChartOption} from 'echarts';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Charts extends Vue {
  @Prop() options?: EChartOption;

  mounted() {
    if (this.options === undefined) {
     return   console.log('options为空')
    }
    const chart = charts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }

}
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 400px;
  }
</style>