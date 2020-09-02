<template>
  <Layout>
    <Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="type"
    />
      <Charts :options="x"/>
    <ol v-if="groupedList.length>0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}<span>￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList.ts';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Charts from '@/components/Charts.vue';

@Component({
  components: {
    Tabs,
    Charts
  },
})
export default class Statistics extends Vue {
  type = '-';
  recordTypeList = recordTypeList;

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
  get x(){
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    const newList = clone(recordList)
        .filter((r) => r.type === this.type)
        .sort(
            (a, b) => dayjs(b.recordTime).valueOf() - dayjs(a.recordTime).valueOf()
        );
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].recordTime).format('YYYY-MM-DD'),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.recordTime), 'day')) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.recordTime).format('YYYY-MM-DD'),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join('，');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if(day.isSame(now,'year')){
      return day.format('M月D日');
    }else{
      return day.format('YYYY年M月D日')
    }
  }
}
</script>

<style lang="scss" scoped>
.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep .type-tabs-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}

%item {
  padding: 0 16px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background: #ffffff;
}

.notes {
  margin-right: auto;
  margin-left: 8px;
}
</style>
