<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types :value="record.type" @update:value="onUpdateType" />
    <div class="notes-wrapper">
      <Notes  @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注"/>
    </div>
    <Tags @update:value="onUpdateTags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Types from "@/components/money/Types.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import { Component } from "vue-property-decorator";
import store2 from '@/store/index2';

@Component({
  components: {
    Tags,
    Notes,
    NumberPad,
    Types,
  },
})
export default class Money extends Vue {  

  recordList = store2.recordList
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };
 
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateType(value: string) {
    this.record.type = value;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateTags(value: string[]){
    this.record.tags =value
  
    
  }
  saveRecord() {
    store2.createRecord(this.record);
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
