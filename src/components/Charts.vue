<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import charts, {EChartOption, ECharts} from 'echarts';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Charts extends Vue {
  @Prop() options?: EChartOption;
  chart?: ECharts
  mounted() {
    if (this.options === undefined) {
     return   console.log('options为空')
    }
   this.chart = charts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }
  @Watch('options')
  onOptionsChanges(newValue: EChartOption){
    this.chart?.setOption(newValue)
  }

}
</script>

<style lang="scss" scoped>
  .wrapper{
    height: 400px;
  }
</style>