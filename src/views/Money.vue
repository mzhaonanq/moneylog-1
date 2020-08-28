<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes-wrapper">
      <Notes
        @update:value="onUpdateNotes"
        field-name="备注"
        placeholder="在这里输入备注"
      />
    </div>
    <Tags @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import { Component } from "vue-property-decorator";
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList.ts';

@Component({
  components: {
    Tags,
    Notes,
    NumberPad,
    Tabs,
  },
})
export default class Money extends Vue {
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
  recordTypeList = recordTypeList
  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateType(value: string) {
    this.record.type = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes-wrapper {
  padding: 12px 0;
}
</style>
