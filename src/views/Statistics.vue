<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <div>
      <ol>
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
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
import dayjs from "dayjs"
import clone from '@/lib/clone';

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
  get groupedList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.recordTime).valueOf() - dayjs(a.recordTime).valueOf());
      type Result = { title: string; total?: number; items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].recordTime).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.recordTime), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.recordTime).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => {
          console.log(sum);
          console.log(item);
          return sum + item.amount;
        }, 0);
      });
      return result;
    }
  tagString(tags: Tag[]){
    return tags.length ===0? '无':tags.join(',')
  }
  beautify(string: string){
    const day = dayjs(string)
    console.log(day);
    const now = dayjs()
    if(day.isSame(now,"day")){
      return "今天"
    }else if(day.isSame(now.subtract( 1,"day"),"day")){
      return "昨天"
    }else if(day.isSame(now.subtract(2,"day"),"day")){
      return "前天"
    }else{
      return string
    }
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
