<template>
  <Layout>
    <Tabs class-prefix="type"  :data-source="typeList" :value.sync="type"/>
    <Tabs class-prefix='interval' :data-source="intervalList" :value.sync="interavl" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "../components/money/Types.vue";
import { Component } from "vue-property-decorator";
import Tabs from '@/components/Tabs.vue';
@Component({
  components: {
    Types,
    Tabs
  },
})
export default class Statistics extends Vue {
  type = "-";
  interavl = "day";
  typeList=[{text:"支出",value:'-'},{text:"收入",value:"+"}]
  intervalList=[{text:'按日',value:'day'},{text:'按周',value:'week'},{text:'按月',value:'month'}]
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>
