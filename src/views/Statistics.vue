<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interavl"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList.ts";
import recordTypeList from "@/constants/recordTypeList.ts";
@Component({
  components: {
    Tabs,
  },
})
export default class Statistics extends Vue {
  type = "-";
  interavl = "day";
  recordTypeList = recordTypeList;
  intervalList = intervalList;
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
