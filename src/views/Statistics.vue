<template>
  <Layout>
    <Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="type"
    />
    <div class="wrapper" ref="chartWrapper">
      <Charts class="chart" :options="x"/>
    </div>

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
import _ from 'lodash'

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
  get y(){
    const today =new Date()
    const array =[]
    for(let i=0; i<=29; i++){
      const dataString = dayjs(today).subtract(i,'day').format('YYYY-MM-DD')
      const found = _.find(this.recordList,{recordTime:dataString})
      array.push({data:dataString,value:found?.amount})
    }
    array.sort((a,b)=>{
      if(a.data>b.data){
        return 1
      }else if(a.data===b.data){
        return 0
      }else{
        return -1
      }
    })
    return array
  }

  get x(){
    const  keys = this.y.map(item=>item.data)
    const values = this.y.map(item=>item.value)
    return {
      grid:{
        right:0,
        left:0
      },
      tooltip:{show:true},

      xAxis: {
        axisTick:{alignWithLabel:true},
        type: 'category',
        data: keys
      },
      yAxis: {
        type: 'value',
        show:false
      },
      series: [{
        symbolSize:10,
        symbol:'circle',
        itemStyle:{color:'#666',borderColor:'#666'},
        data: values,
        type: 'line',
      }]
    }
  }
  mounted(){
    const div = this.$refs.chartWrapper as HTMLDivElement
    div.scrollLeft = div.scrollWidth
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
.wrapper{
  overflow: auto;
  &::-webkit-scrollbar{
    display: none;
  }
}
.chart{
  width: 430%;

}
</style>
