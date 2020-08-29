<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <div>
      <ol>
        <li v-for="(group, index) in result" :key="index">
          <h3 class="title">{{group.title}}</h3>
          <ol>
            <li v-for="item in group.items" :key="item.id"
            class="record"
            >
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{ item.amount }}</span> 
            </li>
          </ol>
        </li>
      </ol>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList.ts";
import store from "@/store";
@Component({
  components: {
    Tabs,
  },
})
export default class Statistics extends Vue {
  type = "-";
  recordTypeList = recordTypeList;
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get result() {
    const { recordList } = this;
    type HashTableValue = {title: string;items: RecordItem[]};
    const hashTable: { [key: string]: HashTableValue } = {}; //声明一个空对象的类型
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].recordTime!.split("T");
      hashTable[date] = hashTable[date] ||{title:date,items:[]};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  tagString(tags: Tag[]){
    return tags.length ===0? '无':tags.join(',')
  }
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
%item{
  padding:0 16px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title{
  @extend %item
}
.record{
  @extend %item;
  background: white;
}
.notes{
  margin-right: atuo;
  margin-left: 8px;
}
</style>
