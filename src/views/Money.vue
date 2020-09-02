<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="createdAt">
      <Notes
          :value.sync="record.recordTime"
          type="date"
          field-name="时间"
          placeholder="在这里输入时间"
      />
    </div>
    <div class="notes-wrapper">
      <Notes
        :value.sync="record.notes"
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
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList.ts";

@Component({
  components: {
    Tags,
    Notes,
    NumberPad,
    Tabs,
  },
})
export default class Money extends Vue {
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0, recordTime:new Date().toISOString() };
  recordTypeList = recordTypeList;
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
  onUpdateTags(value: Tag[]) {
    this.record.tags = value;
  }
  saveRecord() {
    if (!this.record.tags || this.record.tags.length == 0) {
      return window.alert("请选择至少一个标签");
    }
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      this.record.notes = "";
      window.alert("成功保存");
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes-wrapper {
  padding: 12px 0;
}
</style>
